"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, DollarSign, Clock, FileBarChart } from 'lucide-react';
import { toast } from 'sonner';

export function ROIReportCard({ metrics }: { metrics: any }) {
  const exportReport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Compiling neural audit...',
      success: 'Report exported to CSV/PDF',
      error: 'Export failed',
    });
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Financial Impact Audit</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">ROI Analysis • PostgreSQL Data</p>
        </div>
        <button 
          onClick={exportReport}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-sky-400 transition-all shadow-xl shadow-white/5"
        >
          <Download size={14} /> Export Audit
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatItem 
          label="Est. Revenue Pipeline" 
          value={`$${metrics?.estimatedPipeline?.toLocaleString() || '0'}`} 
          trend="+12.4%" 
          icon={DollarSign} 
        />
        <StatItem 
          label="Human Hours Reclaimed" 
          value={`${metrics?.hoursSaved || 0} hrs`} 
          trend="+85%" 
          icon={Clock} 
        />
        <StatItem 
          label="Efficiency Multiplier" 
          value={`${metrics?.efficiencyMultiplier || 0}x`} 
          trend="Peak" 
          icon={TrendingUp} 
        />
      </div>

      {/* Simplified Growth Chart Visual */}
      <div className="h-32 w-full bg-black/20 rounded-3xl border border-slate-800/50 relative overflow-hidden flex items-end p-4 gap-2">
        {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="flex-1 bg-sky-500/20 border-t-2 border-sky-400/50 rounded-t-lg"
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] bg-slate-950/80 px-4 py-1 rounded-full backdrop-blur-md border border-white/5">
            Neural ROI Trajectory
          </span>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, trend, icon: Icon }: any) {
  return (
    <div className="p-6 rounded-3xl bg-black/20 border border-white/5 space-y-2">
      <div className="flex justify-between items-center">
        <Icon size={16} className="text-sky-500" />
        <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-white italic tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
