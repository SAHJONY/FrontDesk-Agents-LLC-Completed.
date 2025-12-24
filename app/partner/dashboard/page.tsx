'use client';

import { Users, Globe, TrendingUp, Shield } from 'lucide-react';
import { GlobalPresenceMap } from '@/components/marketing/GlobalPresenceMap';

export default function PartnerDashboard() {
  return (
    <div className="min-h-screen bg-[#010204] p-12 pt-24">
      {/* PARTNER OVERVIEW HEADERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Fleet</p>
          <h3 className="text-3xl font-black italic">42 <span className="text-cyan-500 text-sm">NODES</span></h3>
        </div>
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Monthly Revenue</p>
          <h3 className="text-3xl font-black italic">$75,400</h3>
        </div>
        <div className="p-8 rounded-[32px] bg-cyan-500/5 border border-cyan-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Your Commission (20%)</p>
          <h3 className="text-3xl font-black italic text-cyan-500">$15,080</h3>
        </div>
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Market Health</p>
          <h3 className="text-3xl font-black italic text-green-500">OPTIMAL</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FLEET MANAGEMENT TABLE */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[40px] p-10">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8">Active Territory Nodes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((node) => (
              <div key={node} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Client_Node_00{node}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Status: Active • NYC Cluster</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black italic">$1,799/mo</p>
                  <p className="text-[9px] text-cyan-500 font-bold uppercase">Commission: $359.80</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TERRITORY VISUALIZATION */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center">
          <Globe className="w-16 h-16 text-cyan-500/20 mb-6 animate-pulse" />
          <h3 className="text-center text-sm font-black uppercase tracking-widest mb-4">Territory Expansion</h3>
          <p className="text-center text-[11px] text-slate-500 leading-relaxed uppercase font-bold">
            You are authorized for the <span className="text-white">North American</span> market. 
            Apply for <span className="text-cyan-500">EMEA</span> expansion to unlock global nodes.
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
            Request Expansion
          </button>
        </div>
      </div>
    </div>
  );
}
