// lib/siteImages.ts
// Centralized mapping between pages and their hero images.

export type HeroKey =
  | "home"
  | "industries"
  | "pricing"
  | "demo"
  | "ai-agents"
  | "dashboard"
  | "owner"
  | "setup"
  | "login"
  | "support"
  | "legal";

export type HeroConfig = {
  key: HeroKey;
  src: string;
  alt: string;
  /** Optional short title/label to display above/below the hero */
  label?: string;
  /** Optional longer description for copy on the page */
  description?: string;
};

export const HERO_IMAGES: Record<HeroKey, HeroConfig> = {
  home: {
    key: "home",
    src: "/images/home/home-hero-4k.png",
    alt: "AI reception command center dashboard with global call analytics"
  },
  industries: {
    key: "industries",
    src: "/images/industries/industries-hero-4k.png",
    alt: "AI receptionists serving multiple industries in a modern operations center"
  },
  pricing: {
    key: "pricing",
    src: "/images/pricing/pricing-hero-4k.png",
    alt: "Pricing dashboard showing subscription tiers for AI receptionist services"
  },
  demo: {
    key: "demo",
    src: "/images/demo/demo-hero-4k.png",
    alt: "Live call demo interface with AI voice agent controls"
  },
  "ai-agents": {
    key: "ai-agents",
    src: "/images/ai-agents/ai-agents-hero-4k.png",
    alt: "Team of AI agents collaborating on inbound and outbound call flows"
  },
  dashboard: {
    key: "dashboard",
    src: "/images/dashboards/client-dashboard-4k.png",
    alt: "Client dashboard with real-time call metrics and conversion tracking"
  },
  owner: {
    key: "owner",
    src: "/images/dashboards/owner-console-4k.png",
    alt: "Owner console view with multi-tenant metrics and financial controls"
  },
  setup: {
    key: "setup",
    src: "/images/setup/setup-hero-4k.png",
    alt: "Guided setup wizard to configure phone numbers, agents, and workflows"
  },
  login: {
    key: "login",
    src: "/images/auth/login-hero-4k.png",
    alt: "Secure login screen for FrontDesk Agents platform"
  },
  support: {
    key: "support",
    src: "/images/support/support-hero-4k.png",
    alt: "Support team and knowledge base for AI receptionist platform"
  },
  legal: {
    key: "legal",
    src: "/images/legal/legal-hero-4k.png",
    alt: "Compliance and legal documentation for AI reception services"
  }
};

export function getPageHero(key: HeroKey): HeroConfig {
  return HERO_IMAGES[key];
}
