"use client";

import { ReactNode } from "react";
import {
  LanguageProvider as ContextLanguageProvider,
  useLanguage,
} from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

// Re-export the hook so other components can import it from here
export { useLanguage };
