// lib/siteImages.ts
export interface HeroImage {
  src: string;
  srcAvif?: string;
  srcWebp?: string;
  srcJpg: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PremiumImage {
  src: string;
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
  | 'marketingBanner'
  | 'setup'
  | 'login'
  | 'support'
  | 'outboundCalls'
  | 'retentionDashboard'
  | 'teamPortrait'
  | 'clientDashboard'
  | 'legal'
  | 'retention'
  | 'industries'
  | 'aiAgents'
  | 'homeHero';

const premiumBase = '/images/premium';

const pageHeroes: Record<string, HeroImage> = {
  home: {
    srcAvif: `${premiumBase}/office_scene_13.png`,
    srcWebp: `${premiumBase}/office_scene_13.png`,
    srcJpg: `${premiumBase}/office_scene_13.png`,
    src: `${premiumBase}/office_scene_13.png`,
    alt: 'FrontDesk Agents — AI Communications Hero',
    width: 1600,
    height: 900,
  },
  admin: {
    srcAvif: `${premiumBase}/office_scene_12.png`,
    srcWebp: `${premiumBase}/office_scene_12.png`,
    srcJpg: `${premiumBase}/office_scene_12.png`,
    src: `${premiumBase}/office_scene_12.png`,
    alt: 'Admin Command Center Dashboard',
    width: 1600,
    height: 900,
  },
  pricing: {
    srcAvif: `${premiumBase}/office_scene_04.png`,
    srcWebp: `${premiumBase}/office_scene_04.png`,
    srcJpg: `${premiumBase}/office_scene_04.png`,
    src: `${premiumBase}/office_scene_04.png`,
    alt: 'Pricing Plans - Scalable Solutions',
    width: 1600,
    height: 900,
  },
  demo: {
    srcAvif: `${premiumBase}/office_scene_01.png`,
    srcWebp: `${premiumBase}/office_scene_01.png`,
    srcJpg: `${premiumBase}/office_scene_01.png`,
    src: `${premiumBase}/office_scene_01.png`,
    alt: 'Live Demo - See FrontDesk Agents in Action',
    width: 1600,
    height: 900,
  },
  login: {
    srcAvif: `${premiumBase}/office_scene_05.png`,
    srcWebp: `${premiumBase}/office_scene_05.png`,
    srcJpg: `${premiumBase}/office_scene_05.png`,
    src: `${premiumBase}/office_scene_05.png`,
    alt: 'Secure Login - FrontDesk Agents',
    width: 1600,
    height: 900,
  },
  setup: {
    srcAvif: `${premiumBase}/office_scene_09.png`,
    srcWebp: `${premiumBase}/office_scene_09.png`,
    srcJpg: `${premiumBase}/office_scene_09.png`,
    src: `${premiumBase}/office_scene_09.png`,
    alt: 'Setup Process - Get Started',
    width: 1600,
    height: 900,
  },
  support: {
    srcAvif: `${premiumBase}/office_scene_02.png`,
    srcWebp: `${premiumBase}/office_scene_02.png`,
    srcJpg: `${premiumBase}/office_scene_02.png`,
    src: `${premiumBase}/office_scene_02.png`,
    alt: 'Support - Customer Assistance',
    width: 1600,
    height: 900,
  },
};

export function getPageHero(pageName: string): HeroImage {
  const key = (pageName || 'home').toLowerCase();
  return pageHeroes[key] ?? pageHeroes['home'];
}

export const getPremiumImage = (key: PremiumImageKey): PremiumImage => {
  const mapping: Record<PremiumImageKey, PremiumImage> = {
    // Home & Main Hero
    homeHero: {
      src: `${premiumBase}/ai_hero_concept.png`,
      alt: 'FrontDesk Agents - AI Communications',
      width: 1600,
      height: 900,
    },

    // AI Agents Page
    aiAgents: {
      src: `${premiumBase}/office_scene_03.png`,
      alt: 'AI Agents - Intelligent Communications',
      width: 1200,
      height: 600,
    },

    // Dashboard & Main Pages
    dashboard: {
      src: `${premiumBase}/office_scene_19.png`,
      alt: 'Client Dashboard - Performance Metrics',
      width: 1200,
      height: 600,
    },
    clientDashboard: {
      src: `${premiumBase}/office_scene_18.png`,
      alt: 'Client Dashboard - Revenue & Analytics',
      width: 1200,
      height: 600,
    },

    // Pricing
    pricing: {
      src: `${premiumBase}/office_scene_04.png`,
      alt: 'Pricing Plans - Scalable Solutions',
      width: 1200,
      height: 600,
    },

    // Admin
    admin: {
      src: `${premiumBase}/office_scene_12.png`,
      alt: 'Admin Command Center',
      width: 1200,
      height: 600,
    },
    commandCenterDark: {
      src: `${premiumBase}/business_impact_concept.png`,
      alt: 'Command Center - Dark Theme',
      width: 1200,
      height: 600,
    },
    commandCenterLight: {
      src: `${premiumBase}/office_scene_01.png`,
      alt: 'Command Center - Light Theme',
      width: 1200,
      height: 600,
    },

    // Outbound Calls
    outboundCalls: {
      src: `${premiumBase}/office_scene_16.png`,
      alt: 'Outbound Calls - 981 Calls Analytics',
      width: 1200,
      height: 600,
    },

    // Retention Dashboard
    retentionDashboard: {
      src: `${premiumBase}/office_scene_15.png`,
      alt: 'Retention Dashboard - 86% Retention Rate',
      width: 1200,
      height: 600,
    },
    retention: {
      src: `${premiumBase}/office_scene_15.png`,
      alt: 'Retention Strategy - Customer Focus',
      width: 1200,
      height: 600,
    },

    // Setup & Authentication
    setup: {
      src: `${premiumBase}/office_scene_09.png`,
      alt: 'Setup Process - 4 Easy Steps',
      width: 1200,
      height: 600,
    },
    login: {
      src: `${premiumBase}/office_scene_05.png`,
      alt: 'Secure Login Interface',
      width: 1200,
      height: 600,
    },

    // Legal & Industries
    legal: {
      src: `${premiumBase}/office_scene_11.png`,
      alt: 'Legal - Terms of Service & Privacy',
      width: 1200,
      height: 600,
    },
    industries: {
      src: `${premiumBase}/medical_industry_concept.png`,
      alt: 'Industries - Healthcare, Legal, Real Estate',
      width: 1200,
      height: 600,
    },

    // Support & Team
    support: {
      src: `${premiumBase}/office_scene_02.png`,
      alt: 'Customer Support - 24/7 Assistance',
      width: 1200,
      height: 600,
    },
    teamPortrait: {
      src: `${premiumBase}/office_scene_07.png`,
      alt: 'Team Portrait - Professional Team',
      width: 1200,
      height: 600,
    },

    // Marketing Banner
    marketingBanner: {
      src: `${premiumBase}/office_scene_08.png`,
      alt: 'Marketing Banner - AI Communications',
      width: 1200,
      height: 300,
    },

    // Agents Grid
    agentsGrid: {
      src: `${premiumBase}/office_scene_03.png`,
      alt: 'Agents Grid - AI Team',
      width: 1200,
      height: 600,
    },
  };
  return mapping[key];
};
