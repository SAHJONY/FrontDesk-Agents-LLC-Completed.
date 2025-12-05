"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");

  // Cargar idioma guardado (si existe) solo en el cliente
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("fd-language");
    if (saved === "en" || saved === "es") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("fd-language", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);

  // 🔐 Cambio importante:
  // No lanzamos error en build/SSR si no hay Provider.
  // Devolvemos valores por defecto seguros.
  if (!ctx) {
    return {
      language: "en",
      setLanguage: () => {
        // no-op cuando no hay provider (build estático, SSR, etc.)
      },
    };
  }

  return ctx;
}
