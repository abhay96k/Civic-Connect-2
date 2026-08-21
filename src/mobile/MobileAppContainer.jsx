import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileHeader from './MobileHeader';
import MobileTabBar from './MobileTabBar';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CctvScreen from './screens/CctvScreen';
import DashboardScreen from './screens/DashboardScreen';
import ReportScreen from './screens/ReportScreen';
import DiagnosticScreen from './screens/DiagnosticScreen';
import LoginScreen from './screens/LoginScreen';

export default function MobileAppContainer() {
  const [activeScreen, setActiveScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveScreen('login');
  };

  const renderScreen = () => {
    // Strict Auth Guard: If not logged in, ALWAYS render LoginScreen
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'map':
        return <MapScreen />;
      case 'cctv':
        return <CctvScreen />;
      case 'dashboard':
        return <DashboardScreen userRole={userRole} onLogout={handleLogout} />;
      case 'report':
        return <ReportScreen />;
      case 'diagnostic':
        return <DiagnosticScreen />;
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between font-inter relative overflow-x-hidden">
      {/* Fixed Top Header - Render when logged in */}
      {isLoggedIn && (
        <div className="flex-shrink-0 sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-xs">
          <div className="w-full max-w-7xl mx-auto">
            <MobileHeader 
              activeScreen={activeScreen} 
              setActiveScreen={setActiveScreen} 
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Screen Body - Full screen on desktop and mobile with bottom padding for fixed nav */}
      <div className={`flex-1 w-full flex flex-col justify-center items-center bg-white relative ${isLoggedIn ? 'pb-24' : ''}`}>
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoggedIn ? activeScreen : 'login'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Permanently Fixed Bottom Navigation Bar - Render when logged in */}
      {isLoggedIn && (
        <MobileTabBar 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
