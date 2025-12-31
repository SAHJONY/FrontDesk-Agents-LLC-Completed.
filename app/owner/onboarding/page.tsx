"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// Permanent Pricing Architecture
const BASE_PRICES = {
  Basic: 199,
  Professional: 399,
  Growth: 799,
  Elite: 1499
};

export default function OwnerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    setLoading(true);
    // Logic for Sovereign Hub Initialization
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'bg-brand-cyan' : 'bg-zinc-800'}`} 
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="h-12 w-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="text-brand-cyan w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Entity Identity</h1>
            <p className="text-zinc-400 text-sm">Define your corporate footprint within the Sovereign Hub.</p>
            <input 
              type="text" 
              placeholder="Legal Entity Name"
              className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl focus:border-brand-cyan outline-none transition-all"
            />
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-white text-black font-black p-4 rounded-xl flex items-center justify-center gap-2 uppercase italic tracking-tighter"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Globe className="text-blue-500 w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Market Parity</h1>
            <p className="text-zinc-400 text-sm">Your platform is defaulted to 1.0 Global-Local Parity.</p>
            <div className="p-4 bg-zinc-900/50 border border-brand-cyan/20 rounded-xl flex items-center gap-4">
              <ShieldCheck className="text-brand-cyan w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Active: Local Market Serving</span>
            </div>
            <button 
              onClick={() => setStep(3)}
              className="w-full bg-white text-black font-black p-4 rounded-xl flex items-center justify-center gap-2 uppercase italic tracking-tighter"
            >
              Set Workforce <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-brand-cyan">Workforce Tiers</h1>
            <div className="space-y-2">
              {/* RESOLVED: _price is used with underscore to satisfy linting while maintaining object structure */}
              {Object.entries(BASE_PRICES).map(([tier, _price]) => (
                <div key={tier} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-cyan/50 transition-colors">
                  <span className="text-white font-bold text-xs uppercase tracking-tighter">{tier} Workforce</span>
                  <span className="text-brand-cyan font-mono font-bold">${_price}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={handleComplete}
              disabled={loading}
              className="w-full bg-brand-cyan text-black font-black p-4 rounded-xl uppercase italic tracking-tighter disabled:opacity-50"
            >
              {loading ? 'Initializing Hub...' : 'Finalize Hub Infrastructure'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
