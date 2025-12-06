import { ReactNode } from "react";
import { LanguageProvider as ContextLanguageProvider, useLanguage } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

// Re-export the hook to satisfy other components that import it from this file
export { useLanguage };
