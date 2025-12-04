// app/providers/LanguageProvider.tsx
"use client";

import type { ReactNode } from "react";
import {
  LanguageProvider as CoreLanguageProvider,
  useLanguage as useCoreLanguage,
} from "@/contexts/LanguageContext";

/**
 * Wrapper para mantener compatibilidad con el código existente.
 * - Provee el provider global de idioma.
 * - Expone useLanguage con ambas formas:
 *   { lang, setLang }  (legacy)
 *   { language, setLanguage } (nueva)
 */

type Props = {
  children: ReactNode;
};

export function LanguageProvider({ children }: Props) {
  return <CoreLanguageProvider>{children}</CoreLanguageProvider>;
}

export function useLanguage() {
  const { language, setLanguage } = useCoreLanguage();

  return {
    // API legacy esperada por Footer, page.tsx, etc.
    lang: language,
    setLang: setLanguage,
    // API nueva directa por si la usas en nuevos componentes
    language,
    setLanguage,
  };
}

// Default export por si en algún lugar usan `import useLanguage from "..."`
export default useLanguage;
