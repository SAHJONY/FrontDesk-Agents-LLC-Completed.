'use client';

import React, { useState, useEffect } from 'react';
import { IngestionMonitor } from '@/components/dashboard/IngestionMonitor';
import { ShieldCheck, Zap, Lock, Terminal } from 'lucide-react';

export default function ProvisioningSuccess() {
  const [terminalStep, setTerminalStep] = useState(0);

  const logs = [
    "Initializing Aegis Silo isolation...",
    "Cryptographic keys generated for Node #882.",
    "Establishing Ingestion Bridge to target domain...",
    "Neural Mirroring synchronized. Deployment active."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep(prev => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="min-h-screen bg-[#010204] text-white pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* SUCCESS HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Authorization Confirmed</span>
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Infrastructure <span className="text-cyan-500">Live</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Your FrontDesk Agent has been stationed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: TERMINAL LOGS */}
          <div className="lg:col-span-1 bg-black border border-white/5 p-6 rounded-sm font-mono relative overflow-hidden h-[300px]">
             <Terminal className="absolute top-4 right-4 w-4 h-4 text-white/10" />
             <div className="space-y-4">
                {logs.slice(0, terminalStep + 1).map((log, i) => (
                  <div key={i} className="flex gap-3 text-[10px]">
                    <span className="text-cyan-500">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                    <span className="text-slate-300 italic">{log}</span>
                  </div>
                ))}
             </div>
             {terminalStep === logs.length - 1 && (
               <div className="mt-8 animate-pulse text-green-500 text-[10px] font-black uppercase tracking-widest">
                 System Ready for Interaction
               </div>
             )}
          </div>

          {/* RIGHT: LIVE MONITOR */}
          <div className="lg:col-span-2">
            <IngestionMonitor />
          </div>

        </div>

        {/* CTA: ENTER COCKPIT */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="group px-12 py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-sm hover:bg-cyan-500 hover:text-white transition-all shadow-2xl flex items-center gap-4 mx-auto"
          >
            Enter Glass Cockpit <Zap className="w-4 h-4 fill-current group-hover:animate-bounce" />
          </button>
          <div className="mt-6 flex items-center justify-center gap-4 opacity-30">
            <Lock className="w-3 h-3" />
            <span className="text-[8px] font-black uppercase tracking-widest">256-bit AES Encryption Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
