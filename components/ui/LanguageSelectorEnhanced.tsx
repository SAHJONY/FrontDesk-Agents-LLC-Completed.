'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GlobeAltIcon, MagnifyingGlassIcon, CheckIcon, StarIcon } from '@heroicons/react/24/outline';
import { 
  locales, 
  languageNames, 
  languageRegions,
  popularLocales,
  getNativeName,
  getEnglishName,
  isRTL,
  type Locale 
} from '../../i18n-enhanced';

interface LanguageSelectorEnhancedProps {
  currentLocale: Locale;
  variant?: 'default' | 'compact' | 'full';
}

export default function LanguageSelectorEnhanced({ 
  currentLocale, 
  variant = 'default' 
}: LanguageSelectorEnhancedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'popular' | 'all' | 'regions'>('popular');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false);
    setSearchTerm('');
    
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
    router.push(`/${locale}${pathWithoutLocale || '/'}`);
    
    // Store preference
    localStorage.setItem('preferredLanguage', locale);
  };

  // Filter languages based on search
  const filteredLanguages = searchTerm
    ? locales.filter(locale =>
        locale.toLowerCase().includes(searchTerm.toLowerCase()) ||
        languageNames[locale].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activeTab === 'popular'
    ? popularLocales
    : locales;

  // Render language button
  const renderLanguageButton = (locale: Locale) => {
    const isActive = locale === currentLocale;
    const nativeName = getNativeName(locale);
    const englishName = getEnglishName(locale);
    const isPopular = popularLocales.includes(locale);

    return (
      <button
        key={locale}
        onClick={() => handleLanguageChange(locale)}
        className={`
          group relative w-full text-left px-4 py-3 rounded-lg transition-all duration-200
          ${isActive
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }
        `}
        dir={isRTL(locale) ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{nativeName}</span>
              {isPopular && !isActive && (
                <StarIcon className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              )}
            </div>
            <div className="text-xs opacity-70 truncate">{englishName}</div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs opacity-60 uppercase font-mono">{locale}</span>
            {isActive && (
              <CheckIcon className="w-5 h-5 animate-in fade-in zoom-in duration-200" />
            )}
          </div>
        </div>

        {/* Hover effect */}
        {!isActive && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/10 transition-all duration-200" />
        )}
      </button>
    );
  };

  // Compact variant (just icon and code)
  if (variant === 'compact') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
          aria-label={`Current language: ${languageNames[currentLocale]}`}
          title={`Current: ${languageNames[currentLocale]}`}
        >
          <GlobeAltIcon className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
            {renderDropdownContent()}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
        aria-label={`Current language: ${languageNames[currentLocale]}`}
      >
        <GlobeAltIcon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{getNativeName(currentLocale)}</span>
        <span className="text-xs opacity-60 uppercase">{currentLocale}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );

  function renderDropdownContent() {
    return (
      <>
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-900">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
            Select Language
            <span className="ml-auto text-xs text-slate-400 font-normal">
              {locales.length} languages
            </span>
          </h3>

          {/* Search box */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 text-white text-sm rounded-xl border border-slate-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Tabs (only show if not searching) */}
        {!searchTerm && (
          <div className="flex gap-1 p-2 border-b border-slate-700/50 bg-slate-900/30">
            {[
              { id: 'popular' as const, label: 'Popular', icon: StarIcon },
              { id: 'all' as const, label: 'All Languages', icon: GlobeAltIcon },
              { id: 'regions' as const, label: 'By Region', icon: GlobeAltIcon },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${activeTab === id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Language list */}
        <div className="overflow-y-auto max-h-96 p-2 space-y-1">
          {searchTerm || activeTab !== 'regions' ? (
            // Simple list
            filteredLanguages.length > 0 ? (
              filteredLanguages.map(renderLanguageButton)
            ) : (
              <div className="px-4 py-12 text-center">
                <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p className="text-slate-400 text-sm">No languages found</p>
                <p className="text-slate-500 text-xs mt-1">Try a different search term</p>
              </div>
            )
          ) : (
            // Grouped by region
            Object.entries(languageRegions).map(([region, languages]) => (
              <div key={region} className="mb-4 last:mb-0">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0 bg-slate-800/95 backdrop-blur-sm z-10">
                  {region}
                </div>
                <div className="space-y-1">
                  {languages.map(renderLanguageButton)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {searchTerm ? `${filteredLanguages.length} results` : `Showing ${filteredLanguages.length} languages`}
            </span>
            <span className="text-cyan-400">
              Current: {getNativeName(currentLocale)}
            </span>
          </div>
        </div>
      </>
    );
  }
}
