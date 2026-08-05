import React, { useState } from 'react';
import { SAMPLE_ROAD_IMAGES } from '../data/mockData';
import { Cpu, Sparkles, AlertTriangle, ShieldCheck, Download, RefreshCw, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AIAnalyzer() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_ROAD_IMAGES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2200);
  };

  return (
    <section id="analyzer" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-700 font-bold mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span>NEURAL DAMAGE DIAGNOSTICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
            AI Road Surface Damage Diagnostic Engine
          </h2>
        </div>

        <button
          onClick={() => handleSelectSample(selectedSample)}
          className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono flex items-center gap-2 hover:bg-zinc-800 shadow"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          Re-run Neural Scan Pass
        </button>
      </div>

      {/* Main Diagnostic Workspace Grid */}
      <div className="grid lg:grid-cols-12 gap-6 glass-panel p-4 sm:p-8 border border-black/10 bg-white/80 shadow-xl relative">
        {/* Left Column: Image Selector & Scanning Canvas */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-black/20 bg-black h-[360px] sm:h-[420px] flex items-center justify-center">
            <img
              src={selectedSample.url}
              alt={selectedSample.name}
              className="w-full h-full object-cover"
            />

            {/* Laser Beam Scanner */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center space-y-4 text-white">
                <div className="w-full h-1.5 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-[0_0_20px_#06B6D4] animate-laser-scan" />
                <Sparkles className="w-10 h-10 text-cyan-400 animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-space font-bold text-white tracking-wider">
                    CALCULATING TENSOR DEFORMATION...
                  </p>
                  <p className="text-xs text-zinc-300 font-mono">Running YOLOv8 Surface Micro-Crack Model</p>
                </div>
              </div>
            )}

            {/* Bounding Box Visual Overlay */}
            {scanComplete && !isScanning && (
              <div className="absolute inset-0 pointer-events-none p-8 flex items-center justify-center">
                <div className="w-3/5 h-3/5 border-2 border-red-500 bg-red-500/10 rounded-xl relative shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse">
                  <div className="absolute -top-7 left-0 bg-red-950 text-white border border-red-500 text-[10px] font-mono px-2.5 py-1 rounded font-bold flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span>POTHOLE CRATER DETECTED ({selectedSample.confidence})</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sample Selectors */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-zinc-500 font-bold">TEST SAMPLE ROAD PHOTOS</p>
            <div className="grid grid-cols-3 gap-3">
              {SAMPLE_ROAD_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedSample.id === sample.id
                      ? 'bg-black text-white border-black font-bold shadow'
                      : 'bg-zinc-50 border-black/10 text-black hover:border-black/30'
                  }`}
                >
                  <p className="text-[11px] font-space truncate">{sample.name}</p>
                  <p className="text-[9px] font-mono opacity-80">{sample.dangerScore}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Output Card */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-4">
              <span className="text-xs font-mono text-zinc-500 font-bold">DIAGNOSTIC REPORT #AI-{selectedSample.id.toUpperCase()}</span>
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-700 border border-red-500/40 text-xs font-mono font-bold">
                {selectedSample.priority}
              </span>
            </div>

            <h3 className="text-2xl font-space font-bold text-black mb-1">
              {selectedSample.name}
            </h3>
            <p className="text-xs text-zinc-600 font-mono mb-6">
              Classification: <span className="text-black font-bold">{selectedSample.crackType}</span>
            </p>

            {/* Diagnostic Matrix Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 border border-black/10">
                <p className="text-[10px] font-mono text-zinc-500 font-bold">AI CONFIDENCE INDEX</p>
                <p className="text-2xl font-space font-bold text-emerald-600 mt-1">{selectedSample.confidence}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-black/10">
                <p className="text-[10px] font-mono text-zinc-500 font-bold">MAXIMUM DEPTH</p>
                <p className="text-2xl font-space font-bold text-black mt-1">{selectedSample.depth}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-black/10">
                <p className="text-[10px] font-mono text-zinc-500 font-bold">DANGER SEVERITY SCORE</p>
                <p className="text-2xl font-space font-bold text-red-600 mt-1">{selectedSample.dangerScore}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-black/10">
                <p className="text-[10px] font-mono text-zinc-500 font-bold">ESTIMATED REPAIR COST</p>
                <p className="text-2xl font-space font-bold text-cyan-600 mt-1">{selectedSample.estCost}</p>
              </div>
            </div>

            {/* Municipal Recommendation */}
            <div className="mt-6 p-4 rounded-xl bg-black/5 border border-black/10 space-y-2">
              <p className="text-xs font-space font-bold text-black flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                MUNICIPAL REPAIR PROTOCOL RECOMMENDATION
              </p>
              <p className="text-xs text-zinc-700 font-inter leading-relaxed">
                Dispatch cold-mix asphalt overlay unit within 12 hours. Implement temporary speed restriction signage to prevent vehicle suspension damage.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-black/10 flex items-center gap-3">
            <button className="flex-1 py-3.5 rounded-xl bg-black text-white font-space font-bold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow">
              <Download className="w-4 h-4" /> Export PDF Diagnostic Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
