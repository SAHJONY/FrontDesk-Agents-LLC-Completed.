import React from 'react';
import PaymentEntryPoints from '@/components/PaymentEntryPoints';

export default function OwnerPayments() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <h1 className="text-3xl font-black italic mb-8">PAYMENT RECONCILIATION</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="titan-card">
          <h4 className="text-brand-slate text-[10px] font-bold uppercase mb-2">Net Platform Payouts</h4>
          <p className="text-4xl font-black text-white">$612,400.00</p>
          <div className="mt-4 h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-brand-cyan w-[75%]" />
          </div>
        </div>
        <div className="titan-card">
          <h4 className="text-brand-slate text-[10px] font-bold uppercase mb-2">Pending Success Fees</h4>
          <p className="text-4xl font-black text-brand-cyan">+$18,250.00</p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Configure Payment Methods</h3>
        <PaymentEntryPoints />
      </div>

      <div className="titan-card">
        <h3 className="text-white font-bold mb-6">Recent Disbursements</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="font-mono text-xs text-slate-500">TXN_ID_00{i}8492</span>
              <span className="text-white font-bold">$12,400.00</span>
              <span className="text-brand-cyan text-[10px] font-black uppercase">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
