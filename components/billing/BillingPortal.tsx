'use client';

import React, { useState } from 'react';
import { CreditCard, ExternalLink, ReceiptText } from 'lucide-react';

export const BillingPortal = () => {
  const [loading, setLoading] = useState(false);

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Portal Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] p-10 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <CreditCard className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Billing Ledger</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Manage Subscriptions & Invoices</p>
          </div>
        </div>
        
        <button 
          onClick={handleManageBilling}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
        >
          {loading ? 'Verifying...' : 'Launch Portal'}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      <div className="mt-10 flex gap-8">
        <div className="flex items-center gap-2 text-slate-500">
          <ReceiptText className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Next Invoice: Jan 01</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-500/50 italic">
          <span className="text-[10px] font-black uppercase tracking-widest">Status: Account Standing - Clear</span>
        </div>
      </div>
    </div>
  );
};
