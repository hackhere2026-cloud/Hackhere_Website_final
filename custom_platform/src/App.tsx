import { useState, useEffect } from 'react';
import { InfinityCanvas } from './components/InfinityCanvas';
import { TVCanvas } from './components/TVCanvas';
import { 
  BookOpen, ArrowUpRight, Play, Sparkles, CheckCircle2,
  Calculator, Volume2, Code, Cpu, Zap, Globe
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'about' | 'events' | 'team' | 'projects'>('about');

  // Interactive State for Attendance Tool inside CRT Monitor
  const [attended, setAttended] = useState(34);
  const [total, setTotal] = useState(42);
  const [activeTrack, setActiveTrack] = useState<'ai' | 'web3' | 'open'>('ai');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync hash changes with activeTab page state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'events', 'team', 'projects', 'suite'].includes(hash)) {
        setActiveTab(hash === 'suite' ? 'projects' : (hash as any));
      } else {
        setActiveTab('about');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab: 'about' | 'events' | 'team' | 'projects') => {
    setActiveTab(tab);
    window.location.hash = tab;
    if (tab === 'about') {
      setTimeout(() => {
        const el = document.getElementById('about-manifesto');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Compute attendance safety %
  const percentage = Math.round((attended / total) * 100);
  const safeAbsences = Math.max(0, Math.floor(attended - 0.75 * total));
  const neededClasses = Math.max(0, Math.ceil(3 * total - 4 * attended));

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 relative font-body selection:bg-[#00f0ff] selection:text-black">
      
      {/* ── SHARED HEADER NAVIGATION BAR ── */}
      <header className="relative z-30 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Top Left Logo Image */}
        <a href="#about" onClick={() => navigateTo('about')} className="flex items-center cursor-pointer">
          <img 
            src="/logo.jpg" 
            alt="HackHere Logo" 
            className="h-9 sm:h-11 lg:h-12 w-auto object-contain rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,59,48,0.4)] hover:scale-105 transition-transform" 
          />
        </a>

        {/* Centered & Enlarged Navigation Pill Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2 px-8 py-2.5 bg-slate-950/80 backdrop-blur-md rounded-full border border-white/15 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          <button 
            onClick={() => navigateTo('about')} 
            className={`font-display text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'about' ? 'text-[#00f0ff] scale-105' : 'text-slate-300 hover:text-white'
            }`}
          >
            About
          </button>

          <button 
            onClick={() => navigateTo('events')} 
            className={`font-display text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'events' ? 'text-[#00f0ff] scale-105' : 'text-slate-300 hover:text-white'
            }`}
          >
            Events
          </button>

          <button 
            onClick={() => navigateTo('team')} 
            className={`font-display text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'team' ? 'text-[#00f0ff] scale-105' : 'text-slate-300 hover:text-white'
            }`}
          >
            Team
          </button>

          <button 
            onClick={() => navigateTo('projects')} 
            className={`font-display text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'projects' ? 'text-[#00f0ff] scale-105' : 'text-slate-300 hover:text-white'
            }`}
          >
            Projects
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="px-3.5 py-2 bg-slate-900/80 text-slate-200 text-xs font-tech-mono rounded-lg border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className="btn-primary-neon text-xs font-display font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Launch Platform</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </header>


      {/* ── PAGE 1: PERFECT HACKHERE ABOUT PAGE ── */}
      {activeTab === 'about' && (
        <>
          {/* Hero 3D Infinity Grid Section */}
          <section className="relative h-[calc(100vh-80px)] max-h-[850px] flex flex-col justify-between overflow-hidden border-b-4 border-[#ff3b30]">
            <div className="infinity-grid-container" />
            <InfinityCanvas />

            <div className="relative z-20 text-center space-y-2 px-4 max-w-5xl mx-auto my-auto py-2">
              <div className="inline-flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/40 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="font-tech-mono text-[11px] text-[#00f0ff] tracking-wider uppercase">
                  OPEN SOURCE STUDENT COMMUNITY
                </span>
              </div>

              <h1 className="leading-tight uppercase space-y-1">
                <span className="block font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  HACKHERE
                </span>
                <span className="block font-silk text-lg sm:text-2xl lg:text-3xl text-white tracking-[0.3em] font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] border-y border-white/30 py-1.5 inline-block px-5 bg-white/5 rounded">
                  COMMUNITY
                </span>
              </h1>

              {/* 3D GLTF TV Animation from H2F */}
              <div className="-my-14 sm:-my-20 max-w-lg mx-auto pointer-events-auto">
                <TVCanvas />
              </div>

              <div className="pt-0 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="btn-primary-neon text-xs sm:text-sm font-display font-bold px-7 py-3 rounded-xl inline-flex items-center gap-3 cursor-pointer uppercase tracking-wider"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Explore Space</span>
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className="btn-secondary-cyan text-xs sm:text-sm font-display font-bold px-7 py-3 rounded-xl inline-flex items-center gap-3 cursor-pointer uppercase tracking-wider"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Platform Specs</span>
                </button>
              </div>
            </div>

            <div className="relative z-20 flex flex-col items-center pb-4 space-y-1">
              <span className="text-[11px] font-tech-mono text-slate-400 uppercase tracking-widest">SCROLL TO EXPLORE</span>
              <div className="w-5 h-7 rounded-full border-2 border-slate-600 flex justify-center pt-1">
                <div className="w-1 h-2 bg-[#00f0ff] rounded-full animate-bounce" />
              </div>
            </div>
          </section>

          {/* About Content Frame: Manifesto, Stats, Pillars & Workstations */}
          <div id="about-manifesto" className="vintage-cream-bg py-16 px-4 sm:px-8 border-b-4 border-[#2e261d] text-[#1a1612]">
            <div className="max-w-6xl mx-auto space-y-16 vintage-border-frame p-6 sm:p-10 rounded-sm bg-[#e5dfd3]">
              
              {/* 1. Community Manifesto & Vision */}
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-block bg-[#2e261d] text-[#e5dfd3] px-3.5 py-1 text-xs font-tech-mono uppercase tracking-wider">
                  ABOUT HACKHERE
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1a1612] tracking-wider uppercase leading-tight">
                  Empowering Student Builders To Build & Ship
                </h2>
                <p className="font-body text-base sm:text-lg text-[#3d3428] leading-relaxed">
                  HackHere is an open-source retro developer ecosystem designed to bridge campus academics with production software engineering. We host 48-hour build sprints, develop campus productivity suites, and cultivate a nationwide peer network.
                </p>
              </div>

              {/* 2. Community Focus Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="vintage-card p-4 space-y-1">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#ff3b30] uppercase">STUDENT FIRST</div>
                  <div className="font-tech-mono text-xs text-[#3d3428] font-bold uppercase">&gt; CAMPUS COMMUNITY</div>
                </div>

                <div className="vintage-card p-4 space-y-1">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#00f0ff] uppercase">OPEN SOURCE</div>
                  <div className="font-tech-mono text-xs text-[#3d3428] font-bold uppercase">&gt; PUBLIC REPOSITORIES</div>
                </div>

                <div className="vintage-card p-4 space-y-1">
                  <div className="font-display font-black text-xl sm:text-2xl text-purple-700 uppercase">HACKATHONS</div>
                  <div className="font-tech-mono text-xs text-[#3d3428] font-bold uppercase">&gt; BUILD SPRINTS</div>
                </div>

                <div className="vintage-card p-4 space-y-1">
                  <div className="font-display font-black text-xl sm:text-2xl text-emerald-700 uppercase">MENTORSHIP</div>
                  <div className="font-tech-mono text-xs text-[#3d3428] font-bold uppercase">&gt; 1-ON-1 GUIDANCE</div>
                </div>
              </div>

              {/* 3. Four Core Pillars */}
              <div className="space-y-6 pt-4 border-t-2 border-[#8c7860]/40">
                <div className="text-center">
                  <h3 className="font-display text-2xl font-black text-[#1a1612] uppercase tracking-wider">
                    Our Four Community Pillars
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="vintage-card p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2e261d] text-[#ff3b30] flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#1a1612]">01. 48-Hour Build Sprints</h4>
                    <p className="font-body text-xs text-[#3d3428] leading-relaxed">
                      Continuous hackathons focused on AI agents, Web3 protocols, and open source utilities with live mentorship and cash prizes.
                    </p>
                  </div>

                  <div className="vintage-card p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2e261d] text-[#00f0ff] flex items-center justify-center">
                      <Code className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#1a1612]">02. Open Source First</h4>
                    <p className="font-body text-xs text-[#3d3428] leading-relaxed">
                      All campus productivity tools built in HackHere are 100% open source under public repositories for student contributions.
                    </p>
                  </div>

                  <div className="vintage-card p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2e261d] text-purple-600 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#1a1612]">03. Peer Mentorship Network</h4>
                    <p className="font-body text-xs text-[#3d3428] leading-relaxed">
                      1-on-1 code reviews, resume scans, and career guidance sessions led by senior student developers and alumni software engineers.
                    </p>
                  </div>

                  <div className="vintage-card p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2e261d] text-emerald-700 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#1a1612]">04. Retro Arcade Workstations</h4>
                    <p className="font-body text-xs text-[#3d3428] leading-relaxed">
                      Custom interactive web tools like Attendance Shield, GPA Estimator, and AI Diagnostic designed directly for college life.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Interactive Flagship CRT Workstations */}
              <div className="space-y-6 pt-6 border-t-2 border-[#8c7860]/40">
                <div className="text-center space-y-2">
                  <div className="inline-block bg-[#2e261d] text-[#e5dfd3] px-3.5 py-1 text-xs font-tech-mono uppercase tracking-wider">
                    SIMULATOR SUITE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1a1612] tracking-wider uppercase">
                    Flagship Campus Workstations
                  </h3>
                </div>

                {/* Dual Interactive CRT Workstations Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* CRT Monitor 1 */}
                  <div className="lg:col-span-7 crt-monitor-case flex flex-col justify-between">
                    <div className="crt-bezel p-5 crt-screen flex-1 flex flex-col justify-between space-y-6 text-slate-100">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs font-tech-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[#00f0ff] font-bold">[SYS_MONITOR_01] HACKHERE_TRACKS</span>
                        </div>
                        <span className="text-slate-400">STATUS: OPEN FOR BUILDS</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setActiveTrack('ai')}
                          className={`px-3.5 py-1.5 rounded text-xs font-tech-mono cursor-pointer transition-all ${
                            activeTrack === 'ai' 
                              ? 'bg-[#ff3b30] text-white font-bold shadow-[0_0_12px_rgba(255,59,48,0.6)]' 
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          01. AI Agents
                        </button>

                        <button
                          onClick={() => setActiveTrack('web3')}
                          className={`px-3.5 py-1.5 rounded text-xs font-tech-mono cursor-pointer transition-all ${
                            activeTrack === 'web3' 
                              ? 'bg-[#00f0ff] text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.6)]' 
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          02. Web3 DeFi
                        </button>

                        <button
                          onClick={() => setActiveTrack('open')}
                          className={`px-3.5 py-1.5 rounded text-xs font-tech-mono cursor-pointer transition-all ${
                            activeTrack === 'open' 
                              ? 'bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.6)]' 
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          03. Open Tools
                        </button>
                      </div>

                      <div className="bg-slate-950/90 p-4 rounded-lg border border-slate-800/80 space-y-3 font-tech-mono text-xs">
                        {activeTrack === 'ai' && (
                          <>
                            <div className="text-emerald-400 font-bold">&gt; TRACK: AI & Autonomous Agents</div>
                            <p className="text-slate-300 leading-relaxed font-body">
                              Build autonomous LLM agents, RAG workflows, or local edge AI applications using Gemini and LangChain.
                            </p>
                            <div className="flex items-center gap-4 text-slate-400 pt-1">
                              <span>• Category: Artificial Intelligence</span>
                              <span>• Status: Active Track</span>
                            </div>
                          </>
                        )}

                        {activeTrack === 'web3' && (
                          <>
                            <div className="text-[#00f0ff] font-bold">&gt; TRACK: Web3 & Decentralized Infrastructure</div>
                            <p className="text-slate-300 leading-relaxed font-body">
                              Engineer zero-knowledge proof protocols, decentralized identity tokens, or smart contract tools.
                            </p>
                            <div className="flex items-center gap-4 text-slate-400 pt-1">
                              <span>• Category: Decentralized Tech</span>
                              <span>• Status: Active Track</span>
                            </div>
                          </>
                        )}

                        {activeTrack === 'open' && (
                          <>
                            <div className="text-purple-400 font-bold">&gt; TRACK: Open Source Student Utility Suite</div>
                            <p className="text-slate-300 leading-relaxed font-body">
                              Develop open source developer utilities, campus attendance tools, note repositories, or collaboration software.
                            </p>
                            <div className="flex items-center gap-4 text-slate-400 pt-1">
                              <span>• Category: Open Source Tools</span>
                              <span>• Status: Active Track</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 font-tech-mono">
                        <span className="text-[11px] text-slate-400">&gt; REGISTRATION OPEN</span>
                        <a
                          href="https://nexora-phi-ten.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-neon text-xs px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-display font-bold"
                        >
                          <span>Register Track</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 px-2 text-[11px] text-slate-400 font-tech-mono">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ff3b30]" /> PWR ONLINE</span>
                      <span>CH: 04</span>
                      <span>VOL: 75%</span>
                    </div>
                  </div>

                  {/* CRT Monitor 2 */}
                  <div className="lg:col-span-5 crt-monitor-case flex flex-col justify-between">
                    <div className="crt-bezel p-5 crt-screen flex-1 flex flex-col justify-between space-y-5 text-slate-100">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs font-tech-mono">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-4 h-4 text-[#ff3b30]" />
                          <span className="text-white font-bold">[SYS_MONITOR_02] ATTENDANCE</span>
                        </div>
                        <span className="text-slate-400">TARGET: 75%</span>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-tech-mono">
                            <span className="text-slate-300">Classes Attended:</span>
                            <span className="text-[#00f0ff] font-bold">{attended} / {total}</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max={total}
                            value={attended}
                            onChange={(e) => setAttended(Number(e.target.value))}
                            className="w-full accent-[#00f0ff] cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-tech-mono">
                            <span className="text-slate-300">Total Conducted:</span>
                            <span className="text-purple-400 font-bold">{total} Classes</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={total}
                            onChange={(e) => {
                              const newTotal = Number(e.target.value);
                              setTotal(newTotal);
                              if (attended > newTotal) setAttended(newTotal);
                            }}
                            className="w-full accent-purple-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-950/90 p-4 rounded-lg border border-slate-800 space-y-2 font-tech-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Safety Ratio:</span>
                          <span className={`text-xl font-bold ${percentage >= 75 ? 'text-emerald-400' : 'text-[#ff3b30]'}`}>
                            {percentage}%
                          </span>
                        </div>

                        <div className="text-xs pt-1 border-t border-slate-800">
                          {percentage >= 75 ? (
                            <div className="text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Safe! You can bunk <b>{safeAbsences}</b> classes.</span>
                            </div>
                          ) : (
                            <div className="text-[#ff3b30]">
                              ⚠️ Attend <b>{neededClasses}</b> consecutive classes to hit 75%.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 px-2 text-[11px] text-slate-400 font-tech-mono">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> PWR ONLINE</span>
                      <span>CH: 08</span>
                      <span>VOL: 90%</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 5. Builder Journey / Level Progression */}
              <div className="space-y-6 pt-6 border-t-2 border-[#8c7860]/40">
                <div className="text-center">
                  <h3 className="font-display text-2xl font-black text-[#1a1612] uppercase tracking-wider">
                    The HackHere Builder Journey
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="vintage-card p-4 space-y-2 text-center">
                    <div className="text-xs font-tech-mono font-bold text-[#ff3b30]">&gt; LEVEL 01</div>
                    <h4 className="font-heading font-bold text-base text-[#1a1612]">Join Chapter</h4>
                    <p className="font-body text-xs text-[#3d3428]">Onboard to your campus community hub & Discord.</p>
                  </div>

                  <div className="vintage-card p-4 space-y-2 text-center">
                    <div className="text-xs font-tech-mono font-bold text-[#00f0ff]">&gt; LEVEL 02</div>
                    <h4 className="font-heading font-bold text-base text-[#1a1612]">Ship First PR</h4>
                    <p className="font-body text-xs text-[#3d3428]">Contribute code to student open source repos.</p>
                  </div>

                  <div className="vintage-card p-4 space-y-2 text-center">
                    <div className="text-xs font-tech-mono font-bold text-purple-700">&gt; LEVEL 03</div>
                    <h4 className="font-heading font-bold text-base text-[#1a1612]">Compete in Sprints</h4>
                    <p className="font-body text-xs text-[#3d3428]">Form a team and build in 48hr hackathons.</p>
                  </div>

                  <div className="vintage-card p-4 space-y-2 text-center">
                    <div className="text-xs font-tech-mono font-bold text-emerald-700">&gt; LEVEL 04</div>
                    <h4 className="font-heading font-bold text-base text-[#1a1612]">Lead & Mentor</h4>
                    <p className="font-body text-xs text-[#3d3428]">Guide future cohorts as campus chapter lead.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}


      {/* ── PAGE 2: DEDICATED EVENTS PAGE ── */}
      {activeTab === 'events' && (
        <div className="vintage-cream-bg min-h-screen py-12 px-4 sm:px-8 border-b-4 border-[#2e261d] text-[#1a1612]">
          <div className="max-w-6xl mx-auto space-y-12 vintage-border-frame p-6 sm:p-10 rounded-sm bg-[#e5dfd3]">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-block bg-[#ff3b30] text-white px-3.5 py-1 text-xs font-tech-mono uppercase tracking-wider">
                HACKATHONS & SPRINTS
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-[#1a1612] tracking-wider uppercase leading-tight">
                HackHere Events Arena
              </h1>
              <p className="font-body text-base text-[#3d3428] leading-relaxed">
                Join upcoming campus hackathons, open-source build sprints, and technical workshops.
              </p>
            </div>

            {/* Widescreen CRT TV Arcade Display */}
            <div className="crt-monitor-case">
              <div className="crt-bezel crt-screen relative aspect-video sm:aspect-[21/9] bg-[#101c2c] overflow-hidden flex flex-col justify-between p-4">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1f3044] via-[#395874] to-[#487352] flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start z-0">
                    <div className="w-12 h-12 rounded-full bg-[#ffe66d] shadow-[0_0_20px_#ffe66d]" />
                    <div className="font-tech-mono text-xs text-white bg-black/40 px-2.5 py-1 border border-white/20 rounded">
                      LEVEL 01: CAMPUS ARENA
                    </div>
                  </div>

                  <div className="relative h-24 flex items-end justify-between">
                    <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[90px] border-b-[#2c4030]" />
                    <div className="w-0 h-0 border-l-[90px] border-l-transparent border-r-[90px] border-r-transparent border-b-[120px] border-b-[#1e2e22]" />
                    <div className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[80px] border-b-[#2c4030]" />
                  </div>

                  <div className="h-12 bg-[#8c6b43] border-t-4 border-[#3d5a36] relative flex items-center justify-around px-4">
                    <div className="w-8 h-4 bg-[#ff3b30] border border-black rounded-sm text-[8px] text-white font-mono flex items-center justify-center font-bold">
                      CAR
                    </div>
                    <div className="w-4 h-6 bg-[#00f0ff] border border-black text-[8px] font-mono flex items-center justify-center animate-bounce font-bold">
                      AVATAR
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between text-xs font-tech-mono text-white bg-black/60 px-3 py-1 border border-white/10 rounded">
                  <span>WORLD: 1-1</span>
                  <span>SCORE: 02500</span>
                  <span>PLAYER: RETRO_DEV</span>
                </div>

                <div className="relative z-10 text-xs font-tech-mono text-[#00f0ff] bg-black/60 p-2 rounded border border-white/10 max-w-md flex items-center justify-between">
                  <span>&gt; PRESS START TO REGISTER FOR NEXORA 2026...</span>
                  <a
                    href="https://nexora-phi-ten.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00f0ff] text-slate-950 px-2 py-0.5 rounded font-bold hover:bg-white transition-colors"
                  >
                    START &gt;
                  </a>
                </div>
              </div>
            </div>

            {/* 1 Upcoming Event Section */}
            <div className="space-y-6 pt-4 border-t-2 border-[#8c7860]/40">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ff3b30] animate-ping" />
                <h2 className="font-display text-xl sm:text-2xl font-black text-[#1a1612] uppercase tracking-wider">
                  Upcoming Event (1)
                </h2>
              </div>

              <div className="vintage-card p-6 sm:p-8 space-y-6 border-l-8 border-l-[#ff3b30]">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-tech-mono">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ff3b30] text-white px-3 py-1 rounded font-bold uppercase">&gt; UPCOMING HACKATHON</span>
                    <span className="bg-[#00f0ff] text-slate-950 px-2.5 py-1 rounded font-bold uppercase">LIVE REGISTRATION</span>
                  </div>
                  <span className="text-[#3d3428] font-bold">SNS IHUB • COIMBATORE</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1a1612] tracking-wider uppercase">
                    NEXORA 2026 — 24H Non-Stop Sprint
                  </h3>
                  <p className="font-tech-mono text-xs text-[#ff3b30] font-bold uppercase">
                    Hosted by HackHere at SNS IHUB, Coimbatore
                  </p>
                  <p className="font-body text-base text-[#3d3428] leading-relaxed pt-1">
                    NEXORA is a 24-hour hackathon crucible. Build self-evolving AI systems, decentralized protocols, and biomorphic models that redefine what is possible with high-speed compute infrastructure and technical mentors.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-tech-mono">
                  <div className="bg-[#2e261d]/10 p-3 rounded border border-[#8c7860]/30 space-y-1">
                    <div className="font-bold text-[#1a1612] uppercase">&gt; 24H NON-STOP BUILD</div>
                    <div className="text-[#3d3428] text-[11px]">Uninterrupted hack time with physical compute infrastructure.</div>
                  </div>
                  <div className="bg-[#2e261d]/10 p-3 rounded border border-[#8c7860]/30 space-y-1">
                    <div className="font-bold text-[#1a1612] uppercase">&gt; DIRECT GRAND FINALE</div>
                    <div className="text-[#3d3428] text-[11px]">Live pitch grand finale at SNS IHUB, Coimbatore.</div>
                  </div>
                  <div className="bg-[#2e261d]/10 p-3 rounded border border-[#8c7860]/30 space-y-1">
                    <div className="font-bold text-[#1a1612] uppercase">&gt; PERKS & CERTIFICATION</div>
                    <div className="text-[#3d3428] text-[11px]">Direct internships, perks, and blockchain certifications.</div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap justify-between items-center gap-4 text-xs font-tech-mono border-t border-[#8c7860]/30">
                  <span className="text-emerald-700 font-bold uppercase flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                    DIRECT ENTRY FORMAT • REGISTER NOW
                  </span>
                  <a
                    href="https://nexora-phi-ten.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-neon text-xs px-7 py-3 rounded-xl inline-flex items-center gap-2 uppercase font-display font-bold shadow-[0_0_15px_rgba(255,59,48,0.5)] cursor-pointer"
                  >
                    <span>REGISTER FOR NEXORA</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2 Completed Events Section */}
            <div className="space-y-6 pt-6 border-t-2 border-[#8c7860]/40">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ff3b30]" />
                <h2 className="font-display text-xl sm:text-2xl font-black text-[#1a1612] uppercase tracking-wider">
                  Completed Events (2)
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Completed Event 1: AIventra 2026 */}
                <div className="vintage-card p-6 space-y-4 border-l-4 border-l-[#ff3b30] opacity-95 hover:opacity-100 transition-opacity">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tech-mono">
                    <span className="bg-[#ff3b30] text-white px-2.5 py-0.5 rounded font-bold">&gt; COMPLETED AI HACKATHON</span>
                    <span className="text-[#3d3428] font-bold">MAY 4–5, 2026</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-2xl text-[#1a1612]">AIventra 2026</h3>
                    <div className="text-xs font-tech-mono text-purple-700 font-bold uppercase">
                      StartupTN, Nandanam, Chennai
                    </div>
                  </div>

                  <p className="font-body text-sm text-[#3d3428] leading-relaxed">
                    The ultimate 24-hour AI Hackathon by HackHere. Code, build, and deploy autonomous agents and intelligent software systems to get hired.
                  </p>

                  <div className="pt-2 flex justify-between items-center text-xs font-tech-mono border-t border-[#8c7860]/20">
                    <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      EVENT CONCLUDED
                    </span>
                    <a 
                      href="https://aiventra.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 text-[#00f0ff] rounded hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <span>VIEW RECAP</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Completed Event 2: VORTEXA */}
                <div className="vintage-card p-6 space-y-4 border-l-4 border-l-[#00f0ff] opacity-95 hover:opacity-100 transition-opacity">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tech-mono">
                    <span className="bg-[#00f0ff] text-slate-950 px-2.5 py-0.5 rounded font-bold">&gt; COMPLETED HACKATHON</span>
                    <span className="text-[#3d3428] font-bold">JUNE 20–21, 2026</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-2xl text-[#1a1612]">VORTEXA</h3>
                    <div className="text-xs font-tech-mono text-[#ff3b30] font-bold uppercase">
                      Intro Works, Chennai
                    </div>
                  </div>

                  <p className="font-body text-sm text-[#3d3428] leading-relaxed">
                    The ultimate 24-hour hackathon crucible presented by HackHere. Student developers gathered to engineer high-performance web applications and tools.
                  </p>

                  <div className="pt-2 flex justify-between items-center text-xs font-tech-mono border-t border-[#8c7860]/20">
                    <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      EVENT CONCLUDED
                    </span>
                    <a 
                      href="https://vortexa-hack-here.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 text-[#00f0ff] rounded hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <span>VIEW RECAP</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}


      {/* ── PAGE 3: DEDICATED TEAM PAGE ── */}
      {activeTab === 'team' && (
        <div className="vintage-cream-bg min-h-screen py-12 px-4 sm:px-8 border-b-4 border-[#2e261d] text-[#1a1612]">
          <div className="max-w-6xl mx-auto space-y-12 vintage-border-frame p-6 sm:p-10 rounded-sm bg-[#e5dfd3]">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-block bg-[#00f0ff] text-slate-950 px-3.5 py-1 text-xs font-tech-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1a1612]">
                // EXECUTIVE COMMAND & CATALYSTS
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1612] tracking-wider uppercase leading-tight">
                THE ARCHITECTS OF HACKHERE
              </h1>
              <p className="font-body text-base text-[#3d3428] leading-relaxed">
                Engineers, visionaries, and catalysts orchestrating student innovation, open-source sprints, and hackathon momentum.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Member 1: EZHIL KK - CEO */}
              <a 
                href="https://www.linkedin.com/in/ezhilkathirvelan/"
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-card p-4 space-y-3 text-center border-t-4 border-t-[#00f0ff] flex flex-col justify-between group hover:border-[#00f0ff] transition-all cursor-pointer block"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-64 overflow-hidden rounded-sm border-2 border-[#2e261d] shadow-[3px_3px_0px_#2e261d]">
                    <img 
                      src="/team/team_lead_3.jpg" 
                      alt="EZHIL KK"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[#0077b5] text-white p-1 rounded-sm shadow-md">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1612] tracking-wide">EZHIL KK</h3>
                    <div className="text-xs font-tech-mono text-[#0077b5] uppercase font-bold pt-0.5 tracking-wider">&gt; CEO</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#8c7860]/20 flex items-center justify-center gap-1.5 text-xs font-tech-mono text-[#0077b5] font-bold uppercase tracking-wider group-hover:underline">
                  <span>LINKEDIN PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Member 2: RITHIKA S - COO */}
              <a 
                href="https://www.linkedin.com/in/rithika-somasundaram/"
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-card p-4 space-y-3 text-center border-t-4 border-t-[#ff3b30] flex flex-col justify-between group hover:border-[#ff3b30] transition-all cursor-pointer block"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-64 overflow-hidden rounded-sm border-2 border-[#2e261d] shadow-[3px_3px_0px_#2e261d]">
                    <img 
                      src="/team/team_lead_1.jpg" 
                      alt="RITHIKA S"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[#0077b5] text-white p-1 rounded-sm shadow-md">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1612] tracking-wide">RITHIKA S</h3>
                    <div className="text-xs font-tech-mono text-[#ff3b30] uppercase font-bold pt-0.5 tracking-wider">&gt; COO</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#8c7860]/20 flex items-center justify-center gap-1.5 text-xs font-tech-mono text-[#0077b5] font-bold uppercase tracking-wider group-hover:underline">
                  <span>LINKEDIN PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Member 3: SHUBAASHREE S - CMO */}
              <a 
                href="https://www.linkedin.com/in/shubaashreesureshbabu/"
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-card p-4 space-y-3 text-center border-t-4 border-t-emerald-600 flex flex-col justify-between group hover:border-emerald-600 transition-all cursor-pointer block"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-64 overflow-hidden rounded-sm border-2 border-[#2e261d] shadow-[3px_3px_0px_#2e261d]">
                    <img 
                      src="/team/team_lead_2.jpg" 
                      alt="SHUBAASHREE S"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[#0077b5] text-white p-1 rounded-sm shadow-md">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1612] tracking-wide">SHUBAASHREE S</h3>
                    <div className="text-xs font-tech-mono text-emerald-700 uppercase font-bold pt-0.5 tracking-wider">&gt; CMO</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#8c7860]/20 flex items-center justify-center gap-1.5 text-xs font-tech-mono text-[#0077b5] font-bold uppercase tracking-wider group-hover:underline">
                  <span>LINKEDIN PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Member 4: K GURU PRAKASH - CTO */}
              <a 
                href="https://www.linkedin.com/in/k-guru-prakash-9a4184337/"
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-card p-4 space-y-3 text-center border-t-4 border-t-purple-600 flex flex-col justify-between group hover:border-purple-600 transition-all cursor-pointer block"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-64 overflow-hidden rounded-sm border-2 border-[#2e261d] shadow-[3px_3px_0px_#2e261d]">
                    <img 
                      src="/team/team_lead_4.png" 
                      alt="K GURU PRAKASH"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[#0077b5] text-white p-1 rounded-sm shadow-md">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1612] tracking-wide">K GURU PRAKASH</h3>
                    <div className="text-xs font-tech-mono text-purple-700 uppercase font-bold pt-0.5 tracking-wider">&gt; CTO</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#8c7860]/20 flex items-center justify-center gap-1.5 text-xs font-tech-mono text-[#0077b5] font-bold uppercase tracking-wider group-hover:underline">
                  <span>LINKEDIN PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

            </div>

          </div>
        </div>
      )}


      {/* ── PAGE 4: DEDICATED PROJECTS PAGE ── */}
      {activeTab === 'projects' && (
        <div className="vintage-cream-bg min-h-screen py-12 px-4 sm:px-8 border-b-4 border-[#2e261d] text-[#1a1612]">
          <div className="max-w-6xl mx-auto space-y-12 vintage-border-frame p-6 sm:p-10 rounded-sm bg-[#e5dfd3]">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-block bg-[#2e261d] text-[#e5dfd3] px-3.5 py-1 text-xs font-tech-mono uppercase tracking-wider">
                OPEN SOURCE SUITE
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-[#1a1612] tracking-wider uppercase leading-tight">
                HackHere Projects Suite
              </h1>
              <p className="font-body text-base text-[#3d3428] leading-relaxed">
                Explore the open source developer modules built by student engineers across our ecosystem.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="vintage-card p-5 space-y-3">
                <div className="h-28 bg-[#161c2e] border-2 border-[#2e261d] p-3 flex flex-col justify-between crt-screen text-slate-100">
                  <div className="font-tech-mono text-[10px] text-[#00f0ff] font-bold">ATTENDANCE SAFETY</div>
                  <div className="text-2xl font-tech-mono font-bold text-emerald-400">{percentage}%</div>
                  <div className="text-xs font-tech-mono text-slate-300">&gt; TARGET: 75%</div>
                </div>
                <h4 className="font-heading font-bold text-base text-[#1a1612]">Attendance Shield</h4>
                <p className="font-body text-xs text-[#3d3428] leading-relaxed">Compute safe absence limits to maintain academic eligibility threshold.</p>
              </div>

              <div className="vintage-card p-5 space-y-3">
                <div className="h-28 bg-[#161c2e] border-2 border-[#2e261d] p-3 flex flex-col justify-between crt-screen text-slate-100">
                  <div className="font-tech-mono text-[10px] text-[#ff3b30] font-bold">GPA ESTIMATOR</div>
                  <div className="text-2xl font-tech-mono font-bold text-[#ff3b30]">8.92</div>
                  <div className="text-xs font-tech-mono text-slate-300">&gt; CGPA PROJECTION</div>
                </div>
                <h4 className="font-heading font-bold text-base text-[#1a1612]">GPA Target Estimator</h4>
                <p className="font-body text-xs text-[#3d3428] leading-relaxed">Calculate semester SGPA and target cumulative CGPA goals.</p>
              </div>

              <div className="vintage-card p-5 space-y-3">
                <div className="h-28 bg-[#161c2e] border-2 border-[#2e261d] p-3 flex flex-col justify-between crt-screen text-slate-100">
                  <div className="font-tech-mono text-[10px] text-purple-400 font-bold">MENTOR NETWORK</div>
                  <div className="text-lg font-tech-mono font-bold text-white">PEER MENTORS</div>
                  <div className="text-xs font-tech-mono text-slate-300">&gt; 1-ON-1 SLOTS</div>
                </div>
                <h4 className="font-heading font-bold text-base text-[#1a1612]">1-on-1 Peer Mentorship</h4>
                <p className="font-body text-xs text-[#3d3428] leading-relaxed">Book 1-on-1 guidance sessions with verified senior developers & alumni.</p>
              </div>

              <div className="vintage-card p-5 space-y-3">
                <div className="h-28 bg-[#161c2e] border-2 border-[#2e261d] p-3 flex flex-col justify-between crt-screen text-slate-100">
                  <div className="font-tech-mono text-[10px] text-amber-400 font-bold">AI DIAGNOSTIC</div>
                  <div className="text-lg font-tech-mono font-bold text-amber-400">ATS SCAN</div>
                  <div className="text-xs font-tech-mono text-slate-300">&gt; SKILL VECTOR</div>
                </div>
                <h4 className="font-heading font-bold text-base text-[#1a1612]">AI Resume Diagnostic</h4>
                <p className="font-body text-xs text-[#3d3428] leading-relaxed">Instant AI resume scan and skill gap recommendation roadmap.</p>
              </div>
            </div>

          </div>
        </div>
      )}


      {/* ── FOOTER ── */}
      <footer className="bg-[#070913] text-slate-300 py-12 px-6 border-t-4 border-[#ff3b30]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-display font-extrabold text-xl text-white tracking-wider">HACKHERE COMMUNITY</div>
            <p className="font-body text-sm text-slate-400 mt-1">
              Retro-Styled Student Developer Community & Open Source Innovation Engine.
            </p>
          </div>

          <div className="flex items-center gap-6 font-tech-mono text-xs">
            <a href="#" className="text-slate-400 hover:text-[#00f0ff] transition-colors">GITHUB</a>
            <a href="#" className="text-slate-400 hover:text-[#00f0ff] transition-colors">DISCORD</a>
            <a href="#" className="text-slate-400 hover:text-[#00f0ff] transition-colors">TWITTER</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
