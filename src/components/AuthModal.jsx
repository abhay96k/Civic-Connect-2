import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, Mail, User, ShieldCheck, Eye, EyeOff, Sparkles, 
  Building2, Zap, CheckCircle2, ArrowRight, ShieldAlert, Cpu
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithCredentials, signup, loginWithDemo, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup' | 'demo'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsAuthModalOpen(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    const result = await loginWithCredentials(email, password);
    if (result.success) {
      setSuccessMessage(`Welcome back, ${result.user.name}!`);
    } else {
      setErrorMessage(result.error || 'Failed to authenticate. Please check credentials.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const result = await signup({ name, email, password, role });
    if (result.success) {
      setSuccessMessage(`Account created successfully! Welcome, ${result.user.name}.`);
    } else {
      setErrorMessage(result.error || 'Account creation failed.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Auth Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-md z-10 bg-zinc-950/90 text-white border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden"
        >
          {/* Ambient Glow Effects */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 text-black flex items-center justify-center shadow-lg font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-space text-xl font-bold tracking-tight text-white flex items-center gap-2">
                RoadVision <span className="text-emerald-400 font-mono text-sm px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">Auth</span>
              </h2>
              <p className="text-xs text-zinc-400 font-inter">Secure Civic Portal Access</p>
            </div>
          </div>

          {/* Navigation Segmented Switcher */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 mb-6">
            <button
              onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
              className={`py-2 text-xs font-space font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'signin' ? 'bg-white text-black shadow-md font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
              className={`py-2 text-xs font-space font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'signup' ? 'bg-white text-black shadow-md font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setActiveTab('demo'); setErrorMessage(''); }}
              className={`py-2 text-xs font-space font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'demo' ? 'bg-emerald-400 text-black shadow-md font-bold' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Zap className="w-3 h-3 fill-current" />
              Demo Roles
            </button>
          </div>

          {/* Messages */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-inter flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-inter flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="citizen@roadvision.ai"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0" />
                  <span>Remember session</span>
                </label>
                <button type="button" onClick={() => setActiveTab('demo')} className="text-emerald-400 hover:underline">
                  Quick Demo Login?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-space font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: SIGN UP */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@civic.org"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">Role Designation</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition-all cursor-pointer"
                >
                  <option value="Citizen">Citizen Reporter</option>
                  <option value="Municipal Official">Municipal Officer / Ward Engineer</option>
                  <option value="Contractor">Infrastructure Contractor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create strong password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-space font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: DEMO QUICK ROLES */}
          {activeTab === 'demo' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 font-inter mb-3">
                Select a pre-configured role to immediately test application capabilities and permissions:
              </p>

              {/* Citizen */}
              <button
                onClick={() => loginWithDemo('citizen')}
                className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={DEMO_ACCOUNTS.citizen.avatar}
                    alt="Citizen"
                    className="w-10 h-10 rounded-full object-cover border border-emerald-400/40"
                  />
                  <div>
                    <h4 className="text-sm font-space font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {DEMO_ACCOUNTS.citizen.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{DEMO_ACCOUNTS.citizen.role} • Report Potholes & View Feed</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  Citizen
                </div>
              </button>

              {/* Municipal Official */}
              <button
                onClick={() => loginWithDemo('official')}
                className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={DEMO_ACCOUNTS.official.avatar}
                    alt="Official"
                    className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                  />
                  <div>
                    <h4 className="text-sm font-space font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {DEMO_ACCOUNTS.official.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{DEMO_ACCOUNTS.official.role} • Ward Dispatch & Repairs</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold">
                  Official
                </div>
              </button>

              {/* Admin */}
              <button
                onClick={() => loginWithDemo('admin')}
                className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={DEMO_ACCOUNTS.admin.avatar}
                    alt="Admin"
                    className="w-10 h-10 rounded-full object-cover border border-purple-400/40"
                  />
                  <div>
                    <h4 className="text-sm font-space font-bold text-white group-hover:text-purple-400 transition-colors">
                      {DEMO_ACCOUNTS.admin.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{DEMO_ACCOUNTS.admin.role} • Full System Control</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-mono font-bold">
                  Admin
                </div>
              </button>
            </div>
          )}

          {/* Footer Terms */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-zinc-500">
              Protected by RoadVision AI 256-bit encryption & Supabase Auth.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
