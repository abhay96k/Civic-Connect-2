import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileHeader from './MobileHeader';
import MobileTabBar from './MobileTabBar';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CctvScreen from './screens/CctvScreen';
import DashboardScreen from './screens/DashboardScreen';
import ReportScreen from './screens/ReportScreen';
import DiagnosticScreen from './screens/DiagnosticScreen';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function MobileAppContainer() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [viewMode, setViewMode] = useState('iphone'); // 'iphone' or 'fullscreen'

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'map':
        return <MapScreen />;
      case 'cctv':
        return <CctvScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'report':
        return <ReportScreen />;
      case 'diagnostic':
        return <DiagnosticScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 py-4 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-start font-inter relative">
      {/* Top View Mode Toolbar */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between glass-panel px-4 py-2 bg-white/95 border border-black/10 shadow-sm z-50 rounded-2xl">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-black" />
          <span className="text-xs font-space font-bold text-black">NATIVE MOBILE APP</span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-black/10">
          <button
            onClick={() => setViewMode('iphone')}
            className={`px-3 py-1 rounded-lg text-[10px] font-space font-bold transition-all flex items-center gap-1 ${
              viewMode === 'iphone' ? 'bg-black text-white shadow' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Smartphone className="w-3 h-3" /> iPhone Chassis
          </button>
          <button
            onClick={() => setViewMode('fullscreen')}
            className={`px-3 py-1 rounded-lg text-[10px] font-space font-bold transition-all flex items-center gap-1 ${
              viewMode === 'fullscreen' ? 'bg-black text-white shadow' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Monitor className="w-3 h-3" /> Mobile Screen
          </button>
        </div>
      </div>

      {/* Main Native Mobile Container */}
      <div className={viewMode === 'iphone' ? 'w-full max-w-[420px] relative' : 'w-full max-w-md relative'}>
        {viewMode === 'iphone' ? (
          /* iPhone 16 Pro Chassis Frame */
          <div className="relative rounded-[54px] border-[12px] border-zinc-900 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden h-[840px] flex flex-col justify-between">
            {/* Side Hardware Buttons */}
            <div className="absolute -left-[16px] top-24 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
            <div className="absolute -left-[16px] top-40 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
            <div className="absolute -right-[16px] top-32 w-[4px] h-16 bg-zinc-800 rounded-r-md" />

            {/* Top iOS Status Bar with Dynamic Island */}
            <div className="bg-white/95 backdrop-blur-md pt-3 px-6 pb-1.5 flex items-center justify-between border-b border-black/5 flex-shrink-0">
              <span className="text-[11px] font-bold font-mono text-black">9:41</span>

              {/* Dynamic Island Notch */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 space-x-1 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-zinc-900" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5 text-black">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4 fill-black" />
              </div>
            </div>

            {/* Native Mobile Top App Header */}
            <div className="flex-shrink-0">
              <MobileHeader activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            </div>

            {/* Rendered Mobile Screen Body - Smooth Animated Container */}
            <div className="flex-1 overflow-y-auto p-0 scrollbar-none bg-white relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-full w-full"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Native Mobile Bottom Tab Bar Pinned inside Chassis */}
            <div className="flex-shrink-0 bg-transparent">
              <MobileTabBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
              {/* iOS Home Bar Indicator */}
              <div className="w-28 h-1 bg-zinc-400 rounded-full mx-auto mb-1.5 -mt-2" />
            </div>
          </div>
        ) : (
          /* Full Mobile App Container */
          <div className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden h-[800px] flex flex-col justify-between relative">
            <div className="flex-shrink-0">
              <MobileHeader activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            </div>

            <div className="flex-1 overflow-y-auto p-0 bg-white relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-full w-full"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0 bg-transparent">
              <MobileTabBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
