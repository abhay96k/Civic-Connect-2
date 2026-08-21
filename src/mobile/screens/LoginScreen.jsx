import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  User, HardHat, Ambulance, ShieldAlert, Lock, Mail, ArrowRight, 
  Eye, EyeOff, Fingerprint, X, Phone, Globe, Camera, Upload, 
  ChevronDown, CheckCircle2, Navigation
} from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'construction' | 'ambulance' | 'police'
  const [email, setEmail] = useState('citizen@roadvision.ai');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Mumbai');
  const [regAgreed, setRegAgreed] = useState(true);

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
      subtitle: 'Public pothole reports & safety',
      icon: User,
      badge: 'Public Access',
      defaultEmail: 'citizen@roadvision.ai',
      stats: '4,210 Citizens',
    },
    {
      id: 'construction',
      title: 'Contractor',
      subtitle: 'Work orders & crew dispatch',
      icon: HardHat,
      badge: 'Contractor',
      defaultEmail: 'contractor@civic.gov',
      stats: '14 Work Orders',
    },
    {
      id: 'ambulance',
      title: 'Ambulance EMS',
      subtitle: 'Emergency bump avoidance',
      icon: Ambulance,
      badge: 'EMS Unit',
      defaultEmail: 'ems-unit102@health.gov',
      stats: '3 Corridors',
    },
    {
      id: 'police',
      title: 'Traffic Police',
      subtitle: 'CCTV hazard stream & detour',
      icon: ShieldAlert,
      badge: 'Police Dept',
      defaultEmail: 'officer99@traffic.police.gov',
      stats: '18 Feeds Live',
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
        colors: ['#000000', '#2563eb', '#10b981'],
      });
    } catch (e) {
      console.log('Confetti failed to trigger', e);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(selectedRole);
        }
      }, 600);
    }, 800);
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
            }, 500);
          }, 200);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2000);
  };

  const activeRoleConfig = roles.find((r) => r.id === selectedRole);

  return (
    <div className="w-full min-h-full bg-white px-5 py-6 md:py-10 flex flex-col justify-between max-w-md md:max-w-xl mx-auto relative font-inter text-black overflow-y-auto">
      {/* Top Header & Brand Identity */}
      <div className="space-y-4">
        {/* CivicConnect Header Brand */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
            <Navigation className="w-5 h-5 fill-white rotate-45" />
          </div>
          <div>
            <h1 className="font-space font-bold text-lg text-black leading-tight">CivicConnect</h1>
            <p className="text-xs text-zinc-400 font-medium">Civic Services Platform</p>
          </div>
        </div>

        {/* Dynamic Title / Subtitle Header */}
        {authMode === 'login' ? (
          <div className="space-y-1">
            <h2 className="text-3xl font-space font-bold text-black tracking-tight">Welcome back</h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">Sign in to your CivicConnect account</p>
          </div>
        ) : (
          <div className="space-y-1">
            <h2 className="text-3xl font-space font-bold text-black tracking-tight">Create account</h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">Join the smart traffic network</p>
          </div>
        )}

        {/* Tab Switcher ("Sign In" vs "Sign Up") */}
        <div className="flex items-center p-1.5 bg-zinc-100/90 rounded-2xl border border-zinc-200/50">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 text-sm font-space font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-black font-semibold'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 text-sm font-space font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-black font-semibold'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Selector Chip Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Selected Portal
            </span>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold">
              {activeRoleConfig?.stats}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md'
                      : 'glass-card-frosted text-zinc-800 hover:bg-white'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-black'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-bold truncate leading-tight">{r.title.split(' ')[0]}</p>
                    <p className={`text-[8px] truncate ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>{r.badge}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dynamic Form Body */}
      <div className="py-4">
        <AnimatePresence mode="wait">
          {authMode === 'login' ? (
            <motion.form
              key="signin-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {/* Email Address Input */}
              <div className="relative">
                <Mail className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-black cursor-pointer">
                  <div 
                    onClick={() => setRememberMe(!rememberMe)} 
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                      rememberMe ? 'bg-black text-white' : 'border border-zinc-300 bg-white'
                    }`}
                  >
                    {rememberMe && <CheckCircle2 className="w-4 h-4 text-black fill-black stroke-white" />}
                  </div>
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-black hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Solid Black Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-4 rounded-2xl bg-black text-white font-space font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-zinc-800 active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : isSuccess ? (
                  <span>Success! Launching...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-zinc-400 font-medium">or continue with</span>
                </div>
              </div>

              {/* Social Auth Buttons (Google & Apple) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="py-3.5 px-4 bg-zinc-100/90 hover:bg-zinc-200 rounded-2xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="font-bold text-emerald-600 text-base">G</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="py-3.5 px-4 bg-zinc-100/90 hover:bg-zinc-200 rounded-2xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="font-bold text-black text-base"></span>
                  <span>Apple</span>
                </button>
              </div>

              {/* Guest Login */}
              <button
                type="button"
                onClick={() => {
                  if (onLoginSuccess) onLoginSuccess(selectedRole);
                }}
                className="w-full py-3.5 bg-zinc-100/90 hover:bg-zinc-200 rounded-2xl font-semibold text-sm text-black transition-all cursor-pointer"
              >
                Continue as Guest
              </button>

              {/* Biometric Link at Bottom */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleBiometricAuth}
                  className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-black font-medium transition-colors cursor-pointer"
                >
                  <Fingerprint className="w-4 h-4 text-zinc-400" />
                  <span>Biometric login available</span>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="signup-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {/* Full Name */}
              <div className="relative">
                <User className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Username */}
              <div className="relative">
                <User className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Email Address */}
              <div className="relative">
                <Mail className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <Phone className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-12 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-12 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Select City */}
              <div className="relative">
                <Globe className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all font-medium appearance-none"
                >
                  <option value="Mumbai">Select city (Mumbai)</option>
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Dubai">Dubai</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Upload Profile Photo */}
              <div className="relative">
                <Camera className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  placeholder="Upload profile photo"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-zinc-400 cursor-pointer"
                />
              </div>

              {/* ID Verification (optional) */}
              <div className="relative">
                <Upload className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  placeholder="ID verification (optional)"
                  className="w-full bg-zinc-50/80 border border-zinc-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-zinc-400 cursor-pointer"
                />
              </div>

              {/* Terms & Privacy Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 text-xs text-zinc-700 font-medium cursor-pointer">
                  <div 
                    onClick={() => setRegAgreed(!regAgreed)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      regAgreed ? 'bg-black text-white' : 'border border-zinc-300 bg-white'
                    }`}
                  >
                    {regAgreed && <CheckCircle2 className="w-5 h-5 text-black fill-black stroke-white" />}
                  </div>
                  <span>I agree to Terms & Conditions and Privacy Policy</span>
                </label>
              </div>

              {/* Create Account Primary Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess || !regAgreed}
                className={`w-full py-4 rounded-2xl font-space font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  regAgreed ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Creating Account...' : isSuccess ? 'Success! Launching...' : 'Create Account'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Forgot Password Modal Overlay */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl p-5 border border-black/10 shadow-2xl w-full max-w-xs space-y-3 relative text-black"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute right-3 top-3 p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 text-black flex items-center justify-center font-bold">
                  ?
                </div>
                <div>
                  <h3 className="font-space font-bold text-sm text-black">Reset Security Password</h3>
                  <p className="text-[10px] text-zinc-500">Enter your email to get reset OTP</p>
                </div>
              </div>

              {forgotSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto animate-bounce" />
                  <p className="text-xs font-space font-bold text-emerald-900">Reset Link Sent!</p>
                  <p className="text-[10px] text-emerald-700">Check your inbox for security code</p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter registered email"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl font-space font-bold text-xs hover:bg-zinc-800 transition-all cursor-pointer"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Scan Face ID / Fingerprint sensor</p>
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


