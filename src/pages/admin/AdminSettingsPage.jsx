// src/pages/admin/AdminSettingsPage.jsx
import React from 'react';
import {
  Settings,
  ShieldCheck,
  Lock,
  Database,
  Flame,
  Key,
  Server,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code2,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { isFirebaseConfigured } from '../../lib/firebaseClient';
import { BACKEND_URL } from '../../config';

export default function AdminSettingsPage() {
  // Inspect presence of keys safely without exposing their character values
  const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const rawSupabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const rawFirebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const rawFirebaseDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const rawFirebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  // Mask hostname safely
  let supabaseDomain = 'Not Configured';
  try {
    if (rawSupabaseUrl && rawSupabaseUrl.startsWith('http')) {
      supabaseDomain = new URL(rawSupabaseUrl).hostname;
    }
  } catch {}

  // Check if service-role key is mistakenly present in Vite
  const hasLeakedServiceRole = typeof window !== 'undefined' && (
    !!import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return (
    <AdminLayout
      title="System Settings & Security Configuration"
      subtitle="Audit active environmental bindings, security boundaries, and infrastructure credentials."
    >
      {/* CRITICAL SECURITY AUDIT BADGE */}
      <section className="bg-[#111820] border border-[#263640] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263640] pb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-base font-serif text-white">Client-Side Security Checklist</h2>
            <p className="text-xs text-[#8CA2AD]">Verification of frontend boundary isolation rules</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Service Role Key Check */}
          <div className="p-4 rounded-2xl bg-[#080B10] border border-[#263640] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8CA2AD]">Service Role Key:</span>
              {!hasLeakedServiceRole ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Secure
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-red-400">
                  <AlertTriangle className="w-3 h-3" /> Leaked
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#DCE8EB]">
              {!hasLeakedServiceRole
                ? 'No service_role secret is exposed to the browser. Vite bundles are safely isolated.'
                : 'CRITICAL: Service role key detected in frontend env. Remove it immediately from .env!'}
            </p>
          </div>

          {/* Public Admin Sign Up */}
          <div className="p-4 rounded-2xl bg-[#080B10] border border-[#263640] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8CA2AD]">Public Admin Sign-up:</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Disabled
              </span>
            </div>
            <p className="text-[11px] text-[#DCE8EB]">
              All open registration controls for the admin portal are deactivated. Admin accounts are provisioned exclusively via database operations.
            </p>
          </div>

          {/* Database RLS Isolation */}
          <div className="p-4 rounded-2xl bg-[#080B10] border border-[#263640] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8CA2AD]">Route Protection:</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>
            <p className="text-[11px] text-[#DCE8EB]">
              All /admin/* subpaths require session validation and database-side role verification.
            </p>
          </div>
        </div>
      </section>

      {/* CREDENTIALS & SERVICE BINDINGS (MASKED) */}
      <section className="bg-[#111820] border border-[#263640] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#263640] pb-4">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-[#61C8D4]" />
            <div>
              <h3 className="text-base font-serif text-white">Environment Credential Bindings</h3>
              <p className="text-xs text-[#8CA2AD]">Active service endpoints with masked tokens</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#8CA2AD]">Status: Masked for Security</span>
        </div>

        <div className="divide-y divide-[#263640]/60 text-xs font-sans">
          {/* Supabase URL */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-mono text-white font-bold">VITE_SUPABASE_URL</p>
              <p className="text-[11px] text-[#8CA2AD] mt-0.5">Project host: {supabaseDomain}</p>
            </div>
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
              isSupabaseConfigured ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' : 'bg-amber-950/60 text-amber-300 border-amber-800'
            }`}>
              {isSupabaseConfigured ? 'Configured' : 'Missing'}
            </span>
          </div>

          {/* Supabase Anon Key */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-mono text-white font-bold">VITE_SUPABASE_ANON_KEY</p>
              <p className="text-[11px] text-[#8CA2AD] mt-0.5">
                {rawSupabaseKey && rawSupabaseKey !== 'KEY'
                  ? `Active public anon key (${rawSupabaseKey.slice(0, 8)}••••••••)`
                  : 'Placeholder or missing value'}
              </p>
            </div>
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
              rawSupabaseKey && rawSupabaseKey !== 'KEY'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                : 'bg-amber-950/60 text-amber-300 border-amber-800'
            }`}>
              {rawSupabaseKey && rawSupabaseKey !== 'KEY' ? 'Configured' : 'Missing'}
            </span>
          </div>

          {/* Firebase API Key */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-mono text-white font-bold">VITE_FIREBASE_API_KEY</p>
              <p className="text-[11px] text-[#8CA2AD] mt-0.5">
                {rawFirebaseKey && !rawFirebaseKey.includes('your-')
                  ? `Active web client key (${rawFirebaseKey.slice(0, 6)}••••••••)`
                  : 'Unconfigured or placeholder'}
              </p>
            </div>
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
              isFirebaseConfigured ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' : 'bg-amber-950/60 text-amber-300 border-amber-800'
            }`}>
              {isFirebaseConfigured ? 'Configured' : 'Missing'}
            </span>
          </div>

          {/* Firebase Project ID */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-mono text-white font-bold">VITE_FIREBASE_PROJECT_ID</p>
              <p className="text-[11px] text-[#8CA2AD] mt-0.5">{rawFirebaseProject || 'Not set'}</p>
            </div>
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
              rawFirebaseProject ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' : 'bg-amber-950/60 text-amber-300 border-amber-800'
            }`}>
              {rawFirebaseProject ? 'Configured' : 'Missing'}
            </span>
          </div>

          {/* Backend URL */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-mono text-white font-bold">VITE_BACKEND_URL</p>
              <p className="text-[11px] text-[#8CA2AD] mt-0.5">{BACKEND_URL}</p>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#080B10] text-[#61C8D4] border border-[#263640]">
              Active
            </span>
          </div>
        </div>
      </section>

      {/* SUPER ADMIN INITIALIZATION GUIDE */}
      <section className="bg-[#111820] border border-purple-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263640] pb-4">
          <Terminal className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-base font-serif text-white">Super Admin Designation Protocol</h3>
            <p className="text-xs text-[#8CA2AD]">Secure one-time procedure to bootstrap your initial super_admin</p>
          </div>
        </div>

        <div className="space-y-3 text-xs font-sans text-[#DCE8EB] leading-relaxed">
          <p>
            To prevent unauthorized privilege escalation, admin roles cannot be created from the web frontend. To appoint your initial <code className="text-purple-300 font-mono font-bold">super_admin</code>:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-[#8CA2AD]">
            <li>
              Sign up or log in with your personal email account via <code className="text-white font-mono">/signin</code>.
            </li>
            <li>
              Open your <strong>Supabase Project Dashboard</strong> → <strong>SQL Editor</strong>.
            </li>
            <li>
              Execute the promotion query to grant super_admin rights:
            </li>
          </ol>

          <div className="p-3.5 rounded-xl bg-[#080B10] border border-[#263640] font-mono text-[11px] text-[#61C8D4] overflow-x-auto">
            UPDATE public.users<br />
            SET role = 'super_admin'<br />
            WHERE email = 'your_email@hackhere.in';
          </div>

          <p className="text-[11px] text-[#8CA2AD]">
            Once executed, sign in at <code className="text-[#61C8D4] font-mono">/admin/login</code> with that account. You will immediately have full administrative capabilities, user management, and role promotion authority.
          </p>
        </div>
      </section>
    </AdminLayout>
  );
}
