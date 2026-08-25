import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Client, Receiver } from "@upstash/qstash";

// Load environment variables from .env file
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url === 'URL' || url.trim() === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const rawSupabaseUrl = process.env.VITE_SUPABASE_URL;
const rawSupabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = isValidUrl(rawSupabaseUrl) && rawSupabaseKey && rawSupabaseKey !== 'KEY';

if (!isSupabaseConfigured) {
  console.warn("\n⚠️  WARNING: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing or set to placeholder in .env!");
  console.warn("👉 Please update .env with your real Supabase project URL and Anon key to use database features.\n");
}

const supabaseUrl = isSupabaseConfigured ? rawSupabaseUrl : 'https://placeholder-project.supabase.co';
const supabaseKey = isSupabaseConfigured ? rawSupabaseKey : 'placeholder-anon-key';

console.log("Supabase URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// QStash client for publishing messages
const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN || 'placeholder-token',
  baseUrl: process.env.QSTASH_URL || undefined,
});

// QStash receiver for verifying webhook signatures
const qstashReceiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || 'placeholder-current-key',
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || 'placeholder-next-key',
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.zoho.in",
  port: Number(process.env.EMAIL_PORT || 465),
  secure: String(process.env.EMAIL_SECURE ?? "true") === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate HTML email template for blog
const generateBlogEmailHTML = (blog, unsubscribeLink = "#") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">CodeSapiens Blog</h1>
            </td>
          </tr>
          
          <!-- Cover Image -->
          ${blog.cover_image ? `
          <tr>
            <td style="padding: 0;">
              <img src="${blog.cover_image}" alt="${blog.title}" style="width: 100%; height: auto; display: block;">
            </td>
          </tr>
          ` : ''}
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 28px; font-weight: 700; line-height: 1.3;">
                ${blog.title}
              </h2>
              
              ${blog.excerpt ? `
              <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.6; font-style: italic;">
                ${blog.excerpt}
              </p>
              ` : ''}
              
              <div style="color: #374151; font-size: 16px; line-height: 1.8;">
                ${blog.content}
              </div>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 32px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 8px;">
                    <a href="https://codesapiens.in/blog/${blog.slug || ''}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Read Full Article →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                You're receiving this because you're a member of CodeSapiens.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} CodeSapiens. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// ============================================
// API ENDPOINTS
// ============================================

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CodeSapiens Email API is running" });
});

// Receive public pathway applications and deliver them to the HackHere events inbox.
app.post("/api/get-started", async (req, res) => {
  try {
    const { fullName, email, portfolioUrl, motivation, role, pathway } = req.body || {};
    if (!fullName?.trim() || !email?.trim() || !portfolioUrl?.trim() || !role?.trim()) {
      return res.status(400).json({ success: false, error: "Please complete all required fields." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    let portfolio;
    try {
      portfolio = new URL(portfolioUrl);
      if (!["http:", "https:"].includes(portfolio.protocol)) throw new Error();
    } catch {
      return res.status(400).json({ success: false, error: "Please enter a valid portfolio URL." });
    }

    if (!process.env.EMAIL_USER) {
      return res.status(503).json({ success: false, error: "The sender email address is not configured." });
    }
    if (!process.env.EMAIL_PASS) {
      return res.status(503).json({ success: false, error: "The Zoho Mail App Password is not configured yet." });
    }

    const escapeHtml = (value = "") => String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
    const recipient = process.env.GET_STARTED_RECIPIENT || "event@hackhere.in";

    await transporter.sendMail({
      from: `"HackHere Website" <${process.env.EMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New ${pathway || role} application — ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Pathway: ${pathway || role}`,
        `Portfolio: ${portfolio.href}`,
        `Message: ${motivation || "Not provided"}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0d1f17">
          <h2 style="margin-bottom:4px">New Get Started application</h2>
          <p style="color:#52635b;margin-top:0">Submitted through hackher.in</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px;border-bottom:1px solid #eae4d6"><b>Name</b></td><td>${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eae4d6"><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eae4d6"><b>Pathway</b></td><td>${escapeHtml(pathway || role)}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eae4d6"><b>Portfolio</b></td><td><a href="${escapeHtml(portfolio.href)}">${escapeHtml(portfolio.href)}</a></td></tr>
            <tr><td style="padding:10px;vertical-align:top"><b>Message</b></td><td style="padding:10px">${escapeHtml(motivation || "Not provided")}</td></tr>
          </table>
        </div>`,
    });

    res.json({ success: true, message: "Application delivered." });
  } catch (error) {
    console.error("Get Started email failed:", error);
    res.status(500).json({ success: false, error: "We could not send the application. Please try again." });
  }
});

// Gemini Wrapper Endpoint
app.post("/api/analyze-resume", async (req, res) => {
  try {
    const { resumeText, jobDescription, analysisMode } = req.body;

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return res.status(500).json({ error: "Server configuration error: Gemini API key missing" });
    }

    if (!resumeText) {
      return res.status(400).json({ error: "Missing resume text" });
    }

    let prompt = '';

    if (analysisMode === 'jd') {
      prompt = `
            You are an expert ATS (Applicant Tracking System) and Career Coach.
            Compare the following Resume text against the Job Description (JD).
            
            Resume Text:
            ${resumeText}
            
            Job Description:
            ${jobDescription}
            
            Provide a detailed analysis in strictly raw JSON format (no markdown code blocks, no explanation text).
            Ensure all strings are properly escaped.
            The JSON structure must be:
            {
              "matchPercentage": number (0-100),
              "summary": "string (brief overview of fit)",
              "strengths": "markdown string (bullet points)",
              "weaknesses": "markdown string (missing skills/experience)",
              "improvements": "markdown string (concrete suggestions to improve the resume for this JD)"
            }
        `;
    } else {
      prompt = `
            You are an expert Career Coach and Resume Reviewer.
            Analyze the following Resume text to provide general feedback on how to improve it for a professional career.
            
            Resume Text:
            ${resumeText}
            
            Provide a detailed analysis in strictly raw JSON format (no markdown code blocks, no explanation text).
            Ensure all strings are properly escaped.
            The JSON structure must be:
            {
              "matchPercentage": number (0-100, representing overall resume quality score),
              "summary": "string (brief summary of the candidate's profile)",
              "strengths": "markdown string (strong points of the resume)",
              "weaknesses": "markdown string (formatting issues, missing sections, unclear descriptions)",
              "improvements": "markdown string (actionable tips to make the resume stand out generally)"
            }
        `;
    }

    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      throw new Error(`AI Analysis failed: ${response.statusText}`);
    }

    const result = await response.json();
    return res.json(result);

  } catch (error) {
    console.error("Error in /api/analyze-resume:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Legacy email endpoint (keep for backward compatibility)
app.get("/send-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: "suryasunrise261@gmail.com",
      to: "suryasuperman261@gmail.com",
      subject: "Hello!",
      text: "This is a test message.",
    });
    res.send("Email sent!");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("uid, display_name, email, college, role, avatar")
      .eq("role", "student")
      .order("display_name", { ascending: true });

    if (error) throw error;

    res.json({ success: true, students: data || [] });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all users (including non-students)
app.get("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("uid, display_name, email, college, role, avatar")
      .order("display_name", { ascending: true });

    if (error) throw error;

    res.json({ success: true, users: data || [] });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send blog email to selected recipients (via QStash in production, direct in dev)
app.post("/api/send-blog-email", async (req, res) => {
  try {
    const { emails, blog } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ success: false, error: "No recipients provided" });
    }

    if (!blog || !blog.title || !blog.content) {
      return res.status(400).json({ success: false, error: "Invalid blog data" });
    }

    const isLocalDev = !process.env.VERCEL_URL && !process.env.BASE_URL;

    if (isLocalDev) {
      // LOCAL DEV: Send emails directly (QStash can't reach localhost)
      const htmlContent = generateBlogEmailHTML(blog);
      let successCount = 0;
      let failedEmails = [];

      for (const email of emails) {
        try {
          await transporter.sendMail({
            from: '"CodeSapiens Blog" <suryasunrise261@gmail.com>',
            to: email,
            subject: `📚 New Blog: ${blog.title}`,
            html: htmlContent,
          });
          successCount++;
          console.log(`✅ Email sent to ${email}`);
        } catch (emailError) {
          console.error(`Failed to send to ${email}:`, emailError.message);
          failedEmails.push(email);
        }
      }

      return res.json({
        success: true,
        message: `Email sent to ${successCount} of ${emails.length} recipients (local mode)`,
        successCount,
        failedCount: failedEmails.length,
      });
    }

    // PRODUCTION: Queue to QStash
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.BASE_URL;

    // Debug: log blog object to see available fields
    console.log("📝 Blog object received:", JSON.stringify({ id: blog.id, title: blog.title, keys: Object.keys(blog) }));

    // Since we already have the full blog, send it directly (it's small enough per email)
    const queuePromises = emails.map(email =>
      qstashClient.publishJSON({
        url: `${baseUrl}/api/qstash-send-email`,
        body: { email, blog: { id: blog.id, title: blog.title, content: blog.content, excerpt: blog.excerpt, cover_image: blog.cover_image, slug: blog.slug } },
        retries: 3,
      })
    );

    await Promise.all(queuePromises);

    res.json({
      success: true,
      message: `Queued ${emails.length} emails for delivery`,
      queuedCount: emails.length,
    });

  } catch (error) {
    console.error("Error sending blog emails:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send blog email to all students (via QStash in production, direct in dev)
app.post("/api/send-blog-email-all", async (req, res) => {
  try {
    const { blog } = req.body;

    if (!blog || !blog.title || !blog.content) {
      return res.status(400).json({ success: false, error: "Invalid blog data" });
    }

    // Fetch all student emails
    const { data: students, error: fetchError } = await supabase
      .from("users")
      .select("email")
      .eq("role", "student");

    if (fetchError) throw fetchError;

    if (!students || students.length === 0) {
      return res.status(400).json({ success: false, error: "No students found" });
    }

    const emails = students.map(s => s.email).filter(Boolean);
    const isLocalDev = !process.env.VERCEL_URL && !process.env.BASE_URL;

    if (isLocalDev) {
      // LOCAL DEV: Send emails directly (QStash can't reach localhost)
      const htmlContent = generateBlogEmailHTML(blog);
      let successCount = 0;
      let failedEmails = [];

      for (const email of emails) {
        try {
          await transporter.sendMail({
            from: '"CodeSapiens Blog" <suryasunrise261@gmail.com>',
            to: email,
            subject: `📚 New Blog: ${blog.title}`,
            html: htmlContent,
          });
          successCount++;
          console.log(`✅ Email sent to ${email}`);
        } catch (emailError) {
          console.error(`Failed to send to ${email}:`, emailError.message);
          failedEmails.push(email);
        }
      }

      return res.json({
        success: true,
        message: `Email sent to ${successCount} of ${emails.length} students (local mode)`,
        successCount,
        totalStudents: students.length,
        failedCount: failedEmails.length,
      });
    }

    // PRODUCTION: Queue to QStash
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.BASE_URL;

    const queuePromises = emails.map(email =>
      qstashClient.publishJSON({
        url: `${baseUrl}/api/qstash-send-email`,
        body: { email, blog: { id: blog.id, title: blog.title, content: blog.content, excerpt: blog.excerpt, cover_image: blog.cover_image, slug: blog.slug } },
        retries: 3,
      })
    );

    await Promise.all(queuePromises);

    res.json({
      success: true,
      message: `Queued ${emails.length} emails for delivery to all students`,
      queuedCount: emails.length,
      totalStudents: students.length,
    });

  } catch (error) {
    console.error("Error sending blog email to all:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test email endpoint
app.post("/api/test-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    await transporter.sendMail({
      from: '"CodeSapiens" <suryasunrise261@gmail.com>',
      to: email,
      subject: "Test Email from CodeSapiens",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🎉 Email Configuration Working!</h2>
          <p>This is a test email from the CodeSapiens Blog Email System.</p>
          <p>If you received this, the email system is configured correctly.</p>
        </div>
      `,
    });

    res.json({ success: true, message: `Test email sent to ${email}` });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// QSTASH WEBHOOK - Called by Upstash to send emails
// ============================================
app.post("/api/qstash-send-email", async (req, res) => {
  try {
    // Verify the request is from QStash (signature verification)
    const signature = req.headers["upstash-signature"];
    const body = JSON.stringify(req.body);

    if (process.env.NODE_ENV === "production" && signature) {
      const isValid = await qstashReceiver.verify({
        signature,
        body,
      });

      if (!isValid) {
        console.error("Invalid QStash signature");
        return res.status(401).json({ error: "Invalid signature" });
      }
    }

    const { email, blogId, blog: blogFromBody } = req.body;

    // Debug: log what we received
    console.log("📨 QStash webhook received:", JSON.stringify(req.body, null, 2));

    if (!email) {
      console.log("❌ Missing email");
      return res.status(400).json({ error: "Missing email" });
    }

    let blog = blogFromBody;

    // If blog not provided directly, fetch from Supabase using blogId
    if (!blog && blogId) {
      const { data: fetchedBlog, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (blogError || !fetchedBlog) {
        console.error("Failed to fetch blog:", blogError?.message);
        return res.status(404).json({ error: "Blog not found" });
      }
      blog = fetchedBlog;
    }

    if (!blog || !blog.title) {
      console.log("❌ Missing blog data");
      return res.status(400).json({ error: "Missing blog data" });
    }

    const htmlContent = generateBlogEmailHTML(blog);

    await transporter.sendMail({
      from: '"CodeSapiens Blog" <suryasunrise261@gmail.com>',
      to: email,
      subject: `📚 New Blog: ${blog.title}`,
      html: htmlContent,
    });

    console.log(`✅ Email sent to ${email}`);
    res.json({ success: true, message: `Email sent to ${email}` });

  } catch (error) {
    console.error(`❌ Failed to send email:`, error.message);
    // Return 500 so QStash will retry
    res.status(500).json({ success: false, error: error.message });
  }
});

// Public statistics endpoint
app.get("/api/public-stats", async (req, res) => {
  try {
    if (!isSupabaseConfigured) {
      return res.json({
        success: true,
        stats: {
          totalUsers: 1500,
          totalColleges: 85,
          topColleges: [
            { name: "Anna University", count: 320 },
            { name: "SRM Institute of Science and Technology", count: 210 },
            { name: "VIT University", count: 190 },
            { name: "PSG College of Technology", count: 140 },
            { name: "SSN College of Engineering", count: 125 }
          ]
        }
      });
    }

    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { data: colleges } = await supabase
      .from("users")
      .select("college")
      .not("college", "is", null);

    const collegeCounts = {};
    (colleges || []).forEach(c => {
      if (c.college && c.college.trim()) {
        collegeCounts[c.college] = (collegeCounts[c.college] || 0) + 1;
      }
    });

    const totalColleges = Object.keys(collegeCounts).length;
    const topColleges = Object.entries(collegeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    res.json({
      success: true,
      stats: {
        totalUsers: totalUsers || 0,
        totalColleges: totalColleges || 0,
        topColleges: topColleges.length > 0 ? topColleges : []
      }
    });
  } catch (err) {
    console.error("Error fetching public stats:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Send meetup approval email
app.post("/send-approval-email", async (req, res) => {
  try {
    const { email, userName, meetupTitle, meetupDate, meetupVenue, token } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    await transporter.sendMail({
      from: '"CodeSapiens Community" <suryasunrise261@gmail.com>',
      to: email,
      subject: `🎉 Registration Approved: ${meetupTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border-radius: 8px;">
          <h2 style="color: #2563eb;">Your registration is approved!</h2>
          <p>Hi <strong>${userName || "Attendee"}</strong>,</p>
          <p>We are excited to confirm your registration for <strong>${meetupTitle}</strong>.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${meetupDate}</p>
            <p style="margin: 5px 0;"><strong>Venue:</strong> ${meetupVenue}</p>
            ${token ? `<p style="margin: 5px 0;"><strong>Entry Token / Pass ID:</strong> <code>${token}</code></p>` : ''}
          </div>
          <p>See you there!</p>
          <p>Best regards,<br/>The CodeSapiens Team</p>
        </div>
      `,
    });

    res.json({ success: true, message: `Approval email sent to ${email}` });
  } catch (err) {
    console.error("Error sending approval email:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Send meetup rejection email
app.post("/send-rejection-email", async (req, res) => {
  try {
    const { email, userName, meetupTitle } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    await transporter.sendMail({
      from: '"CodeSapiens Community" <suryasunrise261@gmail.com>',
      to: email,
      subject: `Update on your registration for ${meetupTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border-radius: 8px;">
          <h2 style="color: #1f2937;">Registration Update</h2>
          <p>Hi <strong>${userName || "Attendee"}</strong>,</p>
          <p>Thank you for your interest in <strong>${meetupTitle}</strong>.</p>
          <p>Due to high demand and capacity constraints, we are unfortunately unable to accommodate your registration this time.</p>
          <p>We encourage you to register early for our upcoming events and meetups!</p>
          <p>Best regards,<br/>The CodeSapiens Team</p>
        </div>
      `,
    });

    res.json({ success: true, message: `Rejection email sent to ${email}` });
  } catch (err) {
    console.error("Error sending rejection email:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// College search endpoint
app.post("/colleges/search", async (req, res) => {
  try {
    const keyword = (req.headers["keyword"] || req.body?.keyword || "").toLowerCase();
    
    // Sample college list for local / fallback search
    const allColleges = [
      [1, "AU", "Anna University, Chennai"],
      [2, "IITM", "Indian Institute of Technology Madras"],
      [3, "SRM", "SRM Institute of Science and Technology, Kattankulathur"],
      [4, "VIT", "Vellore Institute of Technology, Vellore"],
      [5, "PSG", "PSG College of Technology, Coimbatore"],
      [6, "SSN", "SSN College of Engineering, Chennai"],
      [7, "CIT", "Coimbatore Institute of Technology, Coimbatore"],
      [8, "MIT", "Madras Institute of Technology, Chennai"],
      [9, "SVCE", "Sri Venkateswara College of Engineering, Sriperumbudur"],
      [10, "SASTRA", "SASTRA Deemed University, Thanjavur"],
      [11, "IITB", "Indian Institute of Technology Bombay"],
      [12, "IITD", "Indian Institute of Technology Delhi"],
      [13, "BITS", "Birla Institute of Technology and Science, Pilani"],
      [14, "NITW", "National Institute of Technology Warangal"],
      [15, "NITT", "National Institute of Technology Tiruchirappalli"]
    ];

    const results = keyword
      ? allColleges.filter(c => c[2].toLowerCase().includes(keyword) || c[1].toLowerCase().includes(keyword))
      : allColleges.slice(0, 10);

    res.json(results);
  } catch (err) {
    console.error("Error in college search:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
