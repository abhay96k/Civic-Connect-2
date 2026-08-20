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
import LoginScreen from './screens/LoginScreen';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function MobileAppContainer() {
  const [activeScreen, setActiveScreen] = useState('login');
  const [viewMode, setViewMode] = useState('iphone'); // 'iphone' or 'fullscreen'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveScreen('login');
  };

  const renderScreen = () => {
    // Strict Auth Guard: If not logged in, ALWAYS render LoginScreen
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'map':
        return <MapScreen />;
      case 'cctv':
        return <CctvScreen />;
      case 'dashboard':
        return <DashboardScreen userRole={userRole} onLogout={handleLogout} />;
      case 'report':
        return <ReportScreen />;
      case 'diagnostic':
        return <DiagnosticScreen />;
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="h-screen md:min-h-screen bg-white md:bg-zinc-200 md:py-6 md:px-4 flex flex-col items-center justify-start font-inter relative overflow-hidden md:overflow-visible">
      {/* Top View Mode Toolbar - Only visible on Desktop / Laptop Screens */}
      <div className="hidden md:flex w-full max-w-lg mb-4 items-center justify-between glass-panel px-4 py-2 bg-white/95 border border-black/10 shadow-sm z-50 rounded-2xl">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-black" />
          <span className="text-xs font-space font-bold text-black">DESKTOP MOBILE SIMULATOR</span>
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

      {/* Main Container - Full Bleed Native App on Mobile, Simulator Frame on Desktop */}
      <div className="w-full md:max-w-[420px] h-full md:h-auto relative flex flex-col justify-between bg-white overflow-hidden">
        {/* On Desktop with iPhone Chassis Mode */}
        <div className={`w-full h-full flex flex-col justify-between overflow-hidden ${
          viewMode === 'iphone'
            ? 'md:rounded-[54px] md:border-[12px] md:border-zinc-900 md:bg-white md:shadow-[0_25px_70px_rgba(0,0,0,0.35)] md:h-[840px]'
            : 'md:rounded-3xl md:border md:border-black/10 md:shadow-xl md:h-[800px]'
        }`}>
          
          {/* Side Hardware Buttons (Desktop simulator only) */}
          {viewMode === 'iphone' && (
            <>
              <div className="hidden md:block absolute -left-[16px] top-24 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
              <div className="hidden md:block absolute -left-[16px] top-40 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
              <div className="hidden md:block absolute -right-[16px] top-32 w-[4px] h-16 bg-zinc-800 rounded-r-md" />
            </>
          )}

          {/* Top iOS Status Bar (Only in desktop simulator mode, hidden on actual mobile devices) */}
          {viewMode === 'iphone' && (
            <div className="hidden md:flex bg-white/95 backdrop-blur-md pt-3 px-6 pb-1.5 items-center justify-between border-b border-black/5 flex-shrink-0">
              <span className="text-[11px] font-bold font-mono text-black">9:41</span>
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
          )}

          {/* Native Mobile Top App Header - Only render when logged in */}
          {isLoggedIn && (
            <div className="flex-shrink-0 sticky top-0 z-40">
              <MobileHeader 
                activeScreen={activeScreen} 
                setActiveScreen={setActiveScreen} 
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                onLogout={handleLogout}
              />
            </div>
          )}

          {/* Rendered Mobile Screen Body - Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-0 scrollbar-none bg-white relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoggedIn ? activeScreen : 'login'}
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

          {/* Native Mobile Bottom Tab Bar - Pinned firmly at bottom when logged in */}
          {isLoggedIn && (
            <div className="flex-shrink-0 bg-transparent sticky bottom-0 z-50">
              <MobileTabBar 
                activeScreen={activeScreen} 
                setActiveScreen={setActiveScreen} 
                isLoggedIn={isLoggedIn}
              />
              {viewMode === 'iphone' && (
                <div className="hidden md:block w-28 h-1 bg-zinc-400 rounded-full mx-auto mb-1.5 -mt-2" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

