// src/components/HackHereNav.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowUpRight, User, LogOut,
  ChevronDown, Sparkles
} from "lucide-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { signOutFirebase, watchFirebaseUser } from "../lib/firebaseClient";

export default function HackHereNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const session = useSession();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => watchFirebaseUser(setFirebaseUser), []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Exact navigation bar sequence:
  // [ LOGO: HackHere ] → VISION | PROGRAM | EVENTS | COMMUNITY | SHOWCASE | GET STARTED │ [ SIGN IN ]
  const navLinks = [
    { name: "VISION", path: "/vision" },
    { name: "PROGRAM", path: "/program" },
    { name: "EVENTS", path: "/events" },
    { name: "COMMUNITY", path: "/community" },
    { name: "SHOWCASE", path: "/showcase" },
    { name: "GET STARTED", path: "/get-started" },
  ];

  const handleSignOut = async () => {
    await Promise.all([supabase.auth.signOut(), signOutFirebase()]);
    navigate("/");
  };

  const activeUser = session?.user || firebaseUser;
  const userEmail = activeUser?.email || "";
  const userName = session?.user?.user_metadata?.full_name || firebaseUser?.displayName || userEmail.split("@")[0];

  const isActive = (path) => {
    if (path === "/program") {
      return location.pathname === "/program" || location.pathname === "/programs";
    }
    if (path === "/showcase") {
      return location.pathname === "/showcase" || location.pathname.startsWith("/showcase/") || location.pathname === "/projects";
    }
    if (path === "/events") {
      return location.pathname === "/events" || location.pathname.startsWith("/events/");
    }
    return location.pathname === path;
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 w-full border-b border-[#DCE8EB] transition-all duration-300 ${
      scrolled
        ? "bg-[#F4FAFB]/95 shadow-lg shadow-[#080B10]/5 backdrop-blur-xl"
        : "bg-[#F4FAFB]"
    }`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center group">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#080B10] overflow-hidden flex items-center justify-center border-2 border-[#263640] shadow-md group-hover:border-[#FF2D5D] transition-all duration-300 p-1">
            <img src="/logo.jpg" alt="HackHere Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
        </Link>

        {/* CENTER NAVIGATION LINKS (EXACT SEQUENCE) */}
        <nav className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#4A5568]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-200 py-1 border-b-2 ${
                isActive(link.path)
                  ? "text-[#080B10] border-[#080B10]"
                  : "border-transparent hover:text-[#080B10]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS: SIGN IN / PROFILE */}
        <div className="hidden lg:flex items-center gap-4">
          {activeUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#DCE8EB] bg-white text-xs text-[#080B10] hover:border-[#080B10] transition-all shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#080B10] text-[#61C8D4] font-bold flex items-center justify-center text-[11px]">
                  {userEmail ? userEmail[0].toUpperCase() : "U"}
                </div>
                <span className="max-w-[120px] truncate font-medium">
                  {userName || "Builder"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#4A5568]" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-[#DCE8EB] rounded-2xl shadow-xl p-2 space-y-1 text-xs z-50"
                  >
                    <div className="px-3 py-2 border-b border-[#DCE8EB] text-[#4A5568]">
                      <p className="font-semibold text-[#080B10] truncate">
                        {userName || "Community Builder"}
                      </p>
                      <p className="truncate text-[11px] text-[#FF2D5D]">{userEmail}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#080B10] hover:bg-[#F4FAFB] transition-colors font-medium"
                    >
                      <User className="w-4 h-4 text-[#FF2D5D]" />
                      Profile & Credentials
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-[#080B10] text-[#61C8D4] border border-[#263640] hover:border-[#61C8D4] px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 group shadow-md"
            >
              <span>SIGN IN</span>
              <ArrowUpRight className="w-4 h-4 text-[#61C8D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-[#DCE8EB] text-[#080B10] bg-white hover:border-[#080B10] transition-all shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-[#DCE8EB] bg-[#F4FAFB] px-6 py-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col space-y-2 text-xs uppercase tracking-widest font-bold font-sans">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-2.5 px-4 rounded-xl transition-all ${
                    isActive(link.path)
                      ? "bg-[#080B10] text-[#61C8D4] shadow-sm font-bold"
                      : "text-[#4A5568] hover:text-[#080B10] hover:bg-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DCE8EB] flex flex-col gap-3">
              {activeUser ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full py-3 text-center rounded-full bg-[#080B10] text-[#61C8D4] text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 text-center rounded-full border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="w-full py-3 text-center rounded-full bg-[#080B10] text-[#61C8D4] border border-[#263640] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>SIGN IN</span>
                  <ArrowUpRight className="w-4 h-4 text-[#61C8D4]" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
