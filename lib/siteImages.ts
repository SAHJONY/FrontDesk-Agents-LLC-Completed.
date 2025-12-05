// lib/siteImages.ts

export type PageKey =
  | "home"
  | "pricing"
  | "demo"
  | "industries"
  | "setup"
  | "dashboard"
  | "admin"
  | "ai-agents"
  | "outbound"
  | "retention";

export const siteHeroes: Record<PageKey, { src: string; alt: string }> = {
  home: {
    src: "/images/premium/home-hero.jpg",
    alt: "FrontDesk Agents AI receptionist and command center dashboard",
  },
  pricing: {
    src: "/images/premium/pricing-hero.jpg",
    alt: "Pricing tiers for FrontDesk Agents AI receptionist",
  },
  demo: {
    src: "/images/premium/demo-hero.jpg",
    alt: "Live demo call with AI receptionist Sara",
  },
  industries: {
    src: "/images/premium/industries-hero.jpg",
    alt: "Different industries served by FrontDesk Agents",
  },
  setup: {
    src: "/images/premium/setup-hero.jpg",
    alt: "Onboarding flow and configuration for AI receptionist",
  },
  dashboard: {
    src: "/images/premium/dashboard-hero.jpg",
    alt: "Command center dashboard analytics",
  },
  admin: {
    src: "/images/premium/admin-hero.jpg",
    alt: "Admin controls for FrontDesk Agents platform",
  },
  "ai-agents": {
    src: "/images/premium/ai-agents-hero.jpg",
    alt: "AI agents Alex and Sara working together",
  },
  outbound: {
    src: "/images/premium/outbound-hero.jpg",
    alt: "Outbound call campaigns managed by AI",
  },
  retention: {
    src: "/images/premium/retention-hero.jpg",
    alt: "Client retention and follow-up automations",
  },
};

/**
 * Devuelve la imagen hero para una página.
 * Si la clave no existe, usa el hero de "home" como fallback.
 */
export function getPageHero(page: PageKey | string) {
  const key = (page as PageKey) || "home";
  return siteHeroes[key] ?? siteHeroes.home;
}
