import React from 'react';
import { Home, MapPin, Plus, Eye, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileTabBar({ activeScreen, setActiveScreen, isLoggedIn }) {
  if (!isLoggedIn) {
    return null; // Do not render tab bar until user logs in
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'report', label: 'Report', icon: Plus, isCenter: true },
    { id: 'cctv', label: 'CCTV', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-1 flex justify-center items-end pointer-events-none">
      {/* Sleek Glassmorphic Floating Nav Pill Container */}
      <div className="pointer-events-auto relative w-full max-w-sm bg-white/80 backdrop-blur-3xl rounded-full px-4 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] border border-white/90 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          if (item.isCenter) {
            return (
              <div key={item.id} className="relative -mt-6 z-10 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-2 border-white transition-all cursor-pointer ${
                    isActive ? 'ring-4 ring-black/20' : ''
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </motion.button>
                <span className={`text-[9px] font-semibold tracking-tight mt-0.5 transition-colors ${isActive ? 'text-black font-bold' : 'text-zinc-500'}`}>
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-all cursor-pointer ${
                isActive ? 'text-black font-bold scale-105' : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[9px] font-medium tracking-tight mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
