import React, { useState } from 'react';
import { UserCheck, Shield, Camera, FileText, Wrench, CheckCircle, AlertCircle, Plus, Users, Cpu, Activity } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('orders');

  const users = [
    { id: 'USR-01', name: 'Dr. Sarah Lin', role: 'Chief Municipal Engineer', district: 'Downtown Central', status: 'Active' },
    { id: 'USR-02', name: 'Marcus Vance', role: 'AI Systems Operator', district: 'All Sectors', status: 'Active' },
    { id: 'USR-03', name: 'Elena Rostova', role: 'Field Inspection Crew Lead', district: 'North Sector', status: 'On Duty' },
  ];

  const workOrders = [
    { id: 'WO-4091', road: 'Main St Expressway #742', priority: 'P1 Emergency', assignedTo: 'Alpha Repair Crew', status: 'In Progress', estCompletion: '3 Hours' },
    { id: 'WO-4092', road: 'North Boulevard Block B', priority: 'P2 Urgent', assignedTo: 'Metro Ops #3', status: 'Dispatched', estCompletion: '6 Hours' },
    { id: 'WO-4093', road: 'Terminal Way Interchange', priority: 'P1 Emergency', assignedTo: 'West Repair Fleet', status: 'Pending Approval', estCompletion: 'Scheduled' },
  ];

  const cameraNodes = [
    { id: 'CAM-01', name: 'Downtown Flyover 4K', power: '98% Solar', status: 'Optimal', uptime: '99.9%' },
    { id: 'CAM-02', name: 'North Highway Junction', power: '100% Grid', status: 'Optimal', uptime: '100%' },
    { id: 'CAM-03', name: 'Industrial Sector Terminal', power: '85% Battery', status: 'Maintenance', uptime: '97.4%' },
  ];

  return (
    <section id="admin" className="py-20 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1720px] mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black mb-2">
            <UserCheck className="w-3.5 h-3.5 text-black" />
            <span>MUNICIPAL ADMIN CONTROL HUB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
            Admin & Dispatch Management
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-xl border border-black/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-space font-semibold transition-all ${
              activeTab === 'orders' ? 'bg-black text-white font-bold' : 'text-zinc-600 hover:text-black'
            }`}
          >
            Work Orders
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-xs font-space font-semibold transition-all ${
              activeTab === 'users' ? 'bg-black text-white font-bold' : 'text-zinc-600 hover:text-black'
            }`}
          >
            Personnel
          </button>
          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-4 py-2 rounded-lg text-xs font-space font-semibold transition-all ${
              activeTab === 'nodes' ? 'bg-black text-white font-bold' : 'text-zinc-600 hover:text-black'
            }`}
          >
            Camera Nodes
          </button>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="glass-panel p-6 sm:p-8 border border-black/10 bg-white/80 shadow-xl">
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-space font-bold text-lg text-black flex items-center gap-2">
                <Wrench className="w-5 h-5 text-black" /> Active Repair Work Orders
              </h3>
              <button className="px-3.5 py-1.5 rounded-lg bg-black text-white font-space font-bold text-xs flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Create New Order
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-mono text-zinc-500 uppercase font-bold">
                    <th className="py-3 px-4">ORDER ID</th>
                    <th className="py-3 px-4">ROAD LOCATION</th>
                    <th className="py-3 px-4">PRIORITY</th>
                    <th className="py-3 px-4">ASSIGNED CREW</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">EST COMPLETION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs font-inter">
                  {workOrders.map((wo) => (
                    <tr key={wo.id} className="hover:bg-black/5 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-black">{wo.id}</td>
                      <td className="py-4 px-4 text-zinc-700">{wo.road}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          wo.priority.includes('P1') ? 'bg-red-500/20 text-red-700 border border-red-500/30' : 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                        }`}>
                          {wo.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-zinc-700 font-mono">{wo.assignedTo}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-black/10 text-black text-[10px] font-mono font-bold">
                          {wo.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-zinc-500">{wo.estCompletion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-space font-bold text-lg text-black flex items-center gap-2">
                <Users className="w-5 h-5 text-black" /> Authorized Municipal Engineers & Inspectors
              </h3>
              <button className="px-3.5 py-1.5 rounded-lg bg-black text-white font-space font-bold text-xs flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Add Staff Member
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {users.map((usr) => (
                <div key={usr.id} className="p-4 rounded-xl bg-zinc-50 border border-black/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">{usr.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold">
                      {usr.status}
                    </span>
                  </div>
                  <h4 className="font-space font-bold text-sm text-black">{usr.name}</h4>
                  <p className="text-xs text-zinc-600 font-mono">{usr.role}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Sector: {usr.district}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-space font-bold text-lg text-black flex items-center gap-2">
                <Camera className="w-5 h-5 text-black" /> CCTV AI Hardware Camera Nodes
              </h3>
              <span className="text-xs font-mono text-emerald-700 font-bold">412 Nodes Connected</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {cameraNodes.map((node) => (
                <div key={node.id} className="p-4 rounded-xl bg-zinc-50 border border-black/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">{node.id}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      node.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-amber-500/20 text-amber-700'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                  <h4 className="font-space font-bold text-sm text-black">{node.name}</h4>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-600 pt-2 border-t border-black/10">
                    <span>Power: <strong className="text-black">{node.power}</strong></span>
                    <span>Uptime: <strong className="text-emerald-700">{node.uptime}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
