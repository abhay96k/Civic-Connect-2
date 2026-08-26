import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ambulance, PhoneCall, HeartPulse, MapPin, Navigation, 
  Building2, Clock, CheckCircle2, AlertOctagon, ShieldCheck, LogOut, Siren, ChevronRight, Activity, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AMBULANCE_DATA } from '../data/roleMockData';

export default function AmbulanceDashboard() {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'calls' | 'hospitals' | 'fleet'
  const [calls, setCalls] = useState(AMBULANCE_DATA.calls);
  const [selectedCall, setSelectedCall] = useState(AMBULANCE_DATA.calls[0]);
  const [dispatchToast, setDispatchToast] = useState('');

  const updateCallStatus = (callId, newStatus) => {
    const updated = calls.map(c => c.id === callId ? { ...c, status: newStatus } : c);
    setCalls(updated);
    if (selectedCall?.id === callId) {
      setSelectedCall(updated.find(c => c.id === callId));
    }
    setDispatchToast(`Call ${callId} status updated: ${newStatus}`);
    setTimeout(() => setDispatchToast(''), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter selection:bg-red-500 selection:text-white">
      
      {/* Top Professional Emergency Dispatch Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500 text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/20 animate-pulse">
            <Ambulance className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-space font-bold text-lg text-white tracking-tight">Emergency Medical Dispatch</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                P1 Priority Unit
              </span>
            </div>
            <p className="text-xs text-slate-400">Emergency Call Response & Hazard-Avoidance Routing</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150'} alt="User" className="w-7 h-7 rounded-full object-cover border border-red-400" />
            <div>
              <p className="text-xs font-bold font-space text-white leading-tight">{user?.name || 'Dr. Vikram Sethi'}</p>
              <p className="text-[10px] text-red-400 font-mono">Emergency Paramedic</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-space font-semibold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
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
          { id: 'command', label: 'Emergency Dispatch', icon: HeartPulse },
          { id: 'hospitals', label: 'Hospital ER Matrix', icon: Building2 },
          { id: 'fleet', label: 'Ambulance Fleet Status', icon: Ambulance },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-space font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Dispatch Toast */}
      <AnimatePresence>
        {dispatchToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 p-4 rounded-2xl bg-red-500 text-white font-space font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{dispatchToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* EMERGENCY KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-red-400 uppercase">Active SOS Calls</p>
            <p className="text-2xl font-space font-bold text-red-400 mt-1">{AMBULANCE_DATA.stats.activeEmergencyCalls}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Units Dispatched</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{AMBULANCE_DATA.stats.ambulancesDispatched}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-emerald-400 uppercase">Available at Base</p>
            <p className="text-2xl font-space font-bold text-emerald-400 mt-1">{AMBULANCE_DATA.stats.availableBaseUnits}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Avg Response Time</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{AMBULANCE_DATA.stats.avgResponseTimeMins} mins</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">ER Bed Availability</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{AMBULANCE_DATA.stats.hospitalERAvailability}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-cyan-400 uppercase">Potholes Avoided</p>
            <p className="text-2xl font-space font-bold text-cyan-400 mt-1">{AMBULANCE_DATA.stats.potholesAvoidedEnRoute}</p>
          </div>
        </div>

        {/* SOS EMERGENCY CALL QUEUE & ROUTE OPTIMIZER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Active Emergency Calls Queue */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-red-500 animate-pulse" />
                Active Emergency SOS Queue
              </h2>
              <span className="text-xs font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30 font-bold">
                {calls.length} Active Calls
              </span>
            </div>

            <div className="space-y-3">
              {calls.map((call) => {
                const isSelected = selectedCall?.id === call.id;

                return (
                  <motion.div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    whileHover={{ scale: 1.01 }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-red-400">{call.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                            {call.urgency}
                          </span>
                        </div>
                        <h3 className="font-space font-bold text-sm text-white mt-1">{call.patientName}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{call.location}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          ETA {call.etaMins} mins
                        </span>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">{call.status}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Emergency Route Optimizer & Hospital Routing */}
          {selectedCall && (
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-400">{selectedCall.id}</span>
                    <h2 className="font-space text-xl font-bold text-white mt-0.5">{selectedCall.patientName}</h2>
                    <p className="text-xs text-slate-400 mt-1">{selectedCall.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white font-space text-xs font-bold shadow-md">
                    {selectedCall.urgency}
                  </span>
                </div>

                {/* Call Dispatch Controls */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateCallStatus(selectedCall.id, 'Patient Onboard -> En Route to ER')}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-space font-bold text-xs hover:bg-red-400 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Ambulance className="w-4 h-4" />
                    Patient Onboard → Hospital
                  </button>

                  <button
                    onClick={() => updateCallStatus(selectedCall.id, 'Handover Completed at ER')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-space font-bold text-xs hover:bg-emerald-400 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete ER Handover
                  </button>
                </div>

                {/* AI Smooth Route Guidance (Avoids Pothole Craters) */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-space font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-cyan-400" />
                      AI Hazard-Avoidance Route Optimizer
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                      Zero-Bump Route Active
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-cyan-400">{selectedCall.recommendedRoute}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">Bypasses critical crater #POT-8091 to protect patient stability.</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">
                        {selectedCall.etaMins} mins
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-white">DESTINATION HOSPITAL</p>
                        <p className="text-slate-300 text-[11px] mt-0.5">{selectedCall.destinationHospital}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">ER Open</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* HOSPITAL ER MATRIX & FLEET TRACKER */}
        {activeTab === 'hospitals' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-400" />
              Nearest Hospital ER & ICU Bed Availability Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AMBULANCE_DATA.hospitals.map((hosp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-space font-bold text-sm text-white">{hosp.name}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      hosp.erStatus === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {hosp.erStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">ICU Beds Free: <span className="text-white font-bold">{hosp.icuBedsAvailable}</span></p>
                  <p className="text-xs text-slate-400">Distance: <span className="text-white font-bold">{hosp.distanceKm} km ({hosp.estDriveMins} mins)</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
