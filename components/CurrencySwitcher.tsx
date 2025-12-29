'use client';
import React from 'react';
import { Globe } from 'lucide-react';

export const CurrencySwitcher = ({ currentRegion, onRegionChange }: any) => {
  const regions = [
    { id: 'WESTERN', label: 'Western Markets', multiplier: '1.0x' },
    { id: 'EMERGING', label: 'Emerging Markets', multiplier: '0.65x' },
    { id: 'GROWTH', label: 'Growth Markets', multiplier: '0.35x' }
  ];

  return (
    <div className="inline-flex p-1.5 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl gap-2">
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() => onRegionChange(r.id)}
          className={`px-6 py-3 rounded-xl transition-all ${
            currentRegion === r.id ? 'bg-white/10 text-brand-cyan' : 'text-slate-500 hover:text-white'
          }`}
        >
          <span className="block text-[10px] font-black uppercase">{r.label}</span>
          <span className="text-xs font-mono">{r.multiplier}</span>
        </button>
      ))}
    </div>
  );
};
