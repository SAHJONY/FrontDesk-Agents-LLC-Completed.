'use client';

import React, { useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
      <div className="titan-card w-full max-w-2xl">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 w-full mx-1 rounded-full ${step >= s ? 'bg-brand-cyan' : 'bg-slate-800'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <h2 className="text-3xl font-black mb-4 italic">IDENTITY SYNC</h2>
            <p className="text-slate-400 mb-8">Link your corporate domain to the AI Fleet.</p>
            <input placeholder="company-domain.com" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl mb-6 outline-none focus:border-brand-cyan" />
            <button onClick={() => setStep(2)} className="w-full bg-brand-cyan text-black py-4 rounded-xl font-bold uppercase">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-3xl font-black mb-4 italic">REGIONAL MAPPING</h2>
            <p className="text-slate-400 mb-8">Select your primary Global Node for local platform feel.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => setStep(3)} className="titan-card hover:bg-white/5 py-4">Western Node</button>
              <button onClick={() => setStep(3)} className="titan-card hover:bg-white/5 py-4">Growth Node</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
