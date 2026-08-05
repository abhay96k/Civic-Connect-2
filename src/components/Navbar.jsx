import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, MapPin, LayoutDashboard, AlertTriangle, Cpu, UserCheck, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 pointer-events-none flex justify-center"
    >
      {/* Outer Floating Glass Container */}
      <div 
        className={`pointer-events-auto w-full max-w-7xl transition-all duration-500 rounded-3xl ${
          scrolled 
            ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] py-2.5 px-4 sm:px-6' 
            : 'bg-white/65 dark:bg-zinc-950/65 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-3 px-4 sm:px-6'
        } flex items-center justify-between relative overflow-hidden group`}
      >
        {/* Ambient Top Subtle Shimmer Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/30 to-transparent opacity-80" />

        {/* Brand Logo */}
        <motion.div 
          onClick={() => handleNavClick('hero')} 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 cursor-pointer select-none group/logo"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-zinc-800 dark:from-white dark:via-zinc-100 dark:to-zinc-200 text-white dark:text-black border border-black/10 dark:border-white/20 flex items-center justify-center shadow-md overflow-hidden">
            <Cpu className="w-5 h-5 group-hover/logo:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <div>
            <div className="font-space font-bold text-base sm:text-lg tracking-wider text-black dark:text-white flex items-center gap-1.5 leading-none">
              ROAD<span className="text-zinc-500 dark:text-zinc-400">VISION</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black dark:bg-white text-white dark:text-black font-mono font-bold tracking-tight">AI</span>
            </div>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-mono tracking-widest uppercase mt-0.5 hidden sm:block">SMART INFRASTRUCTURE</p>
          </div>
        </motion.div>

        {/* Desktop Navigation Items with Sliding Active Pill */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-900/60 p-1.5 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  isActive ? 'text-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400'}`} />
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions & Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Operational</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleNavClick('dashboard')}
            className="px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-space font-semibold text-xs tracking-wide hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-1.5 border border-black/10 dark:border-white/20 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Live Dashboard</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white border border-black/10 dark:border-white/10 shadow-sm cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Animated Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 p-4 rounded-3xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-3xl border border-white/60 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.2)] lg:hidden flex flex-col gap-1.5"
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-black' : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-50 ${isActive ? 'text-white dark:text-black' : ''}`} />
                </motion.button>
              );
            })}

            <div className="pt-3 mt-1 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-2xl font-space font-bold text-xs text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                Launch Live Dashboard
              </button>
              <button
                onClick={() => handleNavClick('report')}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-black dark:text-white py-3 rounded-2xl font-space text-xs text-center font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Report Road Hazard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

