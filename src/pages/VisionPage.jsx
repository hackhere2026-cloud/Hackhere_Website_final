import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Users, Sparkles, Heart, Globe, Target,
  ArrowRight, CheckCircle2, Award, Star, Check, X,
  ArrowUpRight, ShieldCheck, Terminal, Layers
} from "lucide-react";
import {
  sponsorsByTier,
  IMPACT_STATS
} from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function VisionPage() {
  const pillars = [
    {
      num: "01",
      name: "EXPLORE",
      tagline: "Curiosity Comes First",
      desc: "Creating spaces where students can explore technology, experiment with ideas, and discover what they’re capable of building."
    },
    {
      num: "02",
      name: "BUILD",
      tagline: "Learn by Building",
      desc: "Turning ideas into real projects through hackathons, workshops, challenges, and hands-on experiences that go beyond the classroom."
    },
    {
      num: "03",
      name: "GROW",
      tagline: "Grow Through Experience",
      desc: "Helping students develop technical skills, problem-solving ability, creativity, and the confidence to take on bigger challenges."
    },
    {
      num: "04",
      name: "CONNECT",
      tagline: "Build With People",
      desc: "Bringing students, mentors, founders, developers, and industry professionals together to learn, collaborate, and create meaningful connections."
    },
    {
      num: "05",
      name: "CREATE",
      tagline: "Make Ideas Matter",
      desc: "Encouraging builders to turn their ideas into working products, impactful projects, startups, and solutions that can make a difference."
    }
  ];

  const communityHighlights = IMPACT_STATS;

  const partnersData = {
    intern: [
      { name: "Elyon", image: "/sponsors/elyon.jpeg" },
      { name: "Journi", image: "/sponsors/jorni.jpeg" },
      { name: "MaestroMinds", image: "/sponsors/maestrominds.png" },
      { name: "Featherless AI", image: "/sponsors/69f88c4b96ddf527f9d69148_Copy of Red Yellow Retro Vibrant 2025 Monthly Calendar (1280 x 720 px) (1200 x 630 px) (18).png" }
    ],
    credit: [
      { name: "Medo", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.44 PM (1).jpeg" },
      { name: "Cristel", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.44 PM.jpeg" },
      { name: "Balveon Tech", image: "/sponsors/intern1.jpeg" },
      { name: "Rezylens", image: "/sponsors/Frame 5 (2).png" }
    ],
    goodies: [
      { name: "Elro Tech", image: "/sponsors/WhatsApp Image 2026-07-28 at 6.46.09 PM.jpeg" },
      { name: "Hashgraph Association", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.43 PM.jpeg" },
      { name: "UptoSkills", image: "/sponsors/UptoSkills.webp" },
      { name: "Honeycrib", image: "/sponsors/intern 2.jpeg" }
    ],
    venue: [
      { name: "SNS iHUB (Coimbatore)", image: "/sponsors/Quantexa poster (2).png" },
      { name: "Intro Works", image: "/logo.jpg" }
    ]
  };

  const milestones = [
    {
      phase: "01",
      title: "The Beginning of HackHere",
      date: "March 2025",
      desc: "HackHere began as a student-driven initiative focused on bridging the gap between academic learning and real-world technology. The vision was simple: create practical opportunities for students to learn, build, collaborate and gain meaningful industry exposure.",
      badge: "Inception"
    },
    {
      phase: "02",
      title: "Building the HackHere Ecosystem",
      date: "April 2026",
      desc: "HackHere evolved into a structured technology and innovation community, bringing together student developers, mentors, industry professionals and emerging technology partners around hands-on learning, hackathons and career opportunities.",
      badge: "Foundation"
    },
    {
      phase: "03",
      title: "AIVENTRA",
      date: "May 2026",
      desc: "HackHere launched AIVENTRA, its first national-level 24-hour hackathon in Chennai, bringing together 150+ onsite participants across Artificial Intelligence, Cybersecurity, Blockchain and DevOps. The event created tangible career outcomes, including internships and hiring opportunities through participating industry partners.",
      badge: "First National Hackathon"
    },
    {
      phase: "04",
      title: "VORTEXA",
      date: "June 2026",
      desc: "The second national-level HackHere hackathon, VORTEXA, attracted 470 registrations and introduced a hybrid competitive format with the Top 50 teams advancing to the offline 24-hour finale in Chennai. The event strengthened HackHere’s focus on functional prototypes, live demonstrations, GitHub-based development and industry-led evaluation.",
      badge: "Expanding the Format"
    },
    {
      phase: "05",
      title: "NEXORA",
      date: "August 2026",
      desc: "NEXORA marked HackHere’s largest event milestone at the time, recording 1,000+ registrations, 750+ participants and 200+ teams. Hosted at SNS iHUB, Coimbatore, the hackathon expanded HackHere’s industry network and resulted in nine teams receiving internship opportunities from partner companies.",
      badge: "Scaling the Community"
    },
    {
      phase: "06",
      title: "QUANTEXA & Ecosystem Expansion",
      date: "September 2026",
      desc: "HackHere continued its growth with QUANTEXA, a national-level 24-hour innovation hackathon focused on emerging domains including Quantum Technology, FinTech, Artificial Intelligence, Cybersecurity and Blockchain. Alongside hackathons, HackHere expanded into technical bootcamps, professional certifications, industry partnerships and technology platforms designed to support builders beyond individual events.",
      badge: "National Platform"
    },
    {
      phase: "07",
      title: "From Events to a Continuous Opportunity Ecosystem",
      date: "2026 & Beyond",
      desc: "HackHere is evolving beyond individual hackathons into a continuous platform connecting learning, building, industry exposure and career opportunities. The next phase focuses on expanding national hackathons, specialized technology programs, industry-backed bootcamps, builder communities, internal technology products and direct pathways connecting promising talent with startups and enterprises.",
      badge: "Future Vision"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. VISION HERO & STORY                                    */}
      {/* ========================================================= */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Our Vision & Story
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            Transforming Curiosity <br />
            <span className="italic text-[#FF2D5D]">into Production Capability.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-3xl mx-auto font-light font-sans">
            HackHere exists to close the gap between university syllabus theory and production software engineering through intense hackathons, direct mentor checkpoints, and real-world product deployment.
          </p>
        </div>
      </section>

      {/* EDITORIAL NARRATIVE: THE THEORY VS PRACTICE DICHOTOMY */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] w-full mx-auto font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF2D5D] font-bold font-mono">
              THE FUNDAMENTAL PROBLEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] leading-tight">
              Why We Built <br />
              <span className="italic text-[#FF2D5D]">HackHere.</span>
            </h2>
            <div className="space-y-4 text-[#4A5568] text-base sm:text-lg font-light leading-relaxed">
              <p>
                Every year, millions of students graduate with theoretical textbook knowledge but lack the practical experience, confidence, and network required to build real products.
              </p>
              <p>
                Classroom assignments encourage isolated, throwaway coding. Real-world engineering requires collaboration under constraints, debugging distributed failures, integrating modern APIs, and defending architectural choices.
              </p>
              <p>
                HackHere creates the ecosystem where students transition from passive learners into confident, verified creators.
              </p>
            </div>
          </div>

          {/* Midnight Emerald Comparison Card */}
          <div className="lg:col-span-6 bg-[#080B10] border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl space-y-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

            <div className="flex justify-between items-center pb-4 border-b border-[#263640] text-xs font-mono tracking-widest uppercase relative z-10">
              <span className="flex items-center gap-1.5 text-[#FF7B7B] font-bold">
                <X className="w-4 h-4 stroke-[3]" /> Classroom Theory
              </span>
              <span className="flex items-center gap-1.5 text-[#61C8D4] font-bold">
                <Check className="w-4 h-4 stroke-[3]" /> Real-World Capability
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              {[
                { theory: "Isolated textbook assignments", practical: "Collaborative squads building under real constraints" },
                { theory: "Rote memorization of syntax", practical: "Architectural problem solving & API integrations" },
                { theory: "Zero industry feedback", practical: "Direct 1-on-1 sprint checkpoints with Principal Leads" },
                { theory: "Blank resume & hypothetical bullet points", practical: "Live deployed products & verifiable credentials" }
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#111820] border border-[#263640] space-y-1.5 hover:border-[#61C8D4] transition-colors"
                >
                  <p className="text-xs text-[#8CA2AD] line-through font-light flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B7B] shrink-0" />
                    {row.theory}
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#61C8D4] shrink-0" />
                    {row.practical}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHAT WE BELIEVE IN (01. EXPLORE to 05. CREATE)         */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              THE 5 PILLARS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              What We Believe In
            </h2>
            <p className="text-[#4A5568] text-base font-light">
              The fundamental principles that govern every hackathon, workshop, and community initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-2xl p-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FF2D5D] block">
                    {p.num} / {p.name}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    {p.tagline}
                  </h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed font-light font-sans">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. COMMUNITY HIGHLIGHTS                                  */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 max-w-[1400px] w-full mx-auto">
        <div className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#61C8D4] font-bold inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
                COMMUNITY HIGHLIGHTS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {communityHighlights.map((stat, idx) => (
                <div key={idx} className="space-y-2 p-5 rounded-2xl bg-[#111820]/60 border border-[#263640]">
                  <p className="text-4xl sm:text-5xl font-serif font-light text-[#61C8D4]">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest font-mono text-white font-bold">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[#8CA2AD] font-light leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE MILESTONE ROADMAP (VISUAL VERTICAL TIMELINE)*/}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              MILESTONES & HISTORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              Our Journey So Far
            </h2>
            <p className="text-[#4A5568] text-base font-light">
              From a student-led initiative to a growing national innovation and builder ecosystem.
            </p>
          </div>

          <div className="relative border-l-2 border-[#080B10]/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 max-w-4xl mx-auto">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#F4FAFB] border-2 border-[#FF2D5D] group-hover:border-[#61C8D4] group-hover:bg-[#080B10] transition-colors" />

                <div className="bg-[#F4FAFB] border border-[#DCE8EB] rounded-2xl p-6 sm:p-8 space-y-3 hover:border-[#080B10] hover:shadow-xl transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF2D5D] bg-white px-2.5 py-1 rounded-md border border-[#DCE8EB]">
                      Phase {m.phase} • {m.date}
                    </span>
                    <span className="text-xs font-mono text-[#080B10] font-bold">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#080B10]">
                    {m.title}
                  </h3>

                  <p className="text-sm text-[#4A5568] leading-relaxed font-light font-sans">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PARTNERS & COLLABORATORS                              */}
      {/* ========================================================= */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] w-full mx-auto space-y-16 font-sans">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
            PARTNERS & COLLABORATORS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
            Building Together
          </h2>
          <p className="text-[#4A5568] text-base sm:text-lg font-light leading-relaxed">
            HackHere is powered by a growing network of organizations, startups, communities, and institutions that support our mission to create meaningful opportunities for student builders.
          </p>
        </div>

        <div className="space-y-12">
          {/* INTERN PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61C8D4]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#080B10] font-bold">
                INTERN PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.intern.map((p, idx) => (
                <div key={idx} className="bg-white border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-5 text-center space-y-3 shadow-sm transition-all group flex flex-col items-center justify-between h-36">
                  <div className="w-full h-20 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CREDIT PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#856404] font-bold">
                CREDIT PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.credit.map((p, idx) => (
                <div key={idx} className="bg-white border border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-5 text-center space-y-3 shadow-sm transition-all group flex flex-col items-center justify-between h-36">
                  <div className="w-full h-20 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GOODIES PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A0AEC0]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#4A5568] font-bold">
                GOODIES PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.goodies.map((p, idx) => (
                <div key={idx} className="bg-[#F4FAFB] border border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-5 text-center space-y-3 shadow-sm transition-all group flex flex-col items-center justify-between h-36">
                  <div className="w-full h-20 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VENUE PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D5D]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF2D5D] font-bold">
                VENUE PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {partnersData.venue.map((p, idx) => (
                <div key={idx} className="bg-white border-2 border-[#263640]/20 hover:border-[#080B10] rounded-2xl p-5 text-center space-y-3 shadow-sm transition-all group flex flex-col items-center justify-between h-36">
                  <div className="w-full h-20 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Mission Footnote */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F4FAFB] border border-[#DCE8EB] text-center max-w-3xl mx-auto">
            <p className="text-sm text-[#4A5568] font-light leading-relaxed font-sans">
              From technology and learning to community support and event infrastructure, every partner plays a role in helping HackHere bring better experiences and opportunities to student builders.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Be part of our next <br />
            <span className="italic text-[#61C8D4]">innovation chapter.</span>
          </>
        }
        subtitle="Join our community of student builders, developers, and industry mentors today."
        ctaText="JOIN ECOSYSTEM"
        ctaLink="/get-started"
        badge="✦ EMPOWERING TOMORROW'S ENGINEERS"
      />

    </div>
  );
}
