'use client';

import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

interface CurrencySwitcherProps {
  currentRegion: string;
  onRegionChange: (region: 'WESTERN' | 'EMERGING' | 'GROWTH') => void;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ 
  currentRegion, 
  onRegionChange 
}) => {
  const regions = [
    { id: 'WESTERN', label: 'Western Markets', mult: '1.0x' },
    { id: 'EMERGING', label: 'Emerging Markets', mult: '0.65x' },
    { id: 'GROWTH', label: 'Growth Markets', mult: '0.35x' },
  ] as const;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
        <ShieldCheck className="w-3 h-3 text-brand-cyan" />
        <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">
          Sovereign Node Selection
        </span>
      </div>
      
      <div className="inline-flex p-1.5 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl gap-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={`flex flex-col items-center px-6 py-3 rounded-xl transition-all duration-300 min-w-[140px] ${
              currentRegion === region.id
                ? 'bg-white/10 border border-white/10 shadow-xl'
                : 'hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-tight mb-1 ${
              currentRegion === region.id ? 'text-brand-cyan' : 'text-slate-500'
            }`}>
              {region.label}
            </span>
            <span className={`text-xs font-mono font-bold ${
              currentRegion === region.id ? 'text-white' : 'text-slate-600'
            }`}>
              Multiplier: {region.mult}
            </span>
          </button>
        ))}
      </div>
      
      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">
        <Globe className="inline w-3 h-3 mr-1 mb-0.5" />
        Global Fleet Synchronization: Active
      </p>
    </div>
  );
};
