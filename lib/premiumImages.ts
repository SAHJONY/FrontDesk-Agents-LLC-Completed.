// lib/premiumImages.ts

export type PremiumImageCategory =
  | "home"
  | "pricing"
  | "industries"
  | "demo"
  | "ai-agents"
  | "dashboard"
  | "owner"
  | "setup"
  | "auth"
  | "support"
  | "legal";

export type PremiumImage = {
  id: string;
  src: string;
  alt: string;
  category: PremiumImageCategory;
  description?: string;
  priority?: boolean;
};

export const premiumImages: PremiumImage[] = [
  {
    id: "home-hero-4k",
    src: "/images/home/home-hero-4k.png",
    alt: "AI reception team handling calls and chats on a unified interface",
    category: "home",
    description:
      "Primary hero image for the homepage, showing multi-channel AI reception.",
    priority: true
  },
  {
    id: "industries-hero-4k",
    src: "/images/industries/industries-hero-4k.png",
    alt: "Professionals from multiple industries connected to an AI receptionist",
    category: "industries",
    description:
      "Used on the industries page to showcase cross-vertical applicability."
  },
  {
    id: "pricing-hero-4k",
    src: "/images/pricing/pricing-hero-4k.png",
    alt: "Pricing plans overview for AI receptionist platform",
    category: "pricing",
    description:
      "Hero visual for pricing tables and plan comparison sections."
  },
  {
    id: "demo-hero-4k",
    src: "/images/demo/demo-hero-4k.png",
    alt: "Live demo session of AI receptionist showing on-screen workflow",
    category: "demo",
    description:
      "Hero for the demo booking page and Calendly-driven flows."
  },
  {
    id: "ai-agents-hero-4k",
    src: "/images/ai-agents/ai-agents-hero-4k.png",
    alt: "Multiple AI agents collaborating in a command center interface",
    category: "ai-agents",
    description:
      "Main image for the AI Agents Command Center page."
  },
  {
    id: "client-dashboard-4k",
    src: "/images/dashboards/client-dashboard-4k.png",
    alt: "Client dashboard metrics view for calls and appointments",
    category: "dashboard",
    description:
      "Used anywhere you need to showcase client-facing analytics.",
    priority: true
  },
  {
    id: "owner-console-4k",
    src: "/images/dashboards/owner-console-4k.png",
    alt: "Owner console with high-level KPIs and controls",
    category: "owner",
    description:
      "Ideal for the owner console and any marketing around 'God Mode' access."
  },
  {
    id: "outbound-dashboard-4k",
    src: "/images/dashboards/outbound-dashboard-4k.png",
    alt: "Outbound call performance dashboard",
    category: "dashboard",
    description:
      "Visual for outbound campaigns, follow-up and reactivation sequences."
  },
  {
    id: "retention-dashboard-4k",
    src: "/images/dashboards/retention-dashboard-4k.png",
    alt: "Retention analytics dashboard",
    category: "dashboard",
    description:
      "Shows long term retention and rebooking metrics for existing clients."
  },
  {
    id: "setup-hero-4k",
    src: "/images/setup/setup-hero-4k.png",
    alt: "Onboarding wizard showing simple configuration steps",
    category: "setup",
    description:
      "Main image for the setup and onboarding flows."
  },
  {
    id: "login-hero-4k",
    src: "/images/auth/login-hero-4k.png",
    alt: "Secure login interface with modern design",
    category: "auth",
    description:
      "Used on login and authentication-related screens."
  },
  {
    id: "support-hero-4k",
    src: "/images/support/support-hero-4k.png",
    alt: "Customer support team with multi-channel support tools",
    category: "support",
    description:
      "Visual foundation for support, help center and onboarding help pages."
  },
  {
    id: "legal-hero-4k",
    src: "/images/legal/legal-hero-4k.png",
    alt: "Legal document and compliance-focused illustration",
    category: "legal",
    description:
      "Used on terms of service, privacy and compliance-related sections."
  }
];

export function getPremiumImageById(id: string): PremiumImage | undefined {
  return premiumImages.find((img) => img.id === id);
}

export function getPremiumImagesByCategory(
  category: PremiumImageCategory
): PremiumImage[] {
  return premiumImages.filter((img) => img.category === category);
}
