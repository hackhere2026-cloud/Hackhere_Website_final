// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { HACKHERE_BRAND } from "../data/hackhereData";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General Community Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message dispatched to HackHere community support!");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F4FAFB] text-[#080B10] pt-8 sm:pt-12 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      {/* HERO */}
      <section className="w-full border-b border-[#DCE8EB] py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080B10] text-[#61C8D4] text-[11px] font-sans font-bold uppercase tracking-[0.25em] shadow-sm border border-[#263640]">
            <Sparkles className="w-3.5 h-3.5 text-[#61C8D4]" />
            Official Channels
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-[#080B10] font-serif">
            Get in Touch With <br />
            <span className="italic text-[#FF2D5D]">
              HackHere.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Have questions about our events, chapters, partnerships, or community guidelines? Reach out directly to our operations team.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16 max-w-[1400px] w-full mx-auto px-6 sm:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 bg-white border-2 border-[#DCE8EB] rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-light text-[#080B10]">Communication Channels</h2>
              <p className="text-xs text-[#4A5568] font-light">
                Direct points of contact for community members and institutional partners.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#DCE8EB] text-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#080B10] border border-[#263640] flex items-center justify-center text-[#61C8D4] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[#FF2D5D] uppercase font-bold text-[10px]">Official Email</p>
                  <a href={`mailto:${HACKHERE_BRAND.officialEmail}`} className="text-sm font-semibold text-[#080B10] hover:underline">
                    {HACKHERE_BRAND.officialEmail}
                  </a>
                  <p className="text-[11px] text-[#4A5568] mt-0.5">Response time: ~24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#080B10] border border-[#263640] flex items-center justify-center text-[#61C8D4] flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[#FF2D5D] uppercase font-bold text-[10px]">Discord Helpdesk</p>
                  <a href={HACKHERE_BRAND.socials.discord} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#080B10] hover:underline">
                    #support-and-inquiries
                  </a>
                  <p className="text-[11px] text-[#4A5568] mt-0.5">Real-time peer & moderator support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#080B10] border border-[#263640] flex items-center justify-center text-[#61C8D4] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[#FF2D5D] uppercase font-bold text-[10px]">Primary Ecosystem Hubs</p>
                  <p className="text-sm font-semibold text-[#080B10]">Bangalore & Chennai, India</p>
                  <p className="text-[11px] text-[#4A5568] mt-0.5">Virtual Global Track active worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 pb-4 border-b border-[#263640]">
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#61C8D4] font-mono font-bold">
                Assigned directly to the appropriate regional coordinator.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#111820] border border-[#61C8D4]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#61C8D4]/20 text-[#61C8D4] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-medium text-white">Message Dispatched!</h4>
                <p className="text-xs text-[#8CA2AD] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your inquiry regarding <em>{topic}</em> has been assigned to our operations team. We will follow up at <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#61C8D4] uppercase tracking-wider underline font-mono"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white placeholder-[#8CA2AD]/50 focus:outline-none focus:border-[#61C8D4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Inquiry Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#111820] border border-[#263640] rounded-xl text-xs text-white focus:outline-none focus:border-[#61C8D4]"
                  >
                    <option value="General Community Inquiry">General Community Inquiry</option>
                    <option value="Hackathon Registration & Rules">Hackathon Registration & Rules</option>
                    <option value="Campus Chapter Setup">Campus Chapter Setup</option>
                    <option value="Mentorship & Speaking">Mentorship & Speaking</option>
                    <option value="Corporate / Startup Sponsorship">Corporate / Startup Sponsorship</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8CA2AD] block mb-1.5 uppercase tracking-wider font-bold">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can our community team assist you today?"
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
                  <span>{loading ? "Transmitting Message..." : "Dispatch Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
