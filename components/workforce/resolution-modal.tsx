"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RefreshCcw, Save, Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ResolutionModal({ session, onComplete }: any) {
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulate AI Thinking/Summarization on mount
  useEffect(() => {
    const generateSummary = async () => {
      setIsSummarizing(true);
      // In production, you'd fetch this from your /api/ai/summarize route
      await new Promise(resolve => setTimeout(resolve, 1800)); 
      setSummary("Patient requested a follow-up for orthopedic consultation. Insurance verified. Appointment tentatively held for Thursday at 2:00 PM. Sentiment: Positive.");
      setIsSummarizing(false);
    };

    generateSummary();
  }, []);

  const handleFinalize = async () => {
    setIsSyncing(true);
    try {
      // Logic to hit your /api/workforce/resolve endpoint would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Memory Synchronized", {
        description: "Interaction summary added to Customer DNA.",
        className: "bg-slate-900 border-emerald-500 text-white font-black italic",
      });
      
      onComplete();
    } catch (error) {
      toast.error("Sync Failed", { description: "Neural buffer could not be cleared." });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            {isSummarizing ? <Loader2 size={24} className="animate-spin" /> : <Brain size={24} />}
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
          <div className="relative min-h-[100px] bg-black/40 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 italic leading-relaxed">
            {isSummarizing ? (
              <div className="flex flex-col gap-2">
                <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse" />
                <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse" />
                <div className="h-2 w-2/3 bg-slate-800 rounded animate-pulse" />
              </div>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {summary}
              </motion.p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={isSummarizing || isSyncing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-800 text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
          >
            <RefreshCcw size={14} /> Re-Summarize
          </button>
          <button 
            onClick={handleFinalize}
            disabled={isSummarizing || isSyncing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase hover:bg-emerald-400 transition-all disabled:bg-slate-700 disabled:text-slate-500"
          >
            {isSyncing ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isSyncing ? 'Syncing...' : 'Sync & Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
