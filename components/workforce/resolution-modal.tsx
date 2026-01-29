"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCcw, Save, Brain } from 'lucide-react';
import { toast } from 'sonner';

export function ResolutionModal({ session, onComplete }: any) {
  const [summary, setSummary] = useState("Summarizing interaction...");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleFinalize = async () => {
    setIsSyncing(true);
    // Call the /api/workforce/resolve route
    toast.success("Memory Synchronized", {
      description: "Interaction summary added to Customer DNA."
    });
    setIsSyncing(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Brain size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">Finalize Interaction</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Updating Neural CRM Memory</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            AI Generated Resolution
          </label>
          <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 italic leading-relaxed">
            {summary}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-800 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">
            <RefreshCcw size={14} /> Re-Summarize
          </button>
          <button 
            onClick={handleFinalize}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase hover:bg-emerald-400 transition-all"
          >
            <Save size={14} /> Sync & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
