'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Lock, 
  Activity,
  Server
} from 'lucide-react';

const PROVISIONING_STEPS = [
  { id: 'AUTH', name: 'Identity Verification', icon: Lock },
  { id: 'NODE', name: 'Node Configuration', icon: Server },
  { id: 'SYCH', name: 'Intelligence Sync', icon: Cpu },
  { id: 'GOV', name: 'Governance Approval', icon: ShieldCheck }
];

export default function ProvisioningPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (activeStep < PROVISIONING_STEPS.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        window.location.href = '/dashboard/command-center';
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] flex flex-col items-center justify-center p-8">
      
      {/* --- STEP INDICATOR --- */}
      <div className="flex items-center gap-6 mb-20 opacity-40">
        {PROVISIONING_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className={`p-2 rounded-sm border ${i <= activeStep ? 'border-cyan-500 text-cyan-500' : 'border-white/10 text-slate-700'}`}>
              <step.icon className="w-4 h-4" />
            </div>
            {i !== PROVISIONING_STEPS.length - 1 && <div className="w-8 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-[#080a0f] border border-white/10 p-16 relative overflow-hidden shadow-2xl">
        {loading && (
          <div className="absolute inset-0 bg-[#020305]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-12">
            <Activity className="w-12 h-12 text-cyan-500 animate-pulse mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-[0.4em] mb-2 italic">Synchronizing...</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
              Injecting SYSTEM-PROTOCOL-7 Core into Local Node Infrastructure.
            </p>
          </div>
        )}

        {/* STEP 1: INITIAL IDENTITY */}
        {activeStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 italic">Executive <span className="text-cyan-500 text-white opacity-50">Authorization</span></h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-12">Verify Institutional Credentials</p>
            
            <div className="space-y-6 mb-12">
              <input 
                type="text" 
                placeholder="INSTITUTIONAL DOMAIN" 
                className="w-full bg-white/5 border border-white/10 p-5 text-[10px] font-bold uppercase tracking-widest focus:border-cyan-500 outline-none transition-all"
              />
              <input 
                type="email" 
                placeholder="EXECUTIVE EMAIL (ENCRYPTED)" 
                className="w-full bg-white/5 border border-white/10 p-5 text-[10px] font-bold uppercase tracking-widest focus:border-cyan-500 outline-none transition-all"
              />
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-3"
            >
              Verify Identity <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: NODE SELECTION */}
        {activeStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 italic">Node <span className="text-slate-500">Configuration</span></h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-12">Select Regional Server Sovereignty</p>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {['NORTH AMERICA', 'EUROPE CENTRAL', 'MIDDLE EAST', 'ASIA PACIFIC'].map(region => (
                <button 
                  key={region}
                  onClick={handleNext}
                  className="p-6 border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all text-left"
                >
                  {region} Node
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: GOVERNANCE FINALIZATION */}
        {activeStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
            <ShieldCheck className="w-16 h-16 text-cyan-500 mx-auto mb-8" />
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 italic">Governance <span className="text-slate-500">Seal</span></h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-12 leading-relaxed max-w-sm mx-auto">
              Finalizing Aegis Shield partitioning. All agentic actions will be forensic-logged and encrypted.
            </p>
            
            <button 
              onClick={handleNext}
              className="w-full py-8 bg-cyan-500 text-black font-black uppercase text-[11px] tracking-[0.5em] shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all"
            >
              Provision Sovereign Node
            </button>
          </div>
        )}
      </div>

      <p className="mt-12 text-[9px] font-bold text-slate-700 uppercase tracking-[0.6em]">
        Provisioning Protocol {CORE_ARCHITECTURE} // Secure Handshake Active
      </p>
    </div>
  );
    }
