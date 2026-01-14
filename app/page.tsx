'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* HEADER */}
      <nav className="flex justify-between items-center p-6 border-b border-slate-100 max-w-7xl mx-auto w-full">
        <span className="text-xl font-bold tracking-tight">FrontDesk Agents LLC</span>
        <div className="flex gap-6 items-center">
          <button className="text-sm font-medium text-slate-600">Login</button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200">
            Start Free Trial →
          </button>
        </div>
      </nav>

      {/* CALCULATOR SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 mb-12">All plans include a 14-day free trial with no credit card required.</p>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-left">
            <h3 className="font-bold text-lg mb-6">Multi-Location Pricing Calculator</h3>
            <div className="mb-8">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Number of Locations: {locations}</label>
              <input 
                type="range" min="1" max="50" value={locations} 
                onChange={(e) => setLocations(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4 accent-blue-600"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Monthly Total</p>
                <p className="text-2xl font-black text-blue-600">${Math.round(calculatePrice()).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Per Location</p>
                <p className="text-xl font-bold text-slate-700">${Math.round(calculatePrice() / locations).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Object.entries(TIERS).map(([key, tier]) => (
            <div key={key} className={`p-8 rounded-3xl border ${key === 'PROFESSIONAL' ? 'border-blue-600 shadow-2xl scale-105 bg-white' : 'border-slate-200'}`}>
              {key === 'PROFESSIONAL' && <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Most Popular</span>}
              <h4 className="text-2xl font-black mt-4">{tier.name}</h4>
              <p className="text-sm text-slate-500 my-4 h-10">{tier.desc}</p>
              <div className="text-4xl font-black mb-6">${tier.price}<span className="text-sm text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-3">
                    <span className="text-blue-600 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-blue-600 transition-colors">Start Trial</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
