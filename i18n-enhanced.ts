import {getRequestConfig} from 'next-intl/server';

// ===================================================================
// WORLD-CLASS LANGUAGE SUPPORT - 100+ LANGUAGES
// Covers 95%+ of global population
// ===================================================================

export const locales = [
  // Major World Languages (Top 20 by speakers)
  'en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'ja', 'pa',
  'de', 'jv', 'ko', 'fr', 'te', 'mr', 'tr', 'ta', 'vi', 'ur',
  
  // European Languages
  'it', 'pl', 'uk', 'ro', 'nl', 'el', 'cs', 'hu', 'sv', 'be',
  'az', 'bg', 'sr', 'sk', 'da', 'fi', 'no', 'hr', 'lt', 'sl',
  'lv', 'et', 'mk', 'sq', 'is', 'ga', 'mt', 'cy', 'eu', 'ca',
  
  // Asian Languages
  'th', 'id', 'ms', 'fil', 'km', 'lo', 'my', 'si', 'ne', 'ka',
  'am', 'gu', 'kn', 'ml', 'or', 'as', 'sd', 'ks', 'dz', 'bo',
  
  // Middle Eastern & Central Asian
  'fa', 'he', 'ps', 'ku', 'uz', 'kk', 'ky', 'tg', 'tk', 'ug',
  
  // African Languages
  'sw', 'ha', 'yo', 'ig', 'zu', 'xh', 'af', 'so', 'rw', 'ny',
  'sn', 'st', 'tn', 'ts', 've', 'ss', 'lg', 'wo', 'ff', 'ti',
  
  // Americas & Pacific
  'qu', 'gn', 'ay', 'ht', 'sm', 'to', 'fj', 'mi', 'haw', 'ty',
] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  // Major World Languages
  en: 'English',
  zh: '中文 (Chinese)',
  hi: 'हिन्दी (Hindi)',
  es: 'Español (Spanish)',
  ar: 'العربية (Arabic)',
  bn: 'বাংলা (Bengali)',
  pt: 'Português (Portuguese)',
  ru: 'Русский (Russian)',
  ja: '日本語 (Japanese)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  de: 'Deutsch (German)',
  jv: 'Basa Jawa (Javanese)',
  ko: '한국어 (Korean)',
  fr: 'Français (French)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  tr: 'Türkçe (Turkish)',
  ta: 'தமிழ் (Tamil)',
  vi: 'Tiếng Việt (Vietnamese)',
  ur: 'اردو (Urdu)',
  
  // European Languages
  it: 'Italiano (Italian)',
  pl: 'Polski (Polish)',
  uk: 'Українська (Ukrainian)',
  ro: 'Română (Romanian)',
  nl: 'Nederlands (Dutch)',
  el: 'Ελληνικά (Greek)',
  cs: 'Čeština (Czech)',
  hu: 'Magyar (Hungarian)',
  sv: 'Svenska (Swedish)',
  be: 'Беларуская (Belarusian)',
  az: 'Azərbaycan (Azerbaijani)',
  bg: 'Български (Bulgarian)',
  sr: 'Српски (Serbian)',
  sk: 'Slovenčina (Slovak)',
  da: 'Dansk (Danish)',
  fi: 'Suomi (Finnish)',
  no: 'Norsk (Norwegian)',
  hr: 'Hrvatski (Croatian)',
  lt: 'Lietuvių (Lithuanian)',
  sl: 'Slovenščina (Slovenian)',
  lv: 'Latviešu (Latvian)',
  et: 'Eesti (Estonian)',
  mk: 'Македонски (Macedonian)',
  sq: 'Shqip (Albanian)',
  is: 'Íslenska (Icelandic)',
  ga: 'Gaeilge (Irish)',
  mt: 'Malti (Maltese)',
  cy: 'Cymraeg (Welsh)',
  eu: 'Euskara (Basque)',
  ca: 'Català (Catalan)',
  
  // Asian Languages
  th: 'ไทย (Thai)',
  id: 'Bahasa Indonesia (Indonesian)',
  ms: 'Bahasa Melayu (Malay)',
  fil: 'Filipino',
  km: 'ខ្មែរ (Khmer)',
  lo: 'ລາວ (Lao)',
  my: 'မြန်မာ (Burmese)',
  si: 'සිංහල (Sinhala)',
  ne: 'नेपाली (Nepali)',
  ka: 'ქართული (Georgian)',
  am: 'አማርኛ (Amharic)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  or: 'ଓଡ଼ିଆ (Odia)',
  as: 'অসমীয়া (Assamese)',
  sd: 'سنڌي (Sindhi)',
  ks: 'कॉशुर (Kashmiri)',
  dz: 'རྫོང་ཁ (Dzongkha)',
  bo: 'བོད་ཡིག (Tibetan)',
  
  // Middle Eastern & Central Asian
  fa: 'فارسی (Persian)',
  he: 'עברית (Hebrew)',
  ps: 'پښتو (Pashto)',
  ku: 'Kurdî (Kurdish)',
  uz: 'Oʻzbekcha (Uzbek)',
  kk: 'Қазақша (Kazakh)',
  ky: 'Кыргызча (Kyrgyz)',
  tg: 'Тоҷикӣ (Tajik)',
  tk: 'Türkmençe (Turkmen)',
  ug: 'ئۇيغۇرچە (Uyghur)',
  
  // African Languages
  sw: 'Kiswahili (Swahili)',
  ha: 'Hausa',
  yo: 'Yorùbá',
  ig: 'Igbo',
  zu: 'isiZulu (Zulu)',
  xh: 'isiXhosa (Xhosa)',
  af: 'Afrikaans',
  so: 'Soomaali (Somali)',
  rw: 'Kinyarwanda (Kinyarwanda)',
  ny: 'Chichewa',
  sn: 'chiShona (Shona)',
  st: 'Sesotho (Sotho)',
  tn: 'Setswana (Tswana)',
  ts: 'Xitsonga (Tsonga)',
  ve: 'Tshivenḓa (Venda)',
  ss: 'SiSwati (Swati)',
  lg: 'Luganda',
  wo: 'Wolof',
  ff: 'Fulfulde (Fula)',
  ti: 'ትግርኛ (Tigrinya)',
  
  // Americas & Pacific
  qu: 'Runa Simi (Quechua)',
  gn: 'Avañe\'ẽ (Guarani)',
  ay: 'Aymar Aru (Aymara)',
  ht: 'Kreyòl Ayisyen (Haitian Creole)',
  sm: 'Gagana Samoa (Samoan)',
  to: 'Lea Faka-Tonga (Tongan)',
  fj: 'Vosa Vakaviti (Fijian)',
  mi: 'Te Reo Māori (Maori)',
  haw: 'ʻŌlelo Hawaiʻi (Hawaiian)',
  ty: 'Reo Tahiti (Tahitian)',
};

// RTL (Right-to-Left) languages
export const rtlLocales: Locale[] = [
  'ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ks', 'ug', 'yi'
];

// Language regions for better organization
export const languageRegions: Record<string, Locale[]> = {
  'Major World Languages': ['en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'ja', 'pa', 'de', 'jv', 'ko', 'fr', 'te', 'mr', 'tr', 'ta', 'vi', 'ur'],
  'European Languages': ['it', 'pl', 'uk', 'ro', 'nl', 'el', 'cs', 'hu', 'sv', 'be', 'az', 'bg', 'sr', 'sk', 'da', 'fi', 'no', 'hr', 'lt', 'sl', 'lv', 'et', 'mk', 'sq', 'is', 'ga', 'mt', 'cy', 'eu', 'ca'],
  'Asian Languages': ['th', 'id', 'ms', 'fil', 'km', 'lo', 'my', 'si', 'ne', 'ka', 'am', 'gu', 'kn', 'ml', 'or', 'as', 'sd', 'ks', 'dz', 'bo'],
  'Middle Eastern & Central Asian': ['fa', 'he', 'ps', 'ku', 'uz', 'kk', 'ky', 'tg', 'tk', 'ug'],
  'African Languages': ['sw', 'ha', 'yo', 'ig', 'zu', 'xh', 'af', 'so', 'rw', 'ny', 'sn', 'st', 'tn', 'ts', 've', 'ss', 'lg', 'wo', 'ff', 'ti'],
  'Americas & Pacific': ['qu', 'gn', 'ay', 'ht', 'sm', 'to', 'fj', 'mi', 'haw', 'ty'],
};

// Popular languages (most commonly used)
export const popularLocales: Locale[] = [
  'en', 'es', 'zh', 'hi', 'ar', 'pt', 'bn', 'ru', 'ja', 'pa',
  'de', 'fr', 'ko', 'it', 'tr', 'vi', 'th', 'pl', 'nl', 'id'
];

// Get language native name (without English translation)
export function getNativeName(locale: Locale): string {
  return languageNames[locale].split(' (')[0];
}

// Get language English name
export function getEnglishName(locale: Locale): string {
  const match = languageNames[locale].match(/\(([^)]+)\)/);
  return match ? match[1] : languageNames[locale];
}

// Check if language is RTL
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get language region
export function getLanguageRegion(locale: Locale): string | null {
  for (const [region, languages] of Object.entries(languageRegions)) {
    if (languages.includes(locale)) {
      return region;
    }
  }
  return null;
}

// Search languages by name or code
export function searchLanguages(query: string): Locale[] {
  const lowerQuery = query.toLowerCase();
  return locales.filter(locale => 
    locale.toLowerCase().includes(lowerQuery) ||
    languageNames[locale].toLowerCase().includes(lowerQuery)
  );
}

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to English instead of showing 404
  const validLocale = locales.includes(locale as Locale) ? locale : 'en';
  
  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
    locale: validLocale
  };
});
