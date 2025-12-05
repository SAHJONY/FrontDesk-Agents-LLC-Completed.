"use client";

import React, {
  createContext,
  useContext,    
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
};

// Contexto puede ser null durante el prerender
const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Hook de idioma con FALLBACK SEGURO.
 * - Si NO hay Provider (prerender en Vercel), devuelve "en" y un setLanguage vacío.
 * - En runtime del browser, cuando sí hay <LanguageProvider>, usa el contexto real.
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    // Fallback para build/prerender: no rompe el render estático
    return {
      language: "en",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setLanguage: () => {},
    };
  }

  return ctx;
}

type Props = {
  children: ReactNode;
};

export default function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
