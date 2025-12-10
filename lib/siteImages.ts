// lib/siteImages.ts
export type PageName =
  | 'home'
  | 'admin'
  | 'dashboard'
  | 'pricing'
  | 'industries'
  | string; // fallback

export interface HeroImage {
  // aseguremos que los campos usados por los componentes son siempre strings cuando se devuelven
  srcAvif: string;
  srcWebp: string;
  srcJpg: string; // img src principal para <img> / Image
  src: string;    // alias para compatibilidad con componentes Next/Image
  alt: string;
  width: number;
  height: number;
}

export type PremiumImageKey =
  | 'heroCinematic'
  | 'commandCenterDark'
  | 'commandCenterLight'
  | 'industriesConstruction'
  | 'industriesHealthcare'
  | 'industriesLaw'
  | 'industriesLogistics'
  | 'industriesMedical'
  | 'aiAgentGrid'
  | 'teamComposite'
  | 'marketingBanner'
  | string;

export interface PremiumImage {
  srcAvif: string;
  srcWebp: string;
  srcJpg: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Canonical registries. Si renombraste archivos en public/, actualiza las rutas aquí.
 */
const HERO_REGISTRY: Record<PageName, HeroImage> = {
  home: {
    srcAvif: '/images/premium/hero-cinematic.avif',
    srcWebp: '/images/premium/hero-cinematic.webp',
    srcJpg: '/images/premium/hero-cinematic.jpg',
    src: '/images/premium/hero-cinematic.jpg',
    alt: 'FrontDesk Agents — Hero cinematic',
    width: 1600,
    height: 900,
  },
  admin: {
    srcAvif: '/images/premium/command-center-dark.avif',
    srcWebp: '/images/premium/command-center-dark.webp',
    srcJpg: '/images/premium/command-center-dark.jpg',
    src: '/images/premium/command-center-dark.jpg',
    alt: 'Command center (dark)',
    width: 1600,
    height: 900,
  },
  dashboard: {
    srcAvif: '/images/premium/command-center-light.avif',
    srcWebp: '/images/premium/command-center-light.webp',
    srcJpg: '/images/premium/command-center-light.jpg',
    src: '/images/premium/command-center-light.jpg',
    alt: 'Command center (light)',
    width: 1600,
    height: 900,
  },
  pricing: {
    srcAvif: '/images/premium/banners/marketing-banner.avif',
    srcWebp: '/images/premium/banners/marketing-banner.webp',
    srcJpg: '/images/premium/banners/marketing-banner.jpg',
    src: '/images/premium/banners/marketing-banner.jpg',
    alt: 'Pricing — marketing banner',
    width: 1600,
    height: 420,
  },
  industries: {
    srcAvif: '/images/premium/industries/construction.avif',
    srcWebp: '/images/premium/industries/construction.webp',
    srcJpg: '/images/premium/industries/construction.jpg',
    src: '/images/premium/industries/construction.jpg',
    alt: 'Industries hero',
    width: 1600,
    height: 900,
  },
};

const PREMIUM_REGISTRY: Record<PremiumImageKey, PremiumImage> = {
  heroCinematic: {
    srcAvif: '/images/premium/hero-cinematic.avif',
    srcWebp: '/images/premium/hero-cinematic.webp',
    srcJpg: '/images/premium/hero-cinematic.jpg',
    src: '/images/premium/hero-cinematic.jpg',
    alt: 'Hero cinematic — FrontDesk Agents',
    width: 1600,
    height: 900,
  },
  commandCenterDark: {
    srcAvif: '/images/premium/command-center-dark.avif',
    srcWebp: '/images/premium/command-center-dark.webp',
    srcJpg: '/images/premium/command-center-dark.jpg',
    src: '/images/premium/command-center-dark.jpg',
    alt: 'Command center dark',
    width: 1600,
    height: 900,
  },
  commandCenterLight: {
    srcAvif: '/images/premium/command-center-light.avif',
    srcWebp: '/images/premium/command-center-light.webp',
    srcJpg: '/images/premium/command-center-light.jpg',
    src: '/images/premium/command-center-light.jpg',
    alt: 'Command center light',
    width: 1600,
    height: 900,
  },
  industriesConstruction: {
    srcAvif: '/images/premium/industries/construction.avif',
    srcWebp: '/images/premium/industries/construction.webp',
    srcJpg: '/images/premium/industries/construction.jpg',
    src: '/images/premium/industries/construction.jpg',
    alt: 'Construction industry',
    width: 1600,
    height: 900,
  },
  industriesHealthcare: {
    srcAvif: '/images/premium/industries/healthcare.avif',
    srcWebp: '/images/premium/industries/healthcare.webp',
    srcJpg: '/images/premium/industries/healthcare.jpg',
    src: '/images/premium/industries/healthcare.jpg',
    alt: 'Healthcare industry',
    width: 1600,
    height: 900,
  },
  industriesLaw: {
    srcAvif: '/images/premium/industries/law.avif',
    srcWebp: '/images/premium/industries/law.webp',
    srcJpg: '/images/premium/industries/law.jpg',
    src: '/images/premium/industries/law.jpg',
    alt: 'Law industry',
    width: 1600,
    height: 900,
  },
  industriesLogistics: {
    srcAvif: '/images/premium/industries/logistics.avif',
    srcWebp: '/images/premium/industries/logistics.webp',
    srcJpg: '/images/premium/industries/logistics.jpg',
    src: '/images/premium/industries/logistics.jpg',
    alt: 'Logistics industry',
    width: 1600,
    height: 900,
  },
  industriesMedical: {
    srcAvif: '/images/premium/industries/medical.avif',
    srcWebp: '/images/premium/industries/medical.webp',
    srcJpg: '/images/premium/industries/medical.jpg',
    src: '/images/premium/industries/medical.jpg',
    alt: 'Medical industry',
    width: 1600,
    height: 900,
  },
  aiAgentGrid: {
    srcAvif: '/images/premium/team/agents-grid.avif',
    srcWebp: '/images/premium/team/agents-grid.webp',
    srcJpg: '/images/premium/team/agents-grid.jpg',
    src: '/images/premium/team/agents-grid.jpg',
    alt: 'AI agents grid',
    width: 1600,
    height: 900,
  },
  teamComposite: {
    srcAvif: '/images/premium/team/agents-grid.avif',
    srcWebp: '/images/premium/team/agents-grid.webp',
    srcJpg: '/images/premium/team/agents-grid.jpg',
    src: '/images/premium/team/agents-grid.jpg',
    alt: 'Team composite',
    width: 1600,
    height: 900,
  },
  marketingBanner: {
    srcAvif: '/images/premium/banners/marketing-banner.avif',
    srcWebp: '/images/premium/banners/marketing-banner.webp',
    srcJpg: '/images/premium/banners/marketing-banner.jpg',
    src: '/images/premium/banners/marketing-banner.jpg',
    alt: 'Marketing banner',
    width: 1600,
    height: 420,
  },
};

export function getPageHero(pageName: PageName): HeroImage {
  // devuelve un objeto con todos los campos no-undefined
  return (
    HERO_REGISTRY[pageName] ?? {
      srcAvif: '/images/premium/hero-cinematic.avif',
      srcWebp: '/images/premium/hero-cinematic.webp',
      srcJpg: '/images/premium/hero-cinematic.jpg',
      src: '/images/premium/hero-cinematic.jpg',
      alt: `${pageName} hero`,
      width: 1600,
      height: 900,
    }
  );
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  return (
    PREMIUM_REGISTRY[key] ?? {
      srcAvif: '/images/premium/hero-cinematic.avif',
      srcWebp: '/images/premium/hero-cinematic.webp',
      srcJpg: '/images/premium/hero-cinematic.jpg',
      src: '/images/premium/hero-cinematic.jpg',
      alt: `${key} premium image`,
      width: 1600,
      height: 900,
    }
  );
}
