import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '@supabase/auth-helpers-react';
import {
  isFirebaseConfigured,
  signInWithFirebase,
  watchFirebaseUser,
} from '../lib/firebaseClient';

export default function AuthForm() {
  const session = useSession();
  const [mode, setMode] = useState('signIn'); // 'signIn', 'signUp', 'forgotPassword'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Redirect if logged in
  useEffect(() => {
    if (session) {
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect') || '/';
      navigate(redirectUrl);
    }
  }, [session, navigate]);

  // Supabase and Firebase are both supported during the migration. Firebase
  // OAuth users must leave the login screen just like Supabase users do.
  useEffect(() => watchFirebaseUser((user) => {
    if (!user) return;
    setMessage(null);
    const params = new URLSearchParams(window.location.search);
    navigate(params.get('redirect') || '/', { replace: true });
  }), [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    setMessage(null);
    try {
      await signInWithFirebase(provider);
      const params = new URLSearchParams(window.location.search);
      navigate(params.get('redirect') || '/');
    } catch (error) {
      const cancelled = error.code === 'auth/popup-closed-by-user';
      const unauthorizedDomain = error.code === 'auth/unauthorized-domain';
      const providerDisabled = error.code === 'auth/operation-not-allowed';
      const errorText = cancelled
        ? 'Sign-in window was closed.'
        : unauthorizedDomain
          ? 'This address is not authorized. Open the app at localhost:5173 and try again.'
          : providerDisabled
            ? 'This sign-in provider is not enabled in Firebase yet.'
          : error.message;
      setMessage(`Error: ${errorText}`);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => handleSocialSignIn('google');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured) {
        throw new Error('Email sign-in is not configured yet. Add your Supabase project URL and anonymous key to .env.');
      }
      if (mode === 'forgotPassword') {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage('Password reset link sent! Check your email.');
      } else if (mode === 'signUp') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        setMessage('Verification confirmation sent! Check your email inbox.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
    setMessage(null);
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-[#F4FAFB] flex items-center justify-center p-6 sm:p-8 pt-36 pb-20 selection:bg-[#080B10] selection:text-[#61C8D4]">
      
      <div className="w-full max-w-md">
        
        {/* Minimalist Dark Cypress Card Container Centered on #F4FAFB Pastel Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#080B10] text-white border-2 border-[#263640] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          <div className="relative z-10 space-y-2 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#111820] flex items-center justify-center border border-[#263640]">
                <Sparkles className="w-4 h-4 text-[#61C8D4]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Hack<span className="italic text-[#61C8D4]">Here</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
              {mode === 'signIn' && 'Welcome Back'}
              {mode === 'signUp' && 'Create Builder Account'}
              {mode === 'forgotPassword' && 'Reset Password'}
            </h2>
            <p className="text-xs text-[#8CA2AD] font-light">
              {mode === 'signIn' && 'Sign in to join events, manage your profile, and connect with the community.'}
              {mode === 'signUp' && 'Join 3,500+ builders shipping real-world software.'}
              {mode === 'forgotPassword' && 'Enter your email to receive recovery instructions.'}
            </p>
          </div>

          {/* Social OAuth Providers */}
          {mode !== 'forgotPassword' && (
            <div className="relative z-10 space-y-2 pt-2">
              {!isFirebaseConfigured && (
                <div className="rounded-xl border border-[#61C8D4]/40 bg-[#61C8D4]/10 px-4 py-3 text-center text-[11px] leading-relaxed text-[#61C8D4]">
                  Social sign-in is awaiting Firebase project credentials.
                </div>
              )}
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={loading || !isFirebaseConfigured}
                className="w-full py-3 px-4 rounded-xl bg-[#111820] border border-[#263640] hover:border-[#61C8D4] disabled:opacity-45 disabled:cursor-not-allowed text-xs font-mono font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-.9.2-1.7.4-2.4L1.9 6.7C.7 9.1 0 10.5 0 12c0 2.5.7 4.9 1.9 7.3l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z" />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>

              <div className="relative py-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#263640]" />
                </div>
                <span className="relative bg-[#080B10] px-3 text-[10px] font-mono text-[#8CA2AD] uppercase">
                  or continue with email
                </span>
              </div>
            </div>
          )}

          {/* Error / Success Alerts */}
          {message && (
            <div className={`p-3 rounded-xl text-xs font-mono border ${message.startsWith('Error') ? 'bg-red-950/40 text-red-300 border-red-800' : 'bg-emerald-950/40 text-[#61C8D4] border-emerald-800'}`}>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4 text-xs font-sans">
            <div>
              <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="builder@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgotPassword' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono text-[#8CA2AD] uppercase block">
                    Password
                  </label>
                  {mode === 'signIn' && (
                    <button
                      type="button"
                      onClick={() => toggleMode('forgotPassword')}
                      className="text-[10px] font-mono text-[#61C8D4] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#111820] border border-[#263640] text-white focus:outline-none focus:border-[#61C8D4] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA2AD] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                disabled={loading}
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#61C8D4] text-[#080B10] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>
                      {mode === 'signIn' && 'SIGN IN'}
                      {mode === 'signUp' && 'CREATE ACCOUNT'}
                      {mode === 'forgotPassword' && 'SEND RECOVERY LINK'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Mode Switcher */}
          <div className="relative z-10 pt-4 border-t border-[#263640] text-center text-xs text-[#8CA2AD]">
            {mode === 'signIn' && (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => toggleMode('signUp')}
                  className="text-[#61C8D4] font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            )}
            {mode === 'signUp' && (
              <p>
                Already registered?{' '}
                <button
                  onClick={() => toggleMode('signIn')}
                  className="text-[#61C8D4] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
            {mode === 'forgotPassword' && (
              <button
                onClick={() => toggleMode('signIn')}
                className="text-[#61C8D4] font-bold hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            )}
          </div>

        </motion.div>

      </div>

    </div>
  );
}
