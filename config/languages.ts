// /config/languages.ts
// Shared language config for middleware + app

export type Language = {
  code: string
  name: string
  flag: string
  dir?: "ltr" | "rtl"
}

export const defaultLanguage: Language = {
  code: "en",
  name: "English",
  flag: "🇺🇸",
  dir: "ltr",
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },

  { code: "zh", name: "简体中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },

  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
]

/**
 * Utility for middleware language validation
 */
export function isSupportedLanguage(code: string): boolean {
  return languages.some(lang => lang.code === code)
}
