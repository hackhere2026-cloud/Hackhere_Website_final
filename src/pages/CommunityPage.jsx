// src/pages/CommunityPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, User } from "lucide-react";
import { communityFounders, communityTeams } from "../data/hackhereData";

// =========================================================================
// REUSABLE COMPONENTS
// =========================================================================

/**
 * Reusable Founder Card Component
 * Strictly displays: PHOTO, 01/02/03/04 slot, NAME, ROLE, LINKEDIN
 */
function FounderCard({ founder, index, isAsymmetricSecondary = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.0,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`group flex flex-col justify-between ${
        isAsymmetricSecondary ? "lg:mt-16" : ""
      }`}
    >
      {/* 1. PHOTO (Dominant Element with Overflow Hidden & Subtle Hover Scale) */}
      <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#111820] border-2 border-[#DCE8EB] group-hover:border-[#080B10] transition-all duration-500 shadow-sm">
        <img
          src={founder.image}
          alt={`${founder.name}, ${founder.role} at HackHere`}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* 2. NUMBER, NAME, ROLE, LINKEDIN */}
      <div className="pt-6 space-y-3 font-sans">
        <span className="text-xs font-mono text-[#FF2D5D] font-bold block tracking-widest">
          {founder.id}
        </span>

        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors duration-300">
            {founder.name}
          </h3>
          <p className="text-xs font-mono text-[#4A5568] uppercase tracking-wider mt-1 font-medium">
            {founder.role}
          </p>
        </div>

        <div className="pt-1">
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${founder.name} LinkedIn Profile`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#080B10] hover:text-[#FF2D5D] font-bold transition-all duration-300 group/link"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Reusable Team Member Card Component
 * Strictly displays: PHOTO / EMPTY PLACEHOLDER, and NAME ONLY
 */
function TeamMemberCard({ member, index, isTech = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group flex flex-col font-sans"
    >
      {/* 1. PHOTO (EMPTY PLACEHOLDER CONTAINER) */}
      <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F4FAFB] border-2 ${
        isTech ? "border-[#DCE8EB] group-hover:border-[#61C8D4]" : "border-[#DCE8EB] group-hover:border-[#080B10]"
      } transition-all duration-300 flex items-center justify-center shadow-sm`}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#8CA2AD] bg-[#EDF5F7]/50 group-hover:bg-[#EDF5F7] transition-colors">
            <div className="w-16 h-16 rounded-full bg-white border border-[#DCE8EB] flex items-center justify-center shadow-sm">
              <User className="w-8 h-8 text-[#8CA2AD] stroke-[1.5]" />
            </div>
          </div>
        )}
        {isTech && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#080B10]/80 backdrop-blur-md border border-[#263640] text-[9px] font-mono text-[#61C8D4]">
            SYS::0{index + 1}
          </div>
        )}
      </div>

      {/* 2. ONLY NAME */}
      <div className="pt-3.5 text-center sm:text-left">
        <h4 className="text-base sm:text-lg font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors duration-300 tracking-wide">
          {member.name}
        </h4>
      </div>
    </motion.div>
  );
}

// =========================================================================
// MAIN COMMUNITY PAGE
// =========================================================================
export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const categories = ["ALL", "TECHNICAL", "DESIGN", "FIELD WORK"];

  const handleScrollToTeam = () => {
    const el = document.getElementById("meet-our-team");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. COMMUNITY HERO (Editorial Asymmetric Layout)           */}
      {/* ========================================================= */}
      <section className="py-16 md:py-28 max-w-[1400px] w-full mx-auto px-6 sm:px-12 border-b border-[#DCE8EB]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
              <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
              COMMUNITY
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.98] text-[#080B10] font-serif uppercase">
              THE PEOPLE <br />
              <span className="italic font-serif normal-case text-[#FF2D5D]">behind</span> <br />
              HACKHERE.
            </h1>

            <p className="text-base sm:text-xl text-[#4A5568] leading-relaxed max-w-xl font-light font-sans">
              HackHere is powered by people who come together to learn, build, create, collaborate, and make every experience possible.
            </p>

            <div className="pt-2">
              <button
                onClick={handleScrollToTeam}
                className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-[#080B10] hover:text-[#FF2D5D] transition-all group"
              >
                <span className="border-b-2 border-[#080B10] group-hover:border-[#FF2D5D] pb-1">
                  MEET THE PEOPLE
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Hero Image (Authentic HackHere Community Photography) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#111820] border-2 border-[#DCE8EB] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="HackHere Community Builders collaborating at live hackathon"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white font-sans">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#61C8D4] font-bold block mb-1">
                  COMMUNITY IN ACTION
                </span>
                <p className="text-xs text-[#DCE8EB] font-light">
                  3,500+ builders, creators, mentors, and organizers across India.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THE FOUNDERS (Exactly 4 Founder Slots)                 */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold block">
            01 / LEADERSHIP
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#080B10] tracking-tight uppercase">
            THE FOUNDERS
          </h2>
          <p className="text-base sm:text-lg text-[#4A5568] font-light font-sans leading-relaxed">
            The people who started HackHere and shaped the community from the very beginning.
          </p>
        </div>

        {/* 4 Founders Asymmetric Desktop Grid / Single Column Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {communityFounders.map((founder, idx) => (
            <FounderCard
              key={founder.id}
              founder={founder}
              index={idx}
              isAsymmetricSecondary={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MEET OUR TEAM                                          */}
      {/* ========================================================= */}
      <section id="meet-our-team" className="py-24 border-t border-[#DCE8EB] bg-white w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          
          {/* Section Header & Category Filter Navigation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#DCE8EB]">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold block">
                02 / THE SQUADS
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#080B10] tracking-tight uppercase">
                MEET <br />
                <span className="italic normal-case text-[#FF2D5D]">our</span> TEAM
              </h2>
              <p className="text-base text-[#4A5568] font-light font-sans">
                Different skills. Different perspectives. One community.
              </p>
            </div>

            {/* Category Navigation with Subtle Understated Active Line */}
            <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 md:pb-0 font-mono text-xs uppercase tracking-widest font-bold">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`relative py-2 transition-colors duration-300 ${
                      isActive ? "text-[#080B10]" : "text-[#4A5568] hover:text-[#080B10]"
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#080B10]"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================= */}
          {/* 4. TEAM CATEGORIES (Smooth Transitioning Content)       */}
          {/* ======================================================= */}
          <AnimatePresence mode="wait">
            
            {/* TAB: ALL (Shows TECHNICAL + DESIGN + FIELD WORK) */}
            {activeTab === "ALL" && (
              <motion.div
                key="tab-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-24"
              >
                {/* A. TECHNICAL TEAM */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                        TECHNICAL TEAM
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-2.5 py-0.5 rounded bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                        THE BUILDERS
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                      {communityTeams.tech.length} MEMBERS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {communityTeams.tech.map((m, idx) => (
                      <TeamMemberCard key={m.id} member={m} index={idx} isTech={true} />
                    ))}
                  </div>
                </div>

                {/* B. DESIGN TEAM */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                      DESIGN TEAM
                    </h3>
                    <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                      {communityTeams.design.length} MEMBERS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {communityTeams.design.map((m, idx) => (
                      <TeamMemberCard key={m.id} member={m} index={idx} />
                    ))}
                  </div>
                </div>

                {/* C. FIELD WORK TEAM */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                        FIELD WORK TEAM
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-2.5 py-0.5 rounded bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                        OPERATIONS & SPRINT ON-GROUND
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                      {communityTeams.fieldWork.length} MEMBERS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                    {communityTeams.fieldWork.map((m, idx) => (
                      <TeamMemberCard key={m.id} member={m} index={idx} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: TECHNICAL */}
            {activeTab === "TECHNICAL" && (
              <motion.div
                key="tab-technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                      TECHNICAL TEAM
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-2.5 py-0.5 rounded bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                      THE BUILDERS
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                    {communityTeams.tech.length} MEMBERS
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {communityTeams.tech.map((m, idx) => (
                    <TeamMemberCard key={m.id} member={m} index={idx} isTech={true} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: DESIGN */}
            {activeTab === "DESIGN" && (
              <motion.div
                key="tab-design"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                    DESIGN TEAM
                  </h3>
                  <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                    {communityTeams.design.length} MEMBERS
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {communityTeams.design.map((m, idx) => (
                    <TeamMemberCard key={m.id} member={m} index={idx} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: FIELD WORK */}
            {activeTab === "FIELD WORK" && (
              <motion.div
                key="tab-fieldwork"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] uppercase tracking-wider">
                      FIELD WORK TEAM
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-2.5 py-0.5 rounded bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                      OPERATIONS & SPRINT ON-GROUND
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                    {communityTeams.fieldWork.length} MEMBERS
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                  {communityTeams.fieldWork.map((m, idx) => (
                    <TeamMemberCard key={m.id} member={m} index={idx} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FINAL COMMUNITY CTA                                    */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#F4FAFB] max-w-[1400px] w-full mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-10 sm:p-16 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl"
        >
          {/* Subtle Decorative Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#61C8D4]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111820] text-[#61C8D4] text-[10px] font-mono uppercase tracking-[0.25em] border border-[#263640] font-bold">
              <Sparkles className="w-3 h-3 text-[#61C8D4]" />
              COMMUNITY INVITATION
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.0] uppercase tracking-tight">
              THERE'S <br />
              ROOM FOR <br />
              <span className="italic text-[#61C8D4] normal-case">you</span> HERE.
            </h2>

            <p className="text-base sm:text-lg text-[#8CA2AD] font-light font-sans leading-relaxed">
              Join the people building the next HackHere experience.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-3 px-8 py-4.5 rounded-full bg-[#61C8D4] text-[#080B10] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl group"
            >
              <span>GET INVOLVED</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
