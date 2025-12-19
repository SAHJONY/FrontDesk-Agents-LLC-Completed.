'use client';

import React, { useState, useEffect } from 'react';
import { languages } from '@/config/languages';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This ensures the component only renders on the client to avoid errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (code: string) => {
    // Set the cookie for the middleware
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
    // Refresh to apply the language change and RTL/LTR direction
    window.location.reload();
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="relative z-[9999]">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border-2 border-blue-500 rounded-lg bg-white text-black font-bold shadow-md hover:bg-gray-50 transition-all"
      >
        <Globe size={18} className="text-blue-600" />
        <span>Language</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close the menu when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 max-h-[350px] overflow-y-auto">
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1 text-left font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
