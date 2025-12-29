'use client';

import React from 'react';
import { Globe, Check } from 'lucide-react';
import { Region } from '../hooks/useMarketPricing';

interface CurrencySwitcherProps {
  currentRegion: Region;
  onRegionChange: (region: Region) => void;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ 
  currentRegion, 
  onRegionChange 
}) => {
  const regions: { id: Region; label: string; description: string; multiplier: string }[] = [
    { id: 'WESTERN', label: 'Western Markets', description: 'Standard Global Rate', multiplier: '1.0x' },
    { id: 'EMERGING', label: 'Emerging Markets', description: 'Regional Optimization', multiplier: '0.65x' },
    { id: 'GROWTH', label: 'Growth Markets', description: 'Aggressive Market Entry', multiplier: '0.35x' },
  ];

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex items-center gap-2 mb-4 text-blue-500 font-bold uppercase tracking-widest text-xs">
        <Globe className="w-4 h-4" />
        Select Your Global Node
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={`relative flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${
              currentRegion === region.id
                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            {currentRegion === region.id && (
              <div className="absolute top-3 right-3 bg-blue-500 rounded-full p-1">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <span className={`text-sm font-bold ${currentRegion === region.id ? 'text-white' : 'text-slate-300'}`}>
              {region.label}
            </span>
            <span className="text-xs text-slate-500 mt-1">{region.description}</span>
            <div className="mt-3 px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-blue-400">
              Multiplier: {region.multiplier}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
