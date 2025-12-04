// lib/i18n.ts
// i18n ultra simple para FrontDesk Agents
// Mantengo los tipos flexibles para no pelear con TypeScript.

export type Locale = "en" | "es";

// ---- LANDING COPY ----

export const landingCopy: any = {
  heroTitle: "AI Receptionists that never miss a call.",
  heroSubtitle:
    "FrontDesk Agents answers, qualifies and routes every call 24/7 for clinics, law firms and service businesses.",
  ctaPrimary: "Start now",
  ctaSecondary: "Book a live demo",
};

export const landingCopyEs: any = {
  heroTitle: "Recepcionistas de IA que nunca pierden una llamada.",
  heroSubtitle:
    "FrontDesk Agents atiende, califica y enruta todas tus llamadas 24/7 para clínicas, abogados y negocios de servicios.",
  ctaPrimary: "Comenzar ahora",
  ctaSecondary: "Pedir una demo en vivo",
};

// ---- PRICING COPY ----

export const pricingCopy: any = {
  title: "Simple, predictable pricing.",
  subtitle:
    "Choose the plan that fits your operation. No setup fees, cancel anytime.",
  starterLabel: "Starter",
  proLabel: "Pro",
  enterpriseLabel: "Enterprise",
};

export const pricingCopyEs: any = {
  title: "Precios simples y predecibles.",
  subtitle:
    "Elige el plan que encaja con tu operación. Sin costos de instalación, cancela cuando quieras.",
  starterLabel: "Starter",
  proLabel: "Pro",
  enterpriseLabel: "Enterprise",
};

// ---- DEMO PAGE COPY (LO IMPORTANTE) ----

// Versión en inglés que usa actualmente la app.
export const demoCopy: any = {
  heroTitle: "See FrontDesk Agents in action",
  heroSubtitle:
    "Book a live demo and watch our AI receptionist handle real calls, in real time.",
  ctaPrimary: "Request a live demo",
  ctaSecondary: "Talk to sales",
};

// Versión en español opcional, por si luego la usamos.
export const demoCopyEs: any = {
  heroTitle: "Mira a FrontDesk Agents en acción",
  heroSubtitle:
    "Agenda una demo en vivo y mira cómo nuestra recepcionista de IA atiende llamadas reales, en tiempo real.",
  ctaPrimary: "Solicitar demo en vivo",
  ctaSecondary: "Hablar con ventas",
};
