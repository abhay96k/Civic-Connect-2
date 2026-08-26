import React, { useEffect, useState } from 'react';
import { AlertCircle, Gauge, Route, CheckCircle2 } from 'lucide-react';
import { MOCK_STATS } from '../data/mockData';

export default function LiveAnalytics() {
  const [potholes, setPotholes] = useState(42890);
  const [resolved, setResolved] = useState(38450);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setPotholes(prev => prev + 1);
      }
      if (Math.random() > 0.6) {
        setResolved(prev => prev + 1);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: AlertCircle,
      label: "DETECTED POTHOLES",
      value: potholes.toLocaleString() + "+",
      change: "+14.2% this month",
      color: "text-red-400"
    },
    {
      icon: Gauge,
      label: "TRAFFIC DENSITY",
      value: MOCK_STATS.trafficDensity,
      change: "Flow Efficiency Index",
      color: "text-white"
    },
    {
      icon: Route,
      label: "MONITORED ROADS",
      value: MOCK_STATS.monitoredRoadsKm.toLocaleString() + " KM",
      change: "412 Active Camera Nodes",
      color: "text-cyan-400"
    },
    {
      icon: CheckCircle2,
      label: "RESOLVED CASES",
      value: resolved.toLocaleString() + "+",
      change: "98.2% Closure Rate",
      color: "text-emerald-400"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1720px] mx-auto my-8">
      {/* Matte Black Luxury Banner inside Pure White Layout */}
      <div className="p-8 md:p-12 rounded-[28px] bg-black text-white border border-black relative overflow-hidden shadow-2xl">
        {/* Shimmer line across top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE MUNICIPAL TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-space font-bold text-white tracking-tight">
              Real-Time Impact Metrics
            </h2>
          </div>

          <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-300">
            System Uptime: <span className="text-white font-bold">99.98%</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${st.color}`} />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">LIVE</span>
                </div>

                <p className="text-[11px] font-mono text-zinc-400 tracking-wider mb-1">{st.label}</p>
                <p className="text-2xl sm:text-3xl font-space font-bold text-white tracking-tight">
                  {st.value}
                </p>
                <p className="text-[11px] text-zinc-400 font-inter mt-2 flex items-center gap-1">
                  <span className="text-emerald-400">↑</span> {st.change}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
