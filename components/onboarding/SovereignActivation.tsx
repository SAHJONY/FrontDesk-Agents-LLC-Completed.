'use client';

import React, { useState } from 'react';
import { ShieldCheck, Zap, Globe, ArrowRight, Lock } from 'lucide-react';

export default function SovereignActivation({ shadowProfile }: { shadowProfile: any }) {
  const [isFlipping, setIsFlipping] = useState(false);

  return (
    <div className="max-w-4xl mx-auto titan-card p-12 bg-black border border-white/5 rounded-[48px] shadow-2xl">
      <div className="flex justify-between items-start mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <ShieldCheck className="w-3 h-3 text-cyan-500" />
            <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">Shadow Profile Verified</span>
          </div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">
            Initialize <span className="text-cyan-500">Sovereignty</span>
          </h2>
        </div>
        <div className="text-right">
          <div className="text-[40px] mb-1">{shadowProfile.flag}</div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{shadowProfile.language_name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Autonomous Identity</h4>
            <p className="text-lg font-bold">{shadowProfile.business_name}</p>
            <p className="text-sm text-slate-400">{shadowProfile.industry}</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Neural Logic Engine</h4>
            <p className="text-xs leading-relaxed text-slate-300 italic">"{shadowProfile.system_prompt}"</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            <Lock className="w-4 h-4" /> Aegis Shield Protection: <span className="text-white">ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            <Globe className="w-4 h-4" /> Global Node Routing: <span className="text-white">ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-slate-400">
            <Zap className="w-4 h-4" /> Response Latency: <span className="text-white">&lt;100MS</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsFlipping(true)}
        className="w-full py-8 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4"
      >
        {isFlipping ? 'COMMENCING PRODUCTION FLIP...' : 'ACTIVATE PRODUCTION NODE'}
        {!isFlipping && <ArrowRight className="w-6 h-6" />}
      </button>
    </div>
  );
}
