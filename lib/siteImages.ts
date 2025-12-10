// lib/siteImages.ts
export interface HeroImage {
  // backwards-compatible alias (src) for existing code that expects hero.src
  src: string;
  srcAvif?: string;
  srcWebp?: string;
  srcJpg: string;
  alt: string;
  width?: number;
  height?: number;
}

export type PremiumImageKey =
  | 'dashboard'
  | 'pricing'
  | 'admin'
  | 'commandCenterDark'
  | 'commandCenterLight'
  | 'agentsGrid'
  | 'marketingBanner';

const premiumBase = '/premium';

const pageHeroes: Record<string, HeroImage> = {
  home: {
    srcAvif: `${premiumBase}/hero-cinematic.avif`,
    srcWebp: `${premiumBase}/hero-cinematic.webp`,
    srcJpg: `${premiumBase}/hero-cinematic.jpg`,
    // src must be set (alias) to keep compatibility with hero.src usages
    src: `${premiumBase}/hero-cinematic.jpg`,
    alt: 'FrontDesk Agents — Hero Cinematic',
    width: 1600,
    height: 900,
  },
  admin: {
    srcAvif: `${premiumBase}/command-center-dark.avif`,
    srcWebp: `${premiumBase}/command-center-dark.webp`,
    srcJpg: `${premiumBase}/command-center-dark.jpg`,
    src: `${premiumBase}/command-center-dark.jpg`,
    alt: 'Admin Command Center',
    width: 1600,
    height: 900,
  },
  pricing: {
    srcAvif: `${premiumBase}/hero-cinematic.avif`,
    srcWebp: `${premiumBase}/hero-cinematic.webp`,
    srcJpg: `${premiumBase}/hero-cinematic.jpg`,
    src: `${premiumBase}/hero-cinematic.jpg`,
    alt: 'Pricing hero',
    width: 1600,
    height: 900,
  },
};

export function getPageHero(pageName: string): HeroImage {
  const key = (pageName || 'home').toLowerCase();
  return pageHeroes[key] ?? pageHeroes['home'];
}

export const getPremiumImage = (key: PremiumImageKey) => {
  const mapping: Record<PremiumImageKey, { src: string; alt: string }> = {
    dashboard: { src: `${premiumBase}/hero-cinematic.jpg`, alt: 'Dashboard cinematic' },
    pricing: { src: `${premiumBase}/hero-cinematic.jpg`, alt: 'Pricing cinematic' },
    admin: { src: `${premiumBase}/command-center-dark.avif`, alt: 'Command center dark' },
    commandCenterDark: { src: `${premiumBase}/command-center-dark.avif`, alt: 'Command center dark' },
    commandCenterLight: { src: `${premiumBase}/command-center-light.avif`, alt: 'Command center light' },
    agentsGrid: { src: `${premiumBase}/team/agents-grid.avif`, alt: 'Agents grid' },
    marketingBanner: { src: `${premiumBase}/banners/marketing-banner.avif`, alt: 'Marketing banner' },
  };
  return mapping[key];
};
