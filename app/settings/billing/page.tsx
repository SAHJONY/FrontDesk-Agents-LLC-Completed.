'use client';

import React from 'react';
import { useMarketPricing } from '../../../hooks/useMarketPricing';

export default function BillingSettings() {
  const { multiplier, currency } = useMarketPricing();

  return (
    <div className="p-8 max-w-4xl mx-auto relative z-10">
      <h1 className="text-3xl font-black mb-8 italic">BILLING & SOVEREIGNTY</h1>
      
      <div className="titan-card mb-8 border-brand-cyan/20">
        <h2 className="text-brand-cyan text-xs font-bold uppercase tracking-widest mb-4">Active Subscription</h2>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold">Elite Tier Plan</p>
            <p className="text-slate-500 text-sm">Permanent Base: $1,499/mo</p>
          </div>
          <div className="text-right text-brand-slate">
            <p className="text-xs uppercase font-bold">Regional Applied</p>
            <p className="text-xl text-white font-mono">{multiplier}x Multiplier</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="titan-card bg-white/5">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Next Invoice</h3>
          <p className="text-2xl font-bold">{currency.symbol}{Math.round(1499 * multiplier)}</p>
        </div>
        <div className="titan-card bg-white/5">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Payment Method</h3>
          <p className="text-sm font-mono text-slate-300">•••• •••• •••• 8842</p>
        </div>
      </div>
    </div>
  );
}
