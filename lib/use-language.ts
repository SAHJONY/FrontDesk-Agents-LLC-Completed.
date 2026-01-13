// lib/use-language.ts
"use client";

export type Lang = "en" | "es";

// Hook mínimo para idioma (por ahora fijo "en")
export function useLanguage(): { lang: Lang } {
  return { lang: "en" };
}
