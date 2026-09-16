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
      name: "UNDERSTAND",
      title: "Problem & Domain Discovery",
      desc: "Participants begin by understanding the challenge, technology domain and expected outcome before deciding what to build.",
      check: "Define the Problem",
      icon: Terminal
    },
    {
      step: "02",
      name: "BUILD",
      title: "Hands-on Development",
      desc: "Participants transform ideas into working prototypes through focused development, experimentation and collaboration.",
      check: "Turn Ideas Into Solutions",
      icon: GitBranch
    },
    {
      step: "03",
      name: "MENTOR & VALIDATE",
      title: "Expert Feedback & Evaluation",
      desc: "Mentors, jury members and industry professionals provide feedback on technical approach, practicality, innovation and presentation.",
      check: "Improve Through Feedback",
      icon: Shield
    },
    {
      step: "04",
      name: "PRESENT & CONNECT",
      title: "Demonstration & Opportunity",
      desc: "Teams present their solutions, receive industry exposure and may unlock prizes, internships, technology credits, mentorship or other partner opportunities.",
      check: "Build Beyond the Event",
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
            ✦ Programs & Initiatives
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            Programs Designed to <br />
            <span className="italic text-[#FF2D5D]">Turn Learning Into Action.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-3xl mx-auto font-light font-sans">
            From national-level hackathons and hands-on bootcamps to workshops, webinars and industry-led technical sessions, HackHere creates practical environments where students learn, build, collaborate and gain meaningful industry exposure.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CORE PILLARS & INITIATIVES (INTERACTIVE DETAILED CARDS)*/}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
            PROGRAM FORMATS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
            Explore Our Programs
          </h2>
          <p className="text-[#4A5568] text-base font-light">
            Different formats. One objective — practical learning through real technology, collaboration and industry exposure.
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
                      <span>Explore Events</span>
                      <ArrowUpRight className="w-4 h-4 text-[#61C8D4]" />
                    </Link>
                    <Link
                      to="/get-started"
                      className="text-xs font-mono uppercase tracking-widest text-[#4A5568] hover:text-[#080B10] transition-colors font-bold"
                    >
                      Get Started →
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. METHODOLOGY SECTION                                    */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              From Idea to Outcome
            </h2>
            <p className="text-[#4A5568] text-base font-light">
              HackHere programs are structured to move participants beyond passive learning — from understanding a problem to building, validating and presenting a practical solution.
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
                    <span>✓ {step.check}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DIRECT PARTICIPATION CTA                               */}
      {/* ========================================================= */}
      <CTABanner
        title={
          <>
            Ready to participate in <br />
            <span className="italic text-[#61C8D4]">our next initiative?</span>
          </>
        }
        subtitle="Explore upcoming hackathons, bootcamps, workshops and technical sessions."
        ctaText="EXPLORE PROGRAMS"
        ctaLink="/events"
        badge="✦ EXPLORE UPCOMING PROGRAMS"
      />

    </div>
  );
}
