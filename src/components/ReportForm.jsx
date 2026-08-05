import React, { useState } from 'react';
import { Upload, MapPin, AlertOctagon, CheckCircle2, Sparkles, Send, FileImage, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportForm() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [roadName, setRoadName] = useState('');
  const [district, setDistrict] = useState('Downtown');
  const [severity, setSeverity] = useState(7);
  const [description, setDescription] = useState('');
  const [ticketId, setTicketId] = useState(null);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      // Simulate live AI scan on uploaded photo
      setIsScanning(true);
      setScanResult(null);

      setTimeout(() => {
        setIsScanning(false);
        setScanResult({
          confidence: '98.4%',
          type: 'Deep Crater Pothole',
          suggestedSeverity: 8,
          estDepth: '9.2 cm'
        });
        setSeverity(8);
      }, 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedTicket = 'RV-TKT-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setScanResult(null);
    setTicketId(null);
    setRoadName('');
    setDescription('');
  };

  return (
    <section id="report" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-600 font-bold">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>CITIZEN ROAD HAZARD PORTAL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-space font-bold text-black tracking-tight">
          Report Pothole or Road Defect
        </h2>

        <p className="text-zinc-600 font-inter text-sm max-w-xl mx-auto">
          Upload a photo of the road hazard. Our neural vision engine will scan the damage, estimate repair depth, and dispatch municipal engineering teams instantly.
        </p>
      </div>

      {/* Glass Form Container */}
      <div className="glass-panel p-6 sm:p-10 border border-black/10 bg-white/90 shadow-xl relative">
        {ticketId ? (
          /* Submission Success State */
          <div className="py-12 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                HAZARD REPORT REGISTERED
              </span>
              <h3 className="text-2xl sm:text-3xl font-space font-bold text-black">
                Ticket Reference: {ticketId}
              </h3>
              <p className="text-sm text-zinc-600 font-inter max-w-md mx-auto">
                Thank you! The hazard has been logged into the RoadVision AI dispatch matrix. Municipal Repair Crew Alpha has been alerted.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 text-white max-w-md mx-auto text-left text-xs font-mono space-y-1.5">
              <p>ROAD: <strong className="text-white">{roadName || 'Main Expressway Corridor'}</strong></p>
              <p>DISTRICT: <strong className="text-white">{district}</strong></p>
              <p>AI HAZARD CONFIDENCE: <strong className="text-emerald-400">{scanResult?.confidence || '98.4%'}</strong></p>
              <p>ESTIMATED REPAIR TIME: <strong className="text-white">Under 24 Hours</strong></p>
            </div>

            <button
              onClick={resetForm}
              className="px-6 py-3 rounded-full bg-black text-white font-space font-bold text-xs hover:bg-zinc-800 shadow"
            >
              Submit Another Road Report
            </button>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drag & Drop Photo Upload Zone */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-700 font-bold">
                1. UPLOAD HAZARD PHOTO <span className="text-red-500">*</span>
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative min-h-[220px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer overflow-hidden ${
                  dragActive
                    ? 'border-black bg-black/5'
                    : selectedImage
                    ? 'border-black/30 bg-black'
                    : 'border-black/20 bg-zinc-50 hover:border-black/40'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                />

                {selectedImage ? (
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                    <img src={selectedImage} alt="Uploaded Pothole" className="w-full h-full object-cover" />

                    {/* AI Laser Scan Overlay on Photo */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
                        <div className="w-full h-1 bg-white shadow-[0_0_15px_#FFFFFF] animate-laser-scan" />
                        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
                        <p className="text-xs font-space font-bold text-white tracking-widest uppercase">
                          AI Neural Vision Scanning Photo...
                        </p>
                      </div>
                    )}

                    {/* Scan Results Tag */}
                    {scanResult && (
                      <div className="absolute bottom-3 left-3 right-3 p-3 glass-panel-dark border border-emerald-500/50 bg-emerald-950/80 flex items-center justify-between z-10 text-white">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          <div className="text-left">
                            <p className="text-xs font-space font-bold text-white">{scanResult.type}</p>
                            <p className="text-[10px] text-zinc-300 font-mono">Confidence: {scanResult.confidence} • Est Depth: {scanResult.estDepth}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500 text-black font-bold">
                          AI VERIFIED
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 pointer-events-none">
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-space font-bold text-black">Drag & drop photo here or click to browse</p>
                      <p className="text-xs text-zinc-500 font-inter mt-1">Supports JPG, PNG, WEBP up to 15MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location & District Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-700 font-bold mb-1">
                  2. ROAD NAME / ADDRESS <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={roadName}
                    onChange={(e) => setRoadName(e.target.value)}
                    placeholder="e.g. 742 Main Street Expressway"
                    className="w-full bg-zinc-50 border border-black/20 rounded-xl pl-9 pr-3 py-3 text-xs text-black placeholder-zinc-400 focus:outline-none focus:border-black font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-700 font-bold mb-1">
                  3. MUNICIPAL DISTRICT
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-zinc-50 border border-black/20 rounded-xl px-3 py-3 text-xs text-black focus:outline-none focus:border-black font-medium"
                >
                  <option value="Downtown">Downtown Central</option>
                  <option value="North Sector">North Sector Expressway</option>
                  <option value="West Hub">West Hub Industrial</option>
                  <option value="Industrial Zone">Industrial Cargo Corridor</option>
                </select>
              </div>
            </div>

            {/* Severity Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-700 font-bold">4. ESTIMATED SEVERITY LEVEL</span>
                <span className={`font-bold ${severity > 7 ? 'text-red-600' : severity > 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {severity} / 10 ({severity > 7 ? 'Critical Crater' : severity > 4 ? 'Moderate Defect' : 'Minor Crack'})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-mono text-zinc-700 font-bold mb-1">
                5. ADDITIONAL NOTES
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention traffic flow hazards, nearby landmarks, or lane obstruction..."
                className="w-full bg-zinc-50 border border-black/20 rounded-xl p-3 text-xs text-black placeholder-zinc-400 focus:outline-none focus:border-black font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-black text-white font-space font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <Send className="w-4 h-4" />
              Submit Hazard Report to Municipal Dispatch
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
