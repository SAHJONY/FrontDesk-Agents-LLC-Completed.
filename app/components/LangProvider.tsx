"use client";

import React, { createContext, useContext, useState } from "react";

type SupportedLang = "es" | "en";

interface LangContextProps {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
}

const LangContext = createContext<LangContextProps | undefined>(undefined);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<SupportedLang>("es");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
