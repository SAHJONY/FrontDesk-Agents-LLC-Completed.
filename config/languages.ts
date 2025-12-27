/**
 * SOVEREIGN GLOBALIZATION ENGINE
 * This file handles autonomous UI flipping and language configuration.
 */

// Define all known Right-to-Left (RTL) scripts for autonomous UI flipping
export const RTL_LANGS = ['ar', 'he', 'fa', 'ur', 'dv', 'ps', 'sd', 'yi'];

export interface GlobalConfig {
  code: string;     // e.g., 'fr', 'jp', 'he'
  name: string;     // e.g., 'French', 'Japanese'
  dir: 'ltr' | 'rtl';
  flag: string;
}

/**
 * Autonomously generates configuration for any language code provided.
 * This is the 'Intelligence' behind your Geographic Chameleon.
 */
export const getAutonomousLanguageConfig = (code: string): GlobalConfig => {
  const cleanCode = code.toLowerCase().trim();
  
  // Use Intl API to get the native name of the language
  let name = 'International';
  try {
    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
    name = languageNames.of(cleanCode) || 'International';
  } catch (e) {
    console.warn(`Intl API could not resolve name for: ${cleanCode}`);
  }
  
  // Determine direction autonomously
  const dir = RTL_LANGS.includes(cleanCode) ? 'rtl' : 'ltr';
  
  // Generate Flag Emoji from ISO Country Code
  // Fallback to Globe if the code isn't 2 chars (e.g., 'zh-Hans')
  let flag = '🌐';
  if (cleanCode.length === 2) {
    flag = cleanCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
  }
  
  return { code: cleanCode, name, dir, flag };
};

// Export for backward compatibility with middleware
export type Language = GlobalConfig;

// Default language for the platform
export const defaultLanguage: GlobalConfig = {
  code: "en",
  name: "English",
  flag: "🇺🇸",
  dir: "ltr",
};

// Predefined list of supported languages for middleware routing
export const languages: GlobalConfig[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "zh", name: "简体中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
];

/**
 * Check if a language code is in our supported list
 */
export function isSupportedLanguage(code: string): boolean {
  if (!code) return false;
  return languages.some(lang => lang.code === code.toLowerCase());
}
