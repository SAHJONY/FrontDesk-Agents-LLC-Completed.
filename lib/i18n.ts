// lib/i18n.ts
// i18n simple para FrontDesk Agents
// Usamos tipos flexibles para evitar peleas con TypeScript.

export type Locale = "en" | "es";

// ----- LANDING / HOME -----

export const landingCopy: any = {
  heroTitle: "AI receptionists that never miss a call.",
  heroSubtitle:
    "FrontDesk Agents answers, qualifies and routes every call 24/7 for clinics, law firms and service businesses.",
  ctaPrimary: "Start now",
  ctaSecondary: "Book a live demo",
  bullets: [
    "24/7 AI receptionist in EN/ES",
    "Instant SMS replies to missed calls",
    "Outbound follow-up to revive cold leads",
  ],
};

export const landingCopyEs: any = {
  heroTitle: "Recepcionistas de IA que nunca pierden una llamada.",
  heroSubtitle:
    "FrontDesk Agents atiende, califica y enruta todas tus llamadas 24/7 para clínicas, abogados y negocios de servicios.",
  ctaPrimary: "Comenzar ahora",
  ctaSecondary: "Pedir una demo en vivo",
  bullets: [
    "Recepcionista IA 24/7 en EN/ES",
    "Respuestas por SMS a llamadas perdidas",
    "Seguimiento automático para reactivar leads fríos",
  ],
};

// ----- PRICING -----

export const pricingCopy: any = {
  title: "Simple, transparent pricing.",
  subtitle:
    "Choose the plan that fits your call volume and growth goals.",
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: "$399/mo",
      description:
        "Solo & small clinics. 1 AI receptionist, 1 inbox, EN/ES, 24/7.",
      cta: "Start with Starter",
    },
    {
      id: "pro",
      name: "Professional",
      price: "$899/mo",
      description:
        "Law firms & multi-location teams. 3 AI agents, CRM integration, call routing.",
      cta: "Scale with Pro",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$1,799/mo",
      description:
        "Chains & large groups. Unlimited agents & inboxes, SSO, SLA, custom workflows.",
      cta: "Talk to sales",
    },
  ],
};

export const pricingCopyEs: any = {
  title: "Precios simples y transparentes.",
  subtitle:
    "Elige el plan que se ajusta al volumen de llamadas y a tus objetivos de crecimiento.",
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: "US$399/mes",
      description:
        "Consultorios y negocios pequeños. 1 recepcionista IA, 1 inbox, EN/ES, 24/7.",
      cta: "Empezar con Starter",
    },
    {
      id: "pro",
      name: "Professional",
      price: "US$899/mes",
      description:
        "Firmas legales y equipos multi-sede. 3 agentes IA, integración con CRM, enrutamiento.",
      cta: "Escalar con Pro",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "US$1,799/mes",
      description:
        "Cadenas y grandes grupos. Agentes e inbox ilimitados, SSO, SLA, flujos a medida.",
      cta: "Hablar con ventas",
    },
  ],
};

// ----- DEMO PAGE (IMPORTANTE PARA EL ERROR) -----

export const demoCopy: any = {
  heroTitle: "See FrontDesk Agents in action",
  heroSubtitle:
    "Book a live demo and watch our AI receptionist handle real calls, in real time.",
  ctaPrimary: "Request a live demo",
  ctaSecondary: "Talk to sales",
};

export const demoCopyEs: any = {
  heroTitle: "Mira a FrontDesk Agents en acción",
  heroSubtitle:
    "Agenda una demo en vivo y mira cómo nuestra recepcionista de IA atiende llamadas reales, en tiempo real.",
  ctaPrimary: "Solicitar demo en vivo",
  ctaSecondary: "Hablar con ventas",
};
