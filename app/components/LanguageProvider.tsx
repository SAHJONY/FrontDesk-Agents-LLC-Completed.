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

// Valor por defecto para que NUNCA reviente si no hay Provider
const defaultValue: LanguageContextValue = {
  language: "en",
  setLanguage: () => {
    // no-op en prerender / sin provider
  },
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

export function useLanguage() {
  return useContext(LanguageContext);
}

type LanguageProviderProps = {
  children: ReactNode;
};

export default function LanguageProvider({ children }: LanguageProviderProps) {
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
