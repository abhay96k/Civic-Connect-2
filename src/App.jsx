import React from 'react';
import MobileAppContainer from './mobile/MobileAppContainer';
import BackgroundEffects from './components/BackgroundEffects';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-200 text-zinc-900 font-inter selection:bg-black selection:text-white relative">
      <BackgroundEffects />
      <MobileAppContainer />
    </div>
  );
}
