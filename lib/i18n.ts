// lib/i18n.ts
// Textos centralizados para home, demo y pricing.

import type { Lang } from "./use-language";

// --------- TYPES ---------

type HomeCopyBlock = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type DemoCopyBlock = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// Lo dejamos flexible para que pricing/page.tsx pueda usar
// lo que necesite sin pelear con tipos.
type PricingCopyBlock = any;

// --------- HOME PAGE ---------

export const homeCopy: Record<Lang, HomeCopyBlock> = {
  en: {
    heroTitle: "AI receptionists that never miss a call",
    heroSubtitle:
      "FrontDesk Agents answers, qualifies, and routes your calls 24/7 so you stop losing money every time the phone rings.",
    ctaPrimary: "Start with a live demo",
    ctaSecondary: "Talk to our team",
  },
  es: {
    heroTitle: "Recepcionistas de IA que nunca pierden una llamada",
    heroSubtitle:
      "FrontDesk Agents responde, califica y enruta tus llamadas 24/7 para que dejes de perder dinero cada vez que suena el teléfono.",
    ctaPrimary: "Comenzar con una demo en vivo",
    ctaSecondary: "Hablar con nuestro equipo",
  },
};

// --------- DEMO PAGE ---------

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

// --------- PRICING PAGE ---------

export const pricingCopy: Record<Lang, PricingCopyBlock> = {
  en: {
    title: "Simple, transparent pricing",
    subtitle:
      "Choose the plan that matches your call volume and growth stage. All plans include 24/7 AI receptionists.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$399/mo",
        badge: "Solo & small clinics",
        description:
          "Perfect for solo practices and small teams that want to stop missing calls.",
        features: [
          "1 AI Receptionist",
          "1 phone number / inbox",
          "24/7 call handling",
          "Basic call routing",
          "Voicemail to email",
        ],
      },
      {
        id: "pro",
        name: "Professional",
        price: "$899/mo",
        badge: "SMEs & law firms",
        description:
          "For growing businesses that need multi-location routing and CRM integration.",
        features: [
          "Up to 3 AI agents",
          "Multiple numbers / inboxes",
          "Multilingual support",
          "Advanced call routing & transfers",
          "CRM / calendar integration",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "$1,799/mo",
        badge: "Large orgs & chains",
        description:
          "For high-volume operations that need custom workflows and SLAs.",
        features: [
          "Unlimited AI agents & inboxes",
          "Custom workflows & scripting",
          "SSO & security controls",
          "Dedicated CSM & onboarding",
          "Priority support & SLA",
        ],
      },
    ],
  },
  es: {
    title: "Precios simples y transparentes",
    subtitle:
      "Elige el plan que mejor se adapte a tu volumen de llamadas y etapa de crecimiento. Todos los planes incluyen recepcionistas de IA 24/7.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "US$399/mes",
        badge: "Consultorios pequeños",
        description:
          "Ideal para profesionales y equipos pequeños que no quieren perder más llamadas.",
        features: [
          "1 recepcionista de IA",
          "1 número / buzón",
          "Atención 24/7",
          "Enrutamiento básico de llamadas",
          "Mensajes de voz al email",
        ],
      },
      {
        id: "pro",
        name: "Professional",
        price: "US$899/mes",
        badge: "Pymes y firmas legales",
        description:
          "Para negocios en crecimiento con varias sedes y necesidad de integraciones.",
        features: [
          "Hasta 3 agentes de IA",
          "Múltiples números / buzones",
          "Soporte multilingüe",
          "Enrutamiento avanzado y transferencias",
          "Integración con CRM / calendario",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "US$1,799/mes",
        badge: "Cadenas y grandes empresas",
        description:
          "Para operaciones de alto volumen que requieren flujos a medida y SLA.",
        features: [
          "Agentes y buzones ilimitados",
          "Flujos y guiones personalizados",
          "SSO y controles de seguridad",
          "CSM dedicado y onboarding",
          "Soporte prioritario con SLA",
        ],
      },
    ],
  },
};
