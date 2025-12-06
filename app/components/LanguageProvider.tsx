// app/components/LanguageProvider.tsx
"use client";

import { ReactNode } from "react";
import { LanguageProviderRoot } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageProviderRoot>{children}</LanguageProviderRoot>;
}
