// lib/siteImages.ts
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
  | 'banner1'
  | 'banner2';

export interface HeroImage {
  src: string;            // fallback (jpg/png)
  srcWebp?: string;       // optional webp (srcset)
  srcAvif?: string;       // optional avif (srcset)
  alt: string;
  width: number;
  height: number;
}

export interface PremiumImage {
  src: string;
  srcWebp?: string;
  srcAvif?: string;
  alt: string;
  width?: number;
  height?: number;
}

/* Hero images mapping — ajustar rutas si mueves/renombras archivos */
const heroMap: Record<string, HeroImage> = {
  home: {
    src: '/public/premium/hero-cinematic.jpg', // si prefieres /images/hero-cinematic.jpg mueve/copialo luego
    srcWebp: '/public/premium/hero-cinematic.webp',
    srcAvif: '/public/premium/hero-cinematic.avif',
    alt: 'FrontDesk Agents — Hero Cinematic',
    width: 1600,
    height: 900,
  },
  admin: {
    src: '/client-dashboard-4k.jpg',
    srcWebp: '/client-dashboard-4k.webp',
    alt: 'Owner Dashboard — Command Center',
    width: 1600,
    height: 900,
  },
  demo: {
    src: '/home-hero-4k.jpg',
    srcWebp: '/home-hero-4k.webp',
    alt: 'Demo — Home Hero',
    width: 1600,
    height: 900,
  },
  industries: {
    src: '/industries-hero-4k.jpg',
    srcWebp: '/industries-hero-4k.webp',
    alt: 'Industries Hero',
    width: 1600,
    height: 900,
  },
};

/* Premium assets mapping */
const premiumMap: Record<PremiumImageKey, PremiumImage> = {
  heroCinematic: {
    src: '/public/premium/hero-cinematic.jpg',
    srcWebp: '/public/premium/hero-cinematic.webp',
    srcAvif: '/public/premium/hero-cinematic.avif',
    alt: 'Hero cinematic',
    width: 1600,
    height: 900,
  },
  commandCenterDark: {
    src: '/public/premium/command-center-dark.jpg',
    srcWebp: '/public/premium/command-center-dark.webp',
    srcAvif: '/public/premium/command-center-dark.avif',
    alt: 'Command center dark',
    width: 1600,
    height: 900,
  },
  commandCenterLight: {
    src: '/public/premium/command-center-light.jpg',
    srcWebp: '/public/premium/command-center-light.webp',
    srcAvif: '/public/premium/command-center-light.avif',
    alt: 'Command center light',
    width: 1600,
    height: 900,
  },
  industriesConstruction: {
    src: '/public/premium/industries/construction.jpg',
    alt: 'Construction',
  },
  industriesHealthcare: {
    src: '/public/premium/industries/healthcare.jpg',
    alt: 'Healthcare',
  },
  industriesLaw: {
    src: '/public/premium/industries/law.jpg',
    alt: 'Law',
  },
  industriesLogistics: {
    src: '/public/premium/industries/logistics.jpg',
    alt: 'Logistics',
  },
  industriesMedical: {
    src: '/public/premium/industries/medical.jpg',
    alt: 'Medical',
  },
  aiAgentGrid: {
    src: '/public/premium/team/agents-grid.avif',
    srcWebp: '/public/premium/team/agents-grid.webp',
    alt: 'AI agents grid',
  },
  teamComposite: {
    src: '/public/premium/team/agents-grid.avif',
    alt: 'Team composite',
  },
  banner1: {
    src: '/public/premium/banners/marketing-banner.avif',
    alt: 'Marketing banner',
  },
  banner2: {
    src: '/public/premium/banners/marketing-banner.avif',
    alt: 'Marketing banner 2',
  },
};

export function getPageHero(pageName: string): HeroImage {
  const key = (pageName || 'home').toLowerCase();
  return heroMap[key] ?? heroMap['home'];
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  return premiumMap[key];
}
