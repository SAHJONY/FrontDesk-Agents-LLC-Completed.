// lib/siteImages.ts
export type PageHeroKey = "home" | "pricing" | "dashboard" | "admin" | "demo" | "ai-agents";

export interface PageHero {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Map de imágenes hero por página.
 * Asegúrate de que los archivos existen en /public/images/premium/
 */
const pageHeroes: Record<PageHeroKey, PageHero> = {
  home: { src: "/images/premium/hero.jpg", alt: "Home hero", width: 2400, height: 1400, priority: true },
  pricing: { src: "/images/premium/pricing.jpg", alt: "Pricing hero", width: 1600, height: 900 },
  dashboard: { src: "/images/premium/dashboard.jpg", alt: "Dashboard hero", width: 1600, height: 900 },
  admin: { src: "/images/premium/admin.jpg", alt: "Admin hero", width: 1600, height: 900 },
  demo: { src: "/images/premium/demo.jpg", alt: "Demo hero", width: 1600, height: 900 },
  "ai-agents": { src: "/images/premium/feature1.jpg", alt: "AI Agents", width: 1600, height: 900 },
};

export function getPageHero(key: PageHeroKey): PageHero {
  return pageHeroes[key];
}

/** Exporta todo por compatibilidad */
export default {
  getPageHero,
};
