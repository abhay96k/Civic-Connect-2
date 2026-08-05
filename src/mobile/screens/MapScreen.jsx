import React, { useState } from 'react';
import { MAP_MARKERS } from '../../data/mockData';
import { MapPin, Navigation, RefreshCw, CheckCircle2, Wrench } from 'lucide-react';

export default function MapScreen() {
  const [selectedMarker, setSelectedMarker] = useState(MAP_MARKERS[0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDispatched, setIsDispatched] = useState(false);

  const filteredMarkers = MAP_MARKERS.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    return true;
  });

  const getMarkerColor = (type, severity) => {
    if (type === 'safe') return 'bg-emerald-500 text-black border-emerald-400';
    if (type === 'traffic') return 'bg-orange-500 text-white border-orange-400';
    if (severity === 'critical') return 'bg-red-600 text-white border-red-500 animate-pulse';
    return 'bg-amber-500 text-black border-amber-400';
  };

  const handleDispatch = () => {
    setIsDispatched(true);
    setTimeout(() => setIsDispatched(false), 4000);
  };

  return (
    <div className="flex flex-col h-full space-y-3 p-3 animate-fadeIn">
      {/* Top Filter Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Hazards' },
          { id: 'pothole', label: '🔴 Potholes' },
          { id: 'traffic', label: '🟠 Traffic' },
          { id: 'safe', label: '🟢 Safe Roads' }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setTypeFilter(chip.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
              typeFilter === chip.id
                ? 'bg-black text-white shadow-md'
                : 'bg-zinc-100 text-zinc-700 border border-black/10'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Simulated Mobile Map Box */}
      <div className="relative h-[320px] rounded-3xl overflow-hidden border border-black/15 bg-[#08080A] shadow-lg flex flex-col justify-between">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-80" 
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} 
        />

        {/* Vector road lines */}
        <svg className="absolute inset-0 w-full h-full stroke-white/15 stroke-2" fill="none">
          <path d="M 0,100 Q 150,80 300,180 T 600,220" strokeWidth="5" stroke="rgba(255,255,255,0.08)" />
          <path d="M 80,0 L 120,400" strokeWidth="3" stroke="rgba(255,255,255,0.08)" />
        </svg>

        {/* Interactive Pin Markers */}
        {filteredMarkers.map((m, index) => {
          const topPos = 25 + (index * 14) % 55;
          const leftPos = 20 + (index * 22) % 65;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMarker(m)}
              style={{ top: `${topPos}%`, left: `${leftPos}%` }}
              className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 z-20 active:scale-125 transition-transform"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 ${getMarkerColor(m.type, m.severity)}`}>
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}

        {/* Map Header Overlay */}
        <div className="relative z-10 p-3 flex items-center justify-between text-[10px] font-mono text-white bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>GPS LIVE METRO</span>
          </div>
          <button 
            onClick={() => setSelectedMarker(MAP_MARKERS[0])}
            className="px-2 py-0.5 rounded bg-white/20 text-white flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Mobile Bottom-Sheet Detail Card */}
      {selectedMarker && (
        <div className="p-4 rounded-3xl bg-black text-white space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
              {selectedMarker.type.toUpperCase()} • SEVERITY {selectedMarker.severityScore || '8.0'}/10
            </span>
            <span className="text-[10px] font-mono text-zinc-400">ID: {selectedMarker.id}</span>
          </div>

          <div>
            <h3 className="text-base font-space font-bold text-white">{selectedMarker.title}</h3>
            <p className="text-xs text-zinc-400 font-inter mt-0.5">{selectedMarker.address}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-zinc-300">
            <span>Conf: <strong className="text-emerald-400">{selectedMarker.confidence}</strong></span>
            {selectedMarker.depthCm && <span>Depth: <strong className="text-white">{selectedMarker.depthCm} cm</strong></span>}
          </div>

          <button
            onClick={handleDispatch}
            disabled={isDispatched}
            className={`w-full py-3 rounded-xl font-space font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isDispatched
                ? 'bg-emerald-500 text-black shadow'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {isDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Crew Dispatched!
              </>
            ) : (
              <>
                <Wrench className="w-4 h-4" /> Dispatch Repair Crew
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
