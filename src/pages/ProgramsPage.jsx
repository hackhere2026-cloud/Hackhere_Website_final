// src/pages/ProgramsPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code, BookOpen, Sparkles, Terminal, Award, Users,
  CheckCircle2, ArrowRight, Zap, ArrowUpRight,
  Clock, Shield, Laptop, Network, Rocket, FileCode2,
  Cpu, GitBranch, Check
} from "lucide-react";
import { PROGRAMS_LIST } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function ProgramsPage() {
  const [selectedTrack, setSelectedTrack] = useState(PROGRAMS_LIST[0].id);

  const methodologySteps = [
    {
      step: "01",
      name: "ARCHITECTURAL BLUEPRINTS",
      title: "System Design & Threat Modeling",
      desc: "Before writing a single line of code, teams map database schemas, API contracts, latency requirements, and failure modes with mentor input.",
      icon: Terminal
    },
    {
      step: "02",
      name: "1-ON-1 SPRINT CHECKPOINTS",
      title: "Direct Feedback from Tech Leads",
      desc: "Regular 30-minute checkpoint sessions with Principal and Staff engineers to review Git branches, unblock edge cases, and tune performance.",
      icon: GitBranch
    },
    {
      step: "03",
      name: "PRODUCTION STANDARDS",
      title: "Zero-Toy Deployments",
      desc: "Projects must have automated CI/CD pipelines, Row-Level Security, unit tests, and responsive mobile styling to qualify for final awards.",
      icon: Shield
    },
    {
      step: "04",
      name: "LIVE DEMO & PEER SCRUTINY",
      title: "Defend Before Engineering Jury",
      desc: "Top squads demo live systems on stage, undergoing real-time chaos testing and technical Q&A with hiring CTOs and investors.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. HERO OVERVIEW                                          */}
      {/* ========================================================= */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Curriculum & Initiatives
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            Initiatives Designed to <br />
            <span className="italic text-[#FF2D5D]">Make You Build.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            From competitive 48-hour hackathon sprints to multi-week intensive cohort bootcamps, explore the practical tracks built for tomorrow's software engineers.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CORE PILLARS & INITIATIVES (INTERACTIVE DETAILED CARDS)*/}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
            EDUCATIONAL TRACKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
            Core Program Tracks
          </h2>
          <p className="text-[#4A5568] text-base font-light">
            Choose your learning velocity and participation format.
          </p>
        </div>

        <div className="space-y-12">
          {PROGRAMS_LIST.map((prog, idx) => (
            <div
              key={prog.id}
              id={prog.slug}
              className="bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden group hover:border-[#080B10] hover:shadow-2xl transition-all duration-300 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left 7 Cols */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#F4FAFB] text-[#FF2D5D] border border-[#DCE8EB] font-bold">
                      {prog.badge}
                    </span>
                    <span className="text-xs font-mono text-[#4A5568] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF2D5D]" />
                      {prog.duration}
                    </span>
                    <span className="text-xs font-mono text-[#4A5568]">
                      Mode: <strong className="text-[#080B10] font-semibold">{prog.mode}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-sm font-mono text-[#FF2D5D] mt-1 font-bold">{prog.tagline}</p>
                  </div>

                  <p className="text-[#4A5568] text-base font-light leading-relaxed font-sans">
                    {prog.description}
                  </p>

                  <div className="pt-2 font-sans space-y-1">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
                      Target Audience:
                    </p>
                    <p className="text-sm text-[#080B10] font-medium">{prog.audience}</p>
                  </div>
                </div>

                {/* Right 5 Cols: Features & Action */}
                <div className="lg:col-span-5 bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full font-sans">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
                      Program Highlights:
                    </h4>
                    <div className="space-y-2.5">
                      {prog.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A5568]">
                          <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DCE8EB] flex items-center justify-between">
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#080B10] text-[#61C8D4] border border-[#263640] hover:border-[#61C8D4] transition-all shadow-md"
                    >
                      <span>View Sprints</span>
                      <ArrowUpRight className="w-4 h-4 text-[#61C8D4]" />
                    </Link>
                    <Link
                      to="/get-started"
                      className="text-xs font-mono uppercase tracking-widest text-[#4A5568] hover:text-[#080B10] transition-colors font-bold"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CURRICULUM & MENTORSHIP METHODOLOGY                    */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              ENGINEERING RIGOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              Our Mentorship & Deployment Methodology
            </h2>
            <p className="text-[#4A5568] text-base font-light">
              We enforce high production standards so your hackathon projects stand out to recruiters and venture scouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-[2rem] p-7 flex flex-col justify-between space-y-6 hover:border-[#080B10] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#FF2D5D]">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#080B10] text-[#61C8D4] flex items-center justify-center border border-[#263640]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
                        {step.name}
                      </h3>
                      <h4 className="text-lg font-serif font-medium text-[#080B10] mt-0.5">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#4A5568] leading-relaxed font-light font-sans">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE8EB] text-[11px] font-mono text-[#080B10] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#FF2D5D]" />
                    <span>Verified Production Gate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DIRECT ENROLMENT & PARTICIPATION CTA                   */}
      {/* ========================================================= */}
      <CTABanner
        title={
          <>
            Ready to step into <br />
            <span className="italic text-[#61C8D4]">your first active cohort?</span>
          </>
        }
        subtitle="Apply for upcoming hackathon tracks and intensive builder bootcamps."
        ctaText="ENROL IN PROGRAM"
        ctaLink="/get-started"
        badge="✦ REGISTRATION OPEN FOR 2026 COHORTS"
      />

    </div>
  );
}
