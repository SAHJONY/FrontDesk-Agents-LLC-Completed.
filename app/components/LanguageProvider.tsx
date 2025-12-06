"use client";

import { ReactNode } from "react";
import {
  LanguageProvider as ContextLanguageProvider,
  useLanguage,
} from "@/contexts/LanguageContext";

/**
 * Wrapper que usa el LanguageProvider definido en contexts/LanguageContext
 * y lo expone a toda la app.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

/**
 * Re-export del hook para que otros componentes puedan hacer:
 *   import { useLanguage } from "./components/LanguageProvider";
 */
export { useLanguage };
