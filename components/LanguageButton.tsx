'use client';

import React, { useState, useEffect } from 'react';
import { languages } from '@/config/languages';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fixes hydration errors in Next.js 15
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (code: string) => {
    // Save the choice in a cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
    // Reload to let the Middleware update the direction (RTL/LTR)
    window.location.reload();
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="relative z-[9999]">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border-2 border-blue-500 rounded-lg bg-white text-black font-bold shadow-lg transition-transform active:scale-95"
      >
        <Globe size={18} className="text-blue-600" />
        <span>Language</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div className="fixed inset-0 z-40 bg-black/5" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 max-h-[400px] overflow-y-auto ring-1 ring-black ring-opacity-5">
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-blue-50 rounded-lg text-sm text-gray-800 transition-colors border-b last:border-0 border-gray-100"
                >
                  <span className="text-xl leading-none">{lang.flag}</span>
                  <span className="font-medium text-left flex-1">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
