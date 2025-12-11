// lib/siteImages.ts

export interface HeroImage {
  srcAvif?: string;
  srcWebp?: string;
  srcJpg: string;
  alt: string;
  width: number;
  height: number;
}

export type PremiumImageKey =
  | "hero-cinematic"
  | "command-center-dark"
  | "command-center-light"
  | "industries-construction"
  | "industries-healthcare"
  | "industries-law"
  | "industries-logistics"
  | "industries-medical"
  | "ai-agent-grid"
  | "team-composite"
  | "banner-1"
  | "banner-2";

export interface PremiumImage {
  src: string;
  alt: string;
}

// Helper: build standard paths
function imagePath(name: string, ext = "jpg") {
  return `/images/${name}.${ext}`;
}

export function getPageHero(pageName: string): HeroImage {
  const slug = pageName.replace(/\s+/g, "-").toLowerCase();
  return {
    srcAvif: `/images/${slug}-hero.avif`,
    srcWebp: `/images/${slug}-hero.webp`,
    srcJpg: `/images/${slug}-hero.jpg`,
    alt: `${pageName} Hero Image`,
    width: 1600,
    height: 900
  };
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  const map: Record<PremiumImageKey, PremiumImage> = {
    "hero-cinematic": { src: imagePath("premium/hero-cinematic", "jpg"), alt: "Hero cinematic" },
    "command-center-dark": { src: imagePath("premium/command-center-dark", "jpg"), alt: "Command center dark" },
    "command-center-light": { src: imagePath("premium/command-center-light", "jpg"), alt: "Command center light" },
    "industries-construction": { src: imagePath("premium/industries/construction", "jpg"), alt: "Construction" },
    "industries-healthcare": { src: imagePath("premium/industries/healthcare", "jpg"), alt: "Healthcare" },
    "industries-law": { src: imagePath("premium/industries/law", "jpg"), alt: "Law" },
    "industries-logistics": { src: imagePath("premium/industries/logistics", "jpg"), alt: "Logistics" },
    "industries-medical": { src: imagePath("premium/industries/medical", "jpg"), alt: "Medical" },
    "ai-agent-grid": { src: imagePath("premium/team/agents-grid", "jpg"), alt: "AI agent grid" },
    "team-composite": { src: imagePath("premium/team/team-composite", "jpg"), alt: "Team composite" },
    "banner-1": { src: imagePath("premium/banners/marketing-banner", "jpg"), alt: "Marketing banner" },
    "banner-2": { src: imagePath("premium/banners/marketing-banner-2", "jpg"), alt: "Marketing banner 2" }
  };
  return map[key];
}
