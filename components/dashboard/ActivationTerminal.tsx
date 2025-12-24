'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Globe, Check } from 'lucide-react';

export default function ActivationTerminal({ city, country }: { city: string, country: string }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const deploymentSteps = [
    `Initializing Secure Tunnel to ${city} Edge Node...`,
    `Handshaking with ${country} Regulatory Protocol...`,
    `Injecting Neural Language Models (Dialect: Local)...`,
    `Synchronizing with Sovereign Revenue Protected Grid...`,
    `Aegis Shield Protocol: ONLINE`,
    `Node Activation Successful.`
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < deploymentSteps.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${deploymentSteps[currentStep]}`]);
        setProgress(prev => prev + (100 / deploymentSteps.length));
        currentStep++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.1)]">
      {/* TERMINAL HEADER */}
      <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Neural Provisioning: {city}_Node_Alpha
        </span>
      </div>

      {/* TERMINAL BODY */}
      <div className="p-8 font-mono text-[11px] h-80 overflow-y-auto space-y-2 scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 animate-fade-in">
            <span className="text-cyan-500/50 shrink-0">{`>>`}</span>
            <span className={i === logs.length - 1 ? "text-cyan-400" : "text-slate-400"}>
              {log}
            </span>
          </div>
        ))}
        {!isComplete && (
           <div className="animate-pulse text-cyan-500 inline-block w-2 h-4 bg-cyan-500 ml-2" />
        )}
      </div>

      {/* PROGRESS FOOTER */}
      <div className="p-8 bg-white/[0.02] border-t border-white/5">
        <div className="flex justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deployment Progress</span>
          <span className="text-[10px] font-black text-cyan-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_#06b6d4]" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {isComplete && (
          <div className="mt-8 animate-fade-in">
            <button className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
              <Check className="w-4 h-4" /> Enter Command Center
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
