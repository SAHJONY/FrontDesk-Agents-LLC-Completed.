// lib/premiumImages.ts
// Mapa centralizado de imágenes premium para FrontDesk Agents
// IMPORTANTE: las rutas src deben coincidir con los archivos en /public/images

export type PremiumImageKey =
  | "home-hero"
  | "industries-hero"
  | "pricing-hero"
  | "demo-hero"
  | "ai-agents-hero"
  | "client-dashboard"
  | "owner-console"
  | "setup-hero"
  | "login-hero"
  | "support-hero"
  | "legal-hero"
  | "outbound-dashboard"
  | "retention-dashboard";

export interface PremiumImageConfig {
  src: string;
  alt: string;
}

// ⚠️ Todas estas rutas asumen archivos en: public/images/xxx.jpg
export const PREMIUM_IMAGES: Record<PremiumImageKey, PremiumImageConfig> = {
  "home-hero": {
    src: "/images/home-hero-4k.jpg",
    alt: "FrontDesk Agents – AI receptionist answering calls and booking appointments",
  },
  "industries-hero": {
    src: "/images/industries-hero-4k.jpg",
    alt: "Different industries like healthcare, legal and real estate using FrontDesk Agents",
  },
  "pricing-hero": {
    src: "/images/pricing-hero-4k.jpg",
    alt: "Pricing plans for FrontDesk Agents AI receptionist platform",
  },
  "demo-hero": {
    src: "/images/demo-hero-4k.jpg",
    alt: "Live demo of FrontDesk Agents AI phone agent in action",
  },
  "ai-agents-hero": {
    src: "/images/ai-agents-hero-4k.jpg",
    alt: "Team of AI agents handling calls, SMS and WhatsApp for clients",
  },
  "client-dashboard": {
    src: "/images/client-dashboard-4k.jpg",
    alt: "Client dashboard showing calls, leads and booked appointments metrics",
  },
  "owner-console": {
    src: "/images/owner-console-4k.jpg",
    alt: "Owner command center with high-level MRR and usage metrics",
  },
  "setup-hero": {
    src: "/images/setup-hero-4k.jpg",
    alt: "Onboarding setup flow for a new FrontDesk Agents client",
  },
  "login-hero": {
    src: "/images/login-hero-4k.jpg",
    alt: "Login screen for FrontDesk Agents secure access",
  },
  "support-hero": {
    src: "/images/support-hero-4k.jpg",
    alt: "Support and success team helping clients with their AI receptionist",
  },
  "legal-hero": {
    src: "/images/legal-hero-4k.jpg",
    alt: "Legal and compliance professionals using FrontDesk Agents",
  },
  "outbound-dashboard": {
    src: "/images/outbound-dashboard-4k.jpg",
    alt: "Outbound reactivation campaign metrics dashboard",
  },
  "retention-dashboard": {
    src: "/images/retention-dashboard-4k.jpg",
    alt: "Retention and reactivation performance dashboard for calls and SMS",
  },
};
