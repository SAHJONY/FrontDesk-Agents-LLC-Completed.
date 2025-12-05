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

// Fallback seguro para prerender / sin provider
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {
    // no-op
  },
});

export function useLanguage() {
  // NUNCA lanza error: siempre hay un valor por defecto
  return useContext(LanguageContext);
}

type LangProviderProps = {
  children: ReactNode;
};

export default function LangProvider({ children }: LangProviderProps) {
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
