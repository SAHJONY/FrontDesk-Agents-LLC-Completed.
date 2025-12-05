"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

// Contexto con valor por defecto seguro para prerender
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {
    // no-op para entornos sin provider (build, prerender)
  },
});

export function useLanguage() {
  // NUNCA lanza error: siempre devuelve algo
  return useContext(LanguageContext);
}

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");

  const value: LanguageContextValue = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
