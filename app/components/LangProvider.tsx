// app/components/LangProvider.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "es";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}

interface LangProviderProps {
  children: ReactNode;
}

/**
 * Provider muy simple para manejar EN / ES.
 * Por ahora sólo expone el estado; puedes usarlo luego en textos del sitio.
 */
export const LangProvider: React.FC<LangProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "es" : "en"));

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

// Default export para que `import LangProvider from "./components/LangProvider"`
export default LangProvider;
