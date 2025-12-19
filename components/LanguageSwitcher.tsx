'use client';

import React, { useState, useEffect } from 'react';
import { languages, Language } from '@/config/languages';
import { Globe } from 'lucide-react'; // Assuming you use lucide-react

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Load preference from cookie on mount
  useEffect(() => {
    const savedLang = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    if (savedLang) setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (code: string) => {
    // 1. Set cookie for Middleware to pick up
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // 2. Update state and refresh to apply headers
    setCurrentLang(code);
    setIsOpen(false);
    window.location.reload(); 
  };

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
      >
        <Globe className="w-4 h-4" />
        <span>{activeLang.flag}</span>
        <span className="hidden md:inline">{activeLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
                  currentLang === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } hover:bg-gray-50`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.name}</span>
                {currentLang === lang.code && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
