import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Eye, ShieldCheck, Activity, Radio, Sparkles, AlertOctagon } from 'lucide-react';
import { MOCK_STATS } from '../data/mockData';

export default function Hero({ setActiveTab }) {
  const canvasRef = useRef(null);
  const [scanCount, setScanCount] = useState(14820);
  const [activeAlert, setActiveAlert] = useState({ id: 'P-902', conf: '99.4%', depth: '8.4cm', district: 'Downtown Sector 4' });

  useEffect(() => {
    // Ticking scan counter
    const timer = setInterval(() => {
      setScanCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Interactive Road AI Canvas Simulation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 340);
    let height = (canvas.height = 320);

    let laserY = 0;
    let scanDirection = 1;

    // Simulated Vehicles on road
    const cars = [
      { x: 30, y: 130, speed: 2.0, label: 'Vehicle #1', color: '#E4E4E7' },
      { x: 180, y: 200, speed: -1.6, label: 'Vehicle #2', color: '#A1A1AA' },
      { x: 320, y: 130, speed: 2.5, label: 'Delivery Van', color: '#FFFFFF' }
    ];

    // Potholes detected on road
    const potholes = [
      { x: 140, y: 150, size: 20, label: 'Pothole #801', confidence: '98.9%' },
      { x: 280, y: 220, size: 16, label: 'Cracked Surface', confidence: '95.4%' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Road Grid & Lanes
      ctx.fillStyle = '#0F0F14';
      ctx.fillRect(0, 60, width, 200);

      // Outer Road Borders
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 60, width, 200);

      // Center Lane Dashed Divider
      ctx.beginPath();
      ctx.setLineDash([16, 12]);
      ctx.moveTo(0, 160);
      ctx.lineTo(width, 160);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Potholes
      potholes.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // AI Tag
        ctx.fillStyle = '#000000';
        ctx.fillRect(p.x - 40, p.y - p.size - 24, 80, 18);
        ctx.strokeStyle = '#EF4444';
        ctx.strokeRect(p.x - 40, p.y - p.size - 24, 80, 18);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px Space Grotesk';
        ctx.fillText(`${p.label}`, p.x - 35, p.y - p.size - 12);
      });

      // 3. Move and Draw Vehicles
      cars.forEach((c) => {
        c.x += c.speed;
        if (c.x > width + 40) c.x = -40;
        if (c.x < -40) c.x = width + 40;

        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.roundRect(c.x, c.y, 40, 22, 5);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(c.x - 3, c.y - 3, 46, 28);
        ctx.setLineDash([]);
      });

      // 4. Moving AI Laser Sweep
      laserY += scanDirection * 1.5;
      if (laserY > height || laserY < 0) scanDirection *= -1;

      const laserGrad = ctx.createLinearGradient(0, laserY - 12, 0, laserY + 12);
      laserGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      laserGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
      laserGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = laserGrad;
      ctx.fillRect(0, laserY - 12, width, 24);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '9px monospace';
      ctx.fillText(`LIDAR SCANNER • 60FPS`, 15, laserY - 4);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1720px] mx-auto overflow-hidden">
      {/* Soft Light Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[350px] bg-zinc-200/50 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Main Grid Hero Layout */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-black/10 text-[11px] sm:text-xs font-mono text-zinc-700 bg-white/90 shadow-sm max-w-full overflow-x-auto">
            <Radio className="w-3.5 h-3.5 text-black animate-pulse flex-shrink-0" />
            <span className="truncate">AI Road Intelligence</span>
            <span className="text-zinc-300">|</span>
            <span className="text-black font-bold flex-shrink-0">{MOCK_STATS.accuracyRate} Accuracy</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-space font-bold tracking-tight text-black leading-[1.1]">
            AI Powered <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-500">
              Smart Road Monitoring
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-inter max-w-3xl leading-relaxed">
            Detect potholes in real time, analyze traffic density, and automate municipal repair workflows with state-of-the-art computer vision and neural GIS mapping.
          </p>

          {/* CTA Buttons - Full Width on Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-black text-white font-space font-bold text-sm tracking-wide hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl group active:scale-95"
            >
              <span>Live Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className="w-full sm:w-auto px-7 py-4 rounded-full glass-button text-black font-space font-semibold text-sm flex items-center justify-center gap-2 border border-black/20 hover:bg-black hover:text-white active:scale-95"
            >
              <AlertOctagon className="w-4 h-4 text-red-500" />
              Report Pothole
            </button>

            <button
              onClick={() => setActiveTab('analyzer')}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-zinc-100 border border-black/10 hover:border-black/30 text-zinc-800 font-space text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Test AI Scanner Demo
            </button>
          </div>

          {/* Micro Telemetry Stats - Responsive Grid */}
          <div className="pt-6 border-t border-black/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">LIVE SCANS / MIN</p>
              <p className="text-lg sm:text-2xl font-space font-bold text-black mt-0.5">
                {scanCount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">ROADS COVERED</p>
              <p className="text-lg sm:text-2xl font-space font-bold text-black mt-0.5">
                {MOCK_STATS.monitoredRoadsKm.toLocaleString()} KM
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">AVG DISPATCH</p>
              <p className="text-lg sm:text-2xl font-space font-bold text-black mt-0.5">
                {MOCK_STATS.avgRepairHours} Hours
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating AI Dashboard & Live Canvas Scanner */}
        <div className="lg:col-span-5 relative z-10">
          <div className="glass-panel-dark p-4 sm:p-5 border border-black/20 shadow-2xl relative group bg-zinc-950 text-white rounded-2xl sm:rounded-3xl">
            {/* Header bar of scanner box */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-space font-bold text-[11px] sm:text-xs text-white">AI CCTV RADAR SIMULATOR</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 bg-white/10 px-2 py-0.5 rounded">
                #LIDAR-901
              </span>
            </div>

            {/* Live Canvas simulation */}
            <div className="relative my-3 rounded-xl overflow-hidden border border-white/15 bg-black min-h-[260px] sm:min-h-[320px]">
              <canvas ref={canvasRef} className="w-full h-[260px] sm:h-[320px] block" />

              {/* Floating Alert Overlay Tag */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 glass-panel p-2.5 sm:p-3 border border-red-500/40 bg-red-950/70 backdrop-blur-md flex items-center justify-between animate-float text-white rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40">
                    <AlertOctagon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-space font-bold text-white">HAZARD: POTHOLE #8091</p>
                    <p className="text-[9px] sm:text-[10px] text-zinc-300 font-mono">
                      Conf: {activeAlert.conf} • Depth: {activeAlert.depth}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-2.5 py-1 rounded bg-white text-black text-[9px] sm:text-[10px] font-space font-bold hover:bg-zinc-200"
                >
                  MAP
                </button>
              </div>
            </div>

            {/* Bottom telemetry indicators */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
              <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2.5">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[9px] sm:text-[10px] text-zinc-400 font-mono">FRAME RATE</p>
                  <p className="text-xs font-space font-bold text-white">60.0 FPS</p>
                </div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2.5">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <p className="text-[9px] sm:text-[10px] text-zinc-400 font-mono">CAMERAS</p>
                  <p className="text-xs font-space font-bold text-white">{MOCK_STATS.activeCameras} Nodes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
