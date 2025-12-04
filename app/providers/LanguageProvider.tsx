// app/providers.tsx
"use client";

import { ReactNode } from "react";

// 🔴 IMPORTANTE:
// Ajusta esta línea si tu LanguageProvider está en otra ruta o archivo.
// Ejemplos posibles:
// "@/contexts/LanguageContext"
// "@/context/LanguageContext"
// "@/providers/LanguageProvider"
import { LanguageProvider } from "@/contexts/LanguageContext";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  // Aquí envuelves TODA la app con tu LanguageProvider existente
  return <LanguageProvider>{children}</LanguageProvider>;
}
