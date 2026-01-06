"use client";

import { ReactNode } from "react";
// Path updated to reference the 'src' directory confirmed on GitHub
import {
  LanguageProvider as ContextLanguageProvider,
  useLanguage,
} from "@/src/contexts/LanguageContext";

/**
 * Bridge Provider
 * Connects the core Language Context logic to the UI components.
 * Enables the platform to act as a "local platform" in any market [cite: 2025-12-24].
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <ContextLanguageProvider>{children}</ContextLanguageProvider>;
}

// Re-export the hook so Sidebar and Topbar can access it
export { useLanguage };
