'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, locales } from '../../i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translations, setTranslations] = useState<any>({});

  // Detect browser language on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('fda_language') as Locale;
    const browserLang = navigator.language.split('-')[0] as Locale;
    
    const initialLocale = savedLocale || 
      (locales.includes(browserLang) ? browserLang : 'en');
    
    setLocaleState(initialLocale);
    loadTranslations(initialLocale);

    // Listen for language change events
    const handleLanguageChange = (event: any) => {
      const newLang = event.detail.language as Locale;
      if (locales.includes(newLang)) {
        setLocaleState(newLang);
        loadTranslations(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const loadTranslations = async (loc: Locale) => {
    try {
      const messages = await import(`../../messages/${loc}.json`);
      setTranslations(messages.default);
    } catch (error) {
      console.error(`Failed to load translations for ${loc}`, error);
      // Fallback to English
      const messages = await import(`../../messages/en.json`);
      setTranslations(messages.default);
    }
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('fda_language', newLocale);
    loadTranslations(newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
