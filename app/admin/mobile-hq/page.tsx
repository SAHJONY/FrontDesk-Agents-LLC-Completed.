'use client';
import { useState, useEffect } from 'react';
import { ShieldAlert, Zap, DollarSign, Activity } from 'lucide-react';

export default function MobileHQ() {
  const [stats, setStats] = useState({ mmr: 45250, protected: 1240800, activeCalls: 12 });

  return (
    <div className="min-h-screen bg-[#00050a] text-white p-4 font-sans selection:bg-cyan-500">
      {/* HEADER: GLOBAL STATUS */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter italic uppercase">Sovereign HQ</h1>
          <p className="text-[10px] text-cyan-500 font-bold tracking-[0.3em] uppercase">Status: 5/5 Clusters Active</p>
        </div>
        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
      </div>

      {/* BIG NUMBER: REVENUE PROTECTED */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-black border border-white/10 rounded-[32px] p-6 mb-4">
        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Total Revenue Protected</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black italic">$${(stats.protected / 1000000).toFixed(2)}M</span>
          <span className="text-green-500 text-xs font-bold">+12% vs last week</span>
        </div>
      </div>

      {/* GRID: LIVE METRICS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
          <DollarSign className="text-cyan-500 mb-2" size={20} />
          <p className="text-[10px] uppercase font-bold text-slate-500">Monthly MMR</p>
          <p className="text-xl font-black">$${stats.mmr.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-4">
          <Activity className="text-purple-500 mb-2" size={20} />
          <p className="text-[10px] uppercase font-bold text-slate-500">Active AI Units</p>
          <p className="text-xl font-black">{stats.activeCalls}</p>
        </div>
      </div>

      {/* THE RED BUTTON: CLUSTER OVERRIDE */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 px-2">Strategic Overrides</h2>
        
        <button 
          onClick={() => confirm('Trigger Crisis Mode for TEXAS_TRIANGLE?')}
          className="w-full bg-red-600/10 border border-red-600/50 p-6 rounded-[28px] flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-full group-active:animate-ping">
              <ShieldAlert size={24} color="white" />
            </div>
            <div className="text-left">
              <p className="font-black uppercase italic leading-none">Texas Freeze Alert</p>
              <p className="text-[10px] text-red-400 font-bold uppercase mt-1">Force Crisis Logic (62 Clients)</p>
            </div>
          </div>
          <Zap size={20} className="text-red-600" />
        </button>
      </div>

      {/* LIVE FEED MINI-VIEW */}
      <div className="mt-8">
        <p className="text-[10px] font-black uppercase tracking-[.2em] mb-4 text-center text-slate-600">— Global Activity Feed —</p>
        <div className="space-y-3 opacity-50">
          <div className="text-[10px] font-mono border-l-2 border-cyan-500 pl-3">
            <span className="text-cyan-500">[20:44]</span> INGEST: Miami_Dentist_Lead_#882...
          </div>
          <div className="text-[10px] font-mono border-l-2 border-green-500 pl-3">
            <span className="text-green-500">[20:41]</span> BOOKED: Houston_Plumbing_Crisis ($1,200 Est.)
          </div>
        </div>
      </div>
    </div>
  );
}
