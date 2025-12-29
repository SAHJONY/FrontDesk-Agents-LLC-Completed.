import React from 'react';
import { MoreVertical, ExternalLink } from 'lucide-react';

export const TenantRow = ({ tenant }: any) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/30">
          <span className="text-brand-cyan font-bold text-xs">{tenant.id.slice(0, 2)}</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{tenant.name}</h4>
          <p className="text-[10px] text-brand-slate uppercase font-bold">{tenant.tier} Tier</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Node Region</p>
          <p className="text-xs text-white font-mono">{tenant.region}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500"><ExternalLink className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};
