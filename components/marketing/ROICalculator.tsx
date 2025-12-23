'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

export const ROICalculator = () => {
  const [leads, setLeads] = useState(100);
  const [closeRate, setCloseRate] = useState(10);
  
  // Logic based on Professional Tier ($899)
  const subscription = 899;
  const appointmentFee = 15;
  const avgDealValue = 2000;

  const appointmentsSet = Math.round(leads * (closeRate / 100));
  const performanceFees = appointmentsSet * appointmentFee;
  const totalCost = subscription + performanceFees;
  const projectedRevenue = appointmentsSet * avgDealValue;
  const netProfit = projectedRevenue - totalCost;

  return (
    <section className="py-24 bg-[#000814] border-y border-white/5">
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-left">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
              Neural ROI <span className="text-cyan-500">Projection</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-12 uppercase tracking-widest text-[10px]">
              Simulate the impact of a Professional Tier deployment on your current lead volume.
            </p>

            <div className="space-y-10">
              {/* Lead Slider */}
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <label className="flex items-center gap-2"><Users className="w-3 h-3" /> Monthly Leads</label>
                  <span className="text-white">{leads}</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10" 
                  value={leads} onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Conversion Slider */}
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <label className="flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Booking Rate</label>
                  <span className="text-white">{closeRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-zinc-950 border border-white/10 rounded-[40px] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <DollarSign className="w-32 h-32 text-cyan-500" />
            </div>

            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Projected Monthly Revenue</p>
                <p className="text-6xl font-black text-white italic tracking-tighter">
                  ${projectedRevenue.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Infrastructure Cost</p>
                  <p className="text-xl font-bold text-red-400">${totalCost.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-3xl">
                  <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">Net Neural Profit</p>
                  <p className="text-xl font-bold text-emerald-400">${netProfit.toLocaleString()}</p>
                </div>
              </div>

              <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-3">
                Secure This Infrastructure <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
