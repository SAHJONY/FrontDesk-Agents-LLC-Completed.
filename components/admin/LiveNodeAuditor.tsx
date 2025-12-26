'use client';

import React from 'react';
import { Activity, Globe, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export default function LiveNodeAuditor({ activeSessions }: { activeSessions: any[] }) {
  return (
    <div className="p-8 bg-[#020305] border border-white/5 rounded-[32px] overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Live Node Auditor</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Global Session Monitoring • PDX1 Cluster</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-cyan-500 text-[9px] font-black uppercase tracking-widest">System Nominal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSessions.map((session) => (
          <div key={session.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-lg ${session.dir === 'rtl' ? 'bg-orange-500/10' : 'bg-cyan-500/10'}`}>
                <Globe className={`w-5 h-5 ${session.dir === 'rtl' ? 'text-orange-500' : 'text-cyan-500'}`} />
              </div>
              <div className="text-right">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Direction</span>
                <p className="text-xs font-black uppercase">{session.dir}</p>
              </div>
            </div>

            <h3 className="font-black text-lg uppercase truncate mb-1">{session.business_name}</h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold mb-4">{session.industry} • {session.market}</p>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-black uppercase text-emerald-500">Aegis Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-[9px] font-black uppercase text-slate-400">v2.5 DNA</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
