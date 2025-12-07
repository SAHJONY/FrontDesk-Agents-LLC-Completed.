// lib/siteImages.ts
// Asigna cada página de marketing a una imagen premium.

import type { PremiumImageConfig } from "./premiumImages";
import { getPremiumImage } from "./premiumImages";

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

export const siteHeroes: Record<PageKey, PremiumImageConfig> = {
  home: getPremiumImage("home-hero"),
  pricing: getPremiumImage("pricing-hero"),
  demo: getPremiumImage("demo-hero"),
  industries: getPremiumImage("industries-hero"),
  setup: getPremiumImage("setup-hero"),
  dashboard: getPremiumImage("client-dashboard"),
  admin: getPremiumImage("owner-console"),
  "ai-agents": getPremiumImage("ai-agents-hero"),
  outbound: getPremiumImage("outbound-dashboard"),
  retention: getPremiumImage("retention-dashboard"),
}
