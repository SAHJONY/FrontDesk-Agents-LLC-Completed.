'use client';

import React, { useState } from 'react';
import { languages } from '@/config/languages'; // Path to your language config
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: string) => {
    // 1. Set the cookie so the Middleware knows the language choice
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
    
    // 2. Refresh the page to trigger the Middleware & update RTL/LTR headers
    window.location.reload();
  };

  return (
    <div className="relative">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700"
      >
        <Globe size={18} className="text-gray-500" />
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Transparent backdrop to close the menu when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[400px] overflow-y-auto">
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
