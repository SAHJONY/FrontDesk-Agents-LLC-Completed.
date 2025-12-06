"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Tipo del valor del contexto
interface LanguageContextValue {
  language: "en" | "es";
  toggleLanguage: () => void;
}

// 2. Crear el contexto
const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

// 3. Provider del contexto
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const value: LanguageContextValue = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Hook para consumir el contexto
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
