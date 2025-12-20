'use client';

import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/config/languages';
import { Globe, Check, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en';
  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  // Filter languages based on search
  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languages;
    const search = searchTerm.toLowerCase();
    return languages.filter(lang => 
      lang.name.toLowerCase().includes(search) ||
      lang.code.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const changeLanguage = (code: string) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // Update URL
    const segments = pathname.split('/');
    segments[1] = code;
    const newPath = segments.join('/');
    
    router.push(newPath);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase hidden sm:inline">
          {currentLanguage.code}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Language List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      currentLang === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    dir={lang.dir || 'ltr'}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {lang.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {lang.code}
                      </div>
                    </div>
                    {currentLang === lang.code && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="text-sm">No languages found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {languages.length} languages supported
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
