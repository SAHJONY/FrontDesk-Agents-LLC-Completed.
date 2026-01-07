'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, languageNames, type Locale } from '../i18n';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false);
    setSearchTerm('');
    
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
    router.push(`/${locale}${pathWithoutLocale || '/'}`);
  };

  const filteredLanguages = locales.filter(locale =>
    languageNames[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
    locale.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-2 rounded hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5"
        aria-label={`Current language: ${languageNames[currentLocale]} - Click to change`}
        title={`Current: ${languageNames[currentLocale]} - Click to change`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{currentLocale.toUpperCase()}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Search box */}
          <div className="p-2 border-b border-slate-700">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 text-white text-sm rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Language list */}
          <div className="overflow-y-auto max-h-80">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                    locale === currentLocale
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{languageNames[locale]}</span>
                  <span className="text-xs opacity-60">{locale.toUpperCase()}</span>
                  {locale === currentLocale && (
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-slate-400 text-sm">
                No languages found
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-700 text-xs text-slate-400 text-center">
            {filteredLanguages.length} of {locales.length} languages
          </div>
        </div>
      )}
    </div>
  );
}
