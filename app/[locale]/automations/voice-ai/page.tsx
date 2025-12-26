'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ArrowPathIcon,
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
        body: JSON.stringify({ phoneNumber })
      });
      const data = await response.json();
      if (data.success) setActiveCallId(data.callId);
    } catch (error) {
      console.error("Neural Link failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010204] text-white p-8 md:p-12 pt-24 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center">
              <MicrophoneIcon className="w-10 h-10 mr-4 text-cyan-500" />
              SARA.AI <span className="text-cyan-500 ml-2 text-2xl">Activation</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
              Node Security: {currentConfig.node} • Aegis Shield Active
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4">
            <Cpu className="w-6 h-6 text-cyan-500" />
            <div>
              <p className="text-[8px] font-black text-slate-500 uppercase">Logic Engine</p>
              <p className="text-xs font-bold uppercase italic tracking-tighter text-cyan-500">Bland-v3 Neural Hybrid</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT: CONFIGURATION STACK */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. NEURAL LOGIC (The New Configurator) */}
            <ScriptConfigurator node={currentConfig.node} />

            {/* 2. MANUAL TEST LINK */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-[32px] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap className="w-16 h-16 text-cyan-500" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                Manual Override
              </h2>
              <div className="space-y-4 relative z-10">
                <input 
                  type="tel" 
                  placeholder="+1 000 000 0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all"
                />
                <button 
                  onClick={handleInitiateCall}
                  disabled={loading}
                  className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.2)]"
                >
                  {loading ? 'Rewiring...' : 'Initiate Neural Link'}
                </button>
              </div>
            </div>

            {/* 3. NODE SCRIPT */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                <WrenchScrewdriverIcon className="w-4 h-4 text-yellow-500" />
                Linguistic Injection
              </h2>
              <div className="bg-black p-4 rounded-xl font-mono text-[10px] border border-white/10 text-yellow-500/70 overflow-x-auto select-all leading-relaxed">
                {`<script src="https://frontdesk-agents.com/sara.js" data-node="${locale}" data-key="${currentConfig.widget_script_key}"></script>`}
              </div>
            </div>

          </div>

          {/* RIGHT: FORENSIC DATA */}
          <div className="lg:col-span-7 space-y-10">
            <CallHistory />
          </div>

        </div>
      </div>

      {/* OVERLAYS */}
      {activeCallId && (
        <CallMonitor 
          callId={activeCallId} 
          onClose={() => setActiveCallId(null)} 
        />
      )}
    </div>
  );
}
