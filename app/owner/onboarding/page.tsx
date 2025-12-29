'use client';
import React, { useState } from 'react';
import { BASE_PRICES, calculateMarketPrice } from '../../../services/prices';

export default function PartnerInitialization() {
  const [marketMultiplier, setMarketMultiplier] = useState(1.0);

  return (
    <div className="p-12 max-w-4xl mx-auto relative z-10">
      <div className="titan-card border-brand-cyan/40">
        <h1 className="text-3xl font-black italic mb-2 uppercase">Partner Initialization</h1>
        <p className="text-slate-500 mb-10 text-sm italic">
          Deploying a local node for the Global Revenue Workforce.
        </p>
        
        <div className="space-y-8">
          {/* Market Selection to ensure local platform equity [cite: 2025-12-24] */}
          <div>
            <label className="text-[10px] font-black text-brand-slate uppercase block mb-4 tracking-widest">Market Context</label>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => setMarketMultiplier(1.0)} className="titan-card py-3 text-xs font-bold uppercase hover:border-brand-cyan">Western (1.0x)</button>
              <button onClick={() => setMarketMultiplier(0.65)} className="titan-card py-3 text-xs font-bold uppercase hover:border-brand-cyan">Emerging (0.65x)</button>
              <button onClick={() => setMarketMultiplier(0.35)} className="titan-card py-3 text-xs font-bold uppercase hover:border-brand-cyan">Growth (0.35x)</button>
            </div>
          </div>

          {/* Fixed Price Tiers [cite: 2025-12-28] */}
          <div>
            <label className="text-[10px] font-black text-brand-slate uppercase block mb-4 tracking-widest">Workforce Tier Assignment</label>
            <div className="space-y-2">
              {Object.entries(BASE_PRICES).map(([tier, price]) => (
                <div key={tier} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-white font-bold text-xs uppercase tracking-tighter">{tier} Workforce</span>
                  <span className="text-brand-cyan font-mono font-bold">
                    ${calculateMarketPrice(tier as any, marketMultiplier)} /mo
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-brand-cyan text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-cyan-900/20">
            Finalize Node Deployment
          </button>
        </div>
      </div>
    </div>
  );
}
