import React from 'react';
import { Cpu, Activity, Bell, MapPin, ArrowUpRight, Zap } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Cpu,
      title: "AI Pothole Detection",
      subtitle: "Computer Vision Precision",
      description: "Neural networks scan camera feeds to pinpoint sub-centimeter surface defects, calculate depth indices, and grade damage severity automatically.",
      tag: "99.8% Accuracy",
      glowColor: "from-black/5 to-black/0"
    },
    {
      icon: Activity,
      title: "Traffic Density Analytics",
      subtitle: "Flow Optimization",
      description: "Classify vehicles in real time, monitor speed variations, and dynamically route traffic away from compromised road sectors.",
      tag: "Real-Time Telemetry",
      glowColor: "from-emerald-500/10 to-emerald-500/0"
    },
    {
      icon: Bell,
      title: "Instant Automated Alerts",
      subtitle: "Smart Dispatch",
      description: "Automated municipal notification engine dispatches field crews, generates repair work orders, and sends SMS alerts for high-risk hazards.",
      tag: "< 15 Min Response",
      glowColor: "from-amber-500/10 to-amber-500/0"
    },
    {
      icon: MapPin,
      title: "GIS Maps Integration",
      subtitle: "Spatial Mapping",
      description: "Interactive heatmaps overlay road degradation over time, providing city planners with predictive analytics for pavement maintenance.",
      tag: "Live Spatial Data",
      glowColor: "from-cyan-500/10 to-cyan-500/0"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black">
          <Zap className="w-3.5 h-3.5 text-black animate-pulse" />
          <span>NEXT-GEN CORE CAPABILITIES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
          Engineered for <span className="text-zinc-600">Autonomous Road Safety</span>
        </h2>

        <p className="text-zinc-600 font-inter text-base">
          Four foundational AI pillars designed to transform municipal road inspection from manual reporting to proactive autonomous monitoring.
        </p>
      </div>

      {/* 4 Premium Glass Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-card-hover p-6 border border-black/10 bg-white/80 relative overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              {/* Card Ambient Glow Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/5 text-zinc-700 border border-black/10 font-bold">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-1">{item.subtitle}</p>
                <h3 className="text-xl font-space font-bold text-black mb-3 group-hover:text-zinc-700 transition-colors">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-zinc-600 font-inter leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action Lift Indicator */}
              <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between text-xs font-space font-semibold text-zinc-600 group-hover:text-black transition-colors">
                <span>Explore Tech</span>
                <div className="w-7 h-7 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
