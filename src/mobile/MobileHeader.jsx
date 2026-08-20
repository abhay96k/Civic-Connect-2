import React from 'react';
import { Cpu, Bell, LogIn, LogOut, ShieldCheck, Lock } from 'lucide-react';

export default function MobileHeader({ activeScreen, setActiveScreen, isLoggedIn, userRole, onLogout }) {
  const getRoleLabel = (role) => {
    switch (role) {
      case 'citizen': return 'Citizen';
      case 'construction': return 'Contractor';
      case 'ambulance': return 'EMS Unit';
      case 'police': return 'Traffic Police';
      default: return 'Authenticated';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Brand Logo */}
      <div 
        onClick={() => {
          if (isLoggedIn) setActiveScreen('home');
        }}
        className={`flex items-center gap-2.5 ${isLoggedIn ? 'cursor-pointer group' : 'cursor-default'}`}
      >
        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
          <Cpu className="w-4 h-4 text-white animate-pulse" />
        </div>
        <div>
          <div className="font-space font-bold text-sm tracking-wider text-black flex items-center gap-1">
            ROAD<span className="text-zinc-500">VISION</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-black text-white font-mono">AI</span>
          </div>
        </div>
      </div>

      {/* Right Header Status & Auth Button */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{getRoleLabel(userRole)}</span>
            </span>

            <button 
              onClick={onLogout}
              title="Log Out"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 border border-black/10 text-zinc-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-[10px] font-space font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold text-amber-700">
            <Lock className="w-3 h-3 text-amber-600 animate-pulse" />
            <span>AUTHENTICATION REQUIRED</span>
          </div>
        )}
      </div>
    </header>
  );
}

