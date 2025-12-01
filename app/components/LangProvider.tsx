"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Lang = "en" | "es";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (value: Lang) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("fda_lang", value);
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "es" : "en");
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("fda_lang");
      if (saved === "en" || saved === "es") {
        setLangState(saved);
      }
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
