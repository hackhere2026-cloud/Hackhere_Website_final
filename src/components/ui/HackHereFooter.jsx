// src/components/ui/HackHereFooter.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import { HACKHERE_BRAND } from "../../data/hackhereData";

export default function HackHereFooter() {
  return (
    <footer className="w-full bg-[#080B10] text-white border-t border-[#263640] py-16 font-sans relative overflow-hidden selection:bg-[#61C8D4] selection:text-[#080B10]">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#263640]">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#111820] overflow-hidden flex items-center justify-center border border-[#263640] group-hover:border-[#61C8D4] transition-colors p-0.5">
                <img src="/logo.jpg" alt="HackHere Logo" className="w-full h-full object-contain rounded-md" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Hack<span className="italic text-[#61C8D4]">Here</span>
              </span>
            </Link>

            <p className="text-sm text-[#8CA2AD] max-w-sm leading-relaxed font-light">
              Bridging the gap between university classroom theory and production-grade software engineering capability.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={HACKHERE_BRAND.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-[#111820] border border-[#263640] flex items-center justify-center text-[#8CA2AD] hover:text-[#61C8D4] hover:border-[#61C8D4] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={HACKHERE_BRAND.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-[#111820] border border-[#263640] flex items-center justify-center text-[#8CA2AD] hover:text-[#61C8D4] hover:border-[#61C8D4] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={HACKHERE_BRAND.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#111820] border border-[#263640] flex items-center justify-center text-[#8CA2AD] hover:text-[#61C8D4] hover:border-[#61C8D4] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={HACKHERE_BRAND.socials.discord}
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="w-9 h-9 rounded-xl bg-[#111820] border border-[#263640] flex items-center justify-center text-[#8CA2AD] hover:text-[#61C8D4] hover:border-[#61C8D4] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#61C8D4] font-bold">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#8CA2AD] font-light">
              <li>
                <Link to="/vision" className="hover:text-white transition-colors">
                  Vision & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/program" className="hover:text-white transition-colors">
                  Program Overview
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Live Hackathons
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition-colors">
                  Mentors & Community
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-white transition-colors">
                  Student Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Participate */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#61C8D4] font-bold">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-[#8CA2AD] font-light">
              <li>
                <Link to="/get-started" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Apply to Join</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#61C8D4]" />
                </Link>
              </li>
              <li>
                <Link to="/get-started?role=mentor" className="hover:text-white transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/collaborate" className="hover:text-white transition-colors">
                  Partner / Sponsor
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Community FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8CA2AD] gap-4 font-light">
          <p>© {new Date().getFullYear()} HackHere. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#61C8D4] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#61C8D4] font-semibold">
              Ecosystem Operational
            </span>
          </div>

          <div className="flex gap-6 text-xs">
            <Link to="/faq" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
