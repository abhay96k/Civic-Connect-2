import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import LiveAnalytics from './LiveAnalytics';
import InteractiveMap from './InteractiveMap';
import DetectionFeed from './DetectionFeed';
import Dashboard from './Dashboard';
import ReportForm from './ReportForm';
import AIAnalyzer from './AIAnalyzer';
import AdminPanel from './AdminPanel';
import Footer from './Footer';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute';
import ConstructorDashboard from '../dashboards/ConstructorDashboard';
import TrafficPoliceDashboard from '../dashboards/TrafficPoliceDashboard';
import AmbulanceDashboard from '../dashboards/AmbulanceDashboard';
import { AuthProvider, useAuth } from '../context/AuthContext';

function WebAppContent({ onSwitchPlatform }) {
  const [activeTab, setActiveTab] = useState('hero');
  const { user, isAuthModalOpen, loginWithDemo } = useAuth();

  // 1. Unauthenticated / Auth Trigger -> Render Figma Split Login Page as First Screen
  if (!user || isAuthModalOpen) {
    return <LoginPage />;
  }

  // 2. Role-Based Dashboard Router
  const roleLower = (user.role || '').toLowerCase();

  // CONSTRUCTOR ROLE
  if (roleLower.includes('constructor') || roleLower.includes('contractor')) {
    return (
      <ProtectedRoute allowedRole="Constructor" onNavigateRole={(r) => loginWithDemo('constructor')}>
        <ConstructorDashboard />
      </ProtectedRoute>
    );
  }

  // TRAFFIC POLICE ROLE
  if (roleLower.includes('traffic') || roleLower.includes('police')) {
    return (
      <ProtectedRoute allowedRole="Traffic Police" onNavigateRole={(r) => loginWithDemo('traffic')}>
        <TrafficPoliceDashboard />
      </ProtectedRoute>
    );
  }

  // AMBULANCE / EMERGENCY ROLE
  if (roleLower.includes('ambulance') || roleLower.includes('emergency')) {
    return (
      <ProtectedRoute allowedRole="Ambulance" onNavigateRole={(r) => loginWithDemo('ambulance')}>
        <AmbulanceDashboard />
      </ProtectedRoute>
    );
  }

  // CITIZEN ROLE (Existing Provided White Glassmorphic Interface)
  return (
    <ProtectedRoute allowedRole="Citizen" onNavigateRole={(r) => loginWithDemo('citizen')}>
      <div className="w-full min-h-screen bg-white text-zinc-900 font-inter relative selection:bg-black selection:text-white">
        {/* Top Floating Web Navigation Header */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Web Application Sections */}
        <main className="pt-20">
          <Hero setActiveTab={setActiveTab} />
          <LiveAnalytics />
          <Features />
          <InteractiveMap />
          <DetectionFeed />
          <Dashboard />
          <ReportForm />
          <AIAnalyzer />
          <AdminPanel />
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </ProtectedRoute>
  );
}

export default function WebAppContainer({ onSwitchPlatform }) {
  return (
    <AuthProvider>
      <WebAppContent onSwitchPlatform={onSwitchPlatform} />
    </AuthProvider>
  );
}
