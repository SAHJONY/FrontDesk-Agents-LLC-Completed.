'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

// FIXED: Correctly splitting Lucide and Heroicons to prevent build failure
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Activity,
  Fingerprint,
  Layers
} from 'lucide-react';

import { 
  PhoneIcon,
  WrenchScrewdriverIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

// Import Neural Components
import { CallMonitor } from '@/components/dashboard/CallMonitor';
import { CallHistory } from '@/components/dashboard/CallHistory';
import { ScriptConfigurator } from '@/components/dashboard/ScriptConfigurator';

export default function VoiceAIConfigPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const currentConfig = {
    enabled: true,
    widget_script_key: 'FDDG-SARAV1-4829J-AB3',
    node: locale.toUpperCase()
  };

  const handleInitiateCall = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    try {
      const response = await fetch('/api/voice/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, locale })
      });
      const data = await response.json();
      if (data.success) {
        setActiveCallId(data.callId);
      }
    } catch (error) {
      console.error("Neural Link failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] p-8 lg:p-16 pt-32 selection:bg-cyan-900/50">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* --- INSTITUTIONAL HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className="flex items-center gap-3 mb-4">
               <Fingerprint className="w-4 h-4 text-cyan-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">System-Protocol-7 // Voice Node</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter italic">
              SARA.AI <span className="text-slate-500">Core Activation</span>
            </h1>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 flex items-center gap-6 rounded-sm">
            <Cpu className="w-10 h-10 text-cyan-500 animate-pulse" />
            <div className="pr-4 border-r border-white/10">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Logic Engine</p>
              <p className="text-sm font-black uppercase tracking-tighter text-white">Non-Linear RL Core</p>
            </div>
            <div className="pl-2">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-black uppercase tracking-tighter text-emerald-500">Stable</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* --- CONTROL STACK --- */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* 1. SCRIPT CONFIGURATOR */}
            <div className="bg-white/[0.02] border border-white/5 rounded-sm p-1">
               <ScriptConfigurator node={currentConfig.node} />
            </div>

            {/* 2. MANUAL PROVISIONING (TEST CALL) */}
            <div className="bg-[#080a0f] border border-white/10 p-10 rounded-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap className="w-24 h-24 text-cyan-500" />
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8 flex items-center gap-3">
                <PhoneIcon className="w-4 h-4" /> Capital Yield Test Node
              </h2>
              <div className="space-y-5">
                <input 
                  type="tel" 
                  placeholder="+1.000.000.0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-sm p-5 text-white font-mono placeholder:text-slate-700 focus:border-cyan-500 outline-none transition-all"
                />
                <button 
                  onClick={handleInitiateCall}
                  disabled={loading || !phoneNumber}
                  className="w-full py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all disabled:opacity-20 shadow-2xl"
                >
                  {loading ? 'Synchronizing Node...' : 'Initiate Provisioning Test'}
                </button>
              </div>
            </div>

            {/* 3. LINGUISTIC INJECTION */}
            <div className="p-10 border border-white/5 bg-white/[0.01] rounded-sm space-y-6">
              <div className="flex items-center gap-3">
                <WrenchScrewdriverIcon className="w-4 h-4 text-slate-500" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                  Infrastructure Injection
                </h2>
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed tracking-widest">
                Deploy the following telemetry script within your root directory to enable global voice-agentic continuity.
              </p>
              <div className="bg-black p-6 rounded-sm font-mono text-[10px] border border-white/10 text-cyan-500/60 overflow-x-auto select-all leading-relaxed shadow-inner">
                {`<script src="https://cdn.frontdesk-agents.com/v3/sara.js" data-node="${locale}" data-key="${currentConfig.widget_script_key}"></script>`}
              </div>
            </div>
          </div>

          {/* --- TELEMETRY FEED --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
               <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Forensic Intelligence Feed</h2>
               <div className="flex items-center gap-3 px-4 py-1 bg-emerald-500/5 border border-emerald-500/20">
                  <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Telemetry</span>
               </div>
            </div>
            
            {/* Call History Component Wrapper */}
            <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
              <CallHistory />
            </div>
          </div>

        </div>
      </div>

      {/* MODAL: LIVE CALL MONITOR */}
      {activeCallId && (
        <CallMonitor 
          callId={activeCallId} 
          onClose={() => setActiveCallId(null)} 
        />
      )}
    </div>
  );
}
