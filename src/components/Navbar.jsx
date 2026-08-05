import React, { useState } from 'react';
import { ShieldCheck, Eye, MapPin, LayoutDashboard, AlertTriangle, Cpu, UserCheck, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'features', label: 'Features', icon: ShieldCheck },
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'cctv', label: 'AI CCTV Feed', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report Pothole', icon: AlertTriangle },
    { id: 'analyzer', label: 'AI Diagnostic', icon: Cpu },
    { id: 'admin', label: 'Admin', icon: UserCheck },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto glass-panel px-4 py-3 flex items-center justify-between border border-black/10 shadow-lg bg-white/80 backdrop-blur-xl">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-black text-white border border-black/20 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-all">
            <Cpu className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="font-space font-bold text-lg tracking-wider text-black flex items-center gap-1.5">
              ROAD<span className="text-zinc-500">VISION</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black text-white font-mono border border-black/20">AI</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:block">SMART INFRASTRUCTURE</p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 bg-zinc-100 p-1.5 rounded-full border border-black/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-black text-white font-semibold shadow-md'
                    : 'text-zinc-600 hover:text-black hover:bg-black/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Operational</span>
          </div>

          <button
            onClick={() => handleNavClick('dashboard')}
            className="px-4 py-2 rounded-full bg-black text-white font-space font-semibold text-xs tracking-wide hover:bg-zinc-800 transition-all shadow-md flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Live Dashboard
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-zinc-100 text-black border border-black/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel p-4 flex flex-col gap-2 border border-black/10 bg-white/95 shadow-xl animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-black text-white font-bold'
                    : 'text-zinc-700 hover:bg-black/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full bg-black text-white py-2.5 rounded-xl font-space font-bold text-xs text-center shadow"
            >
              Launch Live Dashboard
            </button>
            <button
              onClick={() => handleNavClick('report')}
              className="w-full bg-zinc-100 border border-black/10 text-black py-2.5 rounded-xl font-space text-xs text-center"
            >
              Report Road Hazard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
