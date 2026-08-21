import React, { useState } from 'react';
import { MAP_MARKERS } from '../../data/mockData';
import { MapPin, Navigation, CheckCircle2, Wrench, ShieldAlert, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col h-full space-y-3 p-3 sm:p-4 max-w-4xl mx-auto animate-fadeIn">
      {/* Top Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                : 'bg-white text-zinc-700 border border-zinc-200/90 hover:bg-zinc-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Real Interactive Google-Style GIS Map */}
      <RealMapView
        markers={filteredMarkers}
        selectedMarker={selectedMarker}
        onSelectMarker={(m) => setSelectedMarker(m)}
        height="380px"
        className="rounded-3xl shadow-xl border border-zinc-200/80"
      />

      {/* Mobile Detail Sheet Card */}
      {selectedMarker && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-xl text-zinc-900 space-y-3 animate-fadeIn">
          {/* Badge & ID */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              selectedMarker.type === 'safe'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : selectedMarker.type === 'traffic'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {selectedMarker.type.toUpperCase()} • SEVERITY {selectedMarker.severityScore || '8.0'}/10
            </span>
            <span className="text-[11px] font-mono text-zinc-400 font-semibold">ID: {selectedMarker.id}</span>
          </div>

          {/* Title & Address */}
          <div>
            <h3 className="text-base font-space font-bold text-zinc-900">{selectedMarker.title}</h3>
            <p className="text-xs text-zinc-500 font-inter mt-0.5 flex items-center gap-1">
              <span>📍</span> {selectedMarker.address}
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
