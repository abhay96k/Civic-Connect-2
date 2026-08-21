import React, { useEffect, useRef, useState } from 'react';
import { AlertOctagon, ArrowRight, Sparkles, MapPin, Eye, LayoutDashboard, Radio, Activity, CheckCircle2 } from 'lucide-react';
import { MOCK_STATS, RECENT_ALERTS } from '../../data/mockData';

export default function HomeScreen({ setActiveScreen }) {
  const [scanCount, setScanCount] = useState(14820);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 space-y-5 animate-fadeIn">
      {/* Top Banner Card */}
      <div className="p-5 rounded-3xl bg-black text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300">
          <Radio className="w-3 h-3 text-white animate-pulse" />
          <span>AI Road Intelligence Operational</span>
        </div>

        <h1 className="text-2xl font-space font-bold leading-tight">
          Smart Road Monitoring & Traffic Management
        </h1>

        <p className="text-xs text-zinc-400 font-inter leading-relaxed">
          Detect potholes in real time, monitor traffic density, and automate municipal repair dispatch.
        </p>

        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('report')}
            className="flex-1 py-3 rounded-xl bg-white text-black font-space font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
          >
            <AlertOctagon className="w-4 h-4 text-red-600" /> Report Hazard
          </button>
          <button
            onClick={() => setActiveScreen('cctv')}
            className="px-4 py-3 rounded-xl bg-zinc-800 text-white font-space font-bold text-xs flex items-center gap-1 hover:bg-zinc-700 active:scale-95 transition-all"
          >
            <Eye className="w-4 h-4" /> Live AI
          </button>
        </div>
      </div>

      {/* Quick Action Mobile Grid */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">QUICK ACTIONS</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveScreen('map')}
            className="p-4 rounded-2xl glass-card-frosted text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center mb-2 shadow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-space font-bold text-black">GIS Spatial Map</p>
            <p className="text-[10px] text-zinc-500 font-mono">Pinpoint Hazards</p>
          </button>

          <button
            onClick={() => setActiveScreen('diagnostic')}
            className="p-4 rounded-2xl glass-card-frosted text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center mb-2 shadow">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs font-space font-bold text-black">AI Scanner</p>
            <p className="text-[10px] text-zinc-500 font-mono">Photo Diagnostics</p>
          </button>
        </div>
      </div>

      {/* Live Telemetry Stats - Frosted Glass */}
      <div className="p-4 rounded-2xl glass-card-frosted grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[9px] font-mono text-zinc-500 font-bold">SCANS/MIN</p>
          <p className="text-base font-space font-bold text-black mt-0.5">{scanCount.toLocaleString()}</p>
        </div>
        <div className="border-x border-zinc-200/80 px-1">
          <p className="text-[9px] font-mono text-zinc-500 font-bold">ROADS</p>
          <p className="text-base font-space font-bold text-black mt-0.5">{MOCK_STATS.monitoredRoadsKm} KM</p>
        </div>
        <div>
          <p className="text-[9px] font-mono text-zinc-500 font-bold">RESOLVED</p>
          <p className="text-base font-space font-bold text-emerald-600 mt-0.5">98.2%</p>
        </div>
      </div>

      {/* Recent Hazard Activity Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">LIVE RECENT ALERTS</p>
          <button 
            onClick={() => setActiveScreen('dashboard')} 
            className="text-[10px] font-mono text-black font-bold flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {RECENT_ALERTS.slice(0, 3).map((alert) => (
            <div 
              key={alert.id} 
              onClick={() => setActiveScreen('map')}
              className="p-3 rounded-2xl glass-card-frosted flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  alert.severity === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'
                }`} />
                <div>
                  <p className="text-xs font-space font-bold text-black">{alert.title}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">{alert.location}</p>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 text-zinc-700 font-bold">
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
