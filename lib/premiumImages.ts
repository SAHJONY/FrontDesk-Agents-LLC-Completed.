// lib/premiumImages.ts
// Optional: centralized list of premium visual assets for marketing sections, cards, etc.

export type PremiumImageKey =
  | "client-dashboard"
  | "owner-console"
  | "outbound-dashboard"
  | "retention-dashboard"
  | "home-hero"
  | "industries-hero"
  | "pricing-hero"
  | "demo-hero"
  | "ai-agents-hero"
  | "setup-hero"
  | "login-hero"
  | "support-hero"
  | "legal-hero";

export type PremiumImageConfig = {
  key: PremiumImageKey;
  src: string;
  alt: string;
  /** Optional tag for grouping (e.g. "dashboard", "hero") */
  category?: "hero" | "dashboard" | "marketing";
  /** Optional human label for UI tools or CMS editors */
  label?: string;
};

export const PREMIUM_IMAGES: Record<PremiumImageKey, PremiumImageConfig> = {
  "client-dashboard": {
    key: "client-dashboard",
    src: "/images/dashboards/client-dashboard-4k.png",
    alt: "FrontDesk client dashboard with live AI receptionist metrics",
    category: "dashboard",
    label: "Client Dashboard"
  },
  "owner-console": {
    key: "owner-console",
    src: "/images/dashboards/owner-console-4k.png",
    alt: "Owner console analytics and AI command center",
    category: "dashboard",
    label: "Owner Console"
  },
  "outbound-dashboard": {
    key: "outbound-dashboard",
    src: "/images/dashboards/outbound-dashboard-4k.png",
    alt: "Outbound call campaigns managed by AI agents",
    category: "dashboard",
    label: "Outbound Dashboard"
  },
  "retention-dashboard": {
    key: "retention-dashboard",
    src: "/images/dashboards/retention-dashboard-4k.png",
    alt: "Retention and reactivation analytics dashboard",
    category: "dashboard",
    label: "Retention Dashboard"
  },
  "home-hero": {
    key: "home-hero",
    src: "/images/home/home-hero-4k.png",
    alt: "Hero visual of AI receptionist operations floor",
    category: "hero",
    label: "Home Hero"
  },
  "industries-hero": {
    key: "industries-hero",
    src: "/images/industries/industries-hero-4k.png",
    alt: "Multiple industries being served by AI receptionists",
    category: "hero",
    label: "Industries Hero"
  },
  "pricing-hero": {
    key: "pricing-hero",
    src: "/images/pricing/pricing-hero-4k.png",
    alt: "Pricing tiers visual for AI receptionist platform",
    category: "hero",
    label: "Pricing Hero"
  },
  "demo-hero": {
    key: "demo-hero",
    src: "/images/demo/demo-hero-4k.png",
    alt: "Live call demo interface screenshot",
    category: "hero",
    label: "Demo Hero"
  },
  "ai-agents-hero": {
    key: "ai-agents-hero",
    src: "/images/ai-agents/ai-agents-hero-4k.png",
    alt: "AI agents collaborating on calls and messages",
    category: "hero",
    label: "AI Agents Hero"
  },
  "setup-hero": {
    key: "setup-hero",
    src: "/images/setup/setup-hero-4k.png",
    alt: "Setup wizard configuration screens",
    category: "hero",
    label: "Setup Hero"
  },
  "login-hero": {
    key: "login-hero",
    src: "/images/auth/login-hero-4k.png",
    alt: "Secure login screen visual",
    category: "hero",
    label: "Login Hero"
  },
  "support-hero": {
    key: "support-hero",
    src: "/images/support/support-hero-4k.png",
    alt: "Support and help center interface",
    category: "hero",
    label: "Support Hero"
  },
  "legal-hero": {
    key: "legal-hero",
    src: "/images/legal/legal-hero-4k.png",
    alt: "Legal and compliance documents and dashboard",
    category: "hero",
    label: "Legal Hero"
  }
};

export function getPremiumImage(key: PremiumImageKey): PremiumImageConfig {
  return PREMIUM_IMAGES[key];
}

export function listPremiumByCategory(
  category: PremiumImageConfig["category"]
): PremiumImageConfig[] {
  return Object.values(PREMIUM_IMAGES).filter((img) => img.category === category);
}
