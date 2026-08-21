import React, { useState } from 'react';
import { MAP_MARKERS } from '../data/mockData';
import { MapPin, Filter, AlertOctagon, CheckCircle2, Navigation, Layers, Shield, Wrench, Search, RefreshCw } from 'lucide-react';
import RealMapView from './RealMapView';

export default function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState(MAP_MARKERS[0]);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDispatched, setIsDispatched] = useState(false);

  // Filter logic
  const filteredMarkers = MAP_MARKERS.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    if (severityFilter !== 'all' && m.severity !== severityFilter) return false;
    if (districtFilter !== 'all' && m.district !== districtFilter) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase()) && !m.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getMarkerBadgeColor = (type, severity) => {
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
    <section id="map" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black mb-2">
            <Layers className="w-3.5 h-3.5 text-black" />
            <span>GIS SPATIAL MONITORING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
            Interactive City GIS Hazard Map
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-xl border border-black/10 text-xs font-mono text-zinc-700">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/20 text-red-700 font-bold border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Potholes
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/20 text-orange-700 font-bold border border-orange-500/30">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> Traffic
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-700 font-bold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Safe Roads
          </span>
        </div>
      </div>

      {/* Main Map Container Grid */}
      <div className="grid lg:grid-cols-12 gap-6 glass-panel p-4 sm:p-6 border border-black/10 bg-white/80 shadow-xl relative">
        {/* Left Sidebar Filters & List */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between max-h-[640px] overflow-y-auto pr-1">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location, road, or ID..."
              className="w-full bg-zinc-100 border border-black/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-black placeholder-zinc-500 focus:outline-none focus:border-black/40"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1 font-bold">TYPE</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-zinc-100 border border-black/10 rounded-lg px-2.5 py-2 text-xs text-black font-semibold"
              >
                <option value="all">All Types</option>
                <option value="pothole">Potholes Only</option>
                <option value="traffic">Traffic Only</option>
                <option value="safe">Safe Roads Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1 font-bold">DISTRICT</label>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full bg-zinc-100 border border-black/10 rounded-lg px-2.5 py-2 text-xs text-black font-semibold"
              >
                <option value="all">All Districts</option>
                <option value="Downtown">Downtown</option>
                <option value="North Sector">North Sector</option>
                <option value="West Hub">West Hub</option>
                <option value="Industrial Zone">Industrial Zone</option>
              </select>
            </div>
          </div>

          {/* Marker List */}
          <div className="space-y-2 flex-1 overflow-y-auto min-h-[300px]">
            <p className="text-[11px] font-mono text-zinc-500 flex items-center justify-between font-bold">
              <span>LOCATIONS ({filteredMarkers.length})</span>
              <span className="text-zinc-400">CLICK TO PINPOINT</span>
            </p>

            {filteredMarkers.map((marker) => {
              const isSelected = selectedMarker?.id === marker.id;
              return (
                <div
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-zinc-50 border-black/10 hover:border-black/30 text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full border ${getMarkerBadgeColor(marker.type, marker.severity)}`} />
                    <div>
                      <p className={`text-xs font-space font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
                        {marker.title}
                      </p>
                      <p className={`text-[10px] font-mono ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {marker.address}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-white text-black' : 'bg-black/10 text-zinc-700'
                  }`}>
                    {marker.district}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Map Visualizer */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Real Mapbox / Leaflet Map Container */}
          <RealMapView
            markers={filteredMarkers}
            selectedMarker={selectedMarker}
            onSelectMarker={(m) => setSelectedMarker(m)}
            height="440px"
            className="rounded-2xl border border-black/15 shadow-xl"
          />

          {/* Bottom Selected Marker Detail Panel */}
          {selectedMarker && (
            <div className="p-4 sm:p-6 rounded-2xl border border-black/15 bg-black text-white shadow-xl animate-fadeIn">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                {/* Image Snapshot */}
                <div className="md:col-span-4 rounded-xl overflow-hidden border border-white/20 h-32 relative">
                  <img
                    src={selectedMarker.image}
                    alt={selectedMarker.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] border border-white/20">
                    AI CONF: {selectedMarker.confidence}
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      getMarkerBadgeColor(selectedMarker.type, selectedMarker.severity)
                    }`}>
                      {selectedMarker.type.toUpperCase()} • SEVERITY {selectedMarker.severityScore || '8.0'}/10
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">ID: {selectedMarker.id}</span>
                  </div>

                  <h3 className="text-lg font-space font-bold text-white">{selectedMarker.title}</h3>
                  <p className="text-xs text-zinc-400 font-inter">{selectedMarker.address}</p>

                  <div className="flex flex-wrap gap-3 text-[11px] font-mono text-zinc-300 pt-1">
                    {selectedMarker.depthCm && <span>Depth: <strong className="text-white">{selectedMarker.depthCm} cm</strong></span>}
                    {selectedMarker.diameterCm && <span>Diameter: <strong className="text-white">{selectedMarker.diameterCm} cm</strong></span>}
                    <span>Reported: <strong className="text-white">{selectedMarker.reportedAt}</strong></span>
                  </div>
                </div>

                {/* Action button */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  <button
                    onClick={handleDispatch}
                    disabled={isDispatched}
                    className={`w-full py-3 rounded-xl font-space font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isDispatched
                        ? 'bg-emerald-500 text-black shadow-lg'
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

                  <p className="text-[10px] text-center text-zinc-400 font-mono">
                    Assigned Unit: {selectedMarker.assignedTeam || 'Auto Dispatch'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
