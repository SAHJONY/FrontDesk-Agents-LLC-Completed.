'use client';

import React, { useState } from 'react';

// Centralized asset paths based on your GitHub repository
const ASSETS = {
  setupProcess: '/assets/premium/setup-process.png',
  setupSteps: '/assets/premium/setup-steps.png',
  globalNode: '/assets/premium/industries-overview.png' // Using this for visual depth in mapping
};

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative z-10 bg-black">
      <div className="titan-card w-full max-w-2xl bg-slate-950 border border-white/10 p-8 rounded-2xl shadow-2xl">
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1 w-full mx-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-slate-800'}`} 
            />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Asset: setup-process.png */}
            <div className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-slate-900/50">
               <img 
                src={ASSETS.setupProcess} 
                alt="Setup Process Overview" 
                className="w-full h-40 object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            
            <h2 className="text-3xl font-black mb-4 italic text-white">IDENTITY SYNC</h2>
            <p className="text-slate-400 mb-8">Link your corporate domain to the AI Fleet.</p>
            
            <input 
              placeholder="company-domain.com" 
              className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl mb-6 text-white outline-none focus:border-cyan-400 transition-colors" 
            />
            
            <button 
              onClick={() => setStep(2)} 
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold uppercase tracking-widest transition-transform active:scale-95"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
             {/* Asset: setup-steps.png */}
             <div className="mb-6 flex justify-center">
               <img 
                src={ASSETS.setupSteps} 
                alt="Regional Mapping Steps" 
                className="rounded-lg shadow-lg border border-cyan-500/20 max-h-32"
              />
            </div>

            <h2 className="text-3xl font-black mb-4 italic text-white">REGIONAL MAPPING</h2>
            <p className="text-slate-400 mb-8">Select your primary Global Node for local platform feel.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={() => setStep(3)} 
                className="p-6 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800 hover:border-cyan-400/50 transition-all text-slate-300 font-bold"
              >
                Western Node
              </button>
              <button 
                onClick={() => setStep(3)} 
                className="p-6 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800 hover:border-cyan-400/50 transition-all text-slate-300 font-bold"
              >
                Growth Node
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-in fade-in duration-700">
            <div className="mb-6 rounded-xl overflow-hidden border border-cyan-500/30">
              <img src={ASSETS.globalNode} alt="Node Active" className="w-full h-48 object-cover" />
            </div>
            <h2 className="text-3xl font-black mb-4 italic text-cyan-400">SYNC COMPLETE</h2>
            <p className="text-slate-400 mb-8">Your AI Fleet is now tethered to the Global Infrastructure.</p>
            <button 
              onClick={() => window.location.href = '/dashboard'} 
              className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
