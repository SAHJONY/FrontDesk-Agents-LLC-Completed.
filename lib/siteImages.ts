// lib/siteImages.ts
export interface HeroImage {
  srcJpg: string;
  srcWebp?: string;
  srcAvif?: string;
  alt: string;
  width: number;
  height: number;
}

export type PremiumImageKey =
  | 'dashboard'
  | 'settings'
  | 'admin'
  | 'hero-cinematic'
  | 'command-center-dark'
  | 'command-center-light';

export interface PremiumImage {
  src: string;
  alt: string;
}

export function getPageHero(pageName: string): HeroImage {
  const base = `/images/${pageName}`;
  return {
    srcJpg: `${base}-hero.jpg`,
    srcWebp: `${base}-hero.webp`,
    srcAvif: `${base}-hero.avif`,
    alt: `${pageName} Hero Image`,
    width: 1600,
    height: 900
  };
}

export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  return {
    src: `/images/premium/${key}.jpg`,
    alt: `Premium image for ${key}`
  };
}
