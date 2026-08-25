// src/pages/EventDetailPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Trophy, Users, CheckCircle2, Clock,
  ArrowRight, ShieldCheck, HelpCircle, Star, Sparkles, Code2,
  FileCheck, Award, ArrowUpRight, Check, X, Send, ChevronRight
} from "lucide-react";
import { eventsData, projectsData } from "../data/hackhereData";
import { toast } from "react-hot-toast";
import CTABanner from "../components/CTABanner";

export default function EventDetailPage() {
  const { id } = useParams();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: "3",
    leadName: "",
    leadEmail: "",
    selectedTrack: "",
    githubHandle: ""
  });
  const [loading, setLoading] = useState(false);

  // Find event or fallback to first event
  const event = eventsData.find((e) => e.id === id) || eventsData[0];

  // Associated winning projects
  const winnerProjects = projectsData.filter((p) =>
    event.winnerProjectIds?.includes(p.id) || p.eventId === event.id
  );

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegistered(true);
      setRegisterModalOpen(false);
      toast.success(`Registered squad for ${event.title}! Verification email dispatched.`);
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. EVENT HERO (BANNER IMAGE, BADGES & ACTIONS)            */}
      {/* ========================================================= */}
      <section className="py-12 md:py-16 border-b border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#4A5568]">
            <Link to="/events" className="hover:text-[#080B10] transition-colors">EVENTS</Link>
            <span>/</span>
            <span className="text-[#080B10] font-bold uppercase">{event.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#080B10] text-[#61C8D4] border border-[#263640] font-bold inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#61C8D4]" />
                  {event.type}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1 rounded-full bg-white text-[#FF2D5D] border border-[#DCE8EB] font-bold">
                  {event.status}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#080B10] tracking-tight leading-tight">
                {event.title}
              </h1>

              <p className="text-base sm:text-xl font-light text-[#4A5568] leading-relaxed max-w-3xl font-sans">
                {event.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#4A5568] pt-2">
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#DCE8EB] shadow-sm">
                  <Calendar className="w-4 h-4 text-[#FF2D5D]" />
                  {event.date}
                </span>
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#DCE8EB] shadow-sm">
                  <MapPin className="w-4 h-4 text-[#FF2D5D]" />
                  {event.location}
                </span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-end font-sans">
              {event.status !== "Completed" ? (
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="bg-[#080B10] text-[#61C8D4] hover:border-[#61C8D4] border border-[#263640] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02]"
                >
                  <span>{registered ? "SQUAD REGISTERED (EDIT)" : "REGISTER SQUAD"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="bg-white border-2 border-[#DCE8EB] p-4 rounded-2xl text-center space-y-1">
                  <span className="text-xs font-mono font-bold text-[#FF2D5D] uppercase block">
                    Tournament Completed
                  </span>
                  <p className="text-xs text-[#4A5568]">Review final projects, galleries and metrics below.</p>
                </div>
              )}
            </div>
          </div>

          {/* High-Res Hero Banner Image */}
          {event.heroImage && (
            <div className="relative h-[320px] sm:h-[420px] rounded-[2.5rem] overflow-hidden border-2 border-[#263640] shadow-2xl">
              <img
                src={event.heroImage}
                alt={event.title}
                className="w-full h-full object-cover filter contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent" />
            </div>
          )}

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EVENT STATISTICS GRID (ANIMATED / KEY COUNTERS)        */}
      {/* ========================================================= */}
      <section className="py-16 max-w-[1400px] w-full mx-auto px-6 sm:px-12">
        <div className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#61C8D4] font-bold">
              TOURNAMENT BENCHMARKS
            </span>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {event.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-serif font-light text-[#61C8D4]">
                    {stat.value}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#8CA2AD]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ABOUT & PROBLEM STATEMENTS DEEP-DIVE                   */}
      {/* ========================================================= */}
      <section className="py-16 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              ABOUT THE SPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#080B10]">
              The Challenge Context
            </h2>
            <div className="space-y-4 text-[#4A5568] text-base leading-relaxed font-light">
              <p>{event.aboutLong || event.description}</p>
              <p>
                Builders receive continuous 1-on-1 sprint checkpoints with principal engineers, API starter kits, compute credits, and deployment sandboxes to turn concepts into verified code.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border-2 border-[#DCE8EB] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF2D5D] font-bold">
              Tournament Rules
            </h3>
            <ul className="space-y-2.5 text-xs text-[#4A5568] font-light">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
                <span>Squads range from 2 to 4 registered builders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
                <span>All code must be committed to public GitHub repos during sprint hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
                <span>Working live deployments & 2-min demo videos required.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
                <span>Evaluated on technical depth, problem-solution fit, and UI finish.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. TRACKS GRID                                            */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              CHALLENGE FOCUS AREAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              Tournament Tracks
            </h2>
            <p className="text-[#4A5568] text-base font-light">
              Choose an official track or propose a creative solution in open innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.tracks.map((track, idx) => (
              <div
                key={idx}
                className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-[2rem] p-8 space-y-3 hover:border-[#080B10] hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF2D5D]">
                    TRACK 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#4A5568] font-bold px-2 py-0.5 rounded bg-white border border-[#DCE8EB]">
                    Active Track
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5568] font-light leading-relaxed font-sans">
                  {track.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. HOURLY AGENDA / INTERACTIVE TIMELINE                   */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
            TIMELINE & RUN OF SHOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
            Hourly Agenda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {event.agenda?.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#DCE8EB] rounded-2xl p-6 space-y-3 shadow-sm hover:border-[#080B10] transition-all"
            >
              <span className="text-xs font-mono text-[#FF2D5D] font-bold bg-[#F4FAFB] px-2.5 py-1 rounded-md border border-[#DCE8EB] inline-block">
                {step.time}
              </span>
              <h4 className="text-lg font-serif font-medium text-[#080B10]">
                {step.title}
              </h4>
              <p className="text-xs text-[#4A5568] font-light leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PRIZES & AWARDS (GOLD HIGHLIGHT CARDS)                 */}
      {/* ========================================================= */}
      {event.prizes && event.prizes.length > 0 && (
        <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
                REWARDS & GRANTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
                Prizes & Awards
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {event.prizes.map((prize, idx) => (
                <div
                  key={idx}
                  className={`rounded-[2rem] p-8 space-y-4 border-2 transition-all shadow-md ${
                    idx === 0
                      ? "bg-[#080B10] text-white border-[#61C8D4] shadow-2xl"
                      : "bg-[#F4FAFB] text-[#080B10] border-[#DCE8EB]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase tracking-wider font-bold ${idx === 0 ? "text-[#61C8D4]" : "text-[#FF2D5D]"}`}>
                      {prize.badge || `Prize 0${idx + 1}`}
                    </span>
                    <Trophy className={`w-5 h-5 ${idx === 0 ? "text-[#61C8D4]" : "text-[#FF2D5D]"}`} />
                  </div>
                  <h3 className="text-xl font-serif font-medium">{prize.title}</h3>
                  <p className={`text-3xl sm:text-4xl font-serif font-light ${idx === 0 ? "text-[#61C8D4]" : "text-[#080B10]"}`}>
                    {prize.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 7. CHIEF GUESTS, JUDGES & MENTORS (LARGE PORTRAIT CARDS)  */}
      {/* ========================================================= */}
      {event.chiefGuests && event.chiefGuests.length > 0 && (
        <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              EVALUATORS & GUESTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              Chief Guests & Judges
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.chiefGuests.map((guest, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#DCE8EB] rounded-[2rem] overflow-hidden hover:border-[#080B10] hover:shadow-xl transition-all group"
              >
                <div className="h-64 overflow-hidden bg-[#080B10]">
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-1">
                  <h4 className="text-xl font-serif font-medium text-[#080B10]">{guest.name}</h4>
                  <p className="text-xs font-mono text-[#FF2D5D] font-bold">{guest.title}</p>
                  <p className="text-xs text-[#4A5568]">{guest.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 8. SPONSOR SHOWCASE                                       */}
      {/* ========================================================= */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="py-20 bg-white border-y border-[#DCE8EB] w-full">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-8 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A5568] font-bold">
              EVENT SPONSORS & INFRASTRUCTURE PARTNERS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {event.sponsors.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F4FAFB] border border-[#DCE8EB] space-y-1"
                >
                  <p className="font-serif text-lg font-bold text-[#080B10]">{sp.name}</p>
                  <span className="text-[11px] font-mono uppercase text-[#FF2D5D] font-bold">{sp.tier}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 9. CINEMATIC EVENT GALLERY                                */}
      {/* ========================================================= */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
              PHOTO ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
              Event Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="h-64 rounded-2xl overflow-hidden border-2 border-[#DCE8EB] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={imgUrl}
                  alt={`Moment ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 10. WINNERS & PROJECT OUTCOMES (LINKED TO /showcase/:id)  */}
      {/* ========================================================= */}
      {winnerProjects.length > 0 && (
        <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
                TOURNAMENT OUTCOMES
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
                Featured Winning Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {winnerProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-[2rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-2xl transition-all group"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-3 py-1 rounded-full bg-white border border-[#DCE8EB] font-bold">
                      {proj.event}
                    </span>
                    <h3 className="text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed font-light font-sans">
                      {proj.solution}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DCE8EB] flex items-center justify-between">
                    <Link
                      to={`/showcase/${proj.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#080B10] hover:text-[#FF2D5D]"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* REGISTRATION MODAL POPUP                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {registerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2rem] max-w-lg w-full p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#111820] text-[#8CA2AD] hover:text-white hover:bg-[#263640] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#61C8D4] font-bold">
                  SQUAD APPLICATION
                </span>
                <h3 className="text-2xl font-serif font-light text-white">
                  Register for {event.title}
                </h3>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">Squad Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Team NeuroPulse"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">Squad Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4]"
                    >
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">Selected Track</label>
                    <select
                      value={formData.selectedTrack}
                      onChange={(e) => setFormData({ ...formData, selectedTrack: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4]"
                    >
                      {event.tracks?.map((t, idx) => (
                        <option key={idx} value={t.title}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">Lead Email</label>
                  <input
                    required
                    type="email"
                    placeholder="leader@college.edu"
                    value={formData.leadEmail}
                    onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#61C8D4] text-[#080B10] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {loading ? "Registering Squad..." : "SUBMIT REGISTRATION"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Ready to ship software <br />
            <span className="italic text-[#61C8D4]">at {event.title}?</span>
          </>
        }
        subtitle="Claim your spot, connect with mentors, and compete for verified badges and cash awards."
        ctaText={event.status !== "Completed" ? "REGISTER SQUAD" : "EXPLORE ALL EVENTS"}
        ctaLink={event.status !== "Completed" ? "#" : "/events"}
        badge="✦ REGISTRATION PASS"
      />

    </div>
  );
}
