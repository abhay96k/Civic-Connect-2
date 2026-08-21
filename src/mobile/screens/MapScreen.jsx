import React, { useState } from 'react';
import { MAP_MARKERS } from '../../data/mockData';
import { CheckCircle2, Wrench } from 'lucide-react';
import RealMapView from '../../components/RealMapView';

export default function MapScreen() {
  const [selectedMarker, setSelectedMarker] = useState(MAP_MARKERS[0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDispatched, setIsDispatched] = useState(false);

  const filteredMarkers = MAP_MARKERS.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    return true;
  });

  const handleDispatch = () => {
    setIsDispatched(true);
    setTimeout(() => setIsDispatched(false), 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col h-full min-h-[calc(100vh-140px)] space-y-3 px-3 py-2 box-border overflow-x-hidden animate-fadeIn">
      {/* Top Filter Chips Bar */}
      <div className="w-full flex-shrink-0 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Hazards' },
          { id: 'pothole', label: '🔴 Potholes' },
          { id: 'traffic', label: '🟠 Traffic' },
          { id: 'safe', label: '🟢 Safe Roads' }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setTypeFilter(chip.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              typeFilter === chip.id
                ? 'bg-black text-white shadow-md font-semibold'
                : 'glass-pill text-zinc-800 hover:bg-white'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Real Interactive Google-Style GIS Map */}
      <div className="w-full flex-1 min-h-[320px] h-full relative rounded-3xl overflow-hidden shadow-xl border border-white/80 box-border">
        <RealMapView
          markers={filteredMarkers}
          selectedMarker={selectedMarker}
          onSelectMarker={(m) => setSelectedMarker(m)}
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Mobile Detail Sheet Card - Frosted Glassmorphism */}
      {selectedMarker && (
        <div className="w-full flex-shrink-0 p-4 rounded-3xl glass-card-frosted text-zinc-900 space-y-3 box-border animate-fadeIn">
          {/* Badge & ID */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              selectedMarker.type === 'safe'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : selectedMarker.type === 'traffic'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {selectedMarker.type.toUpperCase()} • SEVERITY {selectedMarker.severityScore || '8.0'}/10
            </span>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold">ID: {selectedMarker.id}</span>
          </div>

          {/* Title & Address */}
          <div>
            <h3 className="text-base font-space font-bold text-zinc-900 leading-tight">{selectedMarker.title}</h3>
            <p className="text-xs text-zinc-500 font-inter mt-1 flex items-center gap-1">
              <span>📍</span> <span className="truncate">{selectedMarker.address}</span>
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 text-xs font-mono text-zinc-600">
            <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-100">
              <span className="text-[10px] text-zinc-400 block font-bold">AI CONFIDENCE</span>
              <span className="font-bold text-emerald-600 text-sm">{selectedMarker.confidence}</span>
            </div>
            {selectedMarker.depthCm ? (
              <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <span className="text-[10px] text-zinc-400 block font-bold">DEPTH</span>
                <span className="font-bold text-zinc-900 text-sm">{selectedMarker.depthCm} cm</span>
              </div>
            ) : (
              <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <span className="text-[10px] text-zinc-400 block font-bold">DISTRICT</span>
                <span className="font-bold text-zinc-900 text-sm">{selectedMarker.district || 'Metro'}</span>
              </div>
            )}
          </div>

          {/* Dispatch Button */}
          <button
            onClick={handleDispatch}
            disabled={isDispatched}
            className={`w-full py-3 rounded-2xl font-space font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98 ${
              isDispatched
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            {isDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Dispatch Confirmed!
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
