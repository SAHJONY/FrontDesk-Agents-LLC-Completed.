// app/providers.tsx
"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
