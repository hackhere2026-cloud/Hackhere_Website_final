// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Shield,
  Clock,
  Activity,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Database,
  Flame,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { isFirebaseConfigured } from '../../lib/firebaseClient';
import { useAdminAuth } from '../../components/admin/AdminProtectedRoute';

export default function Dashboard() {
  const { user, profile, isSuperAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [dbLatency, setDbLatency] = useState(null);

  const [stats, setStats] = useState({
    totalUsers: '—',
    adminUsers: '—',
    googleUsers: '—',
    newUsersToday: '—',
    newUsersWeek: '—',
    totalRegistrations: '—',
    meetupRegistrations: '—',
    programRegistrations: '—',
    mentorshipRegistrations: '—',
  });

  const [recentUsers, setRecentUsers] = useState([]);

  const fetchDashboardMetrics = async () => {
    setError(null);
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const startTime = performance.now();

      // 1. Fetch Users Data from public.users
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('uid, email, display_name, role, avatar, created_at, phone_number')
        .order('created_at', { ascending: false });

      const elapsed = Math.round(performance.now() - startTime);
      setDbLatency(elapsed);

      if (usersError) throw usersError;

      const userList = usersData || [];
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const adminCount = userList.filter((u) => {
        const r = (u.role || '').toLowerCase();
        return r === 'admin' || r === 'super_admin';
      }).length;

      const googleCount = userList.filter((u) => {
        const email = (u.email || '').toLowerCase();
        return email.endsWith('@gmail.com') || u.avatar?.includes('googleusercontent.com');
      }).length;

      const todayCount = userList.filter((u) => u.created_at && new Date(u.created_at) >= oneDayAgo).length;
      const weekCount = userList.filter((u) => u.created_at && new Date(u.created_at) >= oneWeekAgo).length;

      // 2. Query Registrations across available tables
      let meetupRegCount = 0;
      let progRegCount = 0;
      let mentorRegCount = 0;

      // Meetup registrations
      const { count: mCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });
      if (typeof mCount === 'number') meetupRegCount = mCount;

      // Program registrations
      const { count: pCount } = await supabase
        .from('program_registrations')
        .select('*', { count: 'exact', head: true });
      if (typeof pCount === 'number') progRegCount = pCount;

      // Mentorship registrations
      const { count: mentCount } = await supabase
        .from('mentorship_registrations')
        .select('*', { count: 'exact', head: true });
      if (typeof mentCount === 'number') mentorRegCount = mentCount;

      const totalReg = meetupRegCount + progRegCount + mentorRegCount;

      setStats({
        totalUsers: userList.length,
        adminUsers: adminCount,
        googleUsers: googleCount,
        newUsersToday: todayCount,
        newUsersWeek: weekCount,
        totalRegistrations: totalReg,
        meetupRegistrations: meetupRegCount,
        programRegistrations: progRegCount,
        mentorshipRegistrations: mentorRegCount,
      });

      setRecentUsers(userList.slice(0, 5));
    } catch (err) {
      console.error('[AdminDashboard] Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardMetrics();
  };

  return (
    <AdminLayout
      title="Administrative Command Center"
      subtitle="Real-time infrastructure health, user metrics, and registration activity across HackHere."
    >
      {/* Alert if not configured or query error */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Metrics Notice</p>
              <p className="text-red-300/90 leading-relaxed mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/60 text-white font-mono text-[11px] font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* TOP SYSTEM STATUS BAR */}
      <section className="bg-[#111820] border border-[#263640] rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#080B10] border border-[#263640] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#61C8D4]" />
            </div>
            <div>
              <h2 className="text-sm font-serif text-white">Live Backend Status</h2>
              <p className="text-[11px] text-[#8CA2AD] font-sans">
                Real-time connection telemetry from Supabase & Firebase services
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Supabase Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080B10] border border-[#263640] text-[11px] font-mono">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[#8CA2AD]">Supabase:</span>
              <span className={isSupabaseConfigured ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {isSupabaseConfigured ? 'Connected' : 'Not Configured'}
              </span>
              {dbLatency && (
                <span className="text-[10px] text-[#8CA2AD]">({dbLatency}ms)</span>
              )}
            </div>

            {/* Firebase Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080B10] border border-[#263640] text-[11px] font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[#8CA2AD]">Firebase:</span>
              <span className={isFirebaseConfigured ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {isFirebaseConfigured ? 'Configured' : 'Not Configured'}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-full border border-[#263640] bg-[#080B10] hover:bg-[#263640] text-[#DCE8EB] transition-colors"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#61C8D4]' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* CORE KPI CARDS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL REGISTERED APP USERS */}
        <div className="p-6 rounded-3xl bg-[#111820] border border-[#263640] space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#8CA2AD]">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold">TOTAL USERS</span>
            <Users className="w-4 h-4 text-[#61C8D4]" />
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif text-white block">
              {loading ? '...' : stats.totalUsers}
            </span>
            <span className="text-[10px] font-mono text-[#8CA2AD] block mt-1">
              Registered in <code className="text-[#61C8D4]">public.users</code>
            </span>
          </div>
        </div>

        {/* TOTAL REGISTRATIONS */}
        <div className="p-6 rounded-3xl bg-[#111820] border border-[#263640] space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#8CA2AD]">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold">REGISTRATIONS</span>
            <ClipboardList className="w-4 h-4 text-[#FF2D5D]" />
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif text-white block">
              {loading ? '...' : stats.totalRegistrations}
            </span>
            <span className="text-[10px] font-mono text-[#8CA2AD] block mt-1">
              Meetups ({stats.meetupRegistrations}) • Programs ({stats.programRegistrations})
            </span>
          </div>
        </div>

        {/* ADMIN ACCOUNTS */}
        <div className="p-6 rounded-3xl bg-[#111820] border border-[#263640] space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#8CA2AD]">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold">ADMIN ACCOUNTS</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif text-white block">
              {loading ? '...' : stats.adminUsers}
            </span>
            <span className="text-[10px] font-mono text-[#8CA2AD] block mt-1">
              Privileged role holders
            </span>
          </div>
        </div>

        {/* NEW USERS THIS WEEK */}
        <div className="p-6 rounded-3xl bg-[#111820] border border-[#263640] space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#8CA2AD]">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold">NEW THIS WEEK</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif text-white block">
              {loading ? '...' : stats.newUsersWeek}
            </span>
            <span className="text-[10px] font-mono text-[#8CA2AD] block mt-1">
              Today: {stats.newUsersToday} new signups
            </span>
          </div>
        </div>
      </section>

      {/* QUICK WORKFLOW SHORTCUTS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/users"
          className="p-5 rounded-2xl bg-[#111820] border border-[#263640] hover:border-[#61C8D4] transition-all duration-300 group flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase font-bold text-white group-hover:text-[#61C8D4] transition-colors">
              Manage Users
            </p>
            <p className="text-[11px] text-[#8CA2AD] mt-0.5">Inspect user records & roles</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8CA2AD] group-hover:translate-x-1 group-hover:text-[#61C8D4] transition-all" />
        </Link>

        <Link
          to="/admin/registrations"
          className="p-5 rounded-2xl bg-[#111820] border border-[#263640] hover:border-[#FF2D5D] transition-all duration-300 group flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase font-bold text-white group-hover:text-[#FF2D5D] transition-colors">
              Review Registrations
            </p>
            <p className="text-[11px] text-[#8CA2AD] mt-0.5">Meetup & program rosters</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8CA2AD] group-hover:translate-x-1 group-hover:text-[#FF2D5D] transition-all" />
        </Link>

        <Link
          to="/admin/system"
          className="p-5 rounded-2xl bg-[#111820] border border-[#263640] hover:border-emerald-400 transition-all duration-300 group flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase font-bold text-white group-hover:text-emerald-400 transition-colors">
              System Diagnostics
            </p>
            <p className="text-[11px] text-[#8CA2AD] mt-0.5">Supabase & Firebase health checks</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8CA2AD] group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
        </Link>

        <Link
          to="/admin/audit-logs"
          className="p-5 rounded-2xl bg-[#111820] border border-[#263640] hover:border-purple-400 transition-all duration-300 group flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase font-bold text-white group-hover:text-purple-400 transition-colors">
              Audit Logs
            </p>
            <p className="text-[11px] text-[#8CA2AD] mt-0.5">View privileged administrative history</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8CA2AD] group-hover:translate-x-1 group-hover:text-purple-400 transition-all" />
        </Link>
      </section>

      {/* RECENT USERS SECTION */}
      <section className="bg-[#111820] border border-[#263640] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif text-white">Recently Registered Builders</h3>
            <p className="text-xs text-[#8CA2AD] font-sans">Latest members added to the database</p>
          </div>
          <Link
            to="/admin/users"
            className="text-xs font-mono font-bold text-[#61C8D4] hover:underline flex items-center gap-1"
          >
            <span>View All Users</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentUsers.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-[#263640] rounded-2xl">
            <p className="text-xs font-mono text-[#8CA2AD]">
              {loading ? 'Querying database...' : 'No users registered yet or database table is unpopulated.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#263640]/60 overflow-hidden">
            {recentUsers.map((u) => {
              const roleVal = (u.role || 'user').toLowerCase();
              const isAdmin = roleVal === 'admin' || roleVal === 'super_admin';
              return (
                <div key={u.uid} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#080B10] border border-[#263640] flex items-center justify-center font-mono font-bold text-xs text-[#61C8D4] shrink-0">
                      {u.email ? u.email[0].toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {u.display_name || u.email?.split('@')[0] || 'Builder'}
                      </p>
                      <p className="text-[11px] font-mono text-[#8CA2AD] truncate">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        isAdmin
                          ? 'bg-[#61C8D4]/10 text-[#61C8D4] border-[#61C8D4]/40'
                          : 'bg-[#263640] text-[#DCE8EB] border-transparent'
                      }`}
                    >
                      {u.role || 'user'}
                    </span>
                    <span className="text-[10px] font-mono text-[#8CA2AD] hidden sm:inline">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                    </span>
                    <Link
                      to={`/admin/users/${u.uid}`}
                      className="p-1.5 rounded-lg border border-[#263640] bg-[#080B10] hover:border-[#61C8D4] text-[#DCE8EB] transition-colors"
                      title="View user details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}