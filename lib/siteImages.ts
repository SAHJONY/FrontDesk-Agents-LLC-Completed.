// lib/siteImages.ts

export type PageKey =
  | "home"
  | "industries"
  | "pricing"
  | "demo"
  | "ai-agents"
  | "dashboard"
  | "admin"
  | "setup"
  | "login"
  | "support"
  | "legal"
  | "outbound"
  | "retention";

export interface SiteImage {
  src: string;
  alt: string;
}

const siteImages: Record<PageKey, SiteImage> = {
  home: {
    src: "/images/home/home-hero-4k.jpg",
    alt: "AI phone receptionist dashboard assisting multiple businesses in real time"
  },
  industries: {
    src: "/images/industries/industries-hero-4k.jpg",
    alt: "Collage of different professional industries using AI receptionists"
  },
  pricing: {
    src: "/images/pricing/pricing-hero-4k.jpg",
    alt: "Financial analytics dashboard showing pricing plans and ROI metrics"
  },
  demo: {
    src: "/images/demo/demo-hero-4k.jpg",
    alt: "Business owner on a demo call reviewing the AI receptionist platform"
  },
  "ai-agents": {
    src: "/images/ai-agents/ai-agents-hero-4k.jpg",
    alt: "Abstract AI agents and neural network visuals representing automation"
  },
  dashboard: {
    src: "/images/dashboard/client-dashboard-4k.jpg",
    alt: "Client dashboard showing live calls, messages, and AI receptionist metrics"
  },
  admin: {
    src: "/images/admin/owner-console-4k.jpg",
    alt: "Owner admin console with advanced controls and global settings"
  },
  setup: {
    src: "/images/setup/setup-hero-4k.jpg",
    alt: "Onboarding and setup wizard for configuring AI receptionists"
  },
  login: {
    src: "/images/login/login-hero-4k.jpg",
    alt: "Secure login screen for FrontDesk Agents clients"
  },
  support: {
    src: "/images/support/support-hero-4k.jpg",
    alt: "Customer support team assisted by AI tools"
  },
  legal: {
    src: "/images/legal/legal-hero-4k.jpg",
    alt: "Legal office with documents, contract review and compliance"
  },
  outbound: {
    src: "/images/outbound/outbound-dashboard-4k.jpg",
    alt: "Outbound calls performance dashboard with AI call campaigns"
  },
  retention: {
    src: "/images/retention/retention-dashboard-4k.jpg",
    alt: "Customer retention analytics and churn prevention dashboard"
  }
};

export function getPageHero(page: PageKey | string): SiteImage {
  if ((siteImages as Record<string, SiteImage>)[page]) {
    return (siteImages as Record<string, SiteImage>)[page];
  }

  // Fallback: usa la imagen de home si la clave no existe
  return siteImages.home;
}
