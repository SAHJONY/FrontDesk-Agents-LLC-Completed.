"use client";

import { ReactNode } from "react";
import { LanguageProvider as RootProvider } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
