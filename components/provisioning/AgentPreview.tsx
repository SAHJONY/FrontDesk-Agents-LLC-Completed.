'use client';

import React from 'react';
import { Cpu, CheckCircle2, Globe, Clock, ShieldCheck } from 'lucide-react';

export const AgentPreview = ({ intelligence }: { intelligence: any }) => {
  return (
    <div className="mt-12 bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl">
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
        <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Cpu className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Agent Logic Synthesized</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Twin Status: Active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IDENTITY MAP */}
        <div className="space-y-6">
          <div className="group">
            <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em] block mb-2">Institutional Identity</span>
            <p className="text-2xl font-bold text-white uppercase italic">{intelligence.businessName || 'Business Identified'}</p>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
             <Globe className="w-4 h-4 text-cyan-500" />
             <span className="text-xs font-medium uppercase tracking-widest">{intelligence.businessType}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
             <Clock className="w-4 h-4 text-cyan-500" />
             <span className="text-xs font-medium uppercase tracking-widest italic">{intelligence.hours}</span>
          </div>
        </div>

        {/* NEURAL CAPABILITIES */}
        <div className="bg-black/40 border border-white/5 p-8 rounded-2xl">
          <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] block mb-6 italic">Ingested Core Services</span>
          <div className="space-y-4">
            {intelligence.services?.slice(0, 4).map((service: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-tighter">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-cyan-500/10 border-l-4 border-cyan-500 rounded-r-xl">
        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Agent Greeting Initialized
        </p>
        <p className="text-sm italic text-white leading-relaxed">
          "Welcome to {intelligence.businessName}. I am your strategic assistant. How can I facilitate your inquiry today?"
        </p>
      </div>
    </div>
  );
};
