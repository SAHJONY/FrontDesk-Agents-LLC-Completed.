'use client';

import React from 'react';
import { PlanData, PlanTier } from '@/config/plans';
import { Check, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const PricingGrid = () => {
  const params = useParams();
  const locale = params?.locale || 'en';

  return (
    <section id="pricing" className="py-24 bg-black relative selection:bg-cyan-500/30">
      <div className="container mx-auto px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-6">
            Infrastructure <span className="text-cyan-500">Deployment</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] max-w-2xl mx-auto">
            Select your node capacity for the {locale.toString().toUpperCase()} market. All plans include SARA-v3 core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PlanData.map((plan) => {
            const isPro = plan.id === PlanTier.PROFESSIONAL;

            return (
              <div 
                key={plan.id}
                className={`relative rounded-[40px] p-10 transition-all duration-500 flex flex-col h-full group ${
                  isPro 
                    ? 'bg-cyan-500 text-black scale-105 z-10 shadow-[0_0_80px_rgba(6,182,212,0.15)] border-none' 
                    : 'bg-white/[0.02] border border-white/10 text-white hover:border-cyan-500/50'
                }`}
              >
                {/* Highlight Badge for Professional Tier */}
                {isPro && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-cyan-500 text-[10px] font-black px-8 py-2.5 rounded-full uppercase tracking-[0.3em] border border-cyan-500/50 shadow-xl whitespace-nowrap">
                    Most Deployed
                  </div>
                )}

                <div className="mb-10">
                  <h3 className={`text-3xl font-black uppercase italic tracking-tighter mb-3 ${isPro ? 'text-black' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs font-bold leading-relaxed uppercase tracking-tight ${isPro ? 'text-black/70' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isPro ? 'text-black/60' : 'text-slate-600'}`}>
                      / month
                    </span>
                  </div>
                  <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${isPro ? 'bg-black/10 text-black' : 'bg-cyan-500/10 text-cyan-500'}`}>
                    + ${plan.appointmentFee} per appointment
                  </div>
                </div>

                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        {isPro ? (
                          <Zap className="w-4 h-4 fill-black" />
                        ) : (
                          <Check className="w-4 h-4 text-cyan-500" />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wide leading-tight ${isPro ? 'text-black font-black' : 'text-slate-300'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/${locale}/onboarding?plan=${plan.id}`}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all text-center shadow-lg ${
                    isPro 
                      ? 'bg-black text-white hover:bg-white hover:text-black hover:scale-[1.02]' 
                      : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:scale-[1.02]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Global Security Note */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-6 opacity-60">
          <div className="flex items-center gap-10">
            <ShieldCheck className="text-white w-6 h-6" />
            <Globe className="text-white w-6 h-6 animate-pulse" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 text-center leading-relaxed">
            Military-Grade Encryption • Multi-Market Node Scaling • Zero-Latency Logic
          </p>
        </div>
      </div>
    </section>
  );
};
