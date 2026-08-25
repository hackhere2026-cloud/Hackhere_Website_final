// src/components/MidnightEmeraldSection.jsx
import React from "react";
import { Check, X, Sparkles, Star } from "lucide-react";

export default function MidnightEmeraldSection() {
  const comparisonItems = [
    {
      theory: "Isolated textbook assignments",
      capability: "Collaborative team prototypes built under realistic constraints",
      isGold: false,
    },
    {
      theory: "Rote memorization for exams",
      capability: "Architectural problem solving & real API integrations",
      isGold: false,
    },
    {
      theory: "Zero professional feedback",
      capability: "Direct checkpoint mentorship from industry leads",
      isGold: false,
    },
    {
      theory: "Blank resumes & theory papers",
      capability: "Live deployed products & verified project credentials",
      isGold: true,
    },
  ];

  return (
    <section className="bg-[#F4FAFB] text-[#080B10] py-20 px-6 sm:px-12 md:px-16 flex items-center justify-center font-serif">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Editorial Narrative */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            The Fundamental Problem
          </div>

          {/* Editorial Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-[#080B10]">
            The Gap We <br />
            <span className="italic font-normal text-[#FF2D5D]">Close.</span>
          </h2>

          {/* Paragraph Body */}
          <div className="space-y-4 text-[#4A5568] font-sans font-normal text-base sm:text-lg leading-relaxed">
            <p>
              Every year, millions of students graduate with theoretical textbook knowledge but lack the practical experience, confidence, and network required to build real products.
            </p>
            <p>
              Without hands-on building and direct mentorship, creative potential remains dormant. HackHere bridges this gap.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Midnight Emerald Dark Container */}
        <div className="lg:col-span-7 bg-[#080B10] border-2 border-[#263640] rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 text-white relative overflow-hidden font-sans">
          
          {/* Header Bar */}
          <div className="flex justify-between items-center pb-5 border-b border-[#263640] text-xs font-mono tracking-widest uppercase">
            <span className="flex items-center gap-1.5 text-[#FF7B7B] font-semibold">
              <X className="w-4 h-4 stroke-[3]" /> Classroom Theory
            </span>
            <span className="flex items-center gap-1.5 text-[#61C8D4] font-semibold">
              <Check className="w-4 h-4 stroke-[3]" /> Real-World Capability
            </span>
          </div>

          {/* Micro-Card Rows */}
          <div className="space-y-4">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#111820] border rounded-xl p-5 transition-all duration-300 space-y-2 group ${
                  item.isGold
                    ? "border-[#61C8D4] shadow-[0_0_20px_rgba(229,195,120,0.15)]"
                    : "border-[#254A37] hover:border-[#61C8D4]"
                }`}
              >
                {/* Classroom Theory Line */}
                <p className="text-xs text-[#8CA2AD] line-through font-light flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF7B7B] shrink-0" />
                  {item.theory}
                </p>

                {/* Real-World Capability Line */}
                <p
                  className={`text-sm sm:text-base font-semibold flex items-center justify-between gap-2.5 ${
                    item.isGold ? "text-[#61C8D4]" : "text-white group-hover:text-[#61C8D4]"
                  } transition-colors`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.isGold ? "bg-[#61C8D4]" : "bg-[#61C8D4]"
                      }`}
                    />
                    {item.capability}
                  </span>
                  
                  {item.isGold && (
                    <Star className="w-4 h-4 fill-[#61C8D4] text-[#61C8D4] shrink-0" />
                  )}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
