import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Eye, Radio, AlertOctagon, Activity, Camera, MapPin, 
  CheckCircle2, AlertTriangle, ShieldCheck, LogOut, Zap, Video, Gauge, ChevronRight, Siren, Bell, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TRAFFIC_POLICE_DATA } from '../data/roleMockData';

export default function TrafficPoliceDashboard() {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'cctv' | 'incidents' | 'greenwave'
  const [incidents, setIncidents] = useState(TRAFFIC_POLICE_DATA.incidents);
  const [selectedCam, setSelectedCam] = useState(TRAFFIC_POLICE_DATA.cctvGrid[0]);
  const [greenWaveActive, setGreenWaveActive] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [successNotification, setSuccessNotification] = useState('');

  const toggleGreenWave = () => {
    setGreenWaveActive(!greenWaveActive);
    setSuccessNotification(
      !greenWaveActive 
        ? 'Emergency Green-Wave Priority Activated for Hospital Corridor' 
        : 'Emergency Corridor returned to Normal Signals'
    );
    setTimeout(() => setSuccessNotification(''), 3500);
  };

  const dispatchPoliceUnit = (incidentId) => {
    const updated = incidents.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, status: 'Officers Dispatched & On Site', policeUnitAssigned: 'Unit #TP-44 (En Route)' };
      }
      return inc;
    });
    setIncidents(updated);
    setSuccessNotification(`Police Unit #TP-44 dispatched to ${incidentId}`);
    setTimeout(() => setSuccessNotification(''), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter selection:bg-cyan-500 selection:text-black">
      
      {/* Top Professional Traffic Command Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-space font-bold text-lg text-white tracking-tight">Traffic Command Center</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                Police Control
              </span>
            </div>
            <p className="text-xs text-slate-400">Urban Traffic Monitoring & CCTV Incident Dispatch</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} alt="User" className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
            <div>
              <p className="text-xs font-bold font-space text-white leading-tight">{user?.name || 'Inspector Rajesh Varma'}</p>
              <p className="text-[10px] text-cyan-400 font-mono">Traffic Police Officer</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-space font-semibold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Switch Role</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-all border border-red-500/20 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {[
          { id: 'command', label: 'Command Center', icon: Siren },
          { id: 'cctv', label: '4K CCTV Grid', icon: Video },
          { id: 'incidents', label: 'Traffic Incidents', icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-space font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-cyan-500 text-black shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Success Toast */}
      <AnimatePresence>
        {successNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 p-4 rounded-2xl bg-cyan-500 text-black font-space font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{successNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* KPI TELEMETRY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">City Congestion Rate</p>
            <p className="text-2xl font-space font-bold text-amber-400 mt-1">{TRAFFIC_POLICE_DATA.stats.cityCongestionRate}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-red-400 uppercase">Accident Alerts</p>
            <p className="text-2xl font-space font-bold text-red-400 mt-1">{TRAFFIC_POLICE_DATA.stats.activeAccidentAlerts}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-cyan-400 uppercase">CCTV Nodes Online</p>
            <p className="text-2xl font-space font-bold text-cyan-400 mt-1">{TRAFFIC_POLICE_DATA.stats.cctvCamerasOnline}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Avg Vehicle Speed</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{TRAFFIC_POLICE_DATA.stats.avgTrafficSpeedKmh} km/h</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-emerald-400 uppercase">Green-Wave Corridors</p>
            <p className="text-2xl font-space font-bold text-emerald-400 mt-1">{TRAFFIC_POLICE_DATA.stats.greenWavePriorityCorridors}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Officers on Duty</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{TRAFFIC_POLICE_DATA.stats.trafficOfficersOnDuty}</p>
          </div>
        </div>

        {/* GREEN-WAVE PRIORITY CONTROL BAR */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${greenWaveActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-space font-bold text-sm text-white">Emergency Green-Wave Signal Override</h3>
              <p className="text-xs text-slate-400">Forces traffic signals to green along Hospital & Ambulance routes.</p>
            </div>
          </div>

          <button
            onClick={toggleGreenWave}
            className={`px-5 py-2.5 rounded-xl font-space font-bold text-xs transition-all shadow-md cursor-pointer ${
              greenWaveActive 
                ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {greenWaveActive ? '✓ Green-Wave Active (Priority On)' : 'Activate Emergency Green-Wave'}
          </button>
        </div>

        {/* CCTV GRID & INCIDENT MANAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: 4K CCTV Cameras Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                Live 4K CCTV AI Radar Grid
              </h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                4 Feeds Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRAFFIC_POLICE_DATA.cctvGrid.map((cam) => {
                const isSelected = selectedCam?.id === cam.id;

                return (
                  <motion.div
                    key={cam.id}
                    onClick={() => setSelectedCam(cam)}
                    whileHover={{ scale: 1.01 }}
                    className={`relative rounded-2xl overflow-hidden border transition-all cursor-pointer bg-slate-900 ${
                      isSelected ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative aspect-video bg-black">
                      <img src={cam.imageUrl} alt={cam.name} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {cam.id} • {cam.status}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400">
                        Avg Speed: {cam.avgSpeed}
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-space font-bold text-xs text-white">{cam.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Density: {cam.density} • Potholes: {cam.potholesVisible}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Traffic Incidents & Unit Dispatch */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Active Traffic Incidents
              </h2>
            </div>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400">{inc.id} • {inc.timestamp}</span>
                      <h4 className="font-space font-bold text-sm text-white mt-0.5">{inc.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{inc.location} ({inc.district})</span>
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold">
                      {inc.severity}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2 text-slate-300">
                    <div><span className="text-slate-500">SPEED:</span> {inc.avgSpeed}</div>
                    <div><span className="text-slate-500">QUEUE:</span> {inc.queueLengthKm}</div>
                    <div className="col-span-2"><span className="text-slate-500">ASSIGNED:</span> {inc.policeUnitAssigned}</div>
                  </div>

                  <button
                    onClick={() => dispatchPoliceUnit(inc.id)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-space font-bold text-xs border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Siren className="w-3.5 h-3.5" />
                    Dispatch Traffic Unit
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
