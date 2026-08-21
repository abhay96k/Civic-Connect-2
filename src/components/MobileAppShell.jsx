import React, { useState } from 'react';
import { 
  Home, MapPin, Eye, LayoutDashboard, AlertTriangle, Cpu, Smartphone, Monitor, Wifi, Battery, Signal, Maximize2 
} from 'lucide-react';

export default function MobileAppShell({ children, activeTab, setActiveTab }) {
  const [deviceFrameMode, setDeviceFrameMode] = useState('iphone'); // 'iphone' or 'fullscreen'

  const bottomTabs = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'cctv', label: 'CCTV AI', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report', icon: AlertTriangle },
    { id: 'analyzer', label: 'Diagnostic', icon: Cpu }
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 py-4 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-start font-inter relative">
      {/* Top Controls Bar */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between glass-panel px-4 py-2 bg-white/90 border border-black/10 shadow-sm z-50">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-black" />
          <span className="text-xs font-space font-bold text-black">MOBILE APP SIMULATOR</span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-black/10">
          <button
            onClick={() => setDeviceFrameMode('iphone')}
            className={`px-3 py-1 rounded-lg text-[10px] font-space font-bold transition-all flex items-center gap-1 ${
              deviceFrameMode === 'iphone' ? 'bg-black text-white shadow' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Smartphone className="w-3 h-3" /> iPhone Chassis
          </button>
          <button
            onClick={() => setDeviceFrameMode('fullscreen')}
            className={`px-3 py-1 rounded-lg text-[10px] font-space font-bold transition-all flex items-center gap-1 ${
              deviceFrameMode === 'fullscreen' ? 'bg-black text-white shadow' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Maximize2 className="w-3 h-3" /> Mobile Screen
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className={deviceFrameMode === 'iphone' ? 'w-full max-w-[430px] relative' : 'w-full max-w-md relative'}>
        {deviceFrameMode === 'iphone' ? (
          /* iPhone 16 Pro Titanium Chassis Frame */
          <div className="relative rounded-[56px] border-[12px] border-zinc-900 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden min-h-[860px] flex flex-col justify-between">
            {/* Side Hardware Buttons */}
            <div className="absolute -left-[16px] top-24 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
            <div className="absolute -left-[16px] top-40 w-[4px] h-12 bg-zinc-800 rounded-l-md" />
            <div className="absolute -right-[16px] top-32 w-[4px] h-16 bg-zinc-800 rounded-r-md" />

            {/* Top iOS Status Bar with Dynamic Island */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md pt-3 px-6 pb-2 flex items-center justify-between border-b border-black/5">
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

            {/* App Screen Content Scroll Area */}
            <div className="flex-1 overflow-y-auto max-h-[780px] pb-24 scrollbar-none">
              {children}
            </div>

            {/* Bottom Home Indicator Bar & Mobile Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-black/10 pt-2 pb-3 px-2 flex flex-col items-center">
              {/* Bottom Mobile Tab Bar */}
              <div className="w-full grid grid-cols-6 gap-1">
                {bottomTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                        isActive
                          ? 'text-black font-bold scale-105'
                          : 'text-zinc-400 hover:text-zinc-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${isActive ? 'bg-black text-white shadow' : ''}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-space tracking-tight mt-0.5">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* iOS Home Bar */}
              <div className="w-28 h-1 bg-black/40 rounded-full mt-2" />
            </div>
          </div>
        ) : (
          /* Full Mobile Screen Container */
          <div className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden min-h-[800px] flex flex-col justify-between relative">
            <div className="flex-1 pb-24">
              {children}
            </div>

            {/* Mobile Tab Bar - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-black/10 py-2 px-2 flex flex-col items-center">
              <div className="w-full grid grid-cols-6 gap-1">
                {bottomTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                        isActive
                          ? 'text-black font-bold scale-105'
                          : 'text-zinc-400 hover:text-zinc-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${isActive ? 'bg-black text-white shadow' : ''}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-space tracking-tight mt-0.5">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
