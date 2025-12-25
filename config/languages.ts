// /config/languages.ts

export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

export const defaultLanguage = 'en';

export const isSupportedLanguage = (lang: string) => 
  languages.some((l) => l.code === lang);
