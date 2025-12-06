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

// Re-export para que otros componentes puedan importar desde aquí
export { useLanguage };
