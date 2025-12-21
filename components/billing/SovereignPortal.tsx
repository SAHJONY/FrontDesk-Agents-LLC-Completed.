'use client';

import { ShieldCheckIcon, BanknotesIcon } from '@heroicons/react/24/solid';

export default function BillingPortal({ balance, roiImpact }) {
  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] p-10">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Financial Gateway</h2>
          <p className="text-slate-500 text-[10px] uppercase font-bold mt-2">Node Status: Fully Funded</p>
        </div>
        <ShieldCheckIcon className="w-8 h-8 text-cyan-500/50" />
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Current ROI Impact</p>
          <p className="text-2xl font-black text-emerald-500 italic">+${roiImpact.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Pending Balance</p>
          <p className="text-2xl font-black text-white italic">${balance.toLocaleString()}</p>
        </div>
      </div>

      <button className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all italic">
        Authorize Transfer via Financial Gateway
      </button>
    </div>
  );
}
