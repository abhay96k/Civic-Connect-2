import React, { useState, useEffect } from 'react';
import WebAppContainer from './components/WebAppContainer';
import MobileAppContainer from './mobile/MobileAppContainer';
import BackgroundEffects from './components/BackgroundEffects';
import { Monitor, Smartphone } from 'lucide-react';

export default function App() {
  // Detect default platform based on window screen width or environment
  const [platformMode, setPlatformMode] = useState(() => {
    return window.innerWidth < 768 ? 'mobile' : 'web';
  });

  // Listen to viewport resizes automatically
  useEffect(() => {
    const handleResize = () => {
      // Auto-update if user resizes window past mobile threshold unless manually overridden
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-inter selection:bg-black selection:text-white relative">
      {/* Background Ambient Glows */}
      <BackgroundEffects />

      {/* Floating Dual Platform Switcher Badge */}
      <div className="fixed top-3 right-3 z-[9999] pointer-events-auto">
        <div className="bg-black/90 backdrop-blur-xl text-white p-1 rounded-full border border-white/20 shadow-2xl flex items-center gap-1">
          <button
            onClick={() => setPlatformMode('web')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              platformMode === 'web'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web Application</span>
            <span className="sm:hidden">Web</span>
          </button>

          <button
            onClick={() => setPlatformMode('mobile')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              platformMode === 'mobile'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile App (Android/iOS)</span>
            <span className="sm:hidden">Mobile</span>
          </button>
        </div>
      </div>

      {/* Render Selected Platform UI */}
      {platformMode === 'web' ? (
        <WebAppContainer onSwitchPlatform={() => setPlatformMode('mobile')} />
      ) : (
        <MobileAppContainer onSwitchPlatform={() => setPlatformMode('web')} />
      )}
    </div>
  );
}
