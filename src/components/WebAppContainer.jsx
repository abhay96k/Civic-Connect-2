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
import { AuthProvider } from '../context/AuthContext';

export default function WebAppContainer({ onSwitchPlatform }) {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-white text-zinc-900 font-inter relative selection:bg-black selection:text-white">
        {/* Figma Design Split Login Page Component */}
        <LoginPage />

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
    </AuthProvider>
  );
}
