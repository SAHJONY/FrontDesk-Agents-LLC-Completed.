"use client";

export type Lang = "en" | "es";

// Hook mínimo para manejar idioma en el cliente.
// Por ahora devolvemos siempre "en" para que compile sin lógica extra.
export function useLanguage(): { lang: Lang } {
  return { lang: "en" };
}
