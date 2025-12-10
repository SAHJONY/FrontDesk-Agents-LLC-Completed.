// lib/siteImages.ts
// Reemplazar completamente el archivo existente con este contenido.

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
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PremiumImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * NOTE:
 * - The repo contains images at root `public/` like: home-hero-4k.jpg, client-dashboard-4k.jpg,
 *   industries-hero-4k.jpg and a `public/premium/` folder.
 * - Prefer to standardize into `public/images/...` later. For now we point to the actual files found.
 */

/* -- Hero map: pages -> hero image -- */
const heroMap: Record<string, HeroImage> = {
  home: {
    // try the semantic path first (if you later add it), else fallback to existing file names
    src: '/images/hero-cinematic.jpg', // preferred semantic path (create file to use this)
    alt: 'FrontDesk Agents — Hero Cinematic',
    width: 1600,
    height: 900,
  },
  admin: {
    src: '/client-dashboard-4k.jpg', // file present in repo root public/
    alt: 'Owner Dashboard — Command Center',
    width: 1600,
    height: 900,
  },
  demo: {
    src: '/home-hero-4k.jpg', // existing file
    alt: 'Demo — Home Hero',
    width: 1600,
    height: 900,
  },
  industries: {
    src: '/industries-hero-4k.jpg', // existing file
    alt: 'Industries Hero',
    width: 1600,
    height: 900,
  },
};

/* -- Premium assets map -- */
const premiumMap: Record<PremiumImageKey, PremiumImage> = {
  heroCinematic: {
    src: '/images/hero-cinematic.jpg', // semantic expected
    alt: 'Hero cinematic image',
    width: 1600,
    height: 900,
  },
  commandCenterDark: {
    src: '/images/command-center-dark.jpg',
    alt: 'Command Center Dark',
    width: 1600,
    height: 900,
  },
  commandCenterLight: {
    src: '/images/command-center-light.jpg',
    alt: 'Command Center Light',
    width: 1600,
    height: 900,
  },
  industriesConstruction: {
    src: '/images/industries/construction.jpg',
    alt: 'Construction industry',
  },
  industriesHealthcare: {
    src: '/images/industries/healthcare.jpg',
    alt: 'Healthcare industry',
  },
  industriesLaw: {
    src: '/images/industries/law.jpg',
    alt: 'Law industry',
  },
  industriesLogistics: {
    src: '/images/industries/logistics.jpg',
    alt: 'Logistics industry',
  },
  industriesMedical: {
    src: '/images/industries/medical.jpg',
    alt: 'Medical industry',
  },
  aiAgentGrid: {
    src: '/images/premium/ai-agent-grid.jpg',
    alt: 'AI agent grid',
  },
  teamComposite: {
    src: '/images/premium/team-composite.jpg',
    alt: 'Team composite',
  },
  banner1: {
    src: '/images/premium/banners/banner-1.jpg',
    alt: 'Marketing banner 1',
  },
  banner2: {
    src: '/images/premium/banners/banner-2.jpg',
    alt: 'Marketing banner 2',
  },
};

/* Exports ------------------------------------------------- */
export function getPageHero(pageName: string): HeroImage {
  // normalize key
  const key = (pageName || 'home').toLowerCase();
  // default to home if not found
  return heroMap[key] ?? heroMap['home'];
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  return premiumMap[key];
}
