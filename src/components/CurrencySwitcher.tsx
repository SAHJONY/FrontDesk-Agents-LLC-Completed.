import React from 'react';

interface CurrencySwitcherProps {
  currentRegion: 'WESTERN' | 'MEDIUM' | 'GROWTH';
  onRegionChange: (region: 'WESTERN' | 'MEDIUM' | 'GROWTH') => void;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ 
  currentRegion, 
  onRegionChange 
}) => {
  const regions = [
    { id: 'WESTERN', label: 'Western Markets (1.0x)', icon: '🇺🇸' },
    { id: 'MEDIUM', label: 'Emerging Markets (0.65x)', icon: '🇧🇷' },
    { id: 'GROWTH', label: 'Growth Markets (0.35x)', icon: '🇻🇳' },
  ] as const;

  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
        Select Your Global Node
      </span>
      <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentRegion === region.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="mr-2">{region.icon}</span>
            {region.label}
          </button>
        ))}
      </div>
    </div>
  );
};
