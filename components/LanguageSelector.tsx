import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

// Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

// Safely wraps localStorage access
const setAppLanguage = (langCode: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('appLang', langCode);
        window.dispatchEvent(new Event('languageChange'));
    }
};

const getAppLanguage = (): string => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('appLang') || 'en';
    }
    return 'en';
};

const LanguageSelector: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentLang(getAppLanguage());

    const handleLanguageChange = () => {
      setCurrentLang(getAppLanguage());
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleLanguageChange = (langCode: string): void => {
    setAppLanguage(langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-2xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currentLang === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-left">{lang.name}</span>
              {currentLang === lang.code && (
                <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
