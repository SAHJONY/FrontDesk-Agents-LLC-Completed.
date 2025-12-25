// /config/languages.ts

export const languages = [
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇲🇽' },
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' }
];

export const defaultLanguage = 'en';

export const isSupportedLanguage = (lang: string) => 
  languages.some((l) => l.code === lang);
