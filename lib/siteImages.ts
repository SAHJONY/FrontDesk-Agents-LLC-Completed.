// lib/siteImages.ts

export type PageKey =
  | "home"
  | "pricing"
  | "industries"
  | "demo"
  | "setup"
  | "dashboard"
  | "dashboard-outbound"
  | "dashboard-retention"
  | "admin"
  | "ai-agents";

type HeroConfig = {
  src: string;
  alt: string;
};

const HERO_IMAGES: Record<PageKey, HeroConfig> = {
  home: {
    src: "/images/premium/home-hero.jpg",
    alt: "Futuristic AI brain hero image for FrontDesk Command Center"
  },
  pricing: {
    src: "/images/premium/pricing-hero.jpg",
    alt: "Pricing plans dashboard for AI receptionist platform"
  },
  industries: {
    src: "/images/premium/industries-hero.jpg",
    alt: "Professionals from healthcare, law and agencies using AI receptionist"
  },
  demo: {
    src: "/images/premium/demo-hero.jpg",
    alt: "Live demo of FrontDesk Command Center on laptop screen"
  },
  setup: {
    src: "/images/premium/setup-hero.jpg",
    alt: "Onboarding workflow for AI receptionist configuration"
  },
  dashboard: {
    src: "/images/premium/dashboard-executive.jpg",
    alt: "Executive dashboard with real-time call and revenue metrics"
  },
  "dashboard-outbound": {
    src: "/images/premium/dashboard-outbound.jpg",
    alt: "Outbound campaigns and follow-up calls dashboard"
  },
  "dashboard-retention": {
    src: "/images/premium/dashboard-retention.jpg",
    alt: "Retention and rebooking metrics dashboard"
  },
  admin: {
    src: "/images/premium/admin-control.jpg",
    alt: "Admin control center for tenants, numbers, and agents"
  },
  "ai-agents": {
    src: "/images/premium/ai-agents-hero.jpg",
    alt: "Multi-agent AI receptionists working together"
  }
};

export function getPageHero(key: PageKey): HeroConfig {
  return HERO_IMAGES[key];
}
