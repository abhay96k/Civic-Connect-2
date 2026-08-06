import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, HardHat, Ambulance, ShieldAlert, KeyRound, Mail, ArrowRight, ShieldCheck, Cpu, Sparkles, CheckCircle2, Lock
} from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'construction' | 'ambulance' | 'police'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen Portal',
      subtitle: 'Public pothole reports, civic rewards & ward safety',
      icon: User,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Public Access',
      defaultEmail: 'citizen@roadvision.ai',
    },
    {
      id: 'construction',
      title: 'Construction & Repair',
      subtitle: 'Contractor work orders, asphalt stock & crew dispatch',
      icon: HardHat,
      color: 'from-amber-500 to-orange-600',
      badge: 'Municipal Contractor',
      defaultEmail: 'contractor@civic.gov',
    },
    {
      id: 'ambulance',
      title: 'Ambulance EMS',
      subtitle: 'Emergency corridor routing & bump avoidance',
      icon: Ambulance,
      color: 'from-red-600 to-rose-600',
      badge: 'Emergency Response',
      defaultEmail: 'ems-unit102@health.gov',
    },
    {
      id: 'police',
      title: 'Traffic Police',
      subtitle: 'CCTV AI hazard stream, speed flow & detour control',
      icon: ShieldAlert,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Traffic Enforcement',
      defaultEmail: 'officer99@traffic.police.gov',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const targetRole = roles.find((r) => r.id === roleId);
    if (targetRole) {
      setEmail(targetRole.defaultEmail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(selectedRole);
        }
      }, 600);
    }, 1000);
  };

  const activeRoleConfig = roles.find((r) => r.id === selectedRole);

  return (
    <div className="p-4 sm:p-5 space-y-5 animate-fadeIn min-h-full flex flex-col justify-between bg-zinc-50">
      {/* Brand Header */}
      <div className="space-y-1 text-center pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black">
          <Cpu className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>ROADVISION AI SECURITY PORTAL</span>
        </div>
        <h2 className="text-2xl font-space font-bold text-black tracking-tight">
          Select Your Dashboard
        </h2>
        <p className="text-xs text-zinc-500 font-mono">
          Authenticate to launch role-specific municipal command
        </p>
      </div>

      {/* Role Selection Cards Grid */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
          Choose Account Role (4 Dashboards)
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect(role.id)}
                className={`relative p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-white border-black shadow-md ring-2 ring-black/10'
                    : 'bg-white/60 border-black/10 hover:bg-white hover:border-black/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${role.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </motion.div>
                  )}
                </div>

                <div>
                  <h3 className="font-space font-bold text-xs text-black leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-[9px] text-zinc-500 line-clamp-2 leading-tight mt-0.5">
                    {role.subtitle}
                  </p>
                </div>

                <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  {role.badge}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Login Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-black/5">
          <span className="text-xs font-space font-bold text-black flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-black" /> Credentials verification
          </span>
          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r ${activeRoleConfig?.color}`}>
            {activeRoleConfig?.title}
          </span>
        </div>

        <div className="space-y-2">
          {/* Email / Officer ID Input */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1">Official ID / Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@civic.gov"
                className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Security PIN Input */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1">Security PIN / Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password || '••••••••'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-black/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-black focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
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
              <CheckCircle2 className="w-4 h-4" /> Redirecting to Dashboard...
            </span>
          ) : (
            <>
              <span>Launch {activeRoleConfig?.title}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="text-center space-y-1 pt-1">
        <p className="text-[9px] font-mono text-zinc-400">DEMO ACCESS PRESET BUTTONS</p>
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                handleRoleSelect(r.id);
                if (onLoginSuccess) onLoginSuccess(r.id);
              }}
              className="text-[9px] font-mono px-2 py-1 rounded-lg bg-zinc-200/80 hover:bg-black hover:text-white transition-all text-zinc-700 font-semibold cursor-pointer"
            >
              Instant {r.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
