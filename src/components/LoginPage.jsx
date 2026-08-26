import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Mail, Lock, Eye, EyeOff, Check, X, ShieldCheck, 
  Ambulance, Shield, Building2, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithCredentials, signup, loginWithDemo, loading } = useAuth();
  
  // Working Envelope Profiles (Left Side) - 4 Primary Roles
  const profiles = [
    {
      id: 'ambulance',
      roleKey: 'ambulance',
      title: 'Ambulance & Emergency',
      desc: 'Dispatch, patient tracking, and emergency response coordination.',
      icon: Ambulance,
      badge: 'Level 3 Priority',
      defaultEmail: 'ambulance@emergency.gov',
    },
    {
      id: 'traffic',
      roleKey: 'traffic',
      title: 'Traffic Police',
      desc: 'Incident response, traffic routing, and enforcement reporting.',
      icon: Shield,
      badge: 'Enforcement Access',
      defaultEmail: 'police@traffic.gov',
    },
    {
      id: 'constructor',
      roleKey: 'constructor',
      title: 'Constructor',
      desc: 'Infrastructure repairs, road work execution, and maintenance.',
      icon: Building2,
      badge: 'Repair Division',
      defaultEmail: 'constructor@apexinfra.com',
    },
    {
      id: 'citizen',
      roleKey: 'citizen',
      title: 'Citizen',
      desc: 'Civic hazard reporting, neighborhood feed, and pothole tracking.',
      icon: User,
      badge: 'Public Console',
      defaultEmail: 'citizen@roadvision.ai',
    },
  ];

  const [selectedProfileId, setSelectedProfileId] = useState('ambulance');
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  
  // Form State
  const [email, setEmail] = useState('ambulance@emergency.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');
  const [rememberSession, setRememberSession] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleProfileSelect = (prof) => {
    setSelectedProfileId(prof.id);
    setEmail(prof.defaultEmail);
    // Instant demo login simulation if desired
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (authMode === 'signin') {
      const activeProf = profiles.find(p => p.id === selectedProfileId);
      if (activeProf && activeProf.roleKey) {
        // Quick login using profile demo
        loginWithDemo(activeProf.roleKey);
        setSuccessMessage('Authenticated successfully!');
      } else {
        const res = await loginWithCredentials(email, password);
        if (res.success) {
          setSuccessMessage(`Welcome back, ${res.user.name}!`);
        } else {
          setErrorMessage(res.error || 'Authentication failed.');
        }
      }
    } else {
      if (!name) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      const res = await signup({ name, email, password, role: 'Citizen' });
      if (res.success) {
        setSuccessMessage('Account created successfully!');
      } else {
        setErrorMessage(res.error || 'Account creation failed.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-xl p-2 sm:p-6 overflow-y-auto">
        {/* Full-screen Split View Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl min-h-[640px] bg-slate-950 rounded-3xl sm:rounded-[36px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
            title="Close Console"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT HALF: Dark Navy System Profile Selector */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-950 via-zinc-950 to-indigo-950/90 text-white flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

            <div>
              {/* Brand Chip */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <span className="font-space font-bold text-lg tracking-tight text-white">
                  Civic-connect
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-3">
                Choose your <br className="hidden sm:block" /> working envelope.
              </h1>
              <p className="text-sm text-zinc-400 font-inter mb-8 max-w-md leading-relaxed">
                Select your system profile. Your workspace adapts automatically to your security privilege level.
              </p>

              {/* Envelope Selection Cards */}
              <div className="space-y-3.5 max-w-lg">
                {profiles.map((prof) => {
                  const Icon = prof.icon;
                  const isSelected = selectedProfileId === prof.id;

                  return (
                    <motion.div
                      key={prof.id}
                      onClick={() => handleProfileSelect(prof)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'bg-gradient-to-r from-white/15 to-indigo-500/20 border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.25)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl text-white shrink-0 ${isSelected ? 'bg-indigo-600 shadow-md' : 'bg-white/10 text-zinc-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pr-6">
                        <div className="flex items-center gap-2">
                          <h3 className="font-space font-bold text-sm text-white">{prof.title}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                            {prof.badge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-inter mt-1 leading-snug">{prof.desc}</p>
                      </div>

                      {/* Selected Radio Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="hover:text-zinc-300 transition-colors cursor-pointer">Civic-connect Security Protocol</span>
              <span>•</span>
              <span className="hover:text-zinc-300 transition-colors cursor-pointer">System Status: Operational</span>
            </div>
          </div>

          {/* RIGHT HALF: Clean Off-White Card Auth Form */}
          <div className="lg:col-span-6 p-6 sm:p-12 bg-slate-50 text-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Background Decorative Gradient Orbs */}
            <div className="absolute top-8 left-8 w-40 h-40 bg-gradient-to-tr from-purple-200 to-indigo-100 rounded-full blur-2xl opacity-70 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-40 h-40 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-full blur-2xl opacity-70 pointer-events-none" />

            {/* Elevated White Form Box */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80">
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="font-space text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-inter mt-1">
                  {authMode === 'signin' 
                    ? 'Enter your credentials to access your console.' 
                    : 'Register your system credentials for console access.'}
                </p>
              </div>

              {/* Feedback Notifications */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-inter flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-inter flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Officer Rajesh Varma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm font-inter"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-indigo-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="manager@aetheros.io"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm font-inter font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-indigo-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm font-inter font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Session Checkbox & Reset */}
                <div className="flex items-center justify-between text-xs font-inter pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                    />
                    <span>Remember session</span>
                  </label>
                  <button type="button" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                    Forgot password?
                  </button>
                </div>

                {/* Action Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-space font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{authMode === 'signin' ? 'Access System Console' : 'Complete Registration'}</span>
                      <ArrowRight className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Auth Toggle & Support Links */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs font-inter space-y-2">
                <p className="text-slate-600">
                  {authMode === 'signin' ? "Don't have an account? " : "Already registered? "}
                  <button
                    onClick={() => {
                      setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                      setErrorMessage('');
                    }}
                    className="text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
                <p className="text-slate-500">
                  Need console keys?{' '}
                  <button className="text-indigo-600 font-medium hover:underline cursor-pointer">
                    Contact administrator
                  </button>
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
