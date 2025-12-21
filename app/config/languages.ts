// app/config/languages.ts
// Centralized language configuration
// Safe for middleware and app router usage

export type Language = {
  code: string;
  name: string;
  flag: string;
  dir?: "ltr" | "rtl";
};

export const defaultLanguage: Language = {
  code: "en",
  name: "English",
  flag: "🇺🇸",
  dir: "ltr",
};

export const languages: Language[] = [
  // North America & Western Europe
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "ga", name: "Gaeilge", flag: "🇮🇪" },

  // Asia-Pacific
  { code: "zh", name: "简体中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭" },

  // Indian Subcontinent
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵🇰", dir: "rtl" },

  // Middle East & Africa
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "zu", name: "isiZulu", flag: "🇿🇦" },

  // Eastern Europe & Central Asia
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "az", name: "Azərbaycanca", flag: "🇦🇿" },
];
