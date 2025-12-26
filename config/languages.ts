// /config/languages.ts

export const languages = [
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇲🇽' },
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' }
];

export const defaultLanguage = 'en';

/**
 * Helper to validate if the autonomously detected 
 * language is supported by the platform.
 */
export const isSupportedLanguage = (lang: string) => 
  languages.some((l) => l.code === lang);
