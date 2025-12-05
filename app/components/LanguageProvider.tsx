"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
