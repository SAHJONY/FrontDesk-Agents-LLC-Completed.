// lib/siteImages.ts
// Catálogo central de imágenes premium para toda la app FrontDesk Agents
// Asume que TODOS los PNG están en: /public/images/premium/*.png

export type PageKey =
  | "home"
  | "dashboardMain"
  | "dashboardOutbound"
  | "dashboardRetention"
  | "demo"
  | "pricingMain"
  | "industries"
  | "setup"
  | "admin"
  | "aiAgents"
  | "medicalVertical";

export interface SiteImage {
  src: string;
  alt: string;
}

/**
 * Hero PRINCIPAL por pantalla.
 * DECISIÓN DE CEO:
 * - Home: cerebro AI cinematográfico (marca fuerte).
 * - Dashboard: métricas y negocio serio.
 * - Demo: humano simpático en cámara (confianza).
 * - Pricing: impacto de negocio / $$$.
 * - Industries: equipo en reunión (B2B).
 * - Setup: persona frente a dashboard (onboarding).
 * - Admin: dev/ops múltiple pantalla (infraestructura).
 * - AI Agents: charts y AI en acción.
 * - Medical vertical: badge clínico.
 */
export const pageHeroes: Record<PageKey, SiteImage> = {
  home: {
    src: "/images/premium/ai_hero_concept.png",
    alt: "Futuristic AI brain hero image for FrontDesk Command Center"
  },
  dashboardMain: {
    src: "/images/premium/business_impact_concept.png",
    alt: "Business impact dashboard powered by FrontDesk Agents"
  },
  dashboardOutbound: {
    src: "/images/premium/office_scene_16.png",
    alt: "Team around whiteboard planning outbound call flows"
  },
  dashboardRetention: {
    src: "/images/premium/office_scene_12.png",
    alt: "Group reviewing customer retention analytics on a big screen"
  },
  demo: {
    src: "/images/premium/office_scene_15.png",
    alt: "Businesswoman smiling on camera during a live product demo"
  },
  pricingMain: {
    src: "/images/premium/office_scene_18.png",
    alt: "Boardroom presentation with FrontDesk Command Center on big screen"
  },
  industries: {
    src: "/images/premium/office_scene_05.png",
    alt: "Business team in meeting about call handling and customer experience"
  },
  setup: {
    src: "/images/premium/office_scene_10.png",
    alt: "Professional using laptop to monitor live calls and setup steps"
  },
  admin: {
    src: "/images/premium/office_scene_03.png",
    alt: "Engineer monitoring AI receptionist infrastructure on multiple screens"
  },
  aiAgents: {
    src: "/images/premium/office_scene_02.png",
    alt: "Executive presenting growth charts powered by AI agents"
  },
  medicalVertical: {
    src: "/images/premium/medical_industry_concept.png",
    alt: "AI receptionist glowing badge at a medical clinic front desk"
  }
};

/**
 * Héroes adicionales para carruseles y secciones secundarias
 * (por si quieres sliders en home, pricing, demo, etc.)
 */
export const homeHeroCarousel: SiteImage[] = [
  pageHeroes.home,
  {
    src: "/images/premium/office_scene_01.png",
    alt: "AI receptionist team collaborating at FrontDesk Agents"
  },
  {
    src: "/images/premium/office_scene_08.png",
    alt: "Manager talking with receptionist in bright office lobby"
  },
  {
    src: "/images/premium/office_scene_19.png",
    alt: "Team focused on desktop screen reviewing product UI"
  }
];

export const dashboardCarousel: SiteImage[] = [
  pageHeroes.dashboardMain,
  pageHeroes.dashboardRetention,
  {
    src: "/images/premium/office_scene_14.png",
    alt: "Professional checking live metrics on tablet near a window"
  }
];

export const demoCarousel: SiteImage[] = [
  pageHeroes.demo,
  {
    src: "/images/premium/office_scene_17.png",
    alt: "Leadership coaching team about goals and teamwork"
  },
  {
    src: "/images/premium/office_scene_07.png",
    alt: "Team celebrating successful customer acquisition campaign"
  }
];

export const pricingCarousel: SiteImage[] = [
  pageHeroes.pricingMain,
  pageHeroes.dashboardMain,
  {
    src: "/images/premium/office_scene_20.png",
    alt: "Professional walking through modern hallway to an important meeting"
  }
];

export const industriesCarousel: SiteImage[] = [
  pageHeroes.industries,
  pageHeroes.medicalVertical,
  {
    src: "/images/premium/office_scene_04.png",
    alt: "Receptionist greeting a visitor at a modern front desk"
  }
];

/**
 * Helper genérico: pide un hero para una página
 */
export function getPageHero(page: PageKey | string): SiteImage {
  if (page in pageHeroes) {
    return pageHeroes[page as PageKey];
  }
  return pageHeroes.home;
}

/**
 * Helper para carrousel por página (si no hay, usa home).
 */
export function getPageCarousel(page: PageKey | string): SiteImage[] {
  switch (page) {
    case "home":
      return homeHeroCarousel;
    case "dashboardMain":
    case "dashboardOutbound":
    case "dashboardRetention":
      return dashboardCarousel;
    case "demo":
      return demoCarousel;
    case "pricingMain":
      return pricingCarousel;
    case "industries":
    case "medicalVertical":
      return industriesCarousel;
    default:
      return homeHeroCarousel;
  }
}
