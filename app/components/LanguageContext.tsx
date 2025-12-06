// contexts/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProviderRoot({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProviderRoot");
  }
  return ctx;
}
