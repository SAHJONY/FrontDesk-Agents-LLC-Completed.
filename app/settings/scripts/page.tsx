'use client';

import React from 'react';

export default function ScriptEditor() {
  return (
    <div className="p-8 max-w-5xl mx-auto relative z-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black italic">AI SCRIPT ENGINE</h1>
          <p className="text-slate-500 text-sm">Configure linguistic mapping and sales logic.</p>
        </div>
        <button className="bg-brand-cyan text-black px-8 py-3 rounded-xl font-black uppercase text-xs">
          Deploy to Fleet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="titan-card">
            <label className="block text-brand-cyan text-[10px] font-bold uppercase tracking-widest mb-4">Master Script Prompt</label>
            <textarea 
              rows={12}
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-6 text-slate-300 font-mono text-sm focus:border-brand-cyan outline-none resize-none"
              defaultValue={`You are a professional sales receptionist for a global financial hub.
Your goal is to qualify leads and book appointments.
Current Multiplier Context: {{market_multiplier}}
Language Mapping: {{auto_detect}}`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="titan-card">
            <h4 className="text-white font-bold mb-4">Tone Configuration</h4>
            <div className="space-y-3">
              {['Assertive', 'Empathetic', 'Professional', 'Concise'].map((tone) => (
                <label key={tone} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                  <input type="radio" name="tone" className="accent-brand-cyan" />
                  <span className="text-sm text-slate-300">{tone}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
