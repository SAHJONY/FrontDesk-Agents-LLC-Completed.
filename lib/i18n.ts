// lib/i18n.ts
export type Lang = "en" | "es";

type HomeCopy = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bullets: string[];
};

type PricingCopy = {
  title: string;
  subtitle: string;
  plans: {
    id: "starter" | "pro" | "enterprise";
    name: string;
    price: string;
    description: string;
    cta: string;
  }[];
};

export const homeCopy: Record<Lang, HomeCopy> = {
  en: {
    heroTitle: "Turn missed calls into booked appointments on autopilot.",
    heroSubtitle:
      "FrontDesk Agents answers every call, texts back missed calls and follows up with your leads so your team focuses only on pre-qualified appointments ready to show and buy.",
    ctaPrimary: "Start onboarding",
    ctaSecondary: "Book a live demo",
    bullets: [
      "24/7 AI phone agent + SMS follow-up",
      "Outbound reactivation campaigns",
      "No missed calls, no lost leads",
    ],
  },
  es: {
    heroTitle: "Convierte llamadas perdidas en citas reservadas en piloto automático.",
    heroSubtitle:
      "FrontDesk Agents contesta todas las llamadas, devuelve las perdidas por SMS y da seguimiento a tus leads para que tu equipo solo atienda citas pre-calificadas listas para visitar y cerrar.",
    ctaPrimary: "Comenzar activación",
    ctaSecondary: "Agendar demo en vivo",
    bullets: [
      "Agente telefónico IA 24/7 + seguimiento por SMS",
      "Campañas de reactivación de leads fríos",
      "Sin llamadas perdidas, sin leads desperdiciados",
    ],
  },
};

export const pricingCopy: Record<Lang, PricingCopy> = {
  en: {
    title: "Simple, transparent pricing.",
    subtitle: "Choose the plan that matches your call volume and growth goals.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$399/mo",
        description: "Solo & small clinics. 1 AI receptionist, 1 inbox, EN/ES.",
        cta: "Start with Starter",
      },
      {
        id: "pro",
        name: "Professional",
        price: "$899/mo",
        description:
          "Law firms & multi-location teams. 3 AI agents, CRM, routing.",
        cta: "Scale with Pro",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "$1,799/mo",
        description:
          "Chains & large groups. Unlimited agents/inboxes, SSO, SLA.",
        cta: "Talk to sales",
      },
    ],
  },
  es: {
    title: "Precios simples y transparentes.",
    subtitle:
      "Elige el plan que se ajusta al volumen de llamadas y a tus objetivos de crecimiento.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "US$399/mes",
        description:
          "Consultorios y negocios pequeños. 1 recepcionista IA, 1 inbox, EN/ES.",
        cta: "Empezar con Starter",
      },
      {
        id: "pro",
        name: "Professional",
        price: "US$899/mes",
        description:
          "Firmas legales y equipos multi-sede. 3 agentes IA, CRM, enrutamiento.",
        cta: "Escalar con Pro",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "US$1,799/mes",
        description:
          "Cadenas y grandes grupos. Agentes e inbox ilimitados, SSO, SLA.",
        cta: "Hablar con ventas",
      },
    ],
  },
};
