// src/pages/HomePage.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Sparkles, Code2, Users,
  Trophy, Calendar, MapPin, CheckCircle2, ChevronRight,
  ExternalLink, Github, Flame
} from "lucide-react";
import {
  eventsData, projectsData, PROGRAMS_LIST,
  sponsorsByTier, IMPACT_STATS, HACKHERE_BRAND,
  MOMENTS_FROM_HACKHERE
} from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

// Codrops 3D Rotating On-Scroll Sponsors Component
function RotatingSponsorsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Codrops 3D rotating scroll animations
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -25]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const sponsors = [
    { name: "Elyon", image: "/sponsors/elyon.jpeg", tier: "Title Partner" },
    { name: "Journi", image: "/sponsors/jorni.jpeg", tier: "Gold Partner" },
    { name: "Maestrominds", image: "/sponsors/maestrominds.png", tier: "Innovation Partner" },
    { name: "Upto Skills", image: "/sponsors/UptoSkills.webp", tier: "Career Partner" },
    { name: "Featherless AI", image: "/sponsors/69f88c4b96ddf527f9d69148_Copy of Red Yellow Retro Vibrant 2025 Monthly Calendar (1280 x 720 px) (1200 x 630 px) (18).png", tier: "AI Compute Partner" },
    { name: "Rezylens", image: "/sponsors/Frame 5 (2).png", tier: "Ecosystem Partner" },
    { name: "Elro Tech", image: "/sponsors/WhatsApp Image 2026-07-28 at 6.46.09 PM.jpeg", tier: "Tech Partner" },
    { name: "Hashgraph Association", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.43 PM.jpeg", tier: "Web3 Partner" },
    { name: "Medo", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.44 PM (1).jpeg", tier: "Health Tech Partner" },
    { name: "Crystel", image: "/sponsors/WhatsApp Image 2026-07-28 at 9.42.44 PM.jpeg", tier: "Systems Partner" },
    { name: "Quantexa", image: "/sponsors/Quantexa poster (2).png", tier: "Flagship Partner" },
    { name: "Balveontech", image: "/sponsors/intern1.jpeg", tier: "Security Partner" },
    { name: "Honeycrib", image: "/sponsors/intern 2.jpeg", tier: "Community Partner" }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 sm:px-12 max-w-[1400px] w-full mx-auto text-center space-y-12 overflow-hidden">
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
          PARTNER & SPONSOR ECOSYSTEM
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
          Supported by Industry Leaders
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#4A5568] max-w-xl mx-auto uppercase tracking-wider">
          Empowering student builders with tools, infrastructure, grants & hiring opportunities
        </p>
      </div>

      <div className="[perspective:1200px] py-4">
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            opacity,
            transformStyle: "preserve-3d"
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-8 transition-transform duration-200 ease-out"
        >
          {sponsors.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, rotateY: 12, rotateX: -8, z: 35 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-3xl border-2 border-[#DCE8EB] bg-white p-4 shadow-md hover:shadow-2xl hover:border-[#080B10] transition-all duration-300 flex items-center justify-center h-32 sm:h-36 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#61C8D4]/10 via-transparent to-[#FF2D5D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <img
                  src={s.image}
                  alt={s.name}
                  className="max-h-full max-w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeKeyword, setActiveKeyword] = useState("BUILD");

  // Upcoming Flagship Hackathon preview
  const upcomingEvent = eventsData.find((e) => e.category === "upcoming-hackathon") || eventsData[2];

  // 2 Featured Showcase Projects
  const featuredProjects = projectsData.slice(0, 2);

  const keywordDetails = {
    LEARN: {
      tagline: "Bridging University Theory with Production Engineering",
      desc: "Interactive technical bootcamps, architectural masterclasses, and systems design workshops led by industry practitioners.",
      tag: "Foundational Mastery",
      color: "#FF2D5D"
    },
    BUILD: {
      tagline: "Turn Conceptual Ideas into Shipped, Scalable Products",
      desc: "Compete in high-intensity 24 to 48-hour hackathon sprints, solve industry challenge statements, and build a verified portfolio of production applications.",
      tag: "Hackathons & Live Sprints",
      color: "#61C8D4"
    },
    CONNECT: {
      tagline: "Find Your Technical Co-Founders and Industry Mentors",
      desc: "Join a network of 3,500+ ambitious student developers, principal AI scientists, engineering managers, and venture-backed tech startup founders.",
      tag: "Mentorship & Network",
      color: "#61C8D4"
    },
    GROW: {
      tagline: "Unlock Verifiable Credentials and Direct Career Fast-Tracks",
      desc: "Earn cryptographically signed project credentials, win prize grants from ₹12.5L+ prize pools, and fast-track into high-impact software engineering roles.",
      tag: "Careers & Grants",
      color: "#FF7B7B"
    }
  };

  const moments = MOMENTS_FROM_HACKHERE;

  return (
    <div className="bg-[#F4FAFB] text-[#080B10] font-sans min-h-screen selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION (EDITORIAL + CINEMATIC MEDIA COMPOSITION)  */}
      {/* ========================================================= */}
      <section className="relative min-h-[780px] lg:min-h-[820px] overflow-hidden border-b border-[#DCE8EB] bg-[#F4FAFB] px-6 py-14 sm:px-12 lg:py-0">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_50%_42%,rgba(97,200,212,0.20),transparent_43%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-grid-pattern-light [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FF2D5D]/[0.055] blur-3xl" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-[#FF2D5D]/10" />
        <div className="absolute -left-12 top-28 h-48 w-48 rounded-full border border-dashed border-[#FF2D5D]/20" />
        <div className="absolute right-[32%] top-8 hidden font-serif text-7xl italic text-[#61C8D4]/25 lg:block">01</div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 mx-auto max-w-[1500px] lg:h-[820px]">
          <motion.div variants={fadeInUp} className="mx-auto flex max-w-[720px] flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-[42%] lg:w-[720px] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF2D5D]/20 bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF2D5D] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" /> India’s builder-first tech community
            </span>
            <h1 className="font-serif text-5xl font-normal leading-[0.9] tracking-[-0.04em] text-[#080B10] sm:text-8xl lg:text-[7.25rem]">
              <span className="relative inline-block">
                Hack<span className="italic text-[#FF2D5D]">Here</span>
                <span className="absolute -bottom-3 left-[6%] h-[4px] w-[88%] rounded-full bg-gradient-to-r from-transparent via-[#61C8D4] to-transparent" />
              </span>
            </h1>
            <p className="mt-5 font-serif text-xl sm:text-2xl font-light text-[#080B10] tracking-tight">
              Learn together. Build for real. <span className="italic text-[#FF2D5D]">Grow without limits.</span>
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#526873] sm:text-lg">
              HackHere brings ambitious students, developers, and mentors together through practical programs, live hackathons, and opportunities that move careers forward.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/get-started" className="group inline-flex items-center gap-2 rounded-full bg-[#FF2D5D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,45,93,0.22)] transition hover:-translate-y-1 hover:bg-[#D91F49]">
                Join HackHere <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/events" className="group inline-flex items-center gap-2 rounded-full border border-[#263640] bg-white/75 px-7 py-3.5 text-sm font-semibold text-[#080B10] shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-[#61C8D4] hover:bg-white">
                Explore events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#667B85]">
              <span>Learn</span><span className="h-1 w-1 rounded-full bg-[#61C8D4]" />
              <span>Build</span><span className="h-1 w-1 rounded-full bg-[#FF2D5D]" />
              <span>Launch</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative mt-12 grid grid-cols-2 gap-4 lg:mt-0 lg:block">
            <div className="absolute -left-3 top-[132px] hidden h-[420px] w-[265px] -rotate-2 rounded-[2rem] bg-[#61C8D4] lg:block" />
            <div className="relative h-56 overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-2xl sm:h-72 lg:absolute lg:left-0 lg:top-28 lg:h-[420px] lg:w-[265px] lg:-rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
              <img src="/aiventra/aiventra-4.jpg" alt="HackHere community collaborating" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/35 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#080B10] backdrop-blur">Community / 2026</span>
            </div>
            <div className="absolute -right-3 top-5 hidden h-[240px] w-[300px] rotate-2 rounded-[2rem] bg-[#FF2D5D] lg:block" />
            <div className="relative h-56 overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-2xl sm:h-72 lg:absolute lg:right-0 lg:top-8 lg:h-[240px] lg:w-[300px] lg:rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
              <img src="/vortexa/vortexa-3.jpg" alt="HackHere builder presenting a project" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/25 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-[#080B10]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#61C8D4] backdrop-blur">Live mentorship</span>
            </div>

            <div className="absolute -bottom-5 left-3 rounded-xl bg-[#DDF8FB] px-4 py-3 text-xs font-semibold text-[#080B10] shadow-lg lg:bottom-auto lg:left-[190px] lg:top-[475px]">
              <span className="mr-2 text-base">⌁</span> Build production-ready projects
            </div>
            <div className="absolute -top-5 right-2 rounded-xl bg-[#DDF8FB] px-4 py-3 text-xs font-semibold text-[#080B10] shadow-lg lg:right-[55px] lg:top-[285px]">
              <span className="mr-2 text-base">✦</span> Learn from industry mentors
            </div>
          </motion.div>

          <div className="pointer-events-none absolute left-[245px] top-[490px] hidden h-20 w-16 rounded-br-[36px] border-b-2 border-r-2 border-[#61C8D4] lg:block" />
          <div className="pointer-events-none absolute right-[205px] top-[245px] hidden h-16 w-16 rounded-bl-[32px] border-b-2 border-l-2 border-[#61C8D4] lg:block" />

          <motion.div variants={fadeInUp} className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-[#D4E4E8] rounded-2xl border border-white bg-white/80 px-3 py-4 text-center shadow-[0_20px_60px_rgba(8,11,16,0.10)] ring-1 ring-[#DCE8EB] backdrop-blur-xl lg:absolute lg:bottom-7 lg:left-1/2 lg:mt-0 lg:w-[620px] lg:-translate-x-1/2">
            <div className="px-3"><Users className="mx-auto mb-1 h-4 w-4 text-[#FF2D5D]" /><strong className="block font-serif text-2xl text-[#080B10]">1000+</strong><span className="text-[10px] font-bold uppercase tracking-wider text-[#667B85]">Builders</span></div>
            <div className="px-3"><Code2 className="mx-auto mb-1 h-4 w-4 text-[#61C8D4]" /><strong className="block font-serif text-2xl text-[#080B10]">3+</strong><span className="text-[10px] font-bold uppercase tracking-wider text-[#667B85]">Live events</span></div>
            <div className="px-3"><Trophy className="mx-auto mb-1 h-4 w-4 text-[#FF2D5D]" /><strong className="block font-serif text-2xl text-[#080B10]">₹1.80L+</strong><span className="text-[10px] font-bold uppercase tracking-wider text-[#667B85]">Prize ecosystem</span></div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 2. QUICK GIST: "WHAT IS HACKHERE?" (HOVER-ACTIVE KEYWORDS) */}
      {/* ========================================================= */}
      <section className="py-20 border-y border-[#DCE8EB] bg-white w-full">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="w-full space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF2D5D] font-bold font-mono">
              WHAT IS HACKHERE?
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light leading-snug text-[#080B10] max-w-4xl">
              HackHere is a technology and innovation ecosystem designed to turn ambitious students into verified software creators. Hover below to explore our four pillars:
            </p>
          </div>

          {/* HOVER-ACTIVE KEYWORD SELECTOR */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
              {["LEARN", "BUILD", "CONNECT", "GROW"].map((kw) => (
                <button
                  key={kw}
                  onMouseEnter={() => setActiveKeyword(kw)}
                  onClick={() => setActiveKeyword(kw)}
                  className={`py-5 px-6 rounded-2xl border-2 text-center transition-all duration-300 w-full ${
                    activeKeyword === kw
                      ? "bg-[#080B10] text-[#61C8D4] border-[#263640] shadow-xl scale-[1.02]"
                      : "bg-[#F4FAFB] text-[#080B10] border-[#DCE8EB] hover:border-[#080B10]"
                  }`}
                >
                  <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wider block">
                    {kw}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest mt-1 block ${activeKeyword === kw ? "text-[#61C8D4]" : "text-[#4A5568]"}`}>
                    {keywordDetails[kw].tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC ACTIVE KEYWORD DETAIL CONTAINER */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKeyword}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-[#080B10] text-white border-2 border-[#263640] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#61C8D4] font-bold">
                    Pillar / {activeKeyword}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                    {keywordDetails[activeKeyword].tagline}
                  </h3>
                  <p className="text-sm sm:text-base text-[#8CA2AD] font-light leading-relaxed">
                    {keywordDetails[activeKeyword].desc}
                  </p>
                </div>

                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link
                    to="/vision"
                    className="inline-flex items-center gap-2 bg-[#61C8D4] text-[#080B10] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                  >
                    <span>Read Vision Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WHAT'S NEXT CARD (IMMEDIATE UPCOMING EVENT PREVIEW)    */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 max-w-[1400px] w-full mx-auto">
        <div className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 md:p-14 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Top Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#61C8D4] px-4 py-1.5 rounded-full bg-[#111820] border border-[#263640] font-bold inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
              WHAT'S NEXT AT HACKHERE
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#61C8D4] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61C8D4] animate-ping" />
              <span>{upcomingEvent.status}</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
                {upcomingEvent.title}
              </h2>
              <p className="text-[#8CA2AD] text-base font-light leading-relaxed max-w-2xl">
                {upcomingEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8CA2AD] pt-2">
                <span className="flex items-center gap-1.5 bg-[#111820] px-3.5 py-2 rounded-xl border border-[#263640] text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#61C8D4]" />
                  {upcomingEvent.date}
                </span>
                <span className="flex items-center gap-1.5 bg-[#111820] px-3.5 py-2 rounded-xl border border-[#263640] text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#61C8D4]" />
                  {upcomingEvent.location}
                </span>
                <span className="flex items-center gap-1.5 bg-[#111820] px-3.5 py-2 rounded-xl border border-[#263640] text-[#61C8D4] font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  Prize Pool: {upcomingEvent.prizePool || "₹30,000"}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={`/events/${upcomingEvent.id}`}
                className="bg-[#61C8D4] text-[#080B10] hover:bg-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 shadow-xl"
              >
                <span>REGISTER FOR EVENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/events"
                className="border border-[#263640] text-[#8CA2AD] hover:text-white hover:border-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors text-center"
              >
                VIEW ALL 2026 EVENTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MOMENTS FROM HACKHERE (CINEMATIC IMAGE SLIDER / STRIP) */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#FF2D5D] font-bold font-mono">
                PHOTO HIGHLIGHTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
                Moments from HackHere.
              </h2>
            </div>
            <p className="text-xs font-mono text-[#4A5568]">
              AIVENTRA • VORTEXA • WORKSHOPS • TEAM SPRINTS
            </p>
          </div>

          {/* HORIZONTAL CAROUSEL / MASONRY ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {moments.map((m, idx) => (
              <div
                key={idx}
                className="group relative h-72 rounded-2xl overflow-hidden border border-[#DCE8EB] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/90 via-[#080B10]/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#61C8D4] font-bold block">
                    {m.category}
                  </span>
                  <p className="text-xs font-serif font-medium line-clamp-2">{m.title}</p>
                  <span className="text-[10px] text-[#8CA2AD] font-mono block">{m.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PROGRAMS SNAPSHOT (CLEAN CATEGORY LIST WITH ARROWS)    */}
      {/* ========================================================= */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] w-full mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF2D5D] font-bold font-mono">
              INITIATIVES & DOMAINS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
              Programs Snapshot.
            </h2>
          </div>
          <Link
            to="/program"
            className="text-xs uppercase tracking-widest text-[#FF2D5D] font-bold hover:underline flex items-center gap-1.5 font-mono"
          >
            Explore Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {PROGRAMS_LIST.slice(0, 5).map((prog, idx) => (
            <Link
              key={prog.id}
              to={`/program#${prog.slug}`}
              className="bg-white border-2 border-[#DCE8EB] hover:border-[#080B10] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl group block"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono font-bold text-[#FF2D5D] bg-[#F4FAFB] px-3 py-1.5 rounded-lg border border-[#DCE8EB]">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5568] font-light mt-0.5 line-clamp-1 font-sans">
                    {prog.tagline} — {prog.description.slice(0, 95)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xs font-mono text-[#4A5568] hidden md:block">
                  {prog.duration} • {prog.mode}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#080B10] text-[#61C8D4] flex items-center justify-center border border-[#263640] group-hover:border-[#61C8D4] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#61C8D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SHOWCASE PREVIEW (2 LARGE FEATURED STUDENT PROJECTS)   */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-y border-[#DCE8EB] w-full">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#FF2D5D] font-bold font-mono">
                STUDENT INNOVATION
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10] mt-2">
                Built at HackHere.
              </h2>
            </div>
            <Link
              to="/showcase"
              className="text-xs uppercase tracking-widest text-[#FF2D5D] font-bold hover:underline flex items-center gap-1.5 font-mono"
            >
              View All Showcase Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#F4FAFB] border-2 border-[#DCE8EB] rounded-[2rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-2xl transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold border transition-colors ${
                      project.isProduct || project.badge?.includes("PRODUCT")
                        ? "bg-[#080B10] text-[#61C8D4] border-[#263640]"
                        : "text-[#FF2D5D] bg-white border-[#DCE8EB]"
                    }`}>
                      {project.badge || project.event}
                    </span>
                    <span className="text-xs font-mono text-[#FF2D5D] font-bold uppercase tracking-wider">
                      {project.topRightBadge || project.status || "Verified Prototype"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-xs font-serif italic text-[#4A5568]">
                    "{project.tagline}"
                  </p>

                  <div className="space-y-2 text-xs text-[#4A5568] font-light leading-relaxed pt-2">
                    <p><strong className="font-bold text-[#080B10]">Problem:</strong> {project.problem}</p>
                    <p><strong className="font-bold text-[#080B10]">Solution:</strong> {project.solution}</p>
                  </div>

                  {/* Highlight Box */}
                  {(project.highlightBox || (project.impact && project.impact.length > 0)) && (
                    <div className="bg-white p-3 rounded-xl border border-[#DCE8EB] text-xs font-mono text-[#FF2D5D] font-semibold leading-relaxed">
                      {project.highlightBox || `✦ ${project.impact[0]}`}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-6 border-t border-[#DCE8EB]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white text-[#080B10] border border-[#DCE8EB]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to={`/showcase/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF2D5D] hover:underline"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#4A5568] hover:text-[#080B10] transition-colors"
                          aria-label="GitHub Repo"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-mono font-bold text-[#080B10] hover:text-[#FF2D5D] transition-colors"
                        >
                          <span>Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CODROPS 3D ROTATING ON-SCROLL SPONSOR GALLERY           */}
      {/* ========================================================= */}
      <RotatingSponsorsSection />

      {/* ========================================================= */}
      {/* 8. FINAL CTA                                              */}
      {/* ========================================================= */}
      <CTABanner
        title={
          <>
            Ready to build <br />
            <span className="italic text-[#61C8D4]">what's next?</span>
          </>
        }
        subtitle="Join thousands of students, mentors, and developers building the future of software capability."
        ctaText="GET STARTED"
        ctaLink="/get-started"
        badge="✦ JOIN THE HACKHERE ECOSYSTEM"
      />

    </div>
  );
}
