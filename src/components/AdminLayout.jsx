// src/components/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  BookOpen,
  Activity,
  ScrollText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from './admin/AdminProtectedRoute';
import { supabase } from '../lib/supabaseClient';
import { signOutFirebase } from '../lib/firebaseClient';
import { logAdminAction } from '../lib/auditLogger';

export default function AdminLayout({ children, title, subtitle }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, role, isSuperAdmin } = useAdminAuth();

  const handleSignOut = async () => {
    try {
      if (user) {
        await logAdminAction('ADMIN_LOGOUT', 'auth', user.id, {
          email: user.email,
          role,
        }).catch(() => {});
      }
      await Promise.all([supabase.auth.signOut(), signOutFirebase()]);
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      navigate('/admin/login', { replace: true });
    }
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      altPaths: ['/admin'],
      icon: LayoutDashboard,
    },
    {
      label: 'Users',
      path: '/admin/users',
      altPaths: ['/admin/users'],
      icon: Users,
    },
    {
      label: 'Registrations',
      path: '/admin/registrations',
      altPaths: ['/admin/registrations'],
      icon: ClipboardList,
    },
    {
      label: 'Events & Meetups',
      path: '/admin/meetups',
      altPaths: ['/admin/meetup/create', '/admin/meetup/edit'],
      icon: Calendar,
    },
    {
      label: 'Programs & Tracks',
      path: '/admin/programs',
      altPaths: ['/admin/mentorship-programs'],
      icon: BookOpen,
    },
    {
      label: 'System Health',
      path: '/admin/system',
      altPaths: ['/admin/system'],
      icon: Activity,
    },
    {
      label: 'Audit Logs',
      path: '/admin/audit-logs',
      altPaths: ['/admin/audit-logs'],
      icon: ScrollText,
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      altPaths: ['/admin/settings'],
      icon: Settings,
    },
  ];

  const isNavActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.altPaths && item.altPaths.some((p) => location.pathname.startsWith(p))) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F4FAFB] flex flex-col lg:flex-row selection:bg-[#61C8D4] selection:text-[#080B10]">
      {/* ========================================================= */}
      {/* MOBILE TOPBAR                                             */}
      {/* ========================================================= */}
      <header className="lg:hidden bg-[#111820] border-b border-[#263640] px-4 py-3 flex items-center justify-between z-40 sticky top-0">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#080B10] border border-[#263640] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#61C8D4]" />
          </div>
          <span className="font-serif text-lg font-bold text-white tracking-tight">
            Hack<span className="italic text-[#61C8D4]">Here</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#263640] text-[#61C8D4] font-bold">
            ADMIN
          </span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl bg-[#080B10] border border-[#263640] text-[#DCE8EB]"
          aria-label="Toggle menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ========================================================= */}
      {/* DESKTOP & MOBILE SIDEBAR                                  */}
      {/* ========================================================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#111820] border-r border-[#263640] flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Branding & Title */}
        <div>
          <div className="p-6 border-b border-[#263640]">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#080B10] border border-[#263640] flex items-center justify-center group-hover:border-[#61C8D4] transition-colors">
                  <Sparkles className="w-4 h-4 text-[#61C8D4]" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                    Hack<span className="italic text-[#61C8D4]">Here</span>
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#8CA2AD] block mt-1">
                    ADMIN PORTAL
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-[#8CA2AD] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role indicator pill */}
            <div className="mt-4 pt-3 border-t border-[#263640]/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8CA2AD] uppercase">Access Level:</span>
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  isSuperAdmin
                    ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                    : 'bg-[#61C8D4]/10 text-[#61C8D4] border-[#61C8D4]/40'
                }`}
              >
                {isSuperAdmin ? '★ Super Admin' : 'Admin'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 font-sans text-xs">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = isNavActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-[#61C8D4] text-[#080B10] font-bold shadow-md shadow-cyan-950/30'
                      : 'text-[#8CA2AD] hover:text-white hover:bg-[#080B10]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      className={`w-4 h-4 transition-colors ${
                        active ? 'text-[#080B10]' : 'text-[#8CA2AD] group-hover:text-[#61C8D4]'
                      }`}
                    />
                    <span className="tracking-wide">{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-[#080B10]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Profile & Sign Out Actions */}
        <div className="p-4 border-t border-[#263640] space-y-3 bg-[#080B10]/40">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#111820] border border-[#263640] flex items-center justify-center font-mono font-bold text-xs text-[#61C8D4]">
              {user?.email ? user.email[0].toUpperCase() : 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {profile?.display_name || user?.email?.split('@')[0] || 'Administrator'}
              </p>
              <p className="text-[10px] font-mono text-[#8CA2AD] truncate">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/"
              className="py-2 px-2.5 rounded-lg border border-[#263640] bg-[#111820] hover:bg-[#263640] text-[11px] font-mono text-[#DCE8EB] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3 text-[#61C8D4]" />
            </Link>
            <button
              onClick={handleSignOut}
              className="py-2 px-2.5 rounded-lg border border-red-900/50 bg-red-950/20 hover:bg-red-950/50 text-[11px] font-mono text-red-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3 h-3 text-[#FF2D5D]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA                                         */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar with Breadcrumb / Title */}
        <div className="bg-[#111820]/70 backdrop-blur-md border-b border-[#263640] px-6 sm:px-10 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8CA2AD]">
              <span>ADMIN PORTAL</span>
              <span>/</span>
              <span className="text-[#61C8D4] font-bold">
                {title || location.pathname.replace('/admin/', '').toUpperCase() || 'DASHBOARD'}
              </span>
            </div>
            {title && (
              <h1 className="text-xl sm:text-2xl font-serif font-light text-white mt-1">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-[#8CA2AD] font-sans mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/system"
              className="px-3 py-1.5 rounded-full border border-[#263640] bg-[#080B10] hover:border-[#61C8D4] text-[11px] font-mono text-[#DCE8EB] flex items-center gap-2 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Health</span>
            </Link>
          </div>
        </div>

        {/* Page Content Body */}
        <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
