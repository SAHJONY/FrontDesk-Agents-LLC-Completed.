// lib/siteImages.ts

export type HeroConfig = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

const heroImages: Record<string, HeroConfig> = {
  home: {
    id: "home-hero",
    src: "/images/home/home-hero-4k.png",
    alt: "AI reception team handling calls and messages on a unified dashboard",
    title: "24/7 AI Front Desk For Your Business",
    description:
      "FrontDesk Agents answers every call, books more appointments, and never misses a lead."
  },

  pricing: {
    id: "pricing-hero",
    src: "/images/pricing/pricing-hero-4k.png",
    alt: "Pricing and plans dashboard for AI receptionist platform",
    title: "Simple, Transparent Pricing",
    description:
      "Choose a plan that matches your growth—no hidden fees, no long-term contracts."
  },

  industries: {
    id: "industries-hero",
    src: "/images/industries/industries-hero-4k.png",
    alt: "Professionals from multiple industries using an AI receptionist system",
    title: "Built For 500+ Industries",
    description:
      "From clinics to law firms to real estate teams—FrontDesk Agents adapts to your workflows."
  },

  demo: {
    id: "demo-hero",
    src: "/images/demo/demo-hero-4k.png",
    alt: "Live product demo showing AI receptionist in action",
    title: "See FrontDesk Agents In Action",
    description:
      "Book a live demo and watch how AI turns missed calls into booked revenue."
  },

  "ai-agents": {
    id: "ai-agents-hero",
    src: "/images/ai-agents/ai-agents-hero-4k.png",
    alt: "Multiple AI agents collaborating in a command center interface",
    title: "Your AI Agents Command Center",
    description:
      "Specialized AI agents for intake, follow-up, retention, and collections—fully orchestrated."
  },

  dashboard: {
    id: "dashboard-hero",
    src: "/images/dashboards/client-dashboard-4k.png",
    alt: "Client dashboard view with live metrics for calls and bookings",
    title: "Real-Time Client Dashboard",
    description:
      "Monitor call volume, bookings, revenue and performance from a single pane of glass."
  },

  owner: {
    id: "owner-console-hero",
    src: "/images/dashboards/owner-console-4k.png",
    alt: "Owner control console with high level metrics and configuration",
    title: "Owner Command Console",
    description:
      "Full control over accounts, billing, numbers, agents and scripts in one secure console."
  },

  setup: {
    id: "setup-hero",
    src: "/images/setup/setup-hero-4k.png",
    alt: "Guided onboarding wizard for AI receptionist setup",
    title: "Fast, Guided Onboarding",
    description:
      "Connect your numbers, scripts and calendars in under 30 minutes with our guided setup."
  },

  login: {
    id: "login-hero",
    src: "/images/auth/login-hero-4k.png",
    alt: "Secure login screen for FrontDesk Agents platform",
    title: "Welcome Back To FrontDesk Agents",
    description:
      "Secure, owner-grade access to your AI receptionist, analytics and configuration."
  },

  support: {
    id: "support-hero",
    src: "/images/support/support-hero-4k.png",
    alt: "Customer support specialist assisting a client on multiple channels",
    title: "Enterprise-Grade Support",
    description:
      "We stand behind your AI front desk with onboarding, optimization and live support."
  },

  "legal-terms": {
    id: "legal-terms-hero",
    src: "/images/legal/legal-hero-4k.png",
    alt: "Legal documents and compliance illustration",
    title: "Terms & Conditions",
    description:
      "Clear terms built for modern AI-first communication platforms and compliant operations."
  },

  "legal-privacy": {
    id: "legal-privacy-hero",
    src: "/images/legal/legal-hero-4k.png",
    alt: "Privacy and security lock icon over digital data",
    title: "Privacy & Data Protection",
    description:
      "Your data, your clients and your recordings are handled with strict privacy and security controls."
  }
};

/**
 * Get the hero image configuration for a given page.
 * Example usage: const hero = getPageHero("home");
 */
export function getPageHero(pageId: string): HeroConfig | undefined {
  return heroImages[pageId];
}

/**
 * Optional: expose all hero configs if you want to render them in a gallery.
 */
export function getAllPageHeroes(): HeroConfig[] {
  return Object.values(heroImages);
}
