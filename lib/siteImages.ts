// lib/siteImages.ts
// Centralized image helpers for Next.js pages.
// Exported functions: getPageHero(pageName) and getPremiumImage(key)

export interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type PremiumImageKey =
  | 'dashboard'
  | 'settings'
  | 'admin'
  | 'pricing'
  | 'industries'
  | 'commandCenterDark'
  | 'commandCenterLight'
  | 'agentsGrid'
  | 'marketingBanner';

export interface PremiumImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const pageHeroes: Record<string, HeroImage> = {
  home: { src: '/home-hero-4k.jpg', alt: 'FrontDesk Agents — Hero', width: 1600, height: 900 },
  admin: { src: '/images/a816db97-b673-4011-9f22-26cd0da03760.jpeg', alt: 'Admin Command Center', width: 1600, height: 900 },
  pricing: { src: '/images/59f2c8bb-d265-4b3f-99d8-19b50174c772.jpeg', alt: 'Pricing Hero', width: 1600, height: 900 },
  industries: { src: '/industries-hero-4k.jpg', alt: 'Industries Hero', width: 1600, height: 900 },
  dashboard: { src: '/client-dashboard-4k.jpg', alt: 'Client Dashboard', width: 1600, height: 900 },
};

const premiumImages: Record<PremiumImageKey, PremiumImage> = {
  dashboard: { src: '/premium/hero-cinematic.jpg', alt: 'Premium cinematic hero', width: 1600, height: 900 },
  settings: { src: '/premium/command-center-light.avif', alt: 'Command center (light)', width: 1600, height: 900 },
  admin: { src: '/premium/command-center-dark.avif', alt: 'Command center (dark)', width: 1600, height: 900 },
  pricing: { src: '/premium/hero-cinematic.jpg', alt: 'Pricing premium hero', width: 1600, height: 900 },
  industries: { src: '/premium/industries/construction.avif', alt: 'Industries premium', width: 1600, height: 900 },
  commandCenterDark: { src: '/premium/command-center-dark.avif', alt: 'Command center dark', width: 1600, height: 900 },
  commandCenterLight: { src: '/premium/command-center-light.avif', alt: 'Command center light', width: 1600, height: 900 },
  agentsGrid: { src: '/premium/team/agents-grid.avif', alt: 'Agents grid', width: 1600, height: 900 },
  marketingBanner: { src: '/premium/banners/marketing-banner.avif', alt: 'Marketing banner', width: 1400, height: 400 },
};

function normalizeKey(key: string) {
  return (key || '').toLowerCase().trim().replace(/\s+/g, '-');
}

export function getPageHero(pageName: string): HeroImage {
  const key = normalizeKey(pageName);
  return pageHeroes[key] ?? {
    src: '/home-hero-4k.jpg',
    alt: `${pageName || 'FrontDesk'} Hero Image`,
    width: 1600,
    height: 900,
  };
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  const img = premiumImages[key];
  if (!img) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`getPremiumImage: unknown key "${key}"`);
    }
    return { src: '/premium/hero-cinematic.jpg', alt: 'Premium image fallback', width: 1600, height: 900 };
  }
  return img;
}
