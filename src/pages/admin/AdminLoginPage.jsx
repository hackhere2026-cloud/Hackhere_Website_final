// src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { logAdminAction } from '../../lib/auditLogger';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingExistingSession, setCheckingExistingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || '/admin/dashboard';

  // If already authenticated with admin role, bypass login form directly
  useEffect(() => {
    const checkActiveAdminSession = async () => {
      if (!isSupabaseConfigured) {
        setCheckingExistingSession(false);
        return;
      }
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('uid', user.id)
            .maybeSingle();

          const role = (profile?.role || '').toLowerCase();
          if (role === 'admin' || role === 'super_admin') {
            navigate(redirectTarget, { replace: true });
            return;
          }
        }
      } catch (err) {
        console.warn('Session check warning:', err);
      } finally {
        setCheckingExistingSession(false);
      }
    };

    checkActiveAdminSession();
  }, [navigate, redirectTarget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!isSupabaseConfigured) {
      setErrorMessage('Supabase is not configured. Please supply valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      setLoading(false);
      return;
    }

    try {
      // 1. Authenticate credentials with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !authData.user) {
        throw new Error(authError?.message || 'Invalid email or password.');
      }

      const authenticatedUser = authData.user;

      // 2. Query role from database
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('uid, email, role, display_name')
        .eq('uid', authenticatedUser.id)
        .maybeSingle();

      const userRole = (userProfile?.role || 'user').toLowerCase();

      // 3. Authorize only admin or super_admin
      if (userRole !== 'admin' && userRole !== 'super_admin') {
        // Attempt to log rejected attempt
        await logAdminAction('UNAUTHORIZED_ADMIN_LOGIN_ATTEMPT', 'auth', authenticatedUser.id, {
          email: authenticatedUser.email,
          evaluated_role: userRole,
          attempted_at: new Date().toISOString()
        }).catch(() => {});

        // Evict session immediately
        await supabase.auth.signOut();

        throw new Error(
          `Access Denied: Account '${authenticatedUser.email}' is authenticated, but does not possess administrative privileges (current role: ${userRole}).`
        );
      }

      // 4. Log successful administrative login
      await logAdminAction('ADMIN_LOGIN', 'auth', authenticatedUser.id, {
        email: authenticatedUser.email,
        role: userRole,
        ip_hint: 'client-browser',
        user_agent: navigator.userAgent
      }).catch(() => {});

      // 5. Navigate to protected destination
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      console.error('[AdminLogin] Login error:', err);
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingExistingSession) {
    return (
      <div className="min-h-screen bg-[#080B10] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#61C8D4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] text-white flex items-center justify-center p-6 selection:bg-[#61C8D4] selection:text-[#080B10] relative overflow-hidden">
      {/* Subtle Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#61C8D4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF2D5D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#111820] border-2 border-[#263640] rounded-[2rem] p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Top Decorative Border */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#61C8D4] via-[#FF2D5D] to-[#61C8D4]" />

          {/* Header & HackHere Branding */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#080B10] border border-[#263640] flex items-center justify-center group-hover:border-[#61C8D4] transition-colors">
                <Sparkles className="w-4 h-4 text-[#61C8D4]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Hack<span className="italic text-[#61C8D4]">Here</span>
              </span>
            </Link>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080B10] border border-[#263640] text-[10px] font-mono tracking-widest uppercase text-[#61C8D4] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN PORTAL</span>
              </div>
              <h1 className="text-2xl font-serif font-light text-white mt-2">
                Administrator Sign In
              </h1>
              <p className="text-xs text-[#8CA2AD] font-sans font-light mt-1">
                Restricted access for verified HackHere staff and system maintainers.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5 font-sans"
            >
              <AlertCircle className="w-4 h-4 text-[#FF2D5D] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div>
              <label className="text-[11px] font-mono text-[#8CA2AD] uppercase tracking-wider block mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  autoComplete="username"
                  placeholder="admin@hackhere.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080B10] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#8CA2AD] uppercase tracking-wider block mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#080B10] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors placeholder:text-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA2AD] hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={loading}
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#61C8D4] text-[#080B10] font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#080B10]" />
                    <span>AUTHENTICATING PRIVILEGES...</span>
                  </>
                ) : (
                  <>
                    <span>AUTHENTICATE & ENTER PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice & Strictly No Public Registration */}
          <div className="pt-3 border-t border-[#263640] space-y-2 text-center text-[11px] font-sans text-[#8CA2AD]">
            <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              🔒 Controlled Access Environment
            </p>
            <p className="leading-relaxed">
              Public administrator registrations are disabled. Administrative roles are provisioned exclusively via encrypted database operations.
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#8CA2AD] hover:text-white transition-colors font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Homepage</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
