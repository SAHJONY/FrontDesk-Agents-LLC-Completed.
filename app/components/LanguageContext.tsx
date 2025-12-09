// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'es';

export type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const DEFAULT: LanguageContextValue = {
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {}
};

const LanguageContext = createContext<LanguageContextValue>(DEFAULT);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('site_language') : null;
      if (stored === 'en' || stored === 'es') setLanguageState(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined') localStorage.setItem('site_language', lang);
    } catch (e) {}
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'es' : 'en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}

export default LanguageContext;
