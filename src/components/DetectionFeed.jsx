import React, { useState, useEffect } from 'react';
import { CCTV_FEEDS } from '../data/mockData';
import { Video, Camera, Cpu, Zap, Activity, Eye, ShieldAlert, Sparkles, Layers, Sliders } from 'lucide-react';

export default function DetectionFeed() {
  const [selectedFeed, setSelectedFeed] = useState(CCTV_FEEDS[0]);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showConfidence, setShowConfidence] = useState(true);
  const [simulatedTrigger, setSimulatedTrigger] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    // Slight random FPS fluctuation
    const interval = setInterval(() => {
      setFps(59 + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerManualScan = () => {
    setSimulatedTrigger(true);
    setTimeout(() => setSimulatedTrigger(false), 3000);
  };

  return (
    <section id="cctv" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black mb-2">
            <Video className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>REAL-TIME AI VISION ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
            Live AI Camera Feed & Bounding Overlay
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerManualScan}
            className="px-4 py-2.5 rounded-full bg-black text-white font-space font-bold text-xs flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Trigger AI Scan Event
          </button>
        </div>
      </div>

      {/* Main Vision Interface Grid */}
      <div className="grid lg:grid-cols-12 gap-6 glass-panel p-4 sm:p-6 border border-black/10 bg-white/80 shadow-xl relative">
        {/* Stream Selector & Controls Panel */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-4 rounded-xl bg-zinc-50 border border-black/10">
            <p className="text-xs font-mono text-zinc-600 mb-3 flex items-center gap-2 font-bold">
              <Camera className="w-4 h-4 text-black" />
              <span>SELECT CAMERA FEED NODE</span>
            </p>

            <div className="space-y-2">
              {CCTV_FEEDS.map((feed) => {
                const isSelected = selectedFeed.id === feed.id;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setSelectedFeed(feed)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white border-black/10 hover:border-black/30 text-black'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-space font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
                        {feed.name}
                      </p>
                      <p className={`text-[10px] font-mono ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {feed.district} • {feed.resolution}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-white text-black' : 'bg-black/10 text-emerald-700'
                      }`}>
                        ONLINE
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Overlay Controls */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-black/10 space-y-3">
            <p className="text-xs font-mono text-zinc-600 flex items-center gap-2 font-bold">
              <Sliders className="w-4 h-4 text-black" />
              <span>NEURAL OVERLAY CONFIG</span>
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-800 font-inter font-medium">Show Bounding Boxes</span>
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className={`w-11 h-6 rounded-full transition-colors relative ${showBoundingBoxes ? 'bg-black' : 'bg-zinc-300'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${showBoundingBoxes ? 'translate-x-5 bg-white' : 'translate-x-0 bg-zinc-600'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-800 font-inter font-medium">Display Confidence Scores</span>
              <button
                onClick={() => setShowConfidence(!showConfidence)}
                className={`w-11 h-6 rounded-full transition-colors relative ${showConfidence ? 'bg-black' : 'bg-zinc-300'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${showConfidence ? 'translate-x-5 bg-white' : 'translate-x-0 bg-zinc-600'}`} />
              </button>
            </div>
          </div>

          {/* Stream Telemetry Card */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-black/10 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-mono text-zinc-500">ACTIVE VEHICLES</p>
              <p className="text-lg font-space font-bold text-black mt-0.5">{selectedFeed.activeVehicles}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500">POTHOLES IN VIEW</p>
              <p className="text-lg font-space font-bold text-red-600 mt-0.5">{selectedFeed.potholesInView}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500">CONGESTION RATE</p>
              <p className="text-xs font-space font-bold text-black mt-0.5">{selectedFeed.congestion}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500">STREAM FPS</p>
              <p className="text-xs font-space font-bold text-emerald-600 mt-0.5">{fps} FPS Stable</p>
            </div>
          </div>
        </div>

        {/* Video Canvas Feed & Bounding Overlay */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-black/15 bg-black min-h-[400px] lg:min-h-[500px] flex flex-col justify-between text-white">
          {/* Background Camera Image */}
          <img
            src={selectedFeed.streamUrl}
            alt={selectedFeed.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Laser Scanning line animation */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#FFFFFF] animate-laser-scan pointer-events-none" />

          {/* Manual Trigger Scan Beam Flash */}
          {simulatedTrigger && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center animate-pulse">
              <div className="glass-panel-dark p-6 border border-white/40 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-spin" />
                <p className="text-sm font-space font-bold text-white">EXECUTING NEURAL SCAN PASS...</p>
                <p className="text-xs text-zinc-300 font-mono">Re-evaluating road surface depth & vector tensors</p>
              </div>
            </div>
          )}

          {/* Bounding Boxes Layer */}
          {showBoundingBoxes && selectedFeed.boxes.map((box) => (
            <div
              key={box.id}
              style={{
                top: `${box.y}%`,
                left: `${box.x}%`,
                width: `${box.w}%`,
                height: `${box.h}%`
              }}
              className={`absolute border-2 rounded transition-all pointer-events-none z-20 ${
                box.type === 'pothole'
                  ? 'border-red-500 bg-red-500/15 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'border-white/80 bg-white/10'
              }`}
            >
              {/* Bounding Box Label Tag */}
              {showConfidence && (
                <div className={`absolute -top-6 left-0 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap border flex items-center gap-1.5 ${
                  box.type === 'pothole'
                    ? 'bg-red-950 text-white border-red-500'
                    : 'bg-black/90 text-white border-white/40'
                }`}>
                  <span className="font-bold">{box.label}</span>
                  <span className="text-zinc-400">({box.conf})</span>
                  {box.speed && <span className="text-emerald-400">{box.speed}</span>}
                </div>
              )}

              {/* Corner Reticle Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
            </div>
          ))}

          {/* Top Video Header */}
          <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="font-space font-bold text-sm text-white">{selectedFeed.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">LIVE CCTV</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">4K AI NEURAL</span>
            </div>
          </div>

          {/* Bottom Telemetry Overlay Footer */}
          <div className="relative z-10 p-4 glass-panel-dark border-t border-white/20 bg-black/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
              <span>LATENCY: <strong className="text-emerald-400">12ms</strong></span>
              <span className="hidden sm:inline">GPU LOAD: <strong className="text-white">34%</strong></span>
              <span className="hidden sm:inline">MODEL: <strong className="text-cyan-400">YOLOv8-Road-v4</strong></span>
            </div>

            <div className="text-xs font-mono text-zinc-400">
              STATUS: <span className="text-white font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
