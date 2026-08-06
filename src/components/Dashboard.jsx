import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  MONTHLY_DETECTION_DATA, DISTRICT_REPAIR_DATA, SEVERITY_DISTRIBUTION, TRAFFIC_HOURLY_DATA, RECENT_ALERTS, MOCK_STATS 
} from '../data/mockData';
import { 
  LayoutDashboard, AlertTriangle, Activity, CheckCircle, BarChart3, Settings, Bell, FileText, Wrench, Shield, ArrowUpRight,
  User, HardHat, Ambulance, ShieldAlert
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');
  const [activeRole, setActiveRole] = useState('citizen'); // 'citizen' | 'construction' | 'ambulance' | 'police'

  const roles = [
    { id: 'citizen', label: 'Citizen Dashboard', icon: User },
    { id: 'construction', label: 'Construction & Repair', icon: HardHat },
    { id: 'ambulance', label: 'Ambulance EMS Corridor', icon: Ambulance },
    { id: 'police', label: 'Traffic Police Command', icon: ShieldAlert },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'potholes', label: 'Pothole Index', icon: AlertTriangle },
    { id: 'traffic', label: 'Traffic Density', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <section id="dashboard" className="py-16 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-black" />
            <span>ROLE-BASED COMMAND CENTER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-space font-bold text-black tracking-tight">
            RoadVision AI Operations Dashboard
          </h2>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded-2xl border border-black/10 shadow-inner overflow-x-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-space font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive ? 'bg-black text-white shadow-md' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Mobile Swipeable Horizontal Navigation & Desktop Sidebar */}
        <div className="lg:col-span-3 glass-panel p-3 sm:p-4 border border-black/10 bg-white/80 shadow-sm space-y-2 h-fit">
          <p className="text-[10px] font-mono text-zinc-500 px-2 pt-1 mb-2 font-bold hidden lg:block">DASHBOARD NAVIGATION</p>

          {/* Swipeable container on mobile */}
          <div className="flex lg:flex-col overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-space font-semibold transition-all text-left whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white shadow-md font-bold'
                      : 'bg-zinc-100 lg:bg-transparent text-zinc-700 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-black/10 mt-3 p-3 rounded-xl bg-zinc-900 text-white hidden lg:block">
            <p className="text-[10px] font-mono text-zinc-400">DISPATCH UNITS</p>
            <p className="text-sm font-space font-bold text-white mt-0.5">14 Crews Active</p>
            <p className="text-[10px] text-emerald-400 font-mono mt-1">94% Fleet Operational</p>
          </div>
        </div>

        {/* Main Dashboard Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top 4 KPI Cards - Grid 2x2 on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="glass-panel p-3.5 sm:p-5 border border-black/10 bg-white/80 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold">TODAY'S ALERTS</span>
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              </div>
              <p className="text-lg sm:text-2xl font-space font-bold text-black">48 Cases</p>
              <span className="text-[9px] sm:text-[10px] text-red-600 font-mono font-bold">+12% vs yesterday</span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 border border-black/10 bg-white/80 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold">PENDING REPAIRS</span>
                <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              </div>
              <p className="text-lg sm:text-2xl font-space font-bold text-black">42 Queue</p>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-mono font-bold">Avg 18h turnaround</span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 border border-black/10 bg-white/80 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold">RESOLVED CASES</span>
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              </div>
              <p className="text-lg sm:text-2xl font-space font-bold text-black">38,450</p>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 font-mono font-bold">98.2% Closure Rate</span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 border border-black/10 bg-white/80 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold">TRAFFIC STATUS</span>
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
              </div>
              <p className="text-lg sm:text-2xl font-space font-bold text-black">Optimal</p>
              <span className="text-[9px] sm:text-[10px] text-cyan-600 font-mono font-bold">82% Speed Flow</span>
            </div>
          </div>

          {/* Charts Row 1: Line Chart & Donut Severity Chart */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Line Chart */}
            <div className="lg:col-span-8 glass-panel p-4 sm:p-5 border border-black/10 bg-white/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-space font-bold text-sm text-black">AI Detection & Repair Progression</h3>
                  <p className="text-[10px] font-mono text-zinc-500">Monthly breakdown of detected potholes vs resolved repairs</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-black font-bold">
                    <span className="w-2 h-2 rounded-full bg-black" /> Detected
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved
                  </span>
                </div>
              </div>

              <div className="h-[200px] sm:h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MONTHLY_DETECTION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                    <XAxis dataKey="month" stroke="#52525B" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#52525B" tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', borderRadius: '12px', fontSize: '11px', color: '#000' }}
                    />
                    <Line type="monotone" dataKey="potholes" stroke="#000000" strokeWidth={3} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart: Hazard Severity Distribution */}
            <div className="lg:col-span-4 glass-panel p-4 sm:p-5 border border-black/10 bg-white/80 shadow-sm space-y-4">
              <div>
                <h3 className="font-space font-bold text-sm text-black">Hazard Severity Mix</h3>
                <p className="text-[10px] font-mono text-zinc-500">Depth rating distribution</p>
              </div>

              <div className="h-[180px] sm:h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SEVERITY_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {SEVERITY_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', borderRadius: '12px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold">
                {SEVERITY_DISTRIBUTION.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-zinc-700 truncate">{s.name} ({s.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2: Bar Chart & Traffic Area Chart */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Bar Chart */}
            <div className="lg:col-span-6 glass-panel p-4 sm:p-5 border border-black/10 bg-white/80 shadow-sm space-y-4">
              <div>
                <h3 className="font-space font-bold text-sm text-black">District Maintenance</h3>
                <p className="text-[10px] font-mono text-zinc-500">Completed repair counts by zone</p>
              </div>

              <div className="h-[180px] sm:h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DISTRICT_REPAIR_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                    <XAxis dataKey="district" stroke="#52525B" tick={{ fontSize: 9 }} />
                    <YAxis stroke="#52525B" tick={{ fontSize: 9 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Bar dataKey="completed" fill="#18181B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Area Chart */}
            <div className="lg:col-span-6 glass-panel p-4 sm:p-5 border border-black/10 bg-white/80 shadow-sm space-y-4">
              <div>
                <h3 className="font-space font-bold text-sm text-black">Traffic Density Curve</h3>
                <p className="text-[10px] font-mono text-zinc-500">Congestion index vs average travel speed</p>
              </div>

              <div className="h-[180px] sm:h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TRAFFIC_HOURLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                    <XAxis dataKey="time" stroke="#52525B" tick={{ fontSize: 9 }} />
                    <YAxis stroke="#52525B" tick={{ fontSize: 9 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="density" stroke="#06B6D4" fill="rgba(6, 182, 212, 0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Live Alert Timeline Center */}
          <div className="glass-panel p-4 sm:p-5 border border-black/10 bg-white/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-black" />
                <h3 className="font-space font-bold text-sm text-black">Live Municipal Alert Center</h3>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                REAL-TIME
              </span>
            </div>

            <div className="space-y-3">
              {RECENT_ALERTS.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl bg-zinc-50 border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-black/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      alert.severity === 'Critical' ? 'bg-red-500 animate-ping' :
                      alert.severity === 'High' ? 'bg-orange-500' :
                      alert.severity === 'Resolved' ? 'bg-emerald-500' : 'bg-black'
                    }`} />
                    <div>
                      <p className="text-xs font-space font-bold text-black">{alert.title}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{alert.location} • {alert.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-black/5">
                    <span className="text-[10px] font-mono text-zinc-700 bg-black/5 px-2 py-0.5 rounded font-bold">
                      CONF: {alert.aiConfidence}
                    </span>
                    <button className="text-xs text-black font-bold hover:text-zinc-600 flex items-center gap-1 font-space">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
