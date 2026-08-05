import React, { useState } from 'react';
import { CCTV_FEEDS } from '../../data/mockData';
import { Video, Camera, Sparkles, Sliders } from 'lucide-react';

export default function CctvScreen() {
  const [selectedFeed, setSelectedFeed] = useState(CCTV_FEEDS[0]);
  const [showBoxes, setShowBoxes] = useState(true);
  const [simulatedTrigger, setSimulatedTrigger] = useState(false);

  const triggerScan = () => {
    setSimulatedTrigger(true);
    setTimeout(() => setSimulatedTrigger(false), 2500);
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Mobile Stream Selector Chips */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">CAMERA NODE SELECTOR</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CCTV_FEEDS.map((feed) => (
            <button
              key={feed.id}
              onClick={() => setSelectedFeed(feed)}
              className={`px-3 py-2 rounded-xl text-xs font-space font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedFeed.id === feed.id
                  ? 'bg-black text-white shadow'
                  : 'bg-zinc-100 text-zinc-700 border border-black/10'
              }`}
            >
              {feed.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Canvas Box */}
      <div className="relative rounded-3xl overflow-hidden border border-black/20 bg-black min-h-[260px] flex flex-col justify-between text-white shadow-xl">
        <img
          src={selectedFeed.streamUrl}
          alt={selectedFeed.name}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#FFFFFF] animate-laser-scan pointer-events-none" />

        {/* Laser Trigger Flash */}
        {simulatedTrigger && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 z-30">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-xs font-space font-bold text-white">RE-EVALUATING ROAD TENSORS...</p>
          </div>
        )}

        {/* Bounding Overlay Boxes */}
        {showBoxes && selectedFeed.boxes.map((box) => (
          <div
            key={box.id}
            style={{
              top: `${box.y}%`,
              left: `${box.x}%`,
              width: `${box.w}%`,
              height: `${box.h}%`
            }}
            className={`absolute border-2 rounded pointer-events-none z-20 ${
              box.type === 'pothole' ? 'border-red-500 bg-red-500/20' : 'border-white/80 bg-white/10'
            }`}
          >
            <div className="absolute -top-5 left-0 text-[8px] font-mono px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
              {box.label} ({box.conf})
            </div>
          </div>
        ))}

        {/* Video Top Bar */}
        <div className="relative z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-space font-bold text-xs text-white">{selectedFeed.name}</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10">4K AI</span>
        </div>

        {/* Video Bottom Telemetry */}
        <div className="relative z-10 p-3 bg-black/80 backdrop-blur-md flex items-center justify-between text-[10px] font-mono">
          <span>Vehicles: <strong className="text-white">{selectedFeed.activeVehicles}</strong></span>
          <span>Potholes: <strong className="text-red-400">{selectedFeed.potholesInView}</strong></span>
          <span className="text-emerald-400">60 FPS</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={triggerScan}
          className="py-3 rounded-2xl bg-black text-white font-space font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" /> Trigger Scan
        </button>

        <button
          onClick={() => setShowBoxes(!showBoxes)}
          className="py-3 rounded-2xl bg-zinc-100 border border-black/10 text-black font-space font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Sliders className="w-4 h-4" /> Toggle AI Boxes
        </button>
      </div>
    </div>
  );
}
