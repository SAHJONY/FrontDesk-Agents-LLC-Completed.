// config/languages.ts
// Global language configuration - PURE DATA ONLY, NO REACT COMPONENTS
// Edge-safe, no Node dependencies

export type Language = {
  code: string;
  name: string;
  flag: string;
  dir?: "ltr" | "rtl";
};

export const languages: readonly Language[] = [
  // North America & Western Europe
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "sv", name: "Svenska", flag: "🇸🇪", dir: "ltr" },
  { code: "no", name: "Norsk", flag: "🇳🇴", dir: "ltr" },
  { code: "da", name: "Dansk", flag: "🇩🇰", dir: "ltr" },
  { code: "fi", name: "Suomi", flag: "🇫🇮", dir: "ltr" },
  { code: "ga", name: "Gaeilge", flag: "🇮🇪", dir: "ltr" },
  
  // Asia-Pacific
  { code: "zh", name: "简体中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", dir: "ltr" },
  { code: "th", name: "ไทย", flag: "🇹🇭", dir: "ltr" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾", dir: "ltr" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭", dir: "ltr" },
  
  // Indian Subcontinent
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳", dir: "ltr" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳", dir: "ltr" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳", dir: "ltr" },
  { code: "mr", name: "मराठी", flag: "🇮🇳", dir: "ltr" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳", dir: "ltr" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳", dir: "ltr" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳", dir: "ltr" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", dir: "ltr" },
  { code: "ur", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  
  // Middle East & Africa
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪", dir: "ltr" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹", dir: "ltr" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬", dir: "ltr" },
  { code: "zu", name: "isiZulu", flag: "🇿🇦", dir: "ltr" },
  
  // Eastern Europe & Central Asia
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "pl", name: "Polski", flag: "🇵🇱", dir: "ltr" },
  { code: "uk", name: "Українська", flag: "🇺🇦", dir: "ltr" },
  { code: "ro", name: "Română", flag: "🇷🇴", dir: "ltr" },
  { code: "cs", name: "Čeština", flag: "🇨🇿", dir: "ltr" },
  { code: "hu", name: "Magyar", flag: "🇭🇺", dir: "ltr" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷", dir: "ltr" },
  { code: "bg", name: "Български", flag: "🇧🇬", dir: "ltr" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰", dir: "ltr" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷", dir: "ltr" },
  { code: "sr", name: "Српски", flag: "🇷🇸", dir: "ltr" },
  { code: "az", name: "Azərbaycanca", flag: "🇦🇿", dir: "ltr" }
] as const;

// Helpers for middleware / routing
export const languageCodes = languages.map(l => l.code);
export const defaultLanguage = "en";

/**
 * Check if a language code is supported
 */
export function isSupportedLanguage(code: string): boolean {
  return languageCodes.includes(code);
}

/**
 * Get language by code
 */
export function getLanguage(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}

/**
 * Check if language is RTL
 */
export function isRTL(code: string): boolean {
  const lang = getLanguage(code);
  return lang?.dir === 'rtl';
}
