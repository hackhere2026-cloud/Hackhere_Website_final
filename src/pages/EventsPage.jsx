// src/pages/EventsPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, MapPin, Sparkles, Filter, Users, ArrowRight,
  CheckCircle2, Clock, Trophy, ArrowUpRight, Search, Zap,
  Check, Layers, BookOpen, Code2
} from "lucide-react";
import { eventsData } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function EventsPage() {
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const programCategories = [
    "All",
    "Hackathon",
    "Bootcamp",
    "Tech Talk",
    "Webinar",
    "Tech Workshops"
  ];

  const completedHackathons = eventsData.filter((e) => e.category === "completed");
  const upcomingHackathons = eventsData.filter((e) => e.category === "upcoming-hackathon");
  const bootcampsList = eventsData.filter((e) => e.type === "Bootcamp" || e.category?.includes("bootcamp"));

  // Filtered lists if search query or program filter is entered
  const filterList = (list) => {
    return list.filter((e) => {
      const matchProgram =
        selectedProgram === "All" ||
        e.type?.toLowerCase() === selectedProgram.toLowerCase() ||
        (selectedProgram === "Hackathon" && e.type === "Hackathon") ||
        (selectedProgram === "Bootcamp" && e.type === "Bootcamp");

      if (!searchQuery.trim()) return matchProgram;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.tracks && e.tracks.some((t) => t.title.toLowerCase().includes(q)));

      return matchProgram && matchQuery;
    });
  };

  const filteredUpcoming = filterList(upcomingHackathons);
  const filteredCompleted = filterList(completedHackathons);
  const filteredBootcamps = filterList(bootcampsList);

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. HERO INTRO & SEARCH / FILTER BAR                       */}
      {/* ========================================================= */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Events & Programs Hub
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            Something Is <br />
            <span className="italic text-[#FF2D5D]">Always Happening.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Discover upcoming flagship hackathons, intensive cohort bootcamps, tech talks, webinars, coding sprints, and review past completed tournament outcomes.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-md mx-auto pt-4 relative font-sans">
            <Search className="w-4 h-4 text-[#4A5568] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hackathons, bootcamps, or tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#DCE8EB] rounded-full text-xs text-[#080B10] focus:outline-none focus:border-[#080B10] shadow-sm transition-colors"
            />
          </div>

          {/* PROGRAM FILTER CATEGORIES BAR */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 font-mono text-xs">
            {programCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedProgram(cat)}
                className={`px-4 py-2 rounded-full border transition-all uppercase tracking-wider font-bold ${
                  selectedProgram === cat
                    ? "bg-[#080B10] text-[#61C8D4] border-[#263640] shadow-md"
                    : "bg-white text-[#4A5568] border-[#DCE8EB] hover:border-[#080B10] hover:text-[#080B10]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION B: UPCOMING HACKATHONS                             */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 max-w-[1400px] w-full mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61C8D4] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
                SECTION B / LIVE & UPCOMING
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
              Upcoming Hackathons
            </h2>
          </div>
          <p className="text-xs font-mono text-[#4A5568]">
            REGISTRATION OPEN • UPCOMING FLAGSHIPS & SPRINT CHALLENGES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredUpcoming.map((event) => (
            <div
              key={event.id}
              className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#61C8D4] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#61C8D4] px-3.5 py-1 rounded-full bg-[#111820] border border-[#263640] font-bold">
                    {event.status}
                  </span>
                  <span className="text-xs font-mono text-[#61C8D4] font-bold">
                    {event.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-serif font-light text-white group-hover:text-[#61C8D4] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8CA2AD] mt-1 font-bold">{event.tagline}</p>
                </div>

                <p className="text-sm text-[#8CA2AD] font-light leading-relaxed font-sans">
                  {event.description}
                </p>

                {/* Stats / Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-[#8CA2AD]">
                  <div className="bg-[#111820] p-3 rounded-xl border border-[#263640]">
                    <span className="text-[10px] uppercase block">Date</span>
                    <span className="text-white font-bold">{event.date.split("-")[0]}</span>
                  </div>
                  <div className="bg-[#111820] p-3 rounded-xl border border-[#263640]">
                    <span className="text-[10px] uppercase block">Format</span>
                    <span className="text-white font-bold">{event.type}</span>
                  </div>
                  <div className="bg-[#111820] p-3 rounded-xl border border-[#263640] col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase block">Eligibility</span>
                    <span className="text-[#61C8D4] font-bold">All Builders</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-[#263640] flex flex-wrap items-center justify-between gap-4 font-sans">
                <Link
                  to={`/events/${event.id}`}
                  className="bg-[#61C8D4] text-[#080B10] hover:bg-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`/events/${event.id}`}
                  className="text-xs font-mono text-[#8CA2AD] hover:text-white transition-colors underline underline-offset-4 font-bold"
                >
                  View Challenge Domains & Rules →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION A: COMPLETED HACKATHONS (AIVENTRA & VORTEXA)      */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
                SECTION A / COMPLETED TOURNAMENTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
                Completed Hackathons
              </h2>
            </div>
            <p className="text-xs font-mono text-[#4A5568]">
              VIEW WINNERS, METRICS & PROJECT GALLERIES
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCompleted.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-2xl transition-all duration-300 group block"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF2D5D] px-3.5 py-1 rounded-full bg-white border border-[#DCE8EB] font-bold">
                      {event.date}
                    </span>
                    <span className="text-xs font-mono text-[#FF2D5D] font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Completed
                    </span>
                  </div>

                  <h3 className="text-3xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs font-mono text-[#FF2D5D] font-bold">
                    {event.tagline}
                  </p>

                  <p className="text-sm text-[#4A5568] font-light leading-relaxed font-sans">
                    {event.description}
                  </p>

                  {/* Summary Stats Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-[#4A5568]">
                    {event.stats.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-[#DCE8EB]">
                        <span className="text-[10px] uppercase text-[#4A5568] block">{s.label}</span>
                        <span className="text-[#080B10] font-bold text-sm">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE8EB] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    Explore Event Recap, Gallery & Winners →
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#080B10] text-[#61C8D4] flex items-center justify-center border border-[#263640] group-hover:border-[#61C8D4] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-[#61C8D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION C: TECHNICAL BOOTCAMPS & ACADEMIES                */}
      {/* ========================================================= */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] w-full mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              SECTION C / COHORT LEARNING
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
              Technical Bootcamps & Academies
            </h2>
          </div>
          <p className="text-xs font-mono text-[#4A5568]">
            STRUCTURED COHORTS • BLOCKCHAIN & AI CREDENTIALS • CODE REVIEWS
          </p>
        </div>

        <div className={`grid grid-cols-1 ${filteredBootcamps.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"} gap-8`}>
          {filteredBootcamps.map((bootcamp) => (
            <div
              key={bootcamp.id}
              className="bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF2D5D] px-3.5 py-1 rounded-full bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                    {bootcamp.type} • {bootcamp.status}
                  </span>
                  <span className="text-xs font-mono text-[#4A5568] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF2D5D]" />
                    {bootcamp.stats[0]?.value || "4-6 Weeks"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                  {bootcamp.title}
                </h3>

                <p className="text-xs font-mono text-[#FF2D5D] font-bold">
                  {bootcamp.tagline}
                </p>

                <p className="text-sm text-[#4A5568] font-light leading-relaxed font-sans">
                  {bootcamp.description}
                </p>

                {/* Curriculum Tracks */}
                <div className="space-y-2 pt-2 font-sans">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold block">
                    Curriculum Domains:
                  </span>
                  <div className="space-y-1.5">
                    {bootcamp.tracks.slice(0, 3).map((t, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-[#4A5568]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D5D] shrink-0 mt-0.5" />
                        <span><strong className="text-[#080B10] font-semibold">{t.title}:</strong> {t.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DCE8EB] flex items-center justify-between font-sans">
                <Link
                  to={`/events/${bootcamp.id}`}
                  className="bg-[#080B10] text-[#61C8D4] border border-[#263640] hover:border-[#61C8D4] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>{bootcamp.status === "Completed" ? "VIEW RECAP & CURRICULUM" : "VIEW CURRICULUM"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                {bootcamp.status !== "Completed" ? (
                  <Link
                    to="/get-started"
                    className="text-xs font-mono text-[#FF2D5D] font-bold hover:underline"
                  >
                    Enrol in Cohort →
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-[#4A5568] font-bold">
                    Cohort Concluded ✦
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Ready to test your code <br />
            <span className="italic text-[#61C8D4]">under real constraints?</span>
          </>
        }
        subtitle="Register for an upcoming sprint, form your squad, and build solutions that matter."
        ctaText="JOIN NEXT SPRINT"
        ctaLink="/get-started"
        badge="✦ REGISTRATION OPEN FOR ALL SQUADS"
      />

    </div>
  );
}
