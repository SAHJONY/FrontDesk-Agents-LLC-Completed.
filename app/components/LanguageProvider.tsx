"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "es";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
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

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("fd_language");
    if (stored === "en" || stored === "es") {
      setLanguageState(stored);
    } else {
      const navLang =
        typeof navigator !== "undefined" ? navigator.language : "en";
      if (navLang.toLowerCase().startsWith("es")) {
        setLanguageState("es");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("fd_language", lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Default export for compatibility with `import LanguageProvider from ...`
export default LanguageProvider;
