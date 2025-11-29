"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Lang = "en" | "es";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load from localStorage or browser language on first client render
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("fd-lang");
      if (stored === "en" || stored === "es") {
        setLangState(stored);
        return;
      }

      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) {
        setLangState("es");
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    try {
      window.localStorage.setItem("fd-lang", value);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
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
