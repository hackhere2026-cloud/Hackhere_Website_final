// src/pages/GetStartedPage.jsx
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  GraduationCap, Code, Compass, Mic, Heart, Building2,
  CheckCircle2, ArrowRight, Sparkles, Send, ArrowUpRight, Check
} from "lucide-react";
import { toast } from "react-hot-toast";
import CTABanner from "../components/CTABanner";

export default function GetStartedPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "student";
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    portfolioUrl: "",
    experience: "Intermediate",
    motivation: ""
  });
  const [loading, setLoading] = useState(false);

  const roleDetails = {
    student: {
      title: "Student Builder Pathway",
      tagline: "Learn modern frameworks, participate in hackathons, and build a verifiable portfolio.",
      requirements: [
        "Enrolled in any undergraduate / graduate program or self-taught learner",
        "Eager to work collaboratively in 2-4 person multidisciplinary squads",
        "Commitment to completing sprint deliverables and code submissions"
      ],
      benefits: [
        "Free access to all developer workshops & masterclasses",
        "Teammate matchmaking for upcoming 48hr hackathons",
        "1-on-1 architecture checkpoints with Principal AI & Cloud mentors",
        "Verifiable digital certificates with cryptographic signature IDs"
      ],
      formFields: {
        portfolioLabel: "GitHub Profile / Portfolio Link",
        placeholderPortfolio: "https://github.com/username",
        notesPlaceholder: "What domains or frameworks are you most eager to build with?"
      }
    },
    builder: {
      title: "Active Developer / Engineer Pathway",
      tagline: "Ship ambitious code, compete for prize grants, and find technical co-founders.",
      requirements: [
        "Working proficiency in at least one modern language/stack (React, Python, Go, Rust, etc.)",
        "Desire to tackle high-scale distributed problems and AI agent systems",
        "Active GitHub presence or verifiable deployed projects"
      ],
      benefits: [
        "Access to sponsored API & cloud compute grants ($1,000+ value)",
        "Direct exposure to VC investors and startup CTOs",
        "Opportunity to win from ₹12.5L+ annual prize pool",
        "Fast-track interviews with hiring partner startups"
      ],
      formFields: {
        portfolioLabel: "GitHub Profile or Deployed Web App",
        placeholderPortfolio: "https://github.com/username or your live URL",
        notesPlaceholder: "Tell us about the most challenging system or feature you've engineered."
      }
    },
    mentor: {
      title: "Technical Mentor Pathway",
      tagline: "Guide hungry student squads, review architectures, and unblock teams during sprints.",
      requirements: [
        "3+ years of professional software engineering, AI/ML, or DevOps experience",
        "Willingness to conduct 30-min checkpoint breakout reviews during weekend hackathons",
        "Constructive, encouraging mentorship demeanor"
      ],
      benefits: [
        "Ecosystem thought leadership and featured profile on HackHere Mentors Wall",
        "Direct connection with top 5% builder talent for recruitment",
        "Exclusive HackHere Mentor swag bundle and community awards",
        "Invitation to VIP speaker dinners and roundtables"
      ],
      formFields: {
        portfolioLabel: "LinkedIn Profile / Company Affiliation",
        placeholderPortfolio: "https://linkedin.com/in/username",
        notesPlaceholder: "What technical domains are you most excited to mentor students in?"
      }
    },
    speaker: {
      title: "Workshop Speaker Pathway",
      tagline: "Deliver high-impact technical masterclasses, keynotes, and system design breakdowns.",
      requirements: [
        "Demonstrated domain mastery in modern tech (AI agents, WebGPU, distributed databases, UX)",
        "Ability to deliver a 60-90 min live coding session or practical talk",
        "Prepared sample repo / slides for community library"
      ],
      benefits: [
        "Engage an audience of 500+ active student engineers and creators",
        "Recorded masterclasses hosted permanently in HackHere Video Library",
        "Featured promotion across HackHere Discord, Twitter, and LinkedIn",
        "Speaker honorarium and official partner recognition"
      ],
      formFields: {
        portfolioLabel: "LinkedIn Profile or Speaking Portfolio",
        placeholderPortfolio: "https://linkedin.com/in/username",
        notesPlaceholder: "Propose a masterclass topic or outline you'd like to deliver."
      }
    },
    volunteer: {
      title: "Community Volunteer Pathway",
      tagline: "Help organize hackathons, manage chapter meetups, and coordinate operations.",
      requirements: [
        "Proactive problem solver with excellent communication skills",
        "Enthusiasm for building vibrant tech communities on campus or online",
        "Availability during hackathon weekends and sprint logistics"
      ],
      benefits: [
        "Hands-on event production and ecosystem leadership experience",
        "Behind-the-scenes event management credentials and recommendation letters",
        "Exclusive HackHere Crew merchandise and early event access",
        "Fast-track to becoming a Regional Campus Chapter Lead"
      ],
      formFields: {
        portfolioLabel: "LinkedIn or Social Profile",
        placeholderPortfolio: "https://linkedin.com/in/username",
        notesPlaceholder: "What operations or logistics areas would you like to contribute to?"
      }
    },
    organization: {
      title: "Organization / Sponsor Pathway",
      tagline: "Connect with top emerging engineers, showcase your APIs, and recruit high-velocity builders.",
      requirements: [
        "Tech startup, enterprise cloud provider, or university institution",
        "Interested in sponsoring prize pools, challenge tracks, or compute grants",
        "Committed to supporting student innovation and hiring emerging talent"
      ],
      benefits: [
        "Direct access to pipeline of top-tier student developers and designers",
        "Branded challenge track sponsorship with custom problem statements",
        "Developer tool and API adoption across 3,500+ active builders",
        "Keynote speaking slots and booth placement at flagship finals"
      ],
      formFields: {
        portfolioLabel: "Company / Organization Website",
        placeholderPortfolio: "https://yourcompany.com",
        notesPlaceholder: "How would you like to collaborate with HackHere (Sponsor, Track, Hiring)?"
      }
    }
  };

  const current = roleDetails[selectedRole] || roleDetails.student;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
      const response = await fetch(`${backendUrl}/api/get-started`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: selectedRole, pathway: current.title }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your application.");
      setSubmitted(true);
      toast.success(`Application submitted for the ${current.title}! We will reach out shortly.`);
      setFormData({ fullName: "", email: "", portfolioUrl: "", experience: "Intermediate", motivation: "" });
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      toast.error(isNetworkError
        ? "The application service is offline. Start it with npm run server."
        : error.message,
        { duration: 6000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. HERO                                                   */}
      {/* ========================================================= */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Participate & Onboarding
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            There Is a Place <br />
            <span className="italic text-[#FF2D5D]">for You at HackHere.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Select your pathway below to explore requirements, community perks, and submit your direct application.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ROLE SELECTION BUTTONS MATRIX                          */}
      {/* ========================================================= */}
      <section className="py-16 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: "student", label: "STUDENT BUILDER", icon: GraduationCap },
            { id: "builder", label: "ACTIVE DEVELOPER", icon: Code },
            { id: "mentor", label: "TECH MENTOR", icon: Compass },
            { id: "speaker", label: "SPEAKER", icon: Mic },
            { id: "volunteer", label: "VOLUNTEER", icon: Heart },
            { id: "organization", label: "ORGANIZATION", icon: Building2 },
          ].map((r) => {
            const IconComp = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRole(r.id);
                  setSubmitted(false);
                }}
                className={`p-5 rounded-2xl border-2 text-center flex flex-col items-center gap-3 transition-all duration-300 ${
                  isSelected
                    ? "bg-[#080B10] text-[#61C8D4] border-[#263640] shadow-xl scale-[1.02]"
                    : "bg-white text-[#4A5568] border-[#DCE8EB] hover:border-[#080B10] hover:text-[#080B10]"
                }`}
              >
                <IconComp className={`w-6 h-6 ${isSelected ? "text-[#61C8D4]" : "text-[#FF2D5D]"}`} />
                <span className="text-[11px] uppercase font-bold tracking-wider font-mono">
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PATHWAY DETAILS & EXPANDED APPLICATION FORM            */}
      {/* ========================================================= */}
      <section className="py-8 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Requirements & Benefits */}
          <div className="lg:col-span-6 space-y-8 bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF2D5D] font-bold">
                Selected Pathway
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#080B10]">
                {current.title}
              </h2>
              <p className="text-[#4A5568] text-base font-light leading-relaxed">
                {current.tagline}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 pt-4 border-t border-[#DCE8EB]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
                What You Receive:
              </h3>
              <div className="space-y-2.5">
                {current.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A5568]">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4 pt-4 border-t border-[#DCE8EB]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
                Expectations & Criteria:
              </h3>
              <div className="space-y-2.5">
                {current.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A5568]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#080B10] shrink-0 mt-2" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Application Form */}
          <div className="lg:col-span-6 bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#61C8D4] font-bold">
                  DIRECT ONBOARDING
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mt-1">
                  Apply for {current.title}
                </h3>
              </div>

              {submitted ? (
                <div className="bg-[#111820] border border-[#61C8D4] rounded-2xl p-8 text-center space-y-4 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-[#61C8D4] text-[#080B10] mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-2xl font-serif font-light text-white">Application Received!</h4>
                  <p className="text-xs text-[#8CA2AD] leading-relaxed max-w-sm mx-auto">
                    Thank you for applying for the {current.title}. Our community team reviews submissions within 48 hours. Check your inbox for orientation materials!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#61C8D4] underline uppercase tracking-widest pt-2 font-bold"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">
                      {current.formFields.portfolioLabel} *
                    </label>
                    <input
                      required
                      type="url"
                      placeholder={current.formFields.placeholderPortfolio}
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">
                      Additional Context / Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder={current.formFields.notesPlaceholder}
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#61C8D4] text-[#080B10] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                      {loading ? "Submitting Application..." : "SUBMIT APPLICATION"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Ready to shape the <br />
            <span className="italic text-[#61C8D4]">future of software?</span>
          </>
        }
        subtitle="Join our community of student builders, developers, and industry mentors today."
        ctaText="JOIN ECOSYSTEM"
        ctaLink="/events"
        badge="✦ 3,500+ ACTIVE BUILDERS"
      />

    </div>
  );
}
