import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// List of all supported locales
export const locales = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko',
  'ar', 'hi', 'nl', 'pl', 'tr', 'vi', 'th', 'id', 'ms', 'fil',
  'sv', 'no', 'da', 'fi', 'cs', 'hu', 'ro', 'uk', 'el', 'he',
  'fa', 'bn', 'ur', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'si',
  'km', 'lo', 'my', 'ka', 'am', 'sw', 'zu', 'af', 'is', 'mt'
] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  nl: 'Nederlands',
  pl: 'Polski',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  fil: 'Filipino',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  cs: 'Čeština',
  hu: 'Magyar',
  ro: 'Română',
  uk: 'Українська',
  el: 'Ελληνικά',
  he: 'עברית',
  fa: 'فارسی',
  bn: 'বাংলা',
  ur: 'اردو',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  si: 'සිංහල',
  km: 'ខ្មែរ',
  lo: 'ລາວ',
  my: 'မြန်မာ',
  ka: 'ქართული',
  am: 'አማርኛ',
  sw: 'Kiswahili',
  zu: 'isiZulu',
  af: 'Afrikaans',
  is: 'Íslenska',
  mt: 'Malti'
};

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'he', 'fa', 'ur'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to English instead of showing 404
  const validLocale = locales.includes(locale as Locale) ? locale : 'en';

  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
    locale: validLocale
  };
});
