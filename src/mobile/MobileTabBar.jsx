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
    <div className="w-full px-4 pb-4 pt-1 flex justify-center items-end pointer-events-none relative z-50">
      {/* Floating Detached Container */}
      <div className="pointer-events-auto relative w-full max-w-sm bg-white rounded-[32px] px-3 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-zinc-100 flex items-center justify-around">
        
        {/* Smooth Top-Center Curve Notch */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-5 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 80 20" className="w-full h-full fill-white filter drop-shadow-[0_-2px_3px_rgba(0,0,0,0.03)]">
            <path d="M0 20 Q 20 20, 26 12 Q 40 -4, 54 12 Q 60 20, 80 20 Z" />
          </svg>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          if (item.isCenter) {
            return (
              <div key={item.id} className="relative -mt-6 z-10 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.12, rotate: 90 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-[0_8px_22px_rgba(99,102,241,0.5)] border-2 border-white transition-all cursor-pointer ${
                    isActive ? 'ring-4 ring-indigo-300' : ''
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </motion.button>
                <span className={`text-[10px] font-medium tracking-tight mt-0.5 transition-colors ${isActive ? 'text-indigo-600 font-bold' : 'text-zinc-500'}`}>
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-colors cursor-pointer group ${
                isActive ? 'text-indigo-600 font-bold' : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm"
                  />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 transition-colors">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

