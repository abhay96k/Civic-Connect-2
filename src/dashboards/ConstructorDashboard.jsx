import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, HardHat, Wrench, CheckCircle2, Clock, MapPin, 
  Upload, FileText, AlertTriangle, ChevronRight, LogOut, ShieldCheck, 
  Layers, Package, DollarSign, Users, Eye, Sparkles, Filter, Check, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CONSTRUCTOR_DATA } from '../data/roleMockData';

export default function ConstructorDashboard() {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'workorders' | 'materials' | 'completion'
  const [workOrders, setWorkOrders] = useState(CONSTRUCTOR_DATA.workOrders);
  const [selectedOrder, setSelectedOrder] = useState(CONSTRUCTOR_DATA.workOrders[0]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedPhoto, setCompletedPhoto] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = workOrders.map(order => {
      if (order.id === orderId) {
        const isComp = newStatus === 'Completed & Verified';
        return { 
          ...order, 
          status: newStatus, 
          progress: isComp ? 100 : newStatus === 'In Progress' ? 50 : 10,
          afterImage: isComp && completedPhoto ? completedPhoto : order.afterImage || (isComp ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' : null)
        };
      }
      return order;
    });
    setWorkOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(updated.find(o => o.id === orderId));
    }
    setSuccessToast(`Work order ${orderId} updated to ${newStatus}`);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompletedPhoto(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitCompletion = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, 'Completed & Verified');
    setShowCompletionModal(false);
    setCompletedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter selection:bg-amber-500 selection:text-black">
      
      {/* Top Professional Constructor Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-space font-bold text-lg text-white tracking-tight">Apex Infra Console</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                Constructor Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">Road Repairs & Work Order Execution System</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'} alt="User" className="w-7 h-7 rounded-full object-cover border border-amber-400" />
            <div>
              <p className="text-xs font-bold font-space text-white leading-tight">{user?.name || 'Apex Infra Ltd.'}</p>
              <p className="text-[10px] text-amber-400 font-mono">Infrastructure Contractor</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-space font-semibold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Switch Role</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-all border border-red-500/20 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & KPIs', icon: Layers },
          { id: 'workorders', label: 'Work Orders & Repairs', icon: Wrench },
          { id: 'materials', label: 'Material Inventory', icon: Package },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-space font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 p-4 rounded-2xl bg-amber-500 text-black font-space font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* KPI TELEMETRY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Assigned Work Orders</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{CONSTRUCTOR_DATA.stats.assignedWorkOrders}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-amber-400 uppercase">In Progress</p>
            <p className="text-2xl font-space font-bold text-amber-400 mt-1">{CONSTRUCTOR_DATA.stats.inProgressRepairs}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-emerald-400 uppercase">Completed (This Month)</p>
            <p className="text-2xl font-space font-bold text-emerald-400 mt-1">{CONSTRUCTOR_DATA.stats.completedThisMonth}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Budget Spent</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{CONSTRUCTOR_DATA.stats.totalBudgetSpent}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Active Workers</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{CONSTRUCTOR_DATA.stats.crewMembersActive}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Avg Repair Time</p>
            <p className="text-2xl font-space font-bold text-white mt-1">{CONSTRUCTOR_DATA.stats.avgCompletionTimeHours}h</p>
          </div>
        </div>

        {/* TAB 1 & 2: WORK ORDERS LIST & DETAIL VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Work Orders List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                Active Repair Work Orders
              </h2>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                {workOrders.length} Allocated
              </span>
            </div>

            <div className="space-y-3">
              {workOrders.map((order) => {
                const isSelected = selectedOrder?.id === order.id;
                const isCompleted = order.status === 'Completed & Verified';
                const isInProgress = order.status === 'In Progress';

                return (
                  <motion.div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    whileHover={{ scale: 1.01 }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">{order.id}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            isInProgress ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <h3 className="font-space font-bold text-sm text-white mt-1">{order.title}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{order.location}</span>
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                        {order.estimatedCost}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${order.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">{order.progress}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Work Order Details & Evidence Upload */}
          {selectedOrder && (
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{selectedOrder.id}</span>
                    <h2 className="font-space text-xl font-bold text-white mt-0.5">{selectedOrder.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{selectedOrder.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold">
                    {selectedOrder.priority}
                  </span>
                </div>

                {/* Status Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'In Progress')}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-space font-bold text-xs hover:bg-amber-400 transition-all shadow-md cursor-pointer"
                  >
                    Mark as In Progress
                  </button>

                  <button
                    onClick={() => setShowCompletionModal(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-space font-bold text-xs hover:bg-emerald-400 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Completed Work
                  </button>
                </div>

                {/* Before vs After Photos */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase mb-2">Before Repair (Damage)</p>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-video bg-black">
                      <img src={selectedOrder.beforeImage} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-red-400 font-bold">
                        Pothole Depth: {selectedOrder.depthCm}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase mb-2">After Repair Evidence</p>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-video bg-black flex items-center justify-center">
                      {selectedOrder.afterImage ? (
                        <>
                          <img src={selectedOrder.afterImage} alt="After" className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-mono font-bold">
                            Verified Smooth Surface
                          </span>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-6 h-6 text-slate-600 mx-auto mb-1" />
                          <p className="text-[11px] text-slate-500 font-inter">No after photo uploaded yet</p>
                          <button
                            onClick={() => setShowCompletionModal(true)}
                            className="mt-2 text-xs font-mono text-amber-400 underline cursor-pointer"
                          >
                            Upload Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Required Materials & Logistics */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-space font-bold text-xs text-white uppercase tracking-wider">Required Repair Logistics</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500 font-mono text-[10px]">ASSIGNED CREW</p>
                      <p className="font-semibold text-slate-200 mt-0.5">{selectedOrder.assignedCrew}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-mono text-[10px]">ESTIMATED COST</p>
                      <p className="font-semibold text-emerald-400 mt-0.5">{selectedOrder.estimatedCost}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-mono text-[10px]">DEADLINE</p>
                      <p className="font-semibold text-amber-400 mt-0.5">{selectedOrder.deadline}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-mono text-[10px]">SEVERITY SCORE</p>
                      <p className="font-semibold text-red-400 mt-0.5">{selectedOrder.severityScore}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-slate-500 font-mono text-[10px] mb-1">MATERIALS ALLOCATED</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOrder.materialsRequired.map((mat, i) => (
                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* TAB 3: MATERIAL INVENTORY TRACKER */}
        {activeTab === 'materials' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="font-space text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Contractor Material Inventory & Machinery Status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONSTRUCTOR_DATA.inventory.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-space font-bold text-sm text-white">{item.name}</h4>
                    <p className="text-xs text-amber-400 font-mono font-bold mt-1">{item.quantity}</p>
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-bold ${
                    item.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.status === 'Low Stock' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* WORK COMPLETION SUBMISSION MODAL */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setShowCompletionModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="font-space text-xl font-bold text-white">Submit Completed Work</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload verification photo for <span className="text-amber-400 font-bold">{selectedOrder?.id}</span> to close out work order.
                </p>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center bg-slate-950 hover:border-amber-500 transition-colors">
                {completedPhoto ? (
                  <div className="space-y-3">
                    <img src={completedPhoto} alt="Uploaded evidence" className="w-full h-40 object-cover rounded-xl border border-slate-800" />
                    <p className="text-xs text-emerald-400 font-mono font-bold">✓ Evidence Photo Attached</p>
                  </div>
                ) : (
                  <label className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-xs font-space font-bold text-white">Click to Upload After-Repair Photo</p>
                    <p className="text-[11px] text-slate-500 font-mono">PNG, JPG, or WEBP up to 10MB</p>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-space font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submitCompletion}
                  className="w-1/2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-space font-bold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
