// lib/i18n.ts
// Textos centralizados para la landing y la página de demo.

import type { Lang } from "./use-language";

type HomeCopyBlock = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type DemoCopyBlock = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// ---------------- HOME PAGE ----------------

export const homeCopy: Record<Lang, HomeCopyBlock> = {
  en: {
    title: "AI receptionists that never miss a call",
    subtitle:
      "FrontDesk Agents answers, qualifies, and routes your calls 24/7 so you stop losing money every time the phone rings.",
    ctaPrimary: "Start with a live demo",
    ctaSecondary: "Talk to our team",
  },
  es: {
    title: "Recepcionistas de IA que nunca pierden una llamada",
    subtitle:
      "FrontDesk Agents responde, califica y enruta tus llamadas 24/7 para que dejes de perder dinero cada vez que suena el teléfono.",
    ctaPrimary: "Comenzar con una demo en vivo",
    ctaSecondary: "Hablar con nuestro equipo",
  },
};

// ---------------- DEMO PAGE ----------------

export const demoCopy: Record<Lang, DemoCopyBlock> = {
  en: {
    heroTitle: "See FrontDesk Agents in action",
    heroSubtitle:
      "Book a live demo and watch our AI receptionist handle real calls, in real time.",
    ctaPrimary: "Request a live demo",
    ctaSecondary: "Talk to sales",
  },
  es: {
    heroTitle: "Mira a FrontDesk Agents en acción",
    heroSubtitle:
      "Agenda una demo en vivo y mira cómo nuestra recepcionista de IA atiende llamadas reales, en tiempo real.",
    ctaPrimary: "Solicitar demo en vivo",
    ctaSecondary: "Hablar con ventas",
  },
};
