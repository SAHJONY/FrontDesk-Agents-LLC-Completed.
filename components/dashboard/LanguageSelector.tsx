'use client';

import React from 'react';
import { GlobeAltIcon, CheckIcon } from '@heroicons/react/24/outline';
import { WORLDWIDE_LANGUAGES } from '@/services/blandAiService';

interface LanguageSelectorProps {
  selectedLocale: string;
  onSelect: (locale: string) => void;
}

export const LanguageSelector = ({ selectedLocale, onSelect }: LanguageSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <GlobeAltIcon className="w-5 h-5 text-cyan-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Neural Region Selection
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(WORLDWIDE_LANGUAGES).map(([region, locales]) => (
          <div key={region} className="space-y-3">
            <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-600 border-b border-white/5 pb-2">
              {region.replace('_', ' ')}
            </h5>
            <div className="flex flex-wrap gap-2">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => onSelect(locale)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                    selectedLocale === locale
                      ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {locale.split('-')[1]} {/* Display Region Code */}
                    {selectedLocale === locale && <CheckIcon className="w-3 h-3" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
        <p className="text-[9px] font-medium text-cyan-500/80 leading-relaxed uppercase tracking-wide">
          <span className="font-black underline mr-2">Pro Tip:</span> 
          Selecting an African or Asian locale automatically activates Tonal Prosody Tuning to ensure maximum linguistic trust in the {selectedLocale} market.
        </p>
      </div>
    </div>
  );
};
