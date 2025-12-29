import React from 'react';
import { CreditCard } from 'lucide-react';

export const BillingOverview = ({ amount, multiplier }: { amount: number, multiplier: number }) => {
  return (
    <div className="titan-card bg-gradient-to-br from-[#050505] to-brand-cyan/5">
      <div className="flex items-center gap-2 mb-6 text-brand-cyan">
        <CreditCard className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Billing Node</span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-slate-500 text-xs font-bold uppercase">Net Monthly Amount</span>
          <span className="text-3xl font-black italic text-white">${amount}</span>
        </div>
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] text-brand-slate uppercase font-bold">Market Multiplier</span>
          <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-brand-cyan">{multiplier}x Applied</span>
        </div>
      </div>
    </div>
  );
};
