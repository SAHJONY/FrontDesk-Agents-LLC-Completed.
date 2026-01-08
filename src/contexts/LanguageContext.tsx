"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setLocaleCookie } from "@/lib/i18n/cookie";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage and cookie on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("fda_language");
    if (stored === "en" || stored === "es") {
      setLanguageState(stored);
      // Sync with cookie system
      setLocaleCookie(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      // Save to both localStorage and cookie
      window.localStorage.setItem("fda_language", lang);
      setLocaleCookie(lang);
      // Dispatch custom event to notify I18nProvider
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
      // Force page reload to apply language changes
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const value: LanguageContextValue = {
    language,
    toggleLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
