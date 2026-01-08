"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/components/LanguageProvider';
import { locales, languageNames, rtlLocales, type Locale } from '@/i18n';

export default function LanguageSelectorMulti() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter languages based on search
  const filteredLocales = locales.filter(locale => {
    const name = languageNames[locale].toLowerCase();
    const code = locale.toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || code.includes(search);
  });

  // Group languages by region
  const languageGroups = {
    'Popular': ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'] as Locale[],
    'European': ['nl', 'pl', 'tr', 'sv', 'no', 'da', 'fi', 'cs', 'hu', 'ro', 'uk', 'el', 'is', 'mt'] as Locale[],
    'Asian': ['vi', 'th', 'id', 'ms', 'fil', 'hi', 'bn', 'ur', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'si', 'km', 'lo', 'my', 'ka'] as Locale[],
    'Middle Eastern': ['ar', 'he', 'fa'] as Locale[],
    'African': ['am', 'sw', 'zu', 'af'] as Locale[],
  };

  const handleLanguageChange = (locale: Locale) => {
    setLanguage(locale as any);
    setIsOpen(false);
    setSearchTerm('');
  };

  const currentLanguageName = languageNames[language as Locale] || languageNames['en'];
  const isRTL = rtlLocales.includes(language as Locale);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors min-w-[80px]"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{currentLanguageName}</span>
        <span className="sm:hidden uppercase">{language}</span>
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-[500px] overflow-hidden flex flex-col">
          {/* Search Box */}
          <div className="p-3 border-b border-slate-700">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
            </div>
          </div>

          {/* Language List */}
          <div className="overflow-y-auto flex-1">
            {searchTerm ? (
              // Show filtered results when searching
              <div className="p-2">
                {filteredLocales.length > 0 ? (
                  filteredLocales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => handleLanguageChange(locale)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${
                        language === locale
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}
                    >
                      <span>{languageNames[locale]}</span>
                      <span className="text-xs text-slate-500 uppercase">{locale}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-sm text-slate-500">
                    No languages found
                  </div>
                )}
              </div>
            ) : (
              // Show grouped languages when not searching
              Object.entries(languageGroups).map(([groupName, groupLocales]) => (
                <div key={groupName} className="p-2">
                  <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {groupName}
                  </div>
                  {groupLocales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => handleLanguageChange(locale)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${
                        language === locale
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}
                    >
                      <span>{languageNames[locale]}</span>
                      <span className="text-xs text-slate-500 uppercase">{locale}</span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-700 bg-slate-900/50">
            <div className="text-xs text-slate-500 text-center">
              {locales.length} languages available
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
