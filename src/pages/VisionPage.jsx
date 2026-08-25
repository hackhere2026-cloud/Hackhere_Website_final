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

  const communityHighlights = [
    {
      value: "500+",
      label: "Community Members",
      description: "Students, developers, creators & aspiring innovators growing together."
    },
    {
      value: "10+",
      label: "Events & Initiatives",
      description: "Hackathons, workshops, sessions and community-led experiences."
    },
    {
      value: "100+",
      label: "Student Builders",
      description: "Students who have participated, collaborated and built alongside the community."
    },
    {
      value: "20+",
      label: "Mentors & Industry Connects",
      description: "Professionals, founders and experienced builders sharing knowledge and guidance."
    }
  ];

  const partnersData = {
    platinum: [
      { name: "Elyon" },
      { name: "Journi" },
      { name: "MaestroMinds" },
      { name: "Featherless AI" }
    ],
    gold: [
      { name: "Medo" },
      { name: "Cristel" },
      { name: "Balveon Tech" },
      { name: "Rezylens" }
    ],
    silver: [
      { name: "Elro Tech" },
      { name: "Hashgrash Associations" },
      { name: "UptoSkills" },
      { name: "Honey Crib" }
    ],
    venue: [
      { name: "SNS" },
      { name: "Intro Works" }
    ]
  };

  const milestones = [
    {
      phase: "01",
      title: "Founding the Builder Culture",
      date: "August 2024",
      desc: "Started as a passionate collective of students and mentors frustrated by the gap between theory and code. Hosted our first 24-hour campus hack sprint with 120 initial builders.",
      badge: "Inception"
    },
    {
      phase: "02",
      title: "First Inter-College Hackathon",
      date: "January 2025",
      desc: "Expanded across 8 universities, launching weekly technical masterclasses in Web3, distributed databases, and modern frontend architecture.",
      badge: "Expansion"
    },
    {
      phase: "03",
      title: "AIVENTRA 2025 Flagship",
      date: "October 2025",
      desc: "Brought together 450+ developers and 95 squads in Bangalore to construct autonomous agentic workflows and LLM applications, awarding ₹2.5L+ in cash prizes.",
      badge: "Major Milestone"
    },
    {
      phase: "04",
      title: "VORTEXA 2025 Systems Sprint",
      date: "December 2025",
      desc: "600+ builders tackled high-throughput systems, edge computing, and real-time multiplayer protocols in Chennai with direct sponsorship from AWS & Redis.",
      badge: "National Scale"
    },
    {
      phase: "05",
      title: "Community Expansion & Chapter Network",
      date: "Early 2026",
      desc: "Crossed 3,500+ active builders across 30+ university chapters, formalizing 1-on-1 sprint checkpoints and verifiable credential badging.",
      badge: "3,500+ Builders"
    },
    {
      phase: "06",
      title: "The Next Phase: Continuous Opportunity Engine",
      date: "2026 & Beyond",
      desc: "Launching continuous startup incubation, open-source development grants, and direct-to-hire pipelines with top-tier technology startups.",
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
              From our first classroom hack session to a national builder ecosystem.
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
          {/* PLATINUM PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61C8D4]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#080B10] font-bold">
                PLATINUM PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.platinum.map((p, idx) => (
                <div key={idx} className="bg-white border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-6 text-center space-y-1.5 shadow-sm transition-all group">
                  <span className="text-[11px] font-mono text-[#A8862A] font-bold uppercase tracking-wider block">Platinum</span>
                  <h4 className="text-xl font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* GOLD PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#856404] font-bold">
                GOLD PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.gold.map((p, idx) => (
                <div key={idx} className="bg-white border border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-5 text-center space-y-1.5 shadow-sm transition-all group">
                  <span className="text-[11px] font-mono text-[#A8862A] font-bold uppercase tracking-wider block">Gold</span>
                  <h4 className="text-lg font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* SILVER PARTNERS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A0AEC0]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#4A5568] font-bold">
                SILVER PARTNERS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnersData.silver.map((p, idx) => (
                <div key={idx} className="bg-[#F4FAFB] border border-[#DCE8EB] hover:border-[#080B10] rounded-2xl p-5 text-center space-y-1.5 shadow-sm transition-all group">
                  <span className="text-[11px] font-mono text-[#718096] font-bold uppercase tracking-wider block">Silver</span>
                  <h4 className="text-base font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</h4>
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
                <div key={idx} className="bg-white border-2 border-[#263640]/20 hover:border-[#080B10] rounded-2xl p-6 text-center space-y-1.5 shadow-sm transition-all group">
                  <span className="text-xs font-mono text-[#FF2D5D] font-bold uppercase tracking-wider block">Venue Partner</span>
                  <h4 className="text-xl font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">{p.name}</h4>
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
