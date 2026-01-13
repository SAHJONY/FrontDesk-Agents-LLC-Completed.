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
  | "bg";

export interface PremiumImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Lista de imágenes premium que el frontend espera.
 * Asegúrate de que los archivos existen en /public/images/premium/
 * y que los nombres coinciden exactamente (case-sensitive).
 */
export const premiumImages: Record<PremiumImageKey, PremiumImageConfig> = {
  "home-hero": { src: "/images/premium/home-hero.jpg", alt: "AI Receptionist Hero", width: 2400, height: 1400, priority: true },
  "industries-hero": { src: "/images/premium/industries-hero.jpg", alt: "Industries Hero", width: 1600, height: 900 },
  "pricing-hero": { src: "/images/premium/pricing-hero.jpg", alt: "Pricing Hero", width: 1600, height: 900 },
  "demo-hero": { src: "/images/premium/demo-hero.jpg", alt: "Demo Hero", width: 1600, height: 900 },
  "ai-agents-hero": { src: "/images/premium/ai-agents-hero.jpg", alt: "AI Agents Hero", width: 1600, height: 900 },
  "client-dashboard": { src: "/images/premium/client-dashboard.jpg", alt: "Client Dashboard Screenshot", width: 1600, height: 900 },
  "owner-console": { src: "/images/premium/owner-console.jpg", alt: "Owner Console Screenshot", width: 1600, height: 900 },
  "setup-hero": { src: "/images/premium/setup-hero.jpg", alt: "Setup Hero", width: 1600, height: 900 },
  "login-hero": { src: "/images/premium/login-hero.jpg", alt: "Login Hero", width: 1600, height: 900 },
  "support-hero": { src: "/images/premium/support-hero.jpg", alt: "Support Hero", width: 1600, height: 900 },
  "legal-hero": { src: "/images/premium/legal-hero.jpg", alt: "Legal Hero", width: 1600, height: 900 },
  "bg": { src: "/images/premium/bg.jpg", alt: "Background texture", width: 2400, height: 1400 },
};

export function getPremiumImage(key: PremiumImageKey): PremiumImageConfig {
  return premiumImages[key];
}

// Export the map for direct access if needed
export default premiumImages;
