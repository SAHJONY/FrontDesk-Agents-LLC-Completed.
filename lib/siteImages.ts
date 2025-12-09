// lib/siteImages.ts

// Define the expected return type for getPageHero
interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Define the expected keys for getPremiumImage
export type PremiumImageKey = 'dashboard' | 'settings' | 'admin'; // Placeholder keys

// Define the expected return type for getPremiumImage
interface PremiumImage {
  src: string;
  alt: string;
}

export function getPageHero(pageName: string): HeroImage {
  return {
    src: `/images/<LaTex>${pageName}-hero.jpg`,
    alt: `$</LaTex>{pageName} Hero Image`,
    width: 1600,
    height: 900,
  };
}

// Placeholder function for the missing export
export function getPremiumImage(key: PremiumImageKey): PremiumImage {
  return {
    src: `/images/premium-<LaTex>${key}.png`,
    alt: `Premium image for $</LaTex>{key}`,
  };
}
