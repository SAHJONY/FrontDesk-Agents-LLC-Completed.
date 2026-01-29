"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Bot, Activity } from 'lucide-react';
import { GhostTerminal } from './ghost-terminal';

export function LiveSessionPanel({ activeSession, onClose }: { activeSession: any; onClose: () => void }) {
  if (!activeSession) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      className="fixed bottom-6 right-6 w-96 bg-slate-900 border border-sky-500/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-xl"
    >
      {/* Header: Session Status */}
      <div className="p-4 bg-sky-500 text-black flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="text-[10px] font-black uppercase italic tracking-wider">
            Live Bridge: {activeSession.customer_name || 'Active Lead'}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Transcript Area */}
      <div className="h-80 p-4 bg-slate-950/50 overflow-y-auto space-y-4 scrollbar-hide">
        <div className="flex justify-center">
          <p className="text-[8px] text-sky-500/50 bg-sky-500/5 px-3 py-1 rounded-full border border-sky-500/10 italic uppercase font-black tracking-widest">
            Neural Handover Complete • Human Interception Active
          </p>
        </div>

        {/* Example Message bubble to show styling */}
        <div className="flex gap-2 justify-start">
          <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
            <User size={12} className="text-slate-400" />
          </div>
          <div className="bg-slate-800/50 border border-white/5 p-3 rounded-2xl rounded-tl-none">
            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
              "I'm still a bit concerned about the implementation timeline..."
            </p>
          </div>
        </div>
      </div>

      {/* The Ghost Terminal: Voice Synthesis & Input */}
      <GhostTerminal callId={activeSession.call_id || activeSession.id} />

      {/* Footer Meta */}
      <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center">
        <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em]">
          Provider: Bland AI • Latency: 240ms
        </span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75" />
        </div>
      </div>
    </motion.div>
  );
}
