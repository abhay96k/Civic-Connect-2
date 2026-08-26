import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRole, children, onNavigateRole }) {
  const { user, isAuthModalOpen } = useAuth();

  if (!user) {
    return null; // Will render Login Page
  }

  // Normalize role string matching
  const userRoleNormalized = (user.role || '').toLowerCase();
  const allowedRoleNormalized = (allowedRole || '').toLowerCase();

  const isAllowed = 
    userRoleNormalized.includes(allowedRoleNormalized) || 
    allowedRoleNormalized.includes(userRoleNormalized) ||
    (userRoleNormalized === 'admin' || userRoleNormalized.includes('administrator'));

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-inter">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-space text-2xl font-bold text-white">Access Restricted</h2>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Your account role (<span className="text-emerald-400 font-bold">{user.role}</span>) does not have authorization clearance to access the <span className="text-amber-400 font-bold">{allowedRole}</span> console.
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-zinc-400 text-left space-y-1">
            <p><span className="text-zinc-500">USER:</span> {user.name} ({user.email})</p>
            <p><span className="text-zinc-500">SECURITY PRIVILEGE:</span> {user.role}</p>
            <p><span className="text-zinc-500">REQUESTED GATEWAY:</span> /{allowedRoleNormalized}/dashboard</p>
          </div>

          <button
            onClick={() => onNavigateRole && onNavigateRole(user.role)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-space font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My Allowed Dashboard ({user.role})</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
