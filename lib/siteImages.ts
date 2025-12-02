// lib/siteImages.ts

type HeroConfig = {
  src: string;
  alt: string;
};

const HERO_IMAGES: Record<string, HeroConfig> = {
  home: {
    src: "https://images.pexels.com/photos/886743/pexels-photo-886743.jpeg",
    alt: "Modern contact center with AI-powered dashboards and agents",
  },
  pricing: {
    src: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    alt: "Business team reviewing pricing and ROI projections",
  },
  industries: {
    src: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    alt: "Collage of different industries using AI receptionists",
  },
  demo: {
    src: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg",
    alt: "Live video demo call with AI receptionist dashboard",
  },
  setup: {
    src: "https://images.pexels.com/photos/1181460/pexels-photo-1181460.jpeg",
    alt: "Onboarding wizard setting up phone numbers and agents",
  },
  default: {
    src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    alt: "Premium AI contact center environment",
  },
};

/**
 * Dev note:
 * - You can later replace these remote URLs with your own 4K images in /public/images/...
 * - Example: src: "/images/premium/home-hero-1.jpg"
 */
export function getPageHero(page: string): HeroConfig {
  return HERO_IMAGES[page] ?? HERO_IMAGES.default;
}
