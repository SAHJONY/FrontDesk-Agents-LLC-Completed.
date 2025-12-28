'use client';

import React, { useState } from 'react';
import { Phone, Zap, ShieldCheck, Activity, ChevronRight } from 'lucide-react';

export default function DemoPage() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'CALLING' | 'CONNECTED' | 'ERROR'>('IDLE');

  const triggerDemoCall = async () => {
    setStatus('CALLING');
    try {
      const response = await fetch('/api/demo/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      
      if (response.ok) {
        setStatus('CONNECTED');
      } else {
        setStatus('ERROR');
      }
    } catch (e) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-[#020305] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Activity className="w-3 h-3 text-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Live Neural Demonstration</span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-4">
            Experience <span className="text-cyan-500">The Exit</span>
          </h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em]">
            Witness the AEGIS v2.1.0 Workforce in Real-Time
          </p>
        </div>

        {/* INTERACTION HUB */}
        <div className="bg-[#080a0f] border border-white/10 p-12 relative overflow-hidden">
          {status === 'CALLING' && (
            <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in">
              <Phone className="w-12 h-12 text-cyan-500 animate-bounce mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Outbound Link...</p>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 block mb-4">Target Device Connection</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-6 text-xl font-mono tracking-widest outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <button 
              onClick={triggerDemoCall}
              disabled={status === 'CALLING'}
              className="w-full py-8 bg-white text-black font-black uppercase text-xs tracking-[0.5em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-4"
            >
              Authorize Neural Link <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between opacity-40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Secure Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Latency: &lt; 500ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS UPDATES */}
        {status === 'CONNECTED' && (
          <div className="mt-8 p-6 border border-emerald-500/20 bg-emerald-500/5 text-center animate-in slide-in-from-top-4">
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Link Established. Answer the device to begin the briefing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
