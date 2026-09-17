// src/pages/admin/AllUserList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  UserX,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { useAdminAuth } from '../../components/admin/AdminProtectedRoute';

export default function AllUserList() {
  const { isSuperAdmin } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      setError('Supabase is not configured in .env.');
      return;
    }

    try {
      const { data, error: fetchErr } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;

      const mapped = (data || []).map((u) => {
        // Evaluate provider based on email or avatar URL
        const email = (u.email || '').toLowerCase();
        let provider = 'Email / Supabase';
        if (email.endsWith('@gmail.com') || u.avatar?.includes('googleusercontent.com')) {
          provider = 'Google (OAuth)';
        }

        return {
          uid: u.uid,
          name: u.display_name || u.email?.split('@')[0] || 'User',
          email: u.email || '—',
          avatar: u.avatar,
          role: (u.role || 'user').toLowerCase(),
          provider,
          createdAt: u.created_at,
          lastSeen: u.updated_at || u.created_at,
          status: u.admin_approved ? 'approved' : 'active',
          college: u.college || '—',
          phone: u.phone_number || '—',
        };
      });

      setUsers(mapped);
    } catch (err) {
      console.error('[AllUserList] Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter Logic
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.uid.toLowerCase().includes(q);

    const matchRole =
      roleFilter === 'all' ||
      u.role === roleFilter;

    const matchProvider =
      providerFilter === 'all' ||
      (providerFilter === 'google' && u.provider.includes('Google')) ||
      (providerFilter === 'email' && !u.provider.includes('Google'));

    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'approved' && u.status === 'approved') ||
      (statusFilter === 'active' && u.status === 'active');

    return matchSearch && matchRole && matchProvider && matchStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout
      title="User Accounts & Identity Directory"
      subtitle="Inspect registered user profiles, authentication providers, and access privileges."
    >
      {/* SEARCH AND FILTERS BAR */}
      <div className="bg-[#111820] border border-[#263640] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or user UID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080B10] border border-[#263640] text-white text-xs placeholder:text-[#8CA2AD] focus:outline-none focus:border-[#61C8D4] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter by Role */}
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-[#080B10] border border-[#263640] text-xs font-mono text-[#DCE8EB] focus:outline-none focus:border-[#61C8D4]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
              <option value="student">Student</option>
              <option value="user">User</option>
              <option value="mentor">Mentor</option>
            </select>

            {/* Filter by Provider */}
            <select
              value={providerFilter}
              onChange={(e) => {
                setProviderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-[#080B10] border border-[#263640] text-xs font-mono text-[#DCE8EB] focus:outline-none focus:border-[#61C8D4]"
            >
              <option value="all">All Providers</option>
              <option value="google">Google OAuth</option>
              <option value="email">Email / Supabase</option>
            </select>

            {/* Refresh */}
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="p-2.5 rounded-xl bg-[#080B10] border border-[#263640] hover:border-[#61C8D4] text-[#DCE8EB] transition-colors"
              title="Refresh User List"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#61C8D4]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8CA2AD] pt-1">
          <span>
            Displaying {filteredUsers.length} of {users.length} total registered accounts
          </span>
          {isSuperAdmin && (
            <span className="text-purple-400 font-bold">
              ★ Super Admin Mode: Role modification unlocked
            </span>
          )}
        </div>
      </div>

      {/* ERROR NOTICE */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#FF2D5D] shrink-0" />
          <span>Error querying user records: {error}</span>
        </div>
      )}

      {/* USERS TABLE */}
      <div className="bg-[#111820] border border-[#263640] rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#080B10] border-b border-[#263640] text-[10px] font-mono uppercase tracking-wider text-[#8CA2AD]">
              <tr>
                <th className="py-3.5 px-5">User</th>
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#263640]/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8CA2AD]">
                    <div className="flex flex-col items-center justify-center gap-2 font-mono">
                      <Loader2 className="w-5 h-5 text-[#61C8D4] animate-spin" />
                      <span>Loading user records from database...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8CA2AD] font-mono">
                    No user accounts match your search and filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u) => {
                  const isAdminRole = u.role === 'admin' || u.role === 'super_admin';
                  return (
                    <tr
                      key={u.uid}
                      className="hover:bg-[#080B10]/50 transition-colors group"
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#080B10] border border-[#263640] flex items-center justify-center font-mono font-bold text-xs text-[#61C8D4] shrink-0">
                            {u.email ? u.email[0].toUpperCase() : 'U'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate group-hover:text-[#61C8D4] transition-colors">
                              {u.name}
                            </p>
                            <p className="text-[11px] font-mono text-[#8CA2AD] truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Provider */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#DCE8EB]">
                          {u.provider.includes('Google') ? (
                            <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#61C8D4] shrink-0" />
                          )}
                          <span>{u.provider}</span>
                        </span>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                            u.role === 'super_admin'
                              ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                              : u.role === 'admin'
                              ? 'bg-[#61C8D4]/10 text-[#61C8D4] border-[#61C8D4]/40'
                              : 'bg-[#263640] text-[#DCE8EB] border-transparent'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* Account Created */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#8CA2AD]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>

                      {/* Last Activity */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#8CA2AD]">
                        {u.lastSeen ? new Date(u.lastSeen).toLocaleDateString() : '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/admin/users/${u.uid}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#263640] bg-[#080B10] hover:border-[#61C8D4] hover:text-[#61C8D4] text-[#DCE8EB] text-xs font-mono font-semibold transition-colors"
                        >
                          <span>Manage</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="p-4 bg-[#080B10] border-t border-[#263640] flex items-center justify-between text-xs font-mono text-[#8CA2AD]">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#263640] hover:bg-[#111820] disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#263640] hover:bg-[#111820] disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}