// src/pages/CollaboratePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Sparkles, CheckCircle2, ArrowRight, Send, Trophy, Code2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CollaboratePage() {
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [collabType, setCollabType] = useState("Hackathon Sponsorship");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Partnership inquiry submitted successfully!");
    }, 700);
  };

  const formats = [
    {
      title: "Hackathon Sponsorship",
      desc: "Sponsor our flagship national sprints, present custom industry problem tracks, and judge top technical projects.",
      badge: "High Visibility"
    },
    {
      title: "Talent Discovery & Hiring",
      desc: "Direct access to top 5% builder talent through hackathon project evaluations, resume databases, and interviews.",
      badge: "Recruitment"
    },
    {
      title: "Developer Tools & API Evangelism",
      desc: "Get your SDKs, APIs, and cloud platforms adopted by thousands of active student and professional developers.",
      badge: "Adoption"
    },
    {
      title: "Campus Chapter Partnership",
      desc: "Collaborate with university engineering departments and student developer clubs for co-branded workshops.",
      badge: "Academic"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      {/* HERO */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Partnership Portal
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-[#080B10] font-serif">
            Partner With <br />
            <span className="italic text-[#FF2D5D]">
              HackHere.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Connect your organization with 3,500+ ambitious developers, engineers, and creators building solutions for tomorrow's technology landscape.
          </p>
        </div>
      </section>

      {/* COLLABORATION FORMATS */}
      <section className="py-24 max-w-[1400px] w-full mx-auto px-6 sm:px-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold">
            Engagement Tracks
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#080B10]">
            Ways to Partner With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((f, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#DCE8EB] rounded-2xl p-7 flex flex-col justify-between space-y-6 hover:border-[#080B10] hover:shadow-xl transition-all group font-sans shadow-sm"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF2D5D] px-2.5 py-1 rounded bg-[#F4FAFB] border border-[#DCE8EB] font-bold">
                  {f.badge}
                </span>
                <h3 className="text-xl font-serif font-medium text-[#080B10] group-hover:text-[#FF2D5D] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-light">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INQUIRY FORM (MIDNIGHT EMERALD CONTAINER) */}
      <section className="py-16 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 pb-4 border-b border-[#263640]">
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
              Submit a Partnership Proposal
            </h3>
            <p className="text-xs text-[#61C8D4] font-mono font-bold">
              Our ecosystem team responds within 24 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#111820] border border-[#61C8D4]/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#61C8D4]/20 text-[#61C8D4] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-medium text-white">Proposal Submitted!</h4>
              <p className="text-xs text-[#8CA2AD] leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{contactName}</strong> from <strong>{orgName}</strong>. Our partnership lead will contact you at <strong>{workEmail}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#61C8D4] uppercase tracking-wider underline font-mono"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Organization / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Innovations"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@acme.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Partnership Format
                  </label>
                  <select
                    value={collabType}
                    onChange={(e) => setCollabType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white focus:outline-none focus:border-[#61C8D4]"
                  >
                    <option value="Hackathon Sponsorship">Hackathon Sponsorship</option>
                    <option value="Talent Hiring & Recruitment">Talent Hiring & Recruitment</option>
                    <option value="Developer Tools & API Workshop">Developer Tools & API Workshop</option>
                    <option value="College Chapter Co-Hosting">College Chapter Co-Hosting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                  Proposal Details / Objectives
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details on timeline, expected audience size, problem statements, or specific objectives..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-[#61C8D4] text-[#080B10] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? "Transmitting Proposal..." : "Submit Partnership Proposal"}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
