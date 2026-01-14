'use client';

import React, { useState } from 'react';
import HeroImage from './components/HeroImage';

const TIERS = {
  STARTER: { 
    name: 'Starter', price: 299, locations: '1 loc', 
    desc: 'Essential AI receptionist for single location',
    features: ['1,000 Conversations', 'English/Spanish', 'Google Calendar'] 
  },
  PROFESSIONAL: { 
    name: 'Professional', price: 699, locations: '2-5 locs', 
    desc: 'Complete AI workforce for 2-5 locations',
    features: ['5,000 Conversations', '50+ Languages', 'Stripe Billing'] 
  },
  GROWTH: { 
    name: 'Growth', price: 1299, locations: '6-15 locs', 
    desc: 'Advanced AI workforce for 6-15 locations',
    features: ['15,000 Conversations', '100+ Languages', 'Salesforce/HubSpot'] 
  },
  ENTERPRISE: { 
    name: 'Enterprise', price: 2499, locations: '16+ locs', 
    desc: 'Unlimited AI workforce for 16+ locations',
    features: ['Unlimited Conversations', 'All Languages', 'Custom Onboarding'] 
  },
};

export default function LandingPage() {
  const [locations, setLocations] = useState(1);
  const [isAnnual, setIsAnnual] = useState(false);

  // Calculator Logic
  const calculatePrice = () => {
    let base = 299;
    let discount = 0;
    if (locations >= 16) { base = 2499; discount = 0.20; }
    else if (locations >= 6) { base = 1299; discount = 0.15; }
    else if (locations >= 2) { base = 699; discount = 0.10; }
    
    const monthly = base * locations * (1 - discount);
    return isAnnual ? monthly * 0.8 : monthly;
  };

  return (
    <div className="flex flex-col gap-12">
      {/* HERO SECTION WITH PREMIUM IMAGE */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-40">
          <HeroImage />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Your Global AI <span className="text-blue-400">Revenue Workforce</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Elite AI-powered litigation, arbitration, and revenue operations serving global markets locally. 24/7 autonomous infrastructure for your front office.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/20">
              Start Free Trial →
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-slate-700">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 mb-12">All plans include a 14-day free trial with no credit card required.</p>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Multi-Location Pricing Calculator</h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${!isAnnual ? 'font-bold text-blue-600' : 'text-slate-400'}`}>Monthly</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors"
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAnnual ? 'left-7 bg-blue-600' : 'left-1'}`} />
                </button>
                <span className={`text-sm ${isAnnual ? 'font-bold text-blue-600' : 'text-slate-400'}`}>Annual (20% Off)</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Number of Locations</label>
                <span className="text-blue-600 font-black text-xl">{locations}</span>
              </div>
              <input 
                type="range" min="1" max="50" value={locations} 
                onChange={(e) => setLocations(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Monthly Total</p>
                <p className="text-2xl font-black text-blue-600">${Math.round(calculatePrice()).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Per Location</p>
                <p className="text-xl font-bold text-slate-700 dark:text-slate-200">${Math.round(calculatePrice() / locations).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(TIERS).map(([key, tier]) => (
            <div key={key} className={`p-8 rounded-3xl border flex flex-col ${key === 'PROFESSIONAL' ? 'border-blue-600 shadow-2xl ring-4 ring-blue-600/10 bg-white dark:bg-slate-900' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'}`}>
              {key === 'PROFESSIONAL' && <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest self-start">Most Popular</span>}
              <h4 className="text-2xl font-black mt-4">{tier.name}</h4>
              <p className="text-sm text-slate-500 my-4 h-10">{tier.desc}</p>
              <div className="text-4xl font-black mb-6">${tier.price}<span className="text-sm text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex gap-3">
                    <span className="text-blue-600 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${key === 'PROFESSIONAL' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800'}`}>
                Start Trial
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
