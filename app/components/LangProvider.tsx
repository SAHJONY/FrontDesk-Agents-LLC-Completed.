"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);

  // ✅ Fallback seguro: si NO hay Provider, no rompemos el build
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => {
        // no-op en SSR / fuera de Provider
      },
    };
  }

  return ctx;
}

type Props = {
  children: ReactNode;
};

export default function LangProvider({ children }: Props) {
  const [lang, setLang] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
