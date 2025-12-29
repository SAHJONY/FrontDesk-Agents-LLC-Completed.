'use client';
import React from 'react';

export default function PartnerOnboarding() {
  return (
    <div className="p-12 max-w-4xl mx-auto relative z-10">
      <div className="titan-card border-brand-cyan/40">
        <h1 className="text-3xl font-black italic mb-2">PARTNER INITIALIZATION</h1>
        <p className="text-slate-500 mb-10 text-sm">Deploy a new white-label instance of the Sovereign Hub.</p>
        
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-brand-slate uppercase block mb-2">Partner Name</label>
            <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white focus:border-brand-cyan outline-none" placeholder="e.g. Global Tech Partners" />
          </div>
          
          <div>
            <label className="text-xs font-bold text-brand-slate uppercase block mb-2">Tier Assignment</label>
            <select className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white appearance-none">
              <option>$1,499 Elite (Unlimited)</option>
              <option>$799 Growth</option>
            </select>
          </div>

          <button className="w-full bg-brand-cyan text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-cyan-400">
            Initialize Partner Node
          </button>
        </div>
      </div>
    </div>
  );
}
