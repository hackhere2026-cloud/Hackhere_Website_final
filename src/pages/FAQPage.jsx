// src/pages/FAQPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { FAQ_DATA } from "../data/hackhereData";
import CTABanner from "../components/CTABanner";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: "general", label: "General & Ecosystem" },
    { id: "events", label: "Events & Hackathons" },
    { id: "mentorship", label: "Mentors & Speakers" },
    { id: "organizations", label: "Colleges & Companies" }
  ];

  const currentQuestions = FAQ_DATA[activeCategory] || FAQ_DATA.general;

  const filtered = currentQuestions.filter((item) => {
    return (
      search === "" ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      {/* HERO */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-[#080B10] font-serif">
            Frequently Asked <br />
            <span className="italic text-[#FF2D5D]">
              Questions.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Everything you need to know about participating in hackathons, joining as a mentor, bringing a chapter to your campus, or partnering with HackHere.
          </p>
        </div>
      </section>

      {/* CATEGORIES & SEARCH */}
      <section className="py-12 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-8 font-sans">
        <div className="bg-white border-2 border-[#DCE8EB] rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-[#4A5568] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4FAFB] border border-[#DCE8EB] rounded-xl text-xs text-[#080B10] focus:outline-none focus:border-[#080B10]"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DCE8EB]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#080B10] text-[#61C8D4]"
                    : "bg-[#F4FAFB] text-[#4A5568] hover:text-[#080B10] border border-[#DCE8EB]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#DCE8EB] rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-base font-serif font-medium text-[#080B10]">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#FF2D5D] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#DCE8EB] font-light">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* REUSABLE CTA */}
      <CTABanner
        title={
          <>
            Still have questions <br />
            <span className="italic text-[#61C8D4]">or need guidance?</span>
          </>
        }
        subtitle="Our community coordinators are always here to help you get started or unblock your journey."
        ctaText="Contact Support"
        ctaLink="/contact"
        badge="✦ 24/7 COMMUNITY SUPPORT"
      />
    </div>
  );
}
