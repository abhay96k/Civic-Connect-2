import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, MapPin, LayoutDashboard, AlertTriangle, Cpu, Menu, X, Sparkles, ChevronRight, Activity, Zap, LogIn, LogOut, User, ChevronDown, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'cctv', label: 'AI CCTV Feed', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report Pothole', icon: AlertTriangle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > 120) {
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
    setUserMenuOpen(false);
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
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none flex justify-center"
    >
      {/* Freely Floating Header Container */}
      <div className="w-full max-w-[1720px] flex items-center justify-between pointer-events-auto">
        
        {/* Left Island: Brand Logo */}
        <motion.div 
          onClick={() => handleNavClick('hero')} 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-3 cursor-pointer select-none px-4.5 py-3 rounded-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${
            scrolled ? 'py-2.5 px-4 shadow-lg' : ''
          }`}
        >
          <div className="relative w-9 h-9 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-md">
            <Cpu className="w-4.5 h-4.5" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="flex items-center gap-2 font-space font-bold text-base sm:text-lg tracking-wider text-black dark:text-white">
            <span>ROAD<span className="text-zinc-500">VISION</span></span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black font-mono font-bold">AI</span>
          </div>
        </motion.div>

        {/* Center Floating Dock: Main Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-zinc-950/90 text-white backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-space font-semibold transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'text-black font-bold shadow-lg' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="floatingNavPill"
                    className="absolute inset-0 bg-white rounded-full shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Island: Auth User Menu */}
        <div className="hidden md:flex items-center gap-2.5 p-2 rounded-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

          {/* User Account / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-md"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400/50"
                />
                <span className="text-xs font-space font-bold max-w-[100px] truncate">{user.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  {user.role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 p-3 rounded-2xl bg-zinc-950/95 text-white backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 flex flex-col gap-2"
                  >
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold font-space truncate">{user.name}</p>
                        <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => { setIsAuthModalOpen(true); setUserMenuOpen(false); }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-space font-semibold text-zinc-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Switch Role / Account
                      </span>
                    </button>

                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-space font-semibold text-red-400 hover:bg-red-500/10 flex items-center justify-between transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-space font-bold text-sm tracking-wide shadow-md flex items-center gap-2 cursor-pointer hover:brightness-110 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-3.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl text-black dark:text-white border border-black/10 dark:border-white/10 shadow-lg cursor-pointer pointer-events-auto"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </motion.button>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-full left-4 right-4 mt-3 p-5 rounded-3xl bg-zinc-950/95 text-white backdrop-blur-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.4)] lg:hidden flex flex-col gap-2"
          >
            {/* Mobile User Profile Section */}
            {user ? (
              <div className="p-3 mb-2 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold font-space text-white">{user.name}</p>
                    <p className="text-xs text-emerald-400 font-mono font-medium">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full mb-2 bg-emerald-400 text-black py-3 rounded-2xl font-space font-bold text-sm text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4.5 h-4.5" />
                Sign In / Access Portal
              </button>
            )}

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
                  className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl text-base font-space font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-lg font-bold'
                      : 'text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 opacity-50 ${isActive ? 'text-black' : ''}`} />
                </motion.button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full bg-white text-black py-3.5 rounded-2xl font-space font-bold text-sm text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                Launch Live Dashboard
              </button>
              <button
                onClick={() => handleNavClick('report')}
                className="w-full bg-zinc-900 border border-white/10 text-white py-3.5 rounded-2xl font-space text-sm text-center font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4.5 h-4.5 text-amber-400" />
                Report Road Hazard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
