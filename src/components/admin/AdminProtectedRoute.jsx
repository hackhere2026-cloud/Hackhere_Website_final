// src/components/admin/AdminProtectedRoute.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, LogOut, ArrowLeft, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

export const AdminAuthContext = createContext({
  user: null,
  profile: null,
  role: null,
  isSuperAdmin: false,
  refreshProfile: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export default function AdminProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const verifyAdminAccess = async () => {
    setLoading(true);
    setErrorMessage(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      setErrorMessage('Supabase is not configured in .env. Administrative authorization cannot be verified.');
      return;
    }

    try {
      // 1. Get authenticated user from Supabase session
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        setProfile(null);
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      setUser(authUser);

      // 2. Query trusted public.users table for role
      let userProfile = null;
      const { data: userRows, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', authUser.id)
        .maybeSingle();

      if (userRows) {
        userProfile = userRows;
      } else {
        // Fallback check to profiles table if users table was migrated or empty
        const { data: profileRows } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();
        if (profileRows) {
          userProfile = profileRows;
        }
      }

      const assignedRole = (userProfile?.role || 'user').toLowerCase();
      setProfile(userProfile);
      setRole(assignedRole);

      // 3. Verify admin or super_admin status
      if (assignedRole === 'admin' || assignedRole === 'super_admin') {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.error('[AdminProtectedRoute] Verification error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while verifying privileges.');
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAdminAccess();

    // Subscribe to auth state changes to protect against expired sessions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setIsAuthorized(false);
        setRole(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        verifyAdminAccess();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  // State 1: Verification in progress
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] text-white flex flex-col items-center justify-center p-6 selection:bg-[#61C8D4] selection:text-[#080B10]">
        <div className="flex flex-col items-center space-y-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#111820] border-2 border-[#263640] flex items-center justify-center shadow-xl shadow-cyan-950/20">
            <Sparkles className="w-7 h-7 text-[#61C8D4] animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-[#61C8D4] animate-spin" />
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#61C8D4] font-bold">
                Verifying Security Credentials
              </p>
            </div>
            <p className="text-xs font-sans text-[#8CA2AD]">
              Checking cryptographic identity and role authorization in database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Missing configuration error
  if (errorMessage && !user) {
    return (
      <div className="min-h-screen bg-[#080B10] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#111820] border border-amber-800/40 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-950/60 border border-amber-700/50 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-serif text-white">Configuration Required</h2>
            <p className="text-xs text-[#8CA2AD] leading-relaxed">{errorMessage}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263640] text-white text-xs font-mono font-bold hover:bg-[#344550] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Website
          </Link>
        </div>
      </div>
    );
  }

  // State 3: Not authenticated at all -> Redirect to /admin/login
  if (!user) {
    return <Navigate to={`/admin/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  // State 4: Authenticated, but NOT an admin/super_admin -> 403 Forbidden Screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#080B10] text-white flex items-center justify-center p-6 selection:bg-[#FF2D5D] selection:text-white">
        <div className="max-w-lg w-full bg-[#111820] border-2 border-red-900/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-[#FF2D5D] to-red-600" />

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-7 h-7 text-[#FF2D5D]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF2D5D] font-bold block">
                Security Error 403 • Unauthorized Access
              </span>
              <h1 className="text-2xl font-serif font-light text-white mt-1">
                Admin Privileges Required
              </h1>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080B10] border border-[#263640] text-xs font-sans space-y-2">
            <p className="text-[#DCE8EB]">
              You are signed in as <strong className="text-white font-mono">{user.email}</strong>.
            </p>
            <p className="text-[#8CA2AD]">
              Your database role is evaluated as <span className="inline-block font-mono font-bold text-amber-400 uppercase bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">[{role || 'student / user'}]</span>, which does not possess access permissions for the HackHere Admin Portal.
            </p>
          </div>

          <p className="text-xs text-[#8CA2AD] leading-relaxed">
            If you are a member of the HackHere core team, please request an administrator to promote your account to the <code className="text-[#61C8D4] font-mono">admin</code> or <code className="text-[#61C8D4] font-mono">super_admin</code> role in the database.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 py-3 px-4 rounded-full bg-[#263640] hover:bg-[#344550] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Website
            </Link>
            <button
              onClick={handleSignOut}
              className="flex-1 py-3 px-4 rounded-full border border-red-800/60 hover:bg-red-950/40 text-red-300 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // State 5: Fully authorized admin or super_admin
  const contextValue = {
    user,
    profile,
    role,
    isSuperAdmin: role === 'super_admin',
    refreshProfile: verifyAdminAccess,
  };

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
}
