'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
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
    <div className="min-h-screen bg-[#010204] text-white p-6 lg:p-12 pt-28 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER: SYSTEM STATUS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter flex items-center">
              <MicrophoneIcon className="w-10 h-10 mr-4 text-cyan-500" />
              SARA.AI <span className="text-cyan-500 ml-3 text-2xl lg:text-3xl">Activation</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
              Node Security: {currentConfig.node} • Aegis Shield Active • V-3.1
            </p>
          </div>
          
          <div className="titan-card py-4 px-8 bg-cyan-500/5 border-cyan-500/20 flex items-center gap-5">
            <Cpu className="w-8 h-8 text-cyan-500 animate-pulse" />
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logic Engine</p>
              <p className="text-sm font-bold uppercase italic tracking-tighter text-white">Bland-v3 Neural Hybrid</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: CONTROL STACK */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            
            {/* 1. NEURAL LOGIC CONFIGURATOR */}
            <div className="titan-card p-1">
               <ScriptConfigurator node={currentConfig.node} />
            </div>

            {/* 2. MANUAL OVERRIDE (TEST CALL) */}
            <div className="titan-card p-8 bg-gradient-to-br from-cyan-500/[0.03] to-transparent relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap className="w-32 h-32 text-cyan-500" />
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-6 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" /> Manual Neural Link
              </h2>
              <div className="space-y-4 relative z-10">
                <input 
                  type="tel" 
                  placeholder="+1 000 000 0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-mono placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none transition-all"
                />
                <button 
                  onClick={handleInitiateCall}
                  disabled={loading || !phoneNumber}
                  className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-cyan-500 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black transition-all shadow-xl"
                >
                  {loading ? 'Synchronizing...' : 'Initiate Test Call'}
                </button>
              </div>
            </div>

            {/* 3. LINGUISTIC INJECTION (JS SNIPPET) */}
            <div className="titan-card p-8 space-y-5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <WrenchScrewdriverIcon className="w-4 h-4 text-yellow-500" />
                Linguistic Web Injection
              </h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed tracking-wider">
                Inject this node into your primary web infrastructure to enable SARA-Voice on your frontend.
              </p>
              <div className="bg-black/60 p-5 rounded-2xl font-mono text-[10px] border border-white/5 text-cyan-500/80 overflow-x-auto select-all leading-relaxed shadow-inner">
                {`<script src="https://frontdesk-agents.com/sara.js" data-node="${locale}" data-key="${currentConfig.widget_script_key}"></script>`}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORENSIC ANALYTICS */}
          <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-right-6 duration-1000">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Forensic Call Telemetry</h2>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Feed</span>
               </div>
            </div>
            <CallHistory />
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
