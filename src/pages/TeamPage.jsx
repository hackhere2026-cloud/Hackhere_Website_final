// src/pages/TeamPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Heart, Users, ArrowRight, Sparkles, ArrowUpRight, User } from "lucide-react";
import { communityFounders, communityTeams } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* HERO */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Leadership & Squads
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-[#080B10] font-serif">
            The Team Behind <br />
            <span className="italic text-[#FF2D5D]">
              the Ecosystem.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Meet the founders, engineers, designers, and community coordinators organizing hackathons and creating opportunities for tomorrow's technology leaders.
          </p>
        </div>
      </section>

      {/* 1. THE FOUNDERS (4 FOUNDERS WITH ATTACHED PHOTOS) */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold block">
            01 / LEADERSHIP
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#080B10] tracking-tight uppercase">
            THE FOUNDERS
          </h2>
          <p className="text-base text-[#4A5568] font-light font-sans">
            The founding organizers who built HackHere and shaped the community from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFounders.map((f) => (
            <div
              key={f.id}
              className="group flex flex-col justify-between bg-white p-6 rounded-[2rem] border-2 border-[#DCE8EB] hover:border-[#080B10] transition-all duration-300 shadow-sm"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#111820] border border-[#DCE8EB]">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-5 space-y-2 font-sans">
                <span className="text-xs font-mono text-[#FF2D5D] font-bold">{f.id}</span>
                <h3 className="text-2xl font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                  {f.name}
                </h3>
                <p className="text-xs font-mono text-[#4A5568] uppercase tracking-wider">{f.role}</p>

                <div className="pt-2">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#080B10] hover:text-[#FF2D5D] font-bold transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. THE SQUADS (EXACTLY 2 PHOTOS UNDER EACH TEAM) */}
      <section className="py-24 border-t border-[#DCE8EB] bg-white w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold block">
              02 / OUR TEAMS
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#080B10] tracking-tight uppercase">
              MEET OUR SQUADS
            </h2>
            <p className="text-base text-[#4A5568] font-light font-sans">
              Dedicated leads driving each core function across Technical, Design, and Field Work teams.
            </p>
          </div>

          <div className="space-y-16">
            {/* TECHNICAL */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-3">
                <h3 className="text-2xl font-serif font-light text-[#080B10]">TECHNICAL TEAM</h3>
                <span className="text-xs font-mono text-[#FF2D5D] font-bold">{communityTeams.tech.length} MEMBERS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityTeams.tech.map((m) => (
                  <div key={m.id} className="group bg-[#F4FAFB] p-5 rounded-2xl border border-[#DCE8EB] hover:border-[#080B10] transition-all">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[#EDF5F7]/50 border border-[#DCE8EB] flex items-center justify-center">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white border border-[#DCE8EB] flex items-center justify-center text-[#8CA2AD] shadow-sm">
                          <User className="w-8 h-8 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-serif font-medium text-[#080B10] tracking-wide">{m.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* DESIGN */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-3">
                <h3 className="text-2xl font-serif font-light text-[#080B10]">DESIGN TEAM</h3>
                <span className="text-xs font-mono text-[#FF2D5D] font-bold">{communityTeams.design.length} MEMBERS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityTeams.design.map((m) => (
                  <div key={m.id} className="group bg-[#F4FAFB] p-5 rounded-2xl border border-[#DCE8EB] hover:border-[#080B10] transition-all">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[#EDF5F7]/50 border border-[#DCE8EB] flex items-center justify-center">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white border border-[#DCE8EB] flex items-center justify-center text-[#8CA2AD] shadow-sm">
                          <User className="w-8 h-8 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-serif font-medium text-[#080B10] tracking-wide">{m.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* FIELD WORK */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE8EB] pb-3">
                <h3 className="text-2xl font-serif font-light text-[#080B10]">FIELD WORK TEAM</h3>
                <span className="text-xs font-mono text-[#FF2D5D] font-bold">{communityTeams.fieldWork.length} MEMBERS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityTeams.fieldWork.map((m) => (
                  <div key={m.id} className="group bg-[#F4FAFB] p-5 rounded-2xl border border-[#DCE8EB] hover:border-[#080B10] transition-all">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[#EDF5F7]/50 border border-[#DCE8EB] flex items-center justify-center">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white border border-[#DCE8EB] flex items-center justify-center text-[#8CA2AD] shadow-sm">
                          <User className="w-8 h-8 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-serif font-medium text-[#080B10] tracking-wide">{m.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REUSABLE CTA */}
      <CTABanner
        title={
          <>
            Want to help us organize <br />
            <span className="italic text-[#61C8D4]">HackHere experiences?</span>
          </>
        }
        subtitle="We are always looking for passionate campus chapter leads, workshop coordinators, content creators, and event managers."
        ctaText="Apply as Volunteer"
        ctaLink="/get-started?role=volunteer"
        badge="✦ JOIN THE ORGANIZING CREW"
      />
    </div>
  );
}
