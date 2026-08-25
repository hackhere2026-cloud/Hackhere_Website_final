// src/pages/ProjectShowcasePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Filter, Search, Award, Sparkles, Code2, ArrowUpRight, ArrowRight } from "lucide-react";
import { projectsData } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function ProjectShowcasePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Healthcare", "Distributed Systems", "Developer Tools"];

  const filtered = projectsData.filter((p) => {
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.problem.toLowerCase().includes(search.toLowerCase()) ||
      p.solution.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchCategory =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      {/* ========================================================= */}
      {/* 1. HERO                                                   */}
      {/* ========================================================= */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Student Portfolio Gallery
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#080B10] font-serif">
            Shipped & Built <br />
            <span className="italic text-[#FF2D5D]">at HackHere.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Explore real-world software solutions, open-source repositories, and verified prototypes engineered during HackHere tournaments and sprints.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FILTER & SEARCH CONTROLS                               */}
      {/* ========================================================= */}
      <section className="py-12 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-8 font-sans">
        <div className="bg-white border-2 border-[#DCE8EB] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, problem, or technology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4FAFB] border border-[#DCE8EB] rounded-xl text-xs text-[#080B10] focus:outline-none focus:border-[#080B10]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#080B10] text-[#61C8D4] shadow-sm"
                    : "bg-[#F4FAFB] text-[#4A5568] hover:text-[#080B10]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-[#4A5568] shrink-0">
            Showing <strong className="text-[#080B10] font-bold">{filtered.length}</strong> Projects
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. PROJECTS GRID (LARGE CARDS LINKING TO DETAIL ROUTE)    */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#080B10] hover:shadow-2xl transition-all duration-300 group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF2D5D] px-3.5 py-1 rounded-full bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                    {proj.event}
                  </span>
                  <span className="text-xs font-mono text-[#FF2D5D] font-bold">
                    Verified Awardee
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs font-serif italic text-[#4A5568] mt-1">
                    "{proj.tagline}"
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#4A5568] font-light leading-relaxed font-sans">
                  <p>
                    <strong className="font-bold text-[#080B10]">Problem:</strong> {proj.problem}
                  </p>
                  <p>
                    <strong className="font-bold text-[#080B10]">Solution:</strong> {proj.solution}
                  </p>
                </div>

                {/* Key Impact Point */}
                {proj.impact && proj.impact.length > 0 && (
                  <div className="bg-[#F4FAFB] p-3.5 rounded-xl border border-[#DCE8EB] text-xs font-mono text-[#FF2D5D] font-semibold">
                    ✦ {proj.impact[0]}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-[#DCE8EB]">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#F4FAFB] text-[#080B10] border border-[#DCE8EB]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to={`/showcase/${proj.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#080B10] hover:text-[#FF2D5D]"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#4A5568] hover:text-[#080B10] transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-mono font-bold text-[#FF2D5D] hover:text-[#080B10] transition-colors"
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
      </section>

      {/* FINAL CTA */}
      <CTABanner
        title={
          <>
            Want to see your project <br />
            <span className="italic text-[#61C8D4]">featured on this wall?</span>
          </>
        }
        subtitle="Register for an upcoming hackathon sprint, submit your code repository, and earn verified credentials."
        ctaText="EXPLORE SPRINT EVENTS"
        ctaLink="/events"
        badge="✦ SHIPPED BY HACKHERE BUILDERS"
      />

    </div>
  );
}
