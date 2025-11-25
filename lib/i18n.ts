// lib/i18n.ts

export type Lang = "en" | "es";

export function normalizeLang(value?: string | null): Lang {
  if (!value) return "en";
  const lower = value.toLowerCase();
  if (lower.startsWith("es")) return "es";
  return "en";
}

export const copy = {
  hero: {
    en: {
      eyebrow: "FrontDesk Agents · AI Phone OS",
      title: "Deploy Your AI Receptionist in Minutes",
      subtitle:
        "Answer calls 24/7, book appointments and capture leads automatically—without hiring more staff.",
      ctaPrimary: "Get Started",
      ctaSecondary: "See Command Center",
    },
    es: {
      eyebrow: "FrontDesk Agents · Sistema Telefónico con IA",
      title: "Implementa Tu Recepcionista de IA en Minutos",
      subtitle:
        "Atiende llamadas 24/7, agenda citas y captura leads automáticamente—sin contratar más personal.",
      ctaPrimary: "Empezar",
      ctaSecondary: "Ver Command Center",
    },
  },
  setup: {
    en: {
      title: "Configure Your AI Receptionist",
      subtitle:
        "Tell us about your business and we’ll generate the perfect AI phone agent script, flows and inbox.",
    },
    es: {
      title: "Configura Tu Recepcionista de IA",
      subtitle:
        "Cuéntanos de tu negocio y generamos el guion, los flujos y el inbox perfecto para tu agente telefónico con IA.",
    },
  },
};
