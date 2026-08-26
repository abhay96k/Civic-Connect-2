import React, { useState } from 'react';
import WebAppContainer from './components/WebAppContainer';
import MobileAppContainer from './mobile/MobileAppContainer';
import BackgroundEffects from './components/BackgroundEffects';
import { AuthProvider } from './context/AuthContext';
import { Monitor, Smartphone } from 'lucide-react';

export default function App() {
  // Detect default platform based on window screen width
  const [platformMode, setPlatformMode] = useState(() => {
    return window.innerWidth < 768 ? 'mobile' : 'web';
  });

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-zinc-900 font-inter selection:bg-black selection:text-white relative overflow-x-hidden">
        {/* Background Ambient Glows */}
        <BackgroundEffects />

        {/* Floating Dual Platform Switcher Badge (Desktop & Mobile Testing View) */}
        <div className="fixed bottom-4 left-4 z-[9999] pointer-events-auto hidden md:flex">
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
              <span>Web App</span>
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
              <span>Mobile App</span>
            </button>
          </div>
        </div>

        {/* Render Selected Platform UI with shared Auth State */}
        {platformMode === 'web' ? (
          <WebAppContainer onSwitchPlatform={() => setPlatformMode('mobile')} />
        ) : (
          <MobileAppContainer onSwitchPlatform={() => setPlatformMode('web')} />
        )}
      </div>
    </AuthProvider>
  );
}
