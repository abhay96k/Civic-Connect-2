import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis 
} from 'recharts';
import { 
  User, HardHat, Ambulance, ShieldAlert, AlertTriangle, CheckCircle2, Clock, 
  Truck, Navigation, Activity, MapPin, Sparkles, Radio, Zap, ChevronRight, Award, LogOut
} from 'lucide-react';

export default function DashboardScreen({ userRole = 'citizen', onLogout }) {
  const [activeRole, setActiveRole] = useState(userRole); // 'citizen' | 'construction' | 'ambulance' | 'police'

  useEffect(() => {
    if (userRole) {
      setActiveRole(userRole);
    }
  }, [userRole]);

  const roles = [
    { id: 'citizen', label: 'Citizen', icon: User, badgeColor: 'bg-blue-500' },
    { id: 'construction', label: 'Construction', icon: HardHat, badgeColor: 'bg-amber-500' },
    { id: 'ambulance', label: 'Ambulance', icon: Ambulance, badgeColor: 'bg-red-500' },
    { id: 'police', label: 'Traffic Police', icon: ShieldAlert, badgeColor: 'bg-emerald-500' },
  ];

  // Chart Data per Dashboard
  const citizenChartData = [
    { day: 'Mon', reported: 3, fixed: 2 },
    { day: 'Tue', reported: 5, fixed: 4 },
    { day: 'Wed', reported: 2, fixed: 3 },
    { day: 'Thu', reported: 6, fixed: 5 },
    { day: 'Fri', reported: 4, fixed: 4 },
    { day: 'Sat', reported: 7, fixed: 6 },
    { day: 'Sun', reported: 3, fixed: 3 },
  ];

  const constructionData = [
    { zone: 'North', pending: 12, completed: 18 },
    { zone: 'South', pending: 8, completed: 24 },
    { zone: 'East', pending: 15, completed: 20 },
    { zone: 'West', pending: 6, completed: 14 },
  ];

  const ambulanceData = [
    { time: '08:00', rerouted: 2, timeSaved: 3 },
    { time: '10:00', rerouted: 5, timeSaved: 6 },
    { time: '12:00', rerouted: 3, timeSaved: 4 },
    { time: '14:00', rerouted: 8, timeSaved: 9 },
    { time: '16:00', rerouted: 4, timeSaved: 5 },
  ];

  const policeData = [
    { sector: 'Sec 1', speed: 65, hazards: 2 },
    { sector: 'Sec 2', speed: 42, hazards: 6 },
    { sector: 'Sec 3', speed: 58, hazards: 3 },
    { sector: 'Sec 4', speed: 35, hazards: 8 },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 animate-fadeIn pb-8">
      {/* Logged-In Header Status & Logout */}
      {onLogout && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase">
              Authenticated Session: {activeRole}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-all cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Switch Role / Logout</span>
          </button>
        </div>
      )}

      {/* 4 Role Selector Tabs */}
      <div className="bg-zinc-100 p-1.5 rounded-2xl border border-black/10 shadow-xs flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive ? 'text-black font-bold' : 'text-zinc-500 hover:text-black'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRoleTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-black/5 z-0"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span className="text-[11px] font-space">{role.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Role Content */}
      <AnimatePresence mode="wait">
        {activeRole === 'citizen' && (
          <motion.div
            key="citizen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Citizen KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center justify-between text-blue-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">MY REPORTS</span>
                  <User className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-xl font-space font-bold text-blue-950">12 Submitted</p>
                <span className="text-[9px] text-blue-600 font-mono font-bold">8 Resolved</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">CIVIC REWARDS</span>
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xl font-space font-bold text-emerald-950">450 PTS</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">Silver Contributor</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">SAFE ROUTE</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">94% Smooth</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">Local Ward 4</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">AVG FIX SPEED</span>
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">1.8 Days</p>
                <span className="text-[9px] text-amber-600 font-mono font-bold">Priority Dispatch</span>
              </div>
            </div>

            {/* Citizen Activity Timeline */}
            <div className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-xs text-black flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Citizen Pothole Tracker
                </h3>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  LIVE UPDATES
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">#01</div>
                    <div>
                      <p className="text-xs font-bold text-black">MG Road Deep Crater</p>
                      <p className="text-[10px] text-zinc-500">Contractor Assigned • Hot Mix In Progress</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-[9px] font-bold bg-amber-500/10 text-amber-700">IN REPAIR</span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">#02</div>
                    <div>
                      <p className="text-xs font-bold text-black">Station Square Fissure</p>
                      <p className="text-[10px] text-zinc-500">Resurfaced & Sealed 2h ago</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-[9px] font-bold bg-emerald-500/10 text-emerald-700">FIXED</span>
                </div>
              </div>
            </div>

            {/* Weekly Citizen Reports Chart */}
            <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-2">
              <h3 className="font-space font-bold text-xs text-black">Citizen Reports vs Fixes</h3>
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={citizenChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', fontSize: '10px' }} />
                    <Line type="monotone" dataKey="reported" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="fixed" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeRole === 'construction' && (
          <motion.div
            key="construction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Construction KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between text-amber-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">WORK ORDERS</span>
                  <HardHat className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-xl font-space font-bold text-amber-950">24 Active</p>
                <span className="text-[9px] text-amber-700 font-mono font-bold">6 Teams Dispatched</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">ASPHALT STOCK</span>
                  <Truck className="w-3.5 h-3.5 text-black" />
                </div>
                <p className="text-xl font-space font-bold text-black">45 Tons</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">Hot Mix Ready</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">AVG REPAIR TIME</span>
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                </div>
                <p className="text-xl font-space font-bold text-black">3.2 Hours</p>
                <span className="text-[9px] text-cyan-600 font-mono font-bold">-15% benchmark</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">COMPLETED</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">142 Jobs</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">This Month</span>
              </div>
            </div>

            {/* Construction Dispatch Queue */}
            <div className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-xs text-black flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-amber-600" /> Municipal Repair Dispatch Queue
                </h3>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700">
                  CREW COMMAND
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black">Ring Road Section 4</p>
                    <p className="text-[10px] text-zinc-500">Crew #3 • Cold Patching Batch #12</p>
                  </div>
                  <button className="px-3 py-1 rounded-xl bg-black text-white text-[10px] font-bold cursor-pointer hover:bg-zinc-800">
                    Dispatch Crew
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black">Highway 102 Flyover</p>
                    <p className="text-[10px] text-zinc-500">Steam Roller & Milling Unit</p>
                  </div>
                  <button className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-bold cursor-pointer hover:bg-emerald-700">
                    Mark Done
                  </button>
                </div>
              </div>
            </div>

            {/* Zonal Construction Bar Chart */}
            <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-2">
              <h3 className="font-space font-bold text-xs text-black">Zone Repairs Allocation</h3>
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={constructionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', fontSize: '10px' }} />
                    <Bar dataKey="completed" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeRole === 'ambulance' && (
          <motion.div
            key="ambulance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Ambulance KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center justify-between text-red-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">ACTIVE EMS UNITS</span>
                  <Ambulance className="w-3.5 h-3.5 text-red-600" />
                </div>
                <p className="text-xl font-space font-bold text-red-950">4 Emergency</p>
                <span className="text-[9px] text-red-600 font-mono font-bold">Green Corridor ON</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">TIME SAVED</span>
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xl font-space font-bold text-emerald-950">-4.5 Mins</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">Per Response</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">CRATER BYPASS</span>
                  <Navigation className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">14 Avoided</p>
                <span className="text-[9px] text-red-600 font-mono font-bold">Severe Impact Hazards</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">SMOOTHNESS</span>
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">98.4%</p>
                <span className="text-[9px] text-blue-600 font-mono font-bold">Patient Comfort</span>
              </div>
            </div>

            {/* Live EMS Dispatch Corridor Stream */}
            <div className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-xs text-black flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" /> Emergency Corridor Live Router
                </h3>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-700">
                  PRIORITY ROUTE
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-red-50/50 border border-red-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xs">EMS-1</div>
                    <div>
                      <p className="text-xs font-bold text-black">City Hospital → Central ICU</p>
                      <p className="text-[10px] text-red-600 font-mono">Detoured around 3 potholes on MG Road</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-red-700">2 min away</span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 text-white flex items-center justify-center font-bold text-xs">EMS-2</div>
                    <div>
                      <p className="text-xs font-bold text-black">Trauma Express Corridor</p>
                      <p className="text-[10px] text-zinc-500 font-mono">Optimal Smooth Asphalt Path</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">On Schedule</span>
                </div>
              </div>
            </div>

            {/* Ambulance Time Saved Chart */}
            <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-2">
              <h3 className="font-space font-bold text-xs text-black">EMS Emergency Rerouting Telemetry</h3>
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ambulanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', fontSize: '10px' }} />
                    <Line type="monotone" dataKey="timeSaved" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeRole === 'police' && (
          <motion.div
            key="police"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Traffic Police KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">CCTV FEEDS</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xl font-space font-bold text-emerald-950">32 Live</p>
                <span className="text-[9px] text-emerald-600 font-mono font-bold">100% Optical AI</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">TRAFFIC FLOW</span>
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">68 km/h</p>
                <span className="text-[9px] text-blue-600 font-mono font-bold">Normal Speed</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">HAZARD ZONES</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">5 Flagged</p>
                <span className="text-[9px] text-amber-600 font-mono font-bold">Wardens Deployed</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase">DETOUR SIGNALS</span>
                  <MapPin className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <p className="text-xl font-space font-bold text-black">2 Active</p>
                <span className="text-[9px] text-purple-600 font-mono font-bold">Auto Synchronized</span>
              </div>
            </div>

            {/* Traffic Control Room Action Console */}
            <div className="p-4 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-xs text-black flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Traffic Police Control Command
                </h3>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700">
                  ENFORCEMENT
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black">Junction 4 Bottleneck</p>
                    <p className="text-[10px] text-zinc-500">Waterlogged pothole causing 15 min delay</p>
                  </div>
                  <button className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-bold cursor-pointer hover:bg-emerald-700">
                    Enable Detour
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black">Sector 7 Overhead Expressway</p>
                    <p className="text-[10px] text-zinc-500">Hazard Warning Lights Active</p>
                  </div>
                  <button className="px-3 py-1 rounded-xl bg-zinc-900 text-white text-[10px] font-bold cursor-pointer hover:bg-black">
                    Broadcast Advisory
                  </button>
                </div>
              </div>
            </div>

            {/* Police Sector Speed & Hazard Chart */}
            <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-2">
              <h3 className="font-space font-bold text-xs text-black">Sector Traffic Speed vs Hazards</h3>
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={policeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', fontSize: '10px' }} />
                    <Bar dataKey="speed" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hazards" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

