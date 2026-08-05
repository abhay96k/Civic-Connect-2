import React, { useState } from 'react';
import { SAMPLE_ROAD_IMAGES } from '../../data/mockData';
import { Cpu, Sparkles, RefreshCw, ShieldCheck, Download } from 'lucide-react';

export default function DiagnosticScreen() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_ROAD_IMAGES[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (sample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-space font-bold text-black flex items-center justify-center gap-1.5">
          <Cpu className="w-5 h-5 text-black" /> AI Diagnostic Scanner
        </h2>
        <p className="text-xs text-zinc-500 font-inter">Sub-centimeter road damage tensor analysis</p>
      </div>

      {/* Main Image Scanner Box */}
      <div className="relative rounded-3xl overflow-hidden border border-black/20 bg-black h-[240px] flex items-center justify-center shadow-lg">
        <img
          src={selectedSample.url}
          alt={selectedSample.name}
          className="w-full h-full object-cover"
        />

        {isScanning && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 text-white">
            <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#06B6D4] animate-laser-scan" />
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-xs font-space font-bold text-white">CALCULATING DEFORMATION...</p>
          </div>
        )}
      </div>

      {/* Sample Image Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {SAMPLE_ROAD_IMAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleScan(s)}
            className={`p-2 rounded-xl text-left border transition-all text-xs font-space ${
              selectedSample.id === s.id
                ? 'bg-black text-white border-black font-bold shadow'
                : 'bg-zinc-50 text-zinc-800 border-black/10'
            }`}
          >
            <p className="truncate text-[10px]">{s.name}</p>
            <p className="text-[8px] font-mono text-zinc-400">{s.dangerScore}</p>
          </button>
        ))}
      </div>

      {/* Output Metrics */}
      <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-black/10">
          <span className="text-[10px] font-mono text-zinc-500 font-bold">REPORT #{selectedSample.id.toUpperCase()}</span>
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-700 text-[10px] font-mono font-bold">
            {selectedSample.priority}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center font-mono">
          <div className="p-2.5 rounded-xl bg-white border border-black/10">
            <p className="text-[9px] text-zinc-500">CONFIDENCE</p>
            <p className="text-base font-space font-bold text-emerald-600 mt-0.5">{selectedSample.confidence}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-black/10">
            <p className="text-[9px] text-zinc-500">MAX DEPTH</p>
            <p className="text-base font-space font-bold text-black mt-0.5">{selectedSample.depth}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-black/10">
            <p className="text-[9px] text-zinc-500">DANGER RATING</p>
            <p className="text-base font-space font-bold text-red-600 mt-0.5">{selectedSample.dangerScore}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-black/10">
            <p className="text-[9px] text-zinc-500">EST COST</p>
            <p className="text-base font-space font-bold text-cyan-600 mt-0.5">{selectedSample.estCost}</p>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-black text-white font-space font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all">
          <Download className="w-4 h-4" /> Download PDF Report
        </button>
      </div>
    </div>
  );
}
