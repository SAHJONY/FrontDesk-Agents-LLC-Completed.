// lib/siteImages.ts

// Define the expected return type for clarity
interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function getPageHero(pageName: string): HeroImage {
  // Return a placeholder object with the required properties
  return {
    src: `/images/${pageName}-hero.jpg`,
    alt: `${pageName} Hero Image`,
    width: 1600, // Matching the width in the error log
    height: 900, // Matching the height in the error log
  };
}
