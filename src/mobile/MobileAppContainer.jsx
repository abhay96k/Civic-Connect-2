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
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'iphone' | 'fullscreen'
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
    <div className="min-h-screen bg-white md:bg-zinc-100 md:py-6 md:px-4 flex flex-col items-center justify-start font-inter relative">
      {/* Top Desktop View Mode Switcher Toolbar */}
      <div className="hidden md:flex w-full max-w-5xl mb-4 items-center justify-between glass-panel px-5 py-2.5 bg-white/90 backdrop-blur-md border border-black/10 shadow-sm z-50 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-space font-bold text-black tracking-wide block leading-none">CIVICCONNECT PLATFORM</span>
            <span className="text-[10px] font-mono text-zinc-400">Enterprise AI Urban Safety Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-100/80 p-1 rounded-xl border border-black/5">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-space font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'desktop' ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop Portal
          </button>
          <button
            onClick={() => setViewMode('iphone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-space font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'iphone' ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> iPhone Frame
          </button>
        </div>
      </div>

      {/* Main Responsive Wrapper */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {/* DESKTOP SPLIT VIEW MODE (On desktop screens when viewMode === 'desktop') */}
        {viewMode === 'desktop' ? (
          <div className="w-full max-w-5xl hidden md:grid md:grid-cols-12 bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden min-h-[680px]">
            {/* Left Column: Visual Showcase & Brand Highlights */}
            <div className="md:col-span-6 lg:col-span-7 bg-zinc-950 text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
              {/* Glowing Background Gradients */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Brand Top Info */}
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-emerald-400 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>CIVICCONNECT 2.0 • LIVE AI SYSTEM</span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-space font-bold tracking-tight text-white leading-tight">
                  Smart Traffic & Municipal AI Network
                </h1>
                <p className="text-sm text-zinc-400 font-normal max-w-md leading-relaxed">
                  Real-time pothole detection, emergency EMS priority routing, CCTV hazard stream control, and civic ward reporting.
                </p>
              </div>

              {/* Enterprise Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-3 my-6 relative z-10">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold font-space text-white">AI Detection Feed</h4>
                  <p className="text-[10px] text-zinc-400">Automated road hazard scanning & confidence scoring.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold font-space text-white">EMS Emergency Routing</h4>
                  <p className="text-[10px] text-zinc-400">Green corridor signal override & bump avoidance.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Signal className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold font-space text-white">Contractor Dispatch</h4>
                  <p className="text-[10px] text-zinc-400">Asphalt stock management & automated crew dispatch.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Battery className="w-4 h-4 fill-rose-400" />
                  </div>
                  <h4 className="text-xs font-bold font-space text-white">Traffic Police CCTV</h4>
                  <p className="text-[10px] text-zinc-400">18 Live camera streams & speed flow monitoring.</p>
                </div>
              </div>

              {/* Bottom Live Metrics Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 256-Bit SSL Enforced
                </span>
                <span>Ward 12 Central Command</span>
              </div>
            </div>

            {/* Right Column: Auth Container / Main App Component */}
            <div className="md:col-span-6 lg:col-span-5 bg-white flex flex-col justify-between overflow-y-auto max-h-[720px]">
              {isLoggedIn && (
                <MobileHeader 
                  activeScreen={activeScreen} 
                  setActiveScreen={setActiveScreen} 
                  isLoggedIn={isLoggedIn}
                  userRole={userRole}
                  onLogout={handleLogout}
                />
              )}

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLoggedIn ? activeScreen : 'login'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-full w-full"
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {isLoggedIn && (
                <MobileTabBar 
                  activeScreen={activeScreen} 
                  setActiveScreen={setActiveScreen} 
                  isLoggedIn={isLoggedIn}
                />
              )}
            </div>
          </div>
        ) : null}

        {/* MOBILE & SIMULATOR VIEW MODE (Used on Mobile Phones OR when iPhone/Fullscreen mode selected) */}
        <div className={`w-full ${viewMode === 'desktop' ? 'block md:hidden' : 'block'} md:max-w-[420px] min-h-screen md:min-h-0 relative flex flex-col justify-between bg-white overflow-hidden`}>
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

            {/* Native Mobile Top App Header */}
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

            {/* Rendered Mobile Screen Body */}
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

            {/* Native Mobile Bottom Tab Bar */}
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
    </div>
  );
}
