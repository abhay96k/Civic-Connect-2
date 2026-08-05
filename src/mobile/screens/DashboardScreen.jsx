import React from 'react';
import { 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  MONTHLY_DETECTION_DATA, SEVERITY_DISTRIBUTION, RECENT_ALERTS 
} from '../../data/mockData';
import { AlertTriangle, Wrench, CheckCircle, Activity, Bell } from 'lucide-react';

export default function DashboardScreen() {
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* 2x2 KPI Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span className="text-[9px] font-mono font-bold">ALERTS</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-xl font-space font-bold text-black">48 Cases</p>
          <span className="text-[9px] text-red-600 font-mono font-bold">+12% vs yesterday</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span className="text-[9px] font-mono font-bold">PENDING</span>
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xl font-space font-bold text-black">42 Queue</p>
          <span className="text-[9px] text-amber-600 font-mono font-bold">Avg 18h turnaround</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span className="text-[9px] font-mono font-bold">RESOLVED</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-xl font-space font-bold text-black">38,450</p>
          <span className="text-[9px] text-emerald-600 font-mono font-bold">98.2% Closure</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-black/10">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span className="text-[9px] font-mono font-bold">TRAFFIC</span>
            <Activity className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <p className="text-xl font-space font-bold text-black">Optimal</p>
          <span className="text-[9px] text-cyan-600 font-mono font-bold">82% Speed Flow</span>
        </div>
      </div>

      {/* Mobile Chart: Detections Progression */}
      <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-3 shadow-xs">
        <div>
          <h3 className="font-space font-bold text-sm text-black">AI Detection & Repairs</h3>
          <p className="text-[10px] font-mono text-zinc-500">Potholes detected vs resolved</p>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_DETECTION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', fontSize: '10px' }} />
              <Line type="monotone" dataKey="potholes" stroke="#000" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mobile Alert Stream List */}
      <div className="p-4 rounded-3xl bg-zinc-50 border border-black/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-space font-bold text-xs text-black flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-black" /> Alert Center
          </h3>
          <span className="text-[9px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
            LIVE AUDIT
          </span>
        </div>

        <div className="space-y-2">
          {RECENT_ALERTS.map((alert) => (
            <div key={alert.id} className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center justify-between text-xs">
              <div>
                <p className="font-space font-bold text-black text-[11px]">{alert.title}</p>
                <p className="text-[9px] font-mono text-zinc-500">{alert.location}</p>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-white font-bold">
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
