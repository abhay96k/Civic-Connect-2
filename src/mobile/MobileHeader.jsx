import React from 'react';
import { Cpu, Bell, LogIn } from 'lucide-react';

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

      {/* Right Header Status & Login Button */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveScreen('login')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-space font-bold transition-all cursor-pointer ${
            activeScreen === 'login'
              ? 'bg-black text-white border-black shadow-xs'
              : 'bg-zinc-100 text-black border-black/10 hover:bg-zinc-200'
          }`}
        >
          <LogIn className="w-3 h-3" />
          <span>Login / Roles</span>
        </button>

        <button 
          onClick={() => setActiveScreen('dashboard')}
          className="relative p-2 rounded-xl bg-zinc-100 border border-black/10 text-black hover:bg-zinc-200 transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
        </button>
      </div>
    </header>
  );
}
