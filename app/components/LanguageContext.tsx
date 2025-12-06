"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((prev) => (prev === "en" ? "es" : "en")),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Versión tolerante: nunca rompe aunque falte el Provider
export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    // Fallback seguro para SSR / páginas sin provider (no rompe el build)
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
    };
  }

  return ctx;
};
