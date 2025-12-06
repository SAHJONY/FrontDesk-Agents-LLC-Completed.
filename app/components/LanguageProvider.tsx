// app/components/LanguageProvider.tsx
"use client";

import { ReactNode } from "react";
import {
  LanguageProvider as ContextLanguageProvider,
  useLanguage,
} from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

// Re-export the hook so all other components can import from here
export { useLanguage };
