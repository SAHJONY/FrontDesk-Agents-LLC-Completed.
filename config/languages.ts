// This file now properly exports all members to resolve TypeScript visibility errors
export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

export const defaultLanguage = 'en';

export const isSupportedLanguage = (lang: string) => 
  languages.some((l) => l.code === lang);
