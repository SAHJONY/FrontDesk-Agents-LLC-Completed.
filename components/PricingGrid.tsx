'use client';

import React from 'react';
import { PlanData, PlanTier } from '@/config/plans';
import { Check, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const PricingGrid = () => {
  const { locale } = useParams();

  return (
    <section id="pricing" className="py-24 bg-black relative">
      <div className="container mx-auto px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4">
            Infrastructure <span className="text-cyan-500">Deployment</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
            Select your node capacity for the {locale?.toString().toUpperCase()} market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PlanData.map((plan) => {
            const isPro = plan.id === PlanTier.PROFESSIONAL;

            return (
              <div 
                key={plan.id}
                className={`relative rounded-[40px] p-8 transition-all duration-500 flex flex-col h-full ${
                  isPro 
                    ? 'bg-cyan-500 text-black scale-105 z-10 shadow-[0_0_60px_rgba(6,182,212,0.25)]' 
                    : 'bg-white/[0.02] border border-white/10 text-white hover:border-white/20'
                }`}
              >
                {/* Highlight Badge for Professional Tier */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-cyan-500 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] border border-cyan-500/50">
                    Most Deployed
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl font-black uppercase italic mb-2 ${isPro ? 'text-black' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs font-medium leading-relaxed ${isPro ? 'text-black/70' : 'text-slate-400'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">${plan.price}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isPro ? 'text-black/60' : 'text-slate-500'}`}>
                      / month
                    </span>
                  </div>
                  <div className={`mt-2 text-[10px] font-black uppercase tracking-widest ${isPro ? 'text-black/80' : 'text-cyan-500'}`}>
                    + ${plan.appointmentFee} per appointment
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {isPro ? (
                        <Zap className="w-4 h-4 mt-0.5 fill-black" />
                      ) : (
                        <Check className="w-4 h-4 mt-0.5 text-cyan-500" />
                      )}
                      <span className={`text-[11px] font-bold uppercase tracking-tight ${isPro ? 'text-black' : 'text-slate-300'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/${locale}/onboarding?plan=${plan.id}`}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all text-center ${
                    isPro 
                      ? 'bg-black text-white hover:bg-white hover:text-black' 
                      : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Global Security Note */}
        <div className="mt-16 flex flex-col items-center gap-4 opacity-50">
          <div className="flex items-center gap-6">
            <ShieldCheck className="text-white w-5 h-5" />
            <Globe className="text-white w-5 h-5" />
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
            Secure Encryption • Multi-Market Scalability • Zero-Latency Node Activation
          </p>
        </div>
      </div>
    </section>
  );
};
