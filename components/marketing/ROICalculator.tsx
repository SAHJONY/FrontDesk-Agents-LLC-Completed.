'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

export const ROICalculator = () => {
  const [leads, setLeads] = useState(100);
  const [closeRate, setCloseRate] = useState(10);
  
  // Logic based on Professional Tier Pricing Architecture
  const subscription = 899;
  const appointmentFee = 15;
  const avgDealValue = 2000;

  // Calculation Engine
  const appointmentsSet = Math.round(leads * (closeRate / 100));
  const performanceFees = appointmentsSet * appointmentFee;
  const totalCost = subscription + performanceFees;
  const projectedRevenue = appointmentsSet * avgDealValue;
  const netProfit = projectedRevenue - totalCost;

  return (
    <section className="py-24 bg-[#000814] border-y border-white/5 rounded-[48px] overflow-hidden">
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* INPUT CONTROLS */}
          <div className="text-left">
            <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6">
              Neural ROI <span className="text-cyan-500">Projection</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-12 uppercase tracking-widest text-[10px]">
              Simulate the impact of a Professional Tier deployment on your current lead volume and conversion performance.
            </p>

            <div className="space-y-10">
              {/* Lead Volume Slider */}
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <label className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-cyan-500" /> Monthly Inbound Leads
                  </label>
                  <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{leads}</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10" 
                  value={leads} onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Conversion/Booking Slider */}
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <label className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-cyan-500" /> AI Booking Rate
                  </label>
                  <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{closeRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="50" step="1" 
                  value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                * Calculation based on <span className="text-white">${subscription} Base</span> + <span className="text-white">${appointmentFee} per appointment</span>. <br />
                Projected revenue assumes a <span className="text-cyan-500">${avgDealValue.toLocaleString()} average deal value</span>.
              </p>
            </div>
          </div>

          {/* TELEMETRY RESULTS CARD */}
          <div className="bg-zinc-950 border border-white/10 rounded-[40px] p-10 relative overflow-hidden shadow-2xl group">
            {/* Visual Background Element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700" />

            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Projected Gross Revenue</p>
                <p className="text-6xl lg:text-7xl font-black text-white italic tracking-tighter">
                  ${projectedRevenue.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 titan-card bg-white/[0.02] border border-white/5">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Infrastructure Burn</p>
                  <p className="text-xl font-bold text-red-400">-${totalCost.toLocaleString()}</p>
                </div>
                <div className="p-6 titan-card bg-cyan-500/5 border border-cyan-500/20">
                  <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">Net Neural Profit</p>
                  <p className="text-xl font-bold text-emerald-400">+${netProfit.toLocaleString()}</p>
                </div>
              </div>

              <button className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                Secure This Infrastructure <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-center text-[8px] font-black text-slate-600 uppercase tracking-widest">
                Sovereign Node Activation Required for Live Deployment
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

