'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PlanData } from '@/config/plans';
import { ShieldCheck, Lock, Activity, Zap, Scale } from 'lucide-react';

export default function PricingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className="min-h-screen bg-[#020305] text-white pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-6">
            Economic <span className="text-cyan-500">Alignment</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
            Shift from fixed labor costs to performance-based infrastructure.
          </p>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {PlanData.map((plan) => (
            <div key={plan.id} className="bg-[#080a0f] border border-white/10 p-12 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-5xl font-black italic tracking-tighter">${plan.price}</span>
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest ml-4">/ Month Base</span>
              </div>

              <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 mb-10">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Performance Fee</p>
                <p className="text-xl font-black text-white italic">${plan.appointmentFee} / Success Synthesis</p>
              </div>

              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-cyan-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all shadow-2xl">
                Initialize Node
              </button>
            </div>
          ))}
        </div>

        {/* --- THE SOVEREIGN GUARANTEE --- */}
        <div className="grid md:grid-cols-3 gap-12 p-16 bg-white/[0.02] border border-white/5 rounded-sm">
          <div className="space-y-4">
            <Scale className="w-6 h-6 text-cyan-500" />
            <h4 className="text-[12px] font-black uppercase tracking-widest">Protocol Governance</h4>
            <p className="text-[10px] text-slate-500 uppercase leading-relaxed tracking-widest">
              Full Human-in-the-Loop thresholds. Define exactly where autonomy ends and human authority begins.
            </p>
          </div>
          <div className="space-y-4 border-x border-white/5 px-12">
            <Lock className="w-6 h-6 text-cyan-500" />
            <h4 className="text-[12px] font-black uppercase tracking-widest">Memory Sovereignty</h4>
            <p className="text-[10px] text-slate-500 uppercase leading-relaxed tracking-widest">
              You own the intelligence. Export your fine-tuned neural SOPs at any time. No vendor lock-in.
            </p>
          </div>
          <div className="space-y-4">
            <Activity className="w-6 h-6 text-cyan-500" />
            <h4 className="text-[12px] font-black uppercase tracking-widest">Economic Risk-Share</h4>
            <p className="text-[10px] text-slate-500 uppercase leading-relaxed tracking-widest">
              Our growth is tied to your recovered revenue. We succeed only when your nodes deliver capital yield.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
