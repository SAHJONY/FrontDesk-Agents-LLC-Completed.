'use client';

import { BarChart3, Globe2, Landmark, ArrowUpRight } from 'lucide-react';

export default function GlobalRevenueControl({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* TOTAL GROSS (Master Currency) */}
      <div className="lg:col-span-2 p-10 bg-white/[0.02] border border-white/5 rounded-[40px]">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2">Total Planetary Revenue</h3>
            <p className="text-6xl font-black italic uppercase tracking-tighter">
              ${data.totalGrossUSD.toLocaleString()} <span className="text-xl text-slate-500">USD</span>
            </p>
          </div>
          <Landmark className="text-cyan-500 w-8 h-8" />
        </div>
        
        {/* REGIONAL BREAKDOWN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.byRegion).map(([region, amount]: [any, any]) => (
            <div key={region} className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase">{region} Node</p>
              <p className="text-sm font-bold text-white">${amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PARTNER PAYOUTS */}
      <div className="p-10 bg-cyan-500 text-black rounded-[40px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest">Partner Commissions</h3>
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <p className="text-4xl font-black italic uppercase tracking-tighter">
            ${data.partnerCommissionsUSD.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold uppercase mt-2 opacity-70">Pending Global Distribution</p>
        </div>
        
        <button className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all">
          Authorize Payouts
        </button>
      </div>
    </div>
  );
}
