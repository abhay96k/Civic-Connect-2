import React, { useState } from 'react';
import { MAP_MARKERS } from '../../data/mockData';
import { MapPin, Navigation, RefreshCw, CheckCircle2, Wrench } from 'lucide-react';
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

      {/* Real Interactive Mapbox GIS View */}
      <RealMapView
        markers={filteredMarkers}
        selectedMarker={selectedMarker}
        onSelectMarker={(m) => setSelectedMarker(m)}
        height="340px"
        className="rounded-3xl shadow-lg border border-black/15"
      />

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
