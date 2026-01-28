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
    src: "/assets/ai-call-center.jpeg",
    alt: "AI reception team handling calls and messages on a unified dashboard",
    title: "24/7 AI Front Desk For Your Business",
    description: "FrontDesk Agents answers every call, books more appointments, and never misses a lead."
  },

  pricing: {
    id: "pricing-hero",
    src: "/assets/call-center-automation.webp",
    alt: "Pricing and plans dashboard for AI receptionist platform",
    title: "Simple, Transparent Pricing",
    description: "Choose a plan that matches your growth—no hidden fees, no long-term contracts."
  },

  "ai-agents": {
    id: "ai-agents-hero",
    src: "/assets/ai-agent-interface.jpg",
    alt: "Multiple AI agents collaborating in a command center interface",
    title: "Your AI Agents Command Center",
    description: "Specialized AI agents for intake, follow-up, and retention—fully orchestrated."
  },

  dashboard: {
    id: "dashboard-hero",
    src: "/assets/customer-dashboard.png",
    alt: "Client dashboard view with live metrics for calls and bookings",
    title: "Real-Time Client Dashboard",
    description: "Monitor call volume, bookings, and performance from a single pane of glass."
  },

  owner: {
    id: "owner-console-hero",
    src: "/assets/ai-team-office.png",
    alt: "Owner control console with high level metrics and configuration",
    title: "Owner Command Console",
    description: "Full control over accounts, billing, and agents in one secure console."
  },

  login: {
    id: "login-hero",
    src: "/assets/ai-team-office.png", // Reusing office asset for professional login feel
    alt: "Secure login screen for FrontDesk Agents platform",
    title: "Welcome Back To FrontDesk Agents",
    description: "Secure access to your AI receptionist, analytics, and configuration."
  }
};

/**
 * Get the hero image configuration for a given page.
 * Example usage: const hero = getPageHero("login");
 */
export function getPageHero(pageId: string): HeroConfig | undefined {
  return heroImages[pageId];
}

/**
 * Returns all hero configs for galleries or sitemaps.
 */
export function getAllPageHeroes(): HeroConfig[] {
  return Object.values(heroImages);
}
