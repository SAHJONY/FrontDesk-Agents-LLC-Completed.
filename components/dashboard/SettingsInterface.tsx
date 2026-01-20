'use client';

import React, { useState } from 'react';
import { Save, BellRing, Target, ShieldCheck, DollarSign, Smartphone } from 'lucide-react';

export const SettingsInterface = () => {
  const [config, setConfig] = useState({
    leadValue: 500,
    smsAlerts: true,
    alertThreshold: 1000,
    nodeOptimization: 'performance'
  });

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Yield Calibration */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-sky-400" />
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">ROI Calibration</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">
                Value Per Successful Appointment ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="number"
                  value={config.leadValue}
                  onChange={(e) => setConfig({...config, leadValue: Number(e.target.value)})}
                  className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white font-mono focus:border-sky-500 outline-none transition-all"
                />
              </div>
              <p className="mt-2 text-[10px] text-zinc-600 italic leading-relaxed">
                * This value dictates the "Recaptured Yield" metric on your main command center.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
              <button className="flex items-center gap-2 px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-sky-400 transition-all active:scale-95">
                <Save className="w-3 h-3" /> Commit Calibration
              </button>
            </div>
          </div>
        </div>

        {/* 2. Success Notifications */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <BellRing className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Instant Yield Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-4">
                <Smartphone className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-tight">SMS Success Pings</p>
                  <p className="text-[9px] text-zinc-500 uppercase">Text alert for every recovered booking</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={config.smsAlerts}
                onChange={(e) => setConfig({...config, smsAlerts: e.target.checked})}
                className="w-10 h-5 accent-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Node Security & Meta */}
      <div className="lg:col-span-5">
        <div className="p-6 rounded-3xl bg-sky-500/5 border border-sky-500/10">
          <ShieldCheck className="w-8 h-8 text-sky-400 mb-4" />
          <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em] mb-2">Protocol Verification</h4>
          <p className="text-xs text-zinc-400 leading-relaxed italic mb-6">
            Your Node is currently operating under <span className="text-white font-bold">PDX-1 Sovereignty</span>. All calibrations are end-to-end encrypted and synced with the Bland AI backbone.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-600">
              <span>Encryption Level</span>
              <span className="text-white">AES-256</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-600">
              <span>Node Latency Target</span>
              <span className="text-white">&lt; 150ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
