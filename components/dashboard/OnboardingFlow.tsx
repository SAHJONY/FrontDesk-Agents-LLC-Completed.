'use client';

import React, { useState } from 'react';
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/solid';

const STEPS = [
  { id: 1, name: 'Market Intelligence', icon: GlobeAltIcon },
  { id: 2, name: 'Agent Workforce', icon: CpuChipIcon },
  { id: 3, name: 'Aegis Security', icon: ShieldCheckIcon }
];

export const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({ industry: '', locale: 'en-US', agents: [] });

  const startProvisioning = () => {
    setLoading(true);
    // Simulate Neural CRM Construction
    setTimeout(() => {
      window.location.href = '/dashboard/command-center';
    }, 3000);
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8 bg-[#010204]">
      {/* PROGRESS TRACKER */}
      <div className="flex items-center gap-4 mb-16">
        {STEPS.map((s) => (
          <div key={s.id} className="flex items-center">
            <div className={`p-3 rounded-2xl transition-all ${step >= s.id ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/5 text-slate-500'}`}>
              <s.icon className="w-5 h-5" />
            </div>
            {s.id !== 3 && <div className={`w-12 h-[2px] mx-2 ${step > s.id ? 'bg-cyan-500' : 'bg-white/5'}`} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl bg-[#080808] border border-white/5 rounded-[40px] p-12 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center">
            <RocketLaunchIcon className="w-16 h-16 text-cyan-500 animate-bounce mb-6" />
            <h3 className="text-2xl font-black uppercase italic text-white mb-2 tracking-tighter">Constructing CRM</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500/50">Provisioning RL Nodes for {config.industry}...</p>
          </div>
        )}

        {/* STEP 1: INDUSTRY & LOCALE */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black uppercase italic text-white mb-4 tracking-tighter">Target Market</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Define your Sovereign Territory</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Medical', 'Legal', 'Trades', 'Logistics'].map(ind => (
                <button 
                  key={ind}
                  onClick={() => setConfig({...config, industry: ind})}
                  className={`p-6 rounded-3xl border text-left transition-all ${config.industry === ind ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{ind}</span>
                </button>
              ))}
            </div>
            
            <button 
              disabled={!config.industry}
              onClick={() => setStep(2)}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 hover:bg-cyan-500 transition-all disabled:opacity-50"
            >
              Continue <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: WORKFORCE SELECTION */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black uppercase italic text-white mb-4 tracking-tighter">Agent Workforce</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Select specialized RL Nodes</p>
            
            <div className="space-y-4 mb-8">
              {['SARA Sales (RL)', 'SARA Support (RL)', 'SARA Triage (RL)'].map(agent => (
                <div key={agent} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">{agent}</span>
                  <div className="w-12 h-6 bg-cyan-500/20 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setStep(3)}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2"
            >
              Finalize Security <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: SECURITY PROTOCOL */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <ShieldCheckIcon className="w-20 h-20 text-cyan-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black uppercase italic text-white mb-4 tracking-tighter">Aegis Protection</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed mb-8">
              Activating Zero-Knowledge Encryption and Sovereign Database Partitioning for your {config.industry} Workspace.
            </p>
            
            <button 
              onClick={startProvisioning}
              className="w-full py-7 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all"
            >
              Deploy Sovereign Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
          
