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
import ConstructorDashboard from '../dashboards/ConstructorDashboard';
import TrafficPoliceDashboard from '../dashboards/TrafficPoliceDashboard';
import AmbulanceDashboard from '../dashboards/AmbulanceDashboard';
import { useAuth } from '../context/AuthContext';

export default function MobileAppContainer() {
  const { user, logout, loginWithDemo, isAuthModalOpen } = useAuth();
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleLoginSuccess = (roleKey) => {
    loginWithDemo(roleKey);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    logout();
  };

  // Check if user is logged in
  const isLoggedIn = !!user && !isAuthModalOpen;
  const userRoleLower = (user?.role || '').toLowerCase();

  const renderScreen = () => {
    // 1. Strict Auth Guard: If not logged in, ALWAYS render Mobile LoginScreen
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // 2. CONSTRUCTOR MOBILE DASHBOARD
    if (userRoleLower.includes('constructor') || userRoleLower.includes('contractor')) {
      return (
        <div className="w-full">
          <ConstructorDashboard />
        </div>
      );
    }

    // 3. TRAFFIC POLICE MOBILE DASHBOARD
    if (userRoleLower.includes('traffic') || userRoleLower.includes('police')) {
      return (
        <div className="w-full">
          <TrafficPoliceDashboard />
        </div>
      );
    }

    // 4. AMBULANCE MOBILE DASHBOARD
    if (userRoleLower.includes('ambulance') || userRoleLower.includes('emergency')) {
      return (
        <div className="w-full">
          <AmbulanceDashboard />
        </div>
      );
    }

    // 5. CITIZEN MOBILE SCREENS (Default Citizen Mobile App)
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'map':
        return <MapScreen />;
      case 'cctv':
        return <CctvScreen />;
      case 'dashboard':
        return <DashboardScreen userRole="citizen" onLogout={handleLogout} />;
      case 'report':
        return <ReportScreen />;
      case 'diagnostic':
        return <DiagnosticScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  const isCitizenRole = isLoggedIn && (userRoleLower.includes('citizen') || (!userRoleLower.includes('constructor') && !userRoleLower.includes('traffic') && !userRoleLower.includes('ambulance')));

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between font-inter relative overflow-x-hidden">
      {/* Fixed Top Header - Render when logged in on Citizen view */}
      {isLoggedIn && isCitizenRole && (
        <div className="flex-shrink-0 sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-xs">
          <div className="w-full max-w-7xl mx-auto">
            <MobileHeader 
              activeScreen={activeScreen} 
              setActiveScreen={setActiveScreen} 
              isLoggedIn={isLoggedIn}
              userRole={userRoleLower}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Screen Body */}
      <div className={`flex-1 w-full flex flex-col justify-center items-center bg-white relative ${isLoggedIn && isCitizenRole ? 'pb-24' : ''}`}>
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoggedIn ? `${userRoleLower}-${activeScreen}` : 'login'}
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

      {/* Fixed Bottom TabBar for Citizen Mobile */}
      {isLoggedIn && isCitizenRole && (
        <MobileTabBar 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
