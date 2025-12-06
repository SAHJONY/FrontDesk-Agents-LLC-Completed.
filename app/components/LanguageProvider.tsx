"use client";

import { ReactNode } from "react";
import {
  LanguageProvider as ContextLanguageProvider,
  useLanguage,
} from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

// Re-export del hook para que otros componentes lo importen desde aquí
export { useLanguage };
