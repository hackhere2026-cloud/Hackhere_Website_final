// src/pages/admin/AdminUserDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Shield,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Phone,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Award,
  Layers,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { useAdminAuth } from '../../components/admin/AdminProtectedRoute';
import { logAdminAction } from '../../lib/auditLogger';

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentAdmin, isSuperAdmin } = useAdminAuth();

  const [targetUser, setTargetUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingRole, setSavingRole] = useState(false);
  const [selectedNewRole, setSelectedNewRole] = useState('');
  const [actionNotice, setActionNotice] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      setError('Supabase is not configured in .env.');
      return;
    }

    try {
      // 1. Fetch user profile from public.users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', id)
        .maybeSingle();

      if (userError) throw userError;
      if (!userData) {
        throw new Error(`User with UID '${id}' was not found in public.users.`);
      }

      setTargetUser(userData);
      setSelectedNewRole((userData.role || 'user').toLowerCase());

      // 2. Fetch meetup registrations for this user
      const { data: meetupRegs } = await supabase
        .from('registrations')
        .select(`
          id,
          status,
          created_at,
          is_checked_in,
          meetup (
            id,
            title,
            start_date_time,
            venue
          )
        `)
        .eq('user_id', id);

      // 3. Fetch program registrations
      const { data: progRegs } = await supabase
        .from('program_registrations')
        .select(`
          id,
          status,
          created_at,
          programs (
            id,
            title
          )
        `)
        .eq('user_id', id);

      const combined = [
        ...(meetupRegs || []).map((m) => ({
          type: 'Meetup',
          title: m.meetup?.title || 'Meetup Event',
          date: m.created_at,
          status: m.status || (m.is_checked_in ? 'checked_in' : 'registered'),
        })),
        ...(progRegs || []).map((p) => ({
          type: 'Program',
          title: p.programs?.title || 'Program Track',
          date: p.created_at,
          status: p.status || 'submitted',
        })),
      ];

      setRegistrations(combined);
    } catch (err) {
      console.error('[AdminUserDetail] Error fetching:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const handleRoleChange = async () => {
    if (!isSuperAdmin) {
      setActionNotice({ type: 'error', text: 'Unauthorized: Only super_admin accounts can modify user roles.' });
      return;
    }

    if (currentAdmin.id === targetUser.uid && selectedNewRole !== 'super_admin') {
      setActionNotice({ type: 'error', text: 'Safeguard: You cannot remove your own super_admin status.' });
      return;
    }

    setSavingRole(true);
    setActionNotice(null);

    try {
      const oldRole = targetUser.role;

      // First attempt RPC if the secure function exists
      const { data: rpcData, error: rpcError } = await supabase.rpc('admin_set_user_role', {
        target_uid: targetUser.uid,
        new_role: selectedNewRole,
      });

      if (rpcError) {
        // If RPC function not present yet, attempt direct update
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: selectedNewRole, updated_at: new Date().toISOString() })
          .eq('uid', targetUser.uid);

        if (updateError) throw updateError;
      }

      // Record audit log
      await logAdminAction('ROLE_CHANGED', 'user', targetUser.uid, {
        target_email: targetUser.email,
        old_role: oldRole,
        new_role: selectedNewRole,
        promoted_by: currentAdmin.email,
      }).catch(() => {});

      setActionNotice({
        type: 'success',
        text: `Successfully updated role for ${targetUser.email} from [${oldRole}] to [${selectedNewRole}].`,
      });

      // Refresh target user record
      setTargetUser({ ...targetUser, role: selectedNewRole });
    } catch (err) {
      console.error('[AdminUserDetail] Role update error:', err);
      setActionNotice({ type: 'error', text: `Failed to update role: ${err.message}` });
    } finally {
      setSavingRole(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="User Profile Management">
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#8CA2AD] font-mono">
          <Loader2 className="w-6 h-6 animate-spin text-[#61C8D4]" />
          <span>Loading user profile & registrations...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error || !targetUser) {
    return (
      <AdminLayout title="User Details">
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[#111820] border border-red-900/40 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#FF2D5D] mx-auto" />
          <h2 className="text-xl font-serif text-white">User Record Not Found</h2>
          <p className="text-xs text-[#8CA2AD] leading-relaxed">{error}</p>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263640] text-white text-xs font-mono font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users Directory
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const isGoogle =
    (targetUser.email || '').endsWith('@gmail.com') ||
    targetUser.avatar?.includes('googleusercontent.com');

  return (
    <AdminLayout
      title={`User: ${targetUser.display_name || targetUser.email}`}
      subtitle={`Detailed telemetry, activity logs, and role settings for UID: ${targetUser.uid}`}
    >
      {/* BACK BUTTON */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8CA2AD] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Users</span>
        </Link>
      </div>

      {/* TOP USER HERO CARD */}
      <section className="bg-[#111820] border border-[#263640] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#080B10] border-2 border-[#263640] flex items-center justify-center font-mono font-bold text-xl text-[#61C8D4] shrink-0">
              {targetUser.email ? targetUser.email[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-serif font-light text-white">
                  {targetUser.display_name || targetUser.email?.split('@')[0]}
                </h2>
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    targetUser.role === 'super_admin'
                      ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                      : targetUser.role === 'admin'
                      ? 'bg-[#61C8D4]/10 text-[#61C8D4] border-[#61C8D4]/40'
                      : 'bg-[#263640] text-[#DCE8EB] border-transparent'
                  }`}
                >
                  {targetUser.role || 'user'}
                </span>
              </div>
              <p className="text-xs font-mono text-[#8CA2AD] mt-1">{targetUser.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-[#080B10] border border-[#263640] text-[#8CA2AD]">
              Provider:{' '}
              <strong className="text-white font-bold">
                {isGoogle ? 'Google OAuth (Firebase)' : 'Email (Supabase)'}
              </strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#080B10] border border-[#263640] text-[#8CA2AD]">
              Joined:{' '}
              <strong className="text-white font-bold">
                {targetUser.created_at ? new Date(targetUser.created_at).toLocaleDateString() : '—'}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE MANAGEMENT & PRIVILEGES (SUPER ADMIN ONLY) */}
      <section className="bg-[#111820] border border-purple-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#263640] pb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-serif text-white">Administrative Role Management</h3>
              <p className="text-xs text-[#8CA2AD]">
                Assign or revoke administrative authorization in the database
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full border ${
              isSuperAdmin
                ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                : 'bg-red-950/60 text-red-300 border-red-800'
            }`}
          >
            {isSuperAdmin ? 'Permission Granted' : 'Locked • Super Admin Only'}
          </span>
        </div>

        {actionNotice && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 font-mono ${
              actionNotice.type === 'success'
                ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
                : 'bg-red-950/50 border border-red-800 text-red-300'
            }`}
          >
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionNotice.text}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <select
            disabled={!isSuperAdmin || savingRole}
            value={selectedNewRole}
            onChange={(e) => setSelectedNewRole(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#080B10] border border-[#263640] text-xs font-mono text-white focus:outline-none focus:border-purple-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="student">student (Standard Builder)</option>
            <option value="user">user (Standard User)</option>
            <option value="mentor">mentor (Technical Mentor)</option>
            <option value="admin">admin (Full Admin Rights)</option>
            <option value="super_admin">super_admin (Complete System Governance)</option>
          </select>

          <button
            disabled={!isSuperAdmin || savingRole || selectedNewRole === targetUser.role}
            onClick={handleRoleChange}
            className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {savingRole ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
            <span>Save Role Assignment</span>
          </button>
        </div>

        {!isSuperAdmin && (
          <p className="text-[11px] text-[#8CA2AD] font-sans">
            ⚠️ You are logged in with the <strong>admin</strong> role. Promoting or modifying roles requires <strong>super_admin</strong> authorization.
          </p>
        )}
      </section>

      {/* METADATA & FIELD DETAILS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Attributes */}
        <div className="bg-[#111820] border border-[#263640] rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-serif text-white border-b border-[#263640] pb-3">
            Profile Attributes
          </h3>
          <div className="divide-y divide-[#263640]/60 text-xs font-sans">
            <div className="py-2.5 flex justify-between">
              <span className="text-[#8CA2AD]">Unique UID:</span>
              <span className="font-mono text-white select-all text-[11px]">{targetUser.uid}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#8CA2AD]">College / Affiliation:</span>
              <span className="text-white">{targetUser.college || 'Not specified'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#8CA2AD]">Phone Number:</span>
              <span className="font-mono text-white">{targetUser.phone_number || '—'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#8CA2AD]">Admin Approved:</span>
              <span className={targetUser.admin_approved ? 'text-emerald-400 font-mono font-bold' : 'text-[#8CA2AD] font-mono'}>
                {targetUser.admin_approved ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* HackHere Event & Program Registrations */}
        <div className="bg-[#111820] border border-[#263640] rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-serif text-white border-b border-[#263640] pb-3">
            Associated Registrations ({registrations.length})
          </h3>

          {registrations.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#8CA2AD]">
              No meetup or program registrations found for this user ID.
            </div>
          ) : (
            <div className="divide-y divide-[#263640]/60 text-xs">
              {registrations.map((r, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#61C8D4] font-bold block">
                      {r.type}
                    </span>
                    <p className="font-semibold text-white truncate">{r.title}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#080B10] text-[#8CA2AD] border border-[#263640]">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}
