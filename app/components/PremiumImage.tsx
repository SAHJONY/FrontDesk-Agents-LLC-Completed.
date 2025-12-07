// lib/premiumImages.ts
// Mapa centralizado de imágenes premium para todo el sitio.
// IMPORTANTE: las rutas src asumen archivos dentro de /public/images/premium.

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

export const premiumImages: Record<PremiumImageKey, PremiumImageConfig> = {
  "home-hero": {
    src: "/images/home-hero-4k.jpg",
    alt: "FrontDesk Agents AI receptionist and live dashboard",
  },
  "industries-hero": {
    src: "/images/industries-hero-4k.jpg",
    alt: "Professionals in different industries using FrontDesk Agents",
  },
  "pricing-hero": {
    src: "/images/pricing-hero-4k.jpg",
    alt: "Pricing tiers for FrontDesk Agents AI receptionists",
  },
  "demo-hero": {
    src: "/images/demo-hero-4k.jpg",
    alt: "Live AI reception demo call in progress",
  },
  "ai-agents-hero": {
    src: "/images/ai-agents-hero-4k.jpg",
    alt: "AI agents console for FrontDesk Agents",
  },
  "client-dashboard": {
    src: "/images/client-dashboard-4k.jpg",
    alt: "Client analytics dashboard",
  },
  "owner-console": {
    src: "/images/premium/owner-console.jpg",
    alt: "Business owner control console",
  },
  "setup-hero": {
    src: "/images/premium/setup-hero.jpg",
    alt: "Fast setup of AI receptionist",
  },
  "login-hero": {
    src: "/images/premium/login-hero.jpg",
    alt: "Secure login to FrontDesk Agents",
  },
  "support-hero": {
    src: "/images/premium/support-hero.jpg",
    alt: "Support team helping customers",
  },
  "legal-hero": {
    src: "/images/premium/legal-hero.jpg",
    alt: "Law firm using FrontDesk Agents",
  },
  "outbound-dashboard": {
    src: "/images/premium/outbound-dashboard.jpg",
    alt: "Outbound calls performance dashboard",
  },
  "retention-dashboard": {
    src: "/images/premium/retention-dashboard.jpg",
    alt: "Client retention metrics dashboard",
  },
};

export function getPremiumImage(key: PremiumImageKey): PremiumImageConfig {
  return premiumImages
