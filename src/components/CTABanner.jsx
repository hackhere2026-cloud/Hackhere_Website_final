// src/components/CTABanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTABanner({ title, subtitle, ctaText = "Start Application", ctaLink = "/get-started", badge = "✦ NEXT COHORT STARTING SOON" }) {
  return (
    <section className="py-20 px-6 sm:px-12 bg-[#F4FAFB] w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1400px] mx-auto bg-[#080B10] border-2 border-[#263640] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
      >
        {/* Subtle Decorative SVG Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        {/* Decorative Golden Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#61C8D4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#61C8D4]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[#61C8D4] font-mono text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#111820] border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            {badge}
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
            {title ? (
              title
            ) : (
              <>
                Ready to build software <br />
                <span className="italic text-[#61C8D4]">that actually ships?</span>
              </>
            )}
          </h3>
          <p className="font-sans text-[#8CA2AD] text-base leading-relaxed font-light">
            {subtitle || "Join an elite network of student builders turning theory into real-world software capability."}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          {ctaLink.startsWith("http") ? (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#61C8D4] text-[#080B10] hover:bg-white font-sans font-bold px-8 py-4 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <Link
              to={ctaLink}
              className="bg-[#61C8D4] text-[#080B10] hover:bg-white font-sans font-bold px-8 py-4 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
