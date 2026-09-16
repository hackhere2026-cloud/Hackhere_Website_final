// src/pages/ProjectDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Github, ExternalLink, ArrowLeft, ArrowUpRight, CheckCircle2,
  Sparkles, Trophy, Calendar, Users, Layers, ShieldCheck, Code2
} from "lucide-react";
import { projectsData, eventsData } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = projectsData.find((p) => p.id === projectId) || projectsData[0];
  const relatedEvent = eventsData.find((e) => e.id === project.eventId);

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. PROJECT HERO                                           */}
      {/* ========================================================= */}
      <section className="py-12 border-b border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#4A5568]">
            <Link to="/showcase" className="hover:text-[#080B10] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>SHOWCASE</span>
            </Link>
            <span>/</span>
            <span className="text-[#080B10] font-bold uppercase">{project.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#080B10] text-[#61C8D4] border border-[#263640] font-bold inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#61C8D4]" />
                  {project.badge || project.event}
                </span>
                <span className="text-xs font-mono text-[#FF2D5D] font-bold bg-white px-3 py-1 rounded-full border border-[#DCE8EB] uppercase tracking-wider">
                  {project.topRightBadge || "Verified Production Outcome"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#080B10] tracking-tight leading-tight">
                {project.name}
              </h1>

              <p className="text-base sm:text-xl font-light text-[#4A5568] leading-relaxed max-w-3xl font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Direct Action CTAs */}
            <div className="lg:col-span-4 flex flex-wrap gap-3 justify-start lg:justify-end font-sans">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#080B10] text-[#61C8D4] border border-[#263640] hover:border-[#61C8D4] px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <span>LIVE DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-[#080B10] border-2 border-[#DCE8EB] hover:border-[#080B10] px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THE PROBLEM VS THE SOLUTION                            */}
      {/* ========================================================= */}
      <section className="py-20 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* The Problem */}
          <div className="bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 space-y-4 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF7B7B] font-bold block">
              THE PROBLEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10]">
              The Core Friction
            </h2>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed font-light">
              {project.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-10 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#61C8D4] font-bold block">
                THE SOLUTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Architectural Approach
              </h2>
              <p className="text-sm sm:text-base text-[#8CA2AD] leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2.5 EXPANDED CASE STUDY SECTIONS (EVALEDGE ARCHITECTURE)  */}
      {/* ========================================================= */}
      {project.caseStudy && (
        <section className="py-20 bg-white border-y border-[#DCE8EB] w-full font-sans">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-mono font-bold uppercase tracking-widest border border-[#263640]">
                <Sparkles className="w-3 h-3 text-[#61C8D4]" />
                System Deep-Dive
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
                Platform Architecture & Integrity Engine
              </h2>
              <p className="text-sm sm:text-base text-[#4A5568] font-light leading-relaxed">
                A unified examination workflow engineered with multi-modal behavioral sensors, automated evaluation rubrics, and tamper-resistant audit trails.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 1. What EvalEdge Does */}
              <div className="bg-[#F4FAFB] border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-[2rem] p-8 sm:p-10 space-y-5 transition-all duration-300 group shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#080B10] text-[#61C8D4] flex items-center justify-center border border-[#263640]">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2D5D]">
                    EXAMINATION WORKFLOW
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    What {project.name} Does
                  </h3>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed font-light">
                  {project.caseStudy.whatItDoes}
                </p>
                <div className="pt-4 border-t border-[#DCE8EB] flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Exam Creation Studio
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Hardware Pre-flight
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Controlled Fullscreen
                  </span>
                </div>
              </div>

              {/* 2. Integrity Engine */}
              <div className="bg-[#F4FAFB] border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-[2rem] p-8 sm:p-10 space-y-5 transition-all duration-300 group shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#080B10] text-[#FF2D5D] flex items-center justify-center border border-[#263640]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2D5D]">
                    MULTI-MODAL BEHAVIORAL SENSORS
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    Integrity Engine
                  </h3>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed font-light">
                  {project.caseStudy.integrityEngine}
                </p>
                <div className="pt-4 border-t border-[#DCE8EB] flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Tab-Switch Sensor
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Gaze & Eye Tracker
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Audio Anomaly Engine
                  </span>
                </div>
              </div>

              {/* 3. Intelligent Evaluation */}
              <div className="bg-[#F4FAFB] border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-[2rem] p-8 sm:p-10 space-y-5 transition-all duration-300 group shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#080B10] text-[#61C8D4] flex items-center justify-center border border-[#263640]">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2D5D]">
                    AI & HYBRID SCORING
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    Intelligent Evaluation
                  </h3>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed font-light">
                  {project.caseStudy.intelligentEvaluation}
                </p>
                <div className="pt-4 border-t border-[#DCE8EB] flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Instant Objective Grading
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    AI Descriptive Rubrics
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Faculty Review Pipeline
                  </span>
                </div>
              </div>

              {/* 4. Integrity Receipt */}
              <div className="bg-[#F4FAFB] border-2 border-[#DCE8EB] hover:border-[#080B10] rounded-[2rem] p-8 sm:p-10 space-y-5 transition-all duration-300 group shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#080B10] text-[#FF7B7B] flex items-center justify-center border border-[#263640]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2D5D]">
                    VERIFIABLE AUDIT RECORD
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    Integrity Receipt
                  </h3>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed font-light">
                  {project.caseStudy.integrityReceipt}
                </p>
                <div className="pt-4 border-t border-[#DCE8EB] flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Cryptographic Proof
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Candidate Timeline Log
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-[#080B10] border border-[#DCE8EB]">
                    Audit-Ready Export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 3. MEASURABLE IMPACT                                      */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              VERIFIED METRICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#080B10]">
              Measurable Impact & Deployment Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.impact.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-2xl p-6 flex items-start gap-3 shadow-sm hover:border-[#080B10] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FF2D5D] shrink-0 mt-0.5" />
                <p className="text-sm text-[#080B10] font-medium leading-relaxed font-sans">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. TECH STACK BADGES & TEAM ROSTER                        */}
      {/* ========================================================= */}
      <section className="py-20 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Tech Stack */}
          <div className="lg:col-span-5 space-y-6 bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold block">
              TECH STACK & ARCHITECTURE
            </span>
            <h3 className="text-2xl font-serif font-light text-[#080B10]">
              Core Technologies Used
            </h3>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4FAFB] text-[#080B10] font-mono text-xs border border-[#DCE8EB] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            {relatedEvent ? (
              <div className="pt-6 border-t border-[#DCE8EB] space-y-2">
                <span className="text-xs font-mono text-[#4A5568] block">Origin Event:</span>
                <Link
                  to={`/events/${relatedEvent.id}`}
                  className="text-sm font-serif font-bold text-[#FF2D5D] hover:underline flex items-center gap-1"
                >
                  <span>{relatedEvent.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="pt-6 border-t border-[#DCE8EB] space-y-2">
                <span className="text-xs font-mono text-[#4A5568] block">Classification:</span>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#080B10]">
                  <span className="w-2 h-2 rounded-full bg-[#61C8D4] animate-pulse inline-block" />
                  <span>HACKHERE NATIVE PRODUCT 2026</span>
                </div>
              </div>
            )}
          </div>

          {/* Team Roster */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold block">
                BUILDER SQUAD
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10]">
                Team Roster
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#DCE8EB] rounded-2xl p-6 flex items-center gap-4 hover:border-[#080B10] transition-colors shadow-sm"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border border-[#DCE8EB]"
                  />
                  <div>
                    <h4 className="text-lg font-serif font-medium text-[#080B10]">{member.name}</h4>
                    <p className="text-xs font-mono text-[#FF2D5D] font-bold">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PROJECT SCREENSHOT GALLERY                             */}
      {/* ========================================================= */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-20 bg-white border-y border-[#DCE8EB] w-full">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
                VISUAL PROOFS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#080B10]">
                Project Screenshots
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.screenshots.map((sUrl, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden border-2 border-[#DCE8EB] shadow-sm hover:shadow-xl transition-all"
                >
                  <img
                    src={sUrl}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Inspired to build <br />
            <span className="italic text-[#61C8D4]">the next breakthrough?</span>
          </>
        }
        subtitle="Join our upcoming sprint hackathons and bring your prototype to life with expert mentorship."
        ctaText="EXPLORE SPRINT EVENTS"
        ctaLink="/events"
        badge="✦ REGISTRATION OPEN"
      />

    </div>
  );
}
