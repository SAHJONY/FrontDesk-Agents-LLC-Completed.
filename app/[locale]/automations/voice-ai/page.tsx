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

// Import our new functional components
import { CallMonitor } from '@/components/dashboard/CallMonitor';
import { CallHistory } from '@/components/dashboard/CallHistory';

export default function VoiceAIConfigPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  // State for Live Interaction
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Sovereign Node Configuration
  const currentConfig = {
    enabled: true,
    mode: 'Standard (Scraping + CRM + Booking)',
    last_refresh: '2025-12-24 09:00 AM CST',
    industry: 'Med-Spas',
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
      if (data.success) {
        setActiveCallId(data.callId);
      }
    } catch (error) {
      console.error("Neural Link failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010204] text-white p-8 md:p-12 pt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER: Market Context */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center">
              <MicrophoneIcon className="w-10 h-10 mr-4 text-cyan-500" />
              SARA.AI <span className="text-cyan-500 ml-2 text-2xl">Activation</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
              Node: {currentConfig.node} • Aegis Shield v2.5
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4">
              <Cpu className="w-6 h-6 text-cyan-500" />
              <div>
                <p className="text-[8px] font-black text-slate-500 uppercase">Logic Engine</p>
                <p className="text-xs font-bold uppercase italic">Bland-v3 Hybrid</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Configuration & Script */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* SYSTEM STATUS */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Infrastructure Status
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">Last Knowledge Refresh</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">{currentConfig.last_refresh}</p>
                    <ArrowPathIcon className="w-4 h-4 text-cyan-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">Industry Profile</p>
                  <p className="text-sm font-bold text-cyan-400">{currentConfig.industry}</p>
                </div>
              </div>
            </div>

            {/* NEURAL LINK INITIATION */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-[32px] p-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-500" />
                Manual Neural Link
              </h2>
              <input 
                type="tel" 
                placeholder="+1 000 000 0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none mb-4"
              />
              <button 
                onClick={handleInitiateCall}
                disabled={loading}
                className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:scale-105 transition-all shadow-lg"
              >
                {loading ? 'Initializing...' : 'Initiate Outbound Link'}
              </button>
            </div>

            {/* INSTALLATION SCRIPT */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <WrenchScrewdriverIcon className="w-4 h-4 text-yellow-500" />
                  Node Script
                </h2>
                <span className="text-[8px] font-bold px-2 py-1 bg-white/5 rounded text-slate-500">v1.2</span>
              </div>
              <div className="bg-black p-4 rounded-xl font-mono text-[11px] border border-white/10 text-yellow-500/80 overflow-x-auto select-all">
                {`<script src="https://frontdesk-agents.com/sara.js" data-node="${locale}" data-key="${currentConfig.widget_script_key}"></script>`}
              </div>
              <p className="text-[9px] text-slate-500 uppercase tracking-tighter leading-relaxed">
                Paste into the <code className="text-cyan-500">&lt;head&gt;</code> of the client website for widget deployment.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: History & Forensic Data */}
          <div className="lg:col-span-7 space-y-10">
            <CallHistory />
          </div>

        </div>
      </div>

      {/* OVERLAY: Active Call Monitor */}
      {activeCallId && (
        <CallMonitor 
          callId={activeCallId} 
          onClose={() => setActiveCallId(null)} 
        />
      )}
    </div>
  );
}
