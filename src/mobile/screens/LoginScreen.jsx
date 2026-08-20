import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  User, HardHat, Ambulance, ShieldAlert, KeyRound, Mail, ArrowRight, 
  ShieldCheck, Cpu, Sparkles, CheckCircle2, Lock, Eye, EyeOff, 
  Fingerprint, Scan, X, Phone, Building2, AlertCircle, RefreshCw, ChevronRight
} from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'construction' | 'ambulance' | 'police'
  const [email, setEmail] = useState('citizen@roadvision.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regWard, setRegWard] = useState('Ward 12 - Central District');
  const [regAgreed, setRegAgreed] = useState(false);

  // Modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen Portal',
      subtitle: 'Public pothole reports, civic rewards & ward safety',
      icon: User,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Public Access',
      defaultEmail: 'citizen@roadvision.ai',
      stats: '4,210 Active Citizens',
    },
    {
      id: 'construction',
      title: 'Contractor Dispatch',
      subtitle: 'Contractor work orders, asphalt stock & crew dispatch',
      icon: HardHat,
      color: 'from-amber-500 to-orange-600',
      badge: 'Municipal Contractor',
      defaultEmail: 'contractor@civic.gov',
      stats: '14 Active Work Orders',
    },
    {
      id: 'ambulance',
      title: 'Ambulance EMS',
      subtitle: 'Emergency corridor routing & bump avoidance',
      icon: Ambulance,
      color: 'from-red-600 to-rose-600',
      badge: 'Emergency Response',
      defaultEmail: 'ems-unit102@health.gov',
      stats: '3 Priority Corridors',
    },
    {
      id: 'police',
      title: 'Traffic Police',
      subtitle: 'CCTV AI hazard stream, speed flow & detour control',
      icon: ShieldAlert,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Traffic Enforcement',
      defaultEmail: 'officer99@traffic.police.gov',
      stats: '18 Live CCTV Feeds',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const targetRole = roles.find((r) => r.id === roleId);
    if (targetRole && authMode === 'login') {
      setEmail(targetRole.defaultEmail);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
      });
    } catch (e) {
      console.log('Confetti failed to trigger', e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(selectedRole);
        }
      }, 700);
    }, 900);
  };

  const handleBiometricAuth = () => {
    setIsBiometricScanning(true);
    setBiometricProgress(0);

    const interval = setInterval(() => {
      setBiometricProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBiometricScanning(false);
            setIsSuccess(true);
            triggerConfetti();
            setTimeout(() => {
              if (onLoginSuccess) {
                onLoginSuccess(selectedRole);
              }
            }, 600);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2200);
  };

  // Password strength calculator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: 'None', score: 0, color: 'bg-zinc-200' };
    if (pwd.length < 5) return { label: 'Weak', score: 1, color: 'bg-red-500' };
    if (pwd.length < 8) return { label: 'Medium', score: 2, color: 'bg-amber-500' };
    return { label: 'Strong', score: 3, color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(password);
  const activeRoleConfig = roles.find((r) => r.id === selectedRole);

  return (
    <div className="p-4 sm:p-5 space-y-4 animate-fadeIn min-h-full flex flex-col justify-between bg-zinc-50 relative">
      {/* Brand Header */}
      <div className="space-y-1.5 text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-700">
          <Cpu className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>ROADVISION AI SECURITY PORTAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
        
        <h2 className="text-2xl font-space font-bold text-black tracking-tight">
          Civic Connect Portal
        </h2>
        <p className="text-xs text-zinc-500 font-mono">
          AI-Powered Municipal Safety & Urban Intelligence
        </p>
      </div>

      {/* Auth Mode Tabs (Sign In / Register) */}
      <div className="flex items-center p-1 bg-zinc-200/80 rounded-2xl border border-black/5">
        <button
          type="button"
          onClick={() => setAuthMode('login')}
          className={`flex-1 py-1.5 text-xs font-space font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            authMode === 'login'
              ? 'bg-white text-black shadow-sm'
              : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Lock className="w-3.5 h-3.5" /> Sign In
        </button>
        <button
          type="button"
          onClick={() => setAuthMode('register')}
          className={`flex-1 py-1.5 text-xs font-space font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            authMode === 'register'
              ? 'bg-white text-black shadow-sm'
              : 'text-zinc-500 hover:text-black'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Register Account
        </button>
      </div>

      {/* Role Selection Cards Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
            Select Dashboard Access Role
          </label>
          <span className="text-[9px] font-mono text-zinc-400">
            {activeRoleConfig?.stats}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect(role.id)}
                className={`relative p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? 'bg-white border-black shadow-md ring-2 ring-black/10'
                    : 'bg-white/70 border-black/10 hover:bg-white hover:border-black/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-tr ${role.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </motion.div>
                  )}
                </div>

                <div>
                  <h3 className="font-space font-bold text-[11px] text-black leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-[8px] text-zinc-500 line-clamp-1 leading-tight mt-0.5">
                    {role.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-black/5 pt-1">
                  <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    {role.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Form (Sign In or Register) */}
      <AnimatePresence mode="wait">
        {authMode === 'login' ? (
          <motion.form
            key="login-form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onSubmit={handleSubmit}
            className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
              <span className="text-xs font-space font-bold text-black flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-black" /> Credentials Verification
              </span>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r ${activeRoleConfig?.color}`}>
                {activeRoleConfig?.title}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Email / Officer ID Input */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Official ID / Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@civic.gov"
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono text-zinc-500 block">Security Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[9px] font-mono font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-9 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Biometric Scan row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-zinc-300 text-black focus:ring-black"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={handleBiometricAuth}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-black hover:text-white text-[10px] font-mono text-zinc-700 transition-all cursor-pointer border border-black/5"
                >
                  <Fingerprint className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Face ID / Touch ID</span>
                </button>
              </div>
            </div>

            {/* Submit Login Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full py-3 rounded-2xl text-white font-space font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r ${activeRoleConfig?.color}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating Credentials...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-white" /> Redirecting to Dashboard...
                </span>
              ) : (
                <>
                  <span>Launch {activeRoleConfig?.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="register-form"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onSubmit={handleSubmit}
            className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
              <span className="text-xs font-space font-bold text-black flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-black" /> Create New Civic Account
              </span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                New User
              </span>
            </div>

            <div className="space-y-2">
              {/* Full Name */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 block mb-1">Contact Phone</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-8 pr-2 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-500 block mb-1">Municipal Ward</label>
                  <select
                    value={regWard}
                    onChange={(e) => setRegWard(e.target.value)}
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl px-2 py-2 text-xs font-mono text-black focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="Ward 12">Ward 12 - Central</option>
                    <option value="Ward 04">Ward 04 - North Coast</option>
                    <option value="Ward 09">Ward 09 - Metro West</option>
                    <option value="Ward 18">Ward 18 - Industrial</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Official Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@civic.gov"
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password with Strength Meter */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Create Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
                
                {/* Strength Meter Bar */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1 bg-zinc-200 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`} />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">
                    Strength: <strong className="text-black">{pwdStrength.label}</strong>
                  </span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={regAgreed}
                    onChange={(e) => setRegAgreed(e.target.checked)}
                    className="rounded border-zinc-300 text-black focus:ring-black"
                  />
                  <span>I agree to Civic Security Protocol & Privacy Policy</span>
                </label>
              </div>
            </div>

            {/* Register Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || isSuccess || !regAgreed}
              className={`w-full py-3 rounded-2xl text-white font-space font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                regAgreed ? `bg-gradient-to-r ${activeRoleConfig?.color}` : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Account Created! Launching...
                </span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Quick Demo Access Bar */}
      <div className="text-center space-y-1.5 pt-1">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px bg-zinc-300 flex-1" />
          <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            INSTANT DEMO PRESETS
          </span>
          <span className="h-px bg-zinc-300 flex-1" />
        </div>

        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                handleRoleSelect(r.id);
                if (onLoginSuccess) onLoginSuccess(r.id);
              }}
              className="text-[9px] font-mono px-2.5 py-1 rounded-lg bg-white border border-black/10 hover:bg-black hover:text-white transition-all text-zinc-700 font-semibold cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${r.color}`} />
              <span>{r.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Forgot Password Modal Overlay */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl p-5 border border-black/10 shadow-2xl w-full max-w-xs space-y-3 relative"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute right-3 top-3 p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-space font-bold text-sm text-black">Reset Security Key</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">We will send an authorization link</p>
                </div>
              </div>

              {forgotSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto animate-bounce" />
                  <p className="text-xs font-space font-bold text-emerald-900">Reset Link Dispatched!</p>
                  <p className="text-[10px] font-mono text-emerald-700">Check official inbox for OTP</p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Enter your registered email</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="officer@civic.gov"
                      className="w-full bg-zinc-50 border border-black/10 rounded-xl px-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-black text-white rounded-xl font-space font-bold text-xs hover:bg-zinc-800 transition-all cursor-pointer"
                  >
                    Send OTP Reset Link
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Biometric Scanning Overlay Modal */}
      <AnimatePresence>
        {isBiometricScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="text-center space-y-4 p-6 bg-zinc-900 border border-white/10 rounded-3xl text-white max-w-xs w-full shadow-2xl relative"
            >
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
                />
                <Fingerprint className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>

              <div>
                <h3 className="font-space font-bold text-base text-white">Biometric Scan Active</h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Place finger or scan Face ID hardware</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-200" 
                  style={{ width: `${biometricProgress}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                {biometricProgress}% Verified
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

