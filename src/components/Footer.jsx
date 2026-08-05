import React from 'react';
import { Cpu, FileText, Shield, Mail, ArrowRight, Heart, Code2 } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black text-white py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div className="font-space font-bold text-xl tracking-wider text-white">
              ROAD<span className="text-zinc-400">VISION</span> AI
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-inter max-w-sm leading-relaxed">
            Next-generation autonomous municipal road monitoring & traffic optimization platform powered by deep learning computer vision and neural GIS mapping.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              ● System Status: 100% Operational
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-3">
          <p className="text-xs font-mono text-zinc-400 tracking-wider">SYSTEM NAVIGATION</p>
          <ul className="space-y-2 text-xs font-space text-zinc-300">
            {['hero', 'features', 'map', 'cctv', 'dashboard', 'report', 'analyzer', 'admin'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    setActiveTab(tab);
                    document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors capitalize"
                >
                  {tab === 'hero' ? 'Home' : tab === 'cctv' ? 'AI CCTV Vision' : tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Documentation & Contact */}
        <div className="md:col-span-4 space-y-4">
          <p className="text-xs font-mono text-zinc-400 tracking-wider">STAY UPDATED</p>
          <p className="text-xs text-zinc-400 font-inter">
            Subscribe to municipal AI release notes and infrastructure intelligence reports.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter municipal email..."
              className="bg-zinc-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white flex-1"
            />
            <button className="px-4 py-2.5 rounded-xl bg-white text-black font-space font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1">
              Join <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> GitHub Repository
            </a>
            <a href="#docs" className="hover:text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> API Docs
            </a>
            <a href="#privacy" className="hover:text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
        <p>© 2026 RoadVision AI Technologies Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with luxury black & white glassmorphism <Heart className="w-3 h-3 text-red-500 fill-red-500" />
        </p>
      </div>
    </footer>
  );
}
