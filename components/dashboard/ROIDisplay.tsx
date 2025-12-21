import { useEffect, useState } from 'react';

export default function ROIDisplay({ clientId }: { clientId: string }) {
  const [metrics, setMetrics] = useState({ calls: 0, revenue: 0 });

  return (
    <div className="bg-[#020617] border border-cyan-500/20 p-8 rounded-[40px] shadow-2xl shadow-cyan-500/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase italic">
          Evidence Engine / Live ROI
        </h2>
        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Conversions</p>
          <p className="text-4xl font-black text-white italic">{metrics.calls}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated Revenue</p>
          <p className="text-4xl font-black text-cyan-400 italic">
            ${metrics.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5">
        <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all italic">
          Export Sovereign Evidence PDF
        </button>
      </div>
    </div>
  );
}
