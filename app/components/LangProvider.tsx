"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Lang = "es" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "frontdesk-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "es" || stored === "en") return stored;

    // Detección básica por navegador
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith("es")) return "es";
    return "en";
  } catch {
    return "es";
  }
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    setLangState(getInitialLang());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignorar errores
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "es" ? "en" : "es"));
  };

  const value: LangContextValue = { lang, setLang, toggleLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
