import React from 'react';
import { Home, MapPin, Eye, LayoutDashboard, AlertTriangle, Cpu } from 'lucide-react';

export default function MobileTabBar({ activeScreen, setActiveScreen }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'cctv', label: 'CCTV', icon: Eye },
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
    { id: 'report', label: 'Report', icon: AlertTriangle },
    { id: 'diagnostic', label: 'AI Scan', icon: Cpu }
  ];

  return (
    <nav className="w-full bg-black text-white border-t border-white/20 px-2 py-2 shadow-2xl relative z-50">
      <div className="w-full grid grid-cols-6 gap-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveScreen(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-white font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-transparent'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[9px] font-space tracking-tight mt-1 ${
                isActive ? 'text-white font-bold' : 'text-zinc-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
