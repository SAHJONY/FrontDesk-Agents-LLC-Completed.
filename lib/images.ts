// lib/images.ts
// Single source of truth for ALL platform images (page heroes + feature/solution/testimonial assets).
// Uses only assets that exist in /public/images/* (based on your current repo).
// If a key is missing, it falls back to a safe default so no page shows "broken image".

export type ImageSpec = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const WIDE: Pick<ImageSpec, "width" | "height"> = { width: 1600, height: 900 };
const BANNER: Pick<ImageSpec, "width" | "height"> = { width: 1600, height: 400 };

// Defaults (must exist)
const DEFAULTS = {
  hero: { src: "/images/hero-main.jpg", alt: "FrontDesk Agents — Hero", ...WIDE },
  section: { src: "/images/dashboard-preview.png", alt: "FrontDesk Agents — Dashboard preview", ...WIDE },
  card: { src: "/images/feature-analytics.jpg", alt: "FrontDesk Agents — Feature", ...WIDE },
} as const satisfies Record<string, ImageSpec>;

// Primary inventory (existing in /public/images/)
export const IMAGES = {
  brand: {
    logo: { src: "/images/logo-frontdesk.png", alt: "FrontDesk Agents logo", width: 512, height: 512 },
  },

  // PAGE HEROES (each page gets a hero image)
  pages: {
    home: { src: "/images/hero-main.jpg", alt: "FrontDesk Agents — Global Revenue Workforce", ...WIDE },

    pricing: { src: "/images/dashboard-preview.png", alt: "Pricing — Plans and dashboard", ...WIDE },
    industries: { src: "/images/hero-main.jpg", alt: "Industries — AI receptionist for every vertical", ...WIDE },
    login: { src: "/images/hero-main.jpg", alt: "Login — Secure access", ...WIDE },
    signup: { src: "/images/hero-main.jpg", alt: "Sign up — Create account", ...WIDE },
    features: { src: "/images/feature-voice.jpg", alt: "Features — Voice automation", ...WIDE },
    solutions: { src: "/images/dashboard-preview.png", alt: "Solutions — Platform overview", ...WIDE },
    support: { src: "/images/feature-messaging.jpg", alt: "Support — Messaging and help", ...WIDE },
    legal: { src: "/images/solution-legal.jpg", alt: "Legal — Compliance and policies", ...WIDE },
    demo: { src: "/images/dashboard-preview.png", alt: "Demo — Product preview", ...WIDE },
    onboarding: { src: "/images/dashboard-preview.png", alt: "Onboarding — Setup preview", ...WIDE },
  },

  // FEATURE IMAGES (used in /features and marketing sections)
  features: {
    analytics: { src: "/images/feature-analytics.jpg", alt: "Analytics — KPIs and insights", ...WIDE },
    messaging: { src: "/images/feature-messaging.jpg", alt: "Messaging — Inbox automation", ...WIDE },
    voice: { src: "/images/feature-voice.jpg", alt: "Voice — AI receptionist calls", ...WIDE },
  },

  // SOLUTION / INDUSTRY CARDS (used in /solutions/* and /industries)
  solutions: {
    law: { src: "/images/solution-legal.jpg", alt: "Solution — Legal", ...WIDE },
    medical: { src: "/images/solution-medical.jpg", alt: "Solution — Medical", ...WIDE },
    property: { src: "/images/solution-property.jpg", alt: "Solution — Property management", ...WIDE },
  },

  // TESTIMONIALS
  testimonials: {
    ceo: { src: "/images/testimonial-ceo.jpg", alt: "Testimonial — CEO", ...WIDE },
    doctor: { src: "/images/testimonial-doctor.jpg", alt: "Testimonial — Doctor", ...WIDE },
    lawyer: { src: "/images/testimonial-lawyer.jpg", alt: "Testimonial — Lawyer", ...WIDE },
  },

  // OPTIONAL BANNERS (reuse dashboard preview as clean banner)
  banners: {
    primary: { src: "/images/dashboard-preview.png", alt: "FrontDesk Agents — Banner", ...BANNER },
  },
} as const satisfies Record<string, any>;

/**
 * Safe accessor with fallback.
 * Example:
 *   const hero = getImage("pages.pricing")
 */
export function getImage(path: string): ImageSpec {
  const parts = path.split(".").filter(Boolean);
  let cur: any = IMAGES;

  for (const p of parts) {
    cur = cur?.[p];
  }

  // If not found or invalid, return safe default
  if (!cur || typeof cur?.src !== "string") return DEFAULTS.section;

  // If width/height missing, default to wide (prevents layout shifts)
  return {
    width: typeof cur.width === "number" ? cur.width : WIDE.width,
    height: typeof cur.height === "number" ? cur.height : WIDE.height,
    alt: typeof cur.alt === "string" ? cur.alt : "FrontDesk Agents",
    src: cur.src,
  };
}

/**
 * Page hero helper (consistent usage across pages).
 * Example:
 *   const hero = pageHero("pricing")
 */
export function pageHero(
  page:
    | "home"
    | "pricing"
    | "industries"
    | "login"
    | "signup"
    | "features"
    | "solutions"
    | "support"
    | "legal"
    | "demo"
    | "onboarding"
): ImageSpec {
  const hero = (IMAGES as any).pages?.[page];
  if (!hero) return DEFAULTS.hero;
  return getImage(`pages.${page}`);
}
