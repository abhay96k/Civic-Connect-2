import React from 'react';
import { Cpu, Bell, Shield, Sparkles } from 'lucide-react';

export default function MobileHeader({ activeScreen, setActiveScreen }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveScreen('home')}
        className="flex items-center gap-2.5 cursor-pointer group"
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

      {/* Right Header Status & Notification Icon */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[10px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>99.8% AI</span>
        </div>

        <button 
          onClick={() => setActiveScreen('dashboard')}
          className="relative p-2 rounded-xl bg-zinc-100 border border-black/10 text-black hover:bg-zinc-200 transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
        </button>
      </div>
    </header>
  );
}
