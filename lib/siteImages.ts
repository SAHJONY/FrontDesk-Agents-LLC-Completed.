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

const premiumBase = '/premium';

const pageHeroes: Record<string, HeroImage> = {
  home: {
    srcAvif: `${premiumBase}/home-hero-4k.jpg`,
    srcWebp: `${premiumBase}/home-hero-4k.jpg`,
    srcJpg: `${premiumBase}/home-hero-4k.jpg`,
    src: `${premiumBase}/home-hero-4k.jpg`,
    alt: 'FrontDesk Agents — AI Communications Hero',
    width: 1600,
    height: 900,
  },
  admin: {
    srcAvif: `${premiumBase}/admin/index.jpg`,
    srcWebp: `${premiumBase}/admin/index.jpg`,
    srcJpg: `${premiumBase}/admin/index.jpg`,
    src: `${premiumBase}/admin/index.jpg`,
    alt: 'Admin Command Center Dashboard',
    width: 1600,
    height: 900,
  },
  pricing: {
    srcAvif: `${premiumBase}/pricing/index.jpg`,
    srcWebp: `${premiumBase}/pricing/index.jpg`,
    srcJpg: `${premiumBase}/pricing/index.jpg`,
    src: `${premiumBase}/pricing/index.jpg`,
    alt: 'Pricing Plans - Scalable Solutions',
    width: 1600,
    height: 900,
  },
  demo: {
    srcAvif: `${premiumBase}/demo/index.jpg`,
    srcWebp: `${premiumBase}/demo/index.jpg`,
    srcJpg: `${premiumBase}/demo/index.jpg`,
    src: `${premiumBase}/demo/index.jpg`,
    alt: 'Live Demo - See FrontDesk Agents in Action',
    width: 1600,
    height: 900,
  },
  login: {
    srcAvif: `${premiumBase}/login/index.jpg`,
    srcWebp: `${premiumBase}/login/index.jpg`,
    srcJpg: `${premiumBase}/login/index.jpg`,
    src: `${premiumBase}/login/index.jpg`,
    alt: 'Secure Login - FrontDesk Agents',
    width: 1600,
    height: 900,
  },
  setup: {
    srcAvif: `${premiumBase}/setup/index.jpg`,
    srcWebp: `${premiumBase}/setup/index.jpg`,
    srcJpg: `${premiumBase}/setup/index.jpg`,
    src: `${premiumBase}/setup/index.jpg`,
    alt: 'Setup Process - Get Started',
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
      src: `${premiumBase}/home-hero-4k.jpg`,
      alt: 'FrontDesk Agents - AI Communications',
      width: 1600,
      height: 900,
    },

    // AI Agents Page
    aiAgents: {
      src: `${premiumBase}/ai-agents/index.jpg`,
      alt: 'AI Agents - Intelligent Communications',
      width: 1200,
      height: 600,
    },

    // Dashboard & Main Pages
    dashboard: {
      src: `${premiumBase}/dashboard/index.jpg`,
      alt: 'Client Dashboard - Performance Metrics',
      width: 1200,
      height: 600,
    },
    clientDashboard: {
      src: `${premiumBase}/client-dashboard-4k.jpg`,
      alt: 'Client Dashboard - Revenue & Analytics',
      width: 1200,
      height: 600,
    },

    // Pricing
    pricing: {
      src: `${premiumBase}/pricing/index.jpg`,
      alt: 'Pricing Plans - Scalable Solutions',
      width: 1200,
      height: 600,
    },

    // Admin
    admin: {
      src: `${premiumBase}/admin/index.jpg`,
      alt: 'Admin Command Center',
      width: 1200,
      height: 600,
    },
    commandCenterDark: {
      src: `${premiumBase}/admin/index.jpg`,
      alt: 'Command Center - Dark Theme',
      width: 1200,
      height: 600,
    },
    commandCenterLight: {
      src: `${premiumBase}/premium/index.jpg`,
      alt: 'Command Center - Light Theme',
      width: 1200,
      height: 600,
    },

    // Outbound Calls
    outboundCalls: {
      src: `${premiumBase}/outbound/index.jpg`,
      alt: 'Outbound Calls - 981 Calls Analytics',
      width: 1200,
      height: 600,
    },

    // Retention Dashboard
    retentionDashboard: {
      src: `${premiumBase}/retention/index.jpg`,
      alt: 'Retention Dashboard - 86% Retention Rate',
      width: 1200,
      height: 600,
    },
    retention: {
      src: `${premiumBase}/retention/index.jpg`,
      alt: 'Retention Strategy - Customer Focus',
      width: 1200,
      height: 600,
    },

    // Setup & Authentication
    setup: {
      src: `${premiumBase}/setup/index.jpg`,
      alt: 'Setup Process - 4 Easy Steps',
      width: 1200,
      height: 600,
    },
    login: {
      src: `${premiumBase}/login/index.jpg`,
      alt: 'Secure Login Interface',
      width: 1200,
      height: 600,
    },

    // Legal & Industries
    legal: {
      src: `${premiumBase}/legal/index.jpg`,
      alt: 'Legal - Terms of Service & Privacy',
      width: 1200,
      height: 600,
    },
    industries: {
      src: `${premiumBase}/industries-hero-4k.jpg`,
      alt: 'Industries - Healthcare, Legal, Real Estate',
      width: 1200,
      height: 600,
    },

    // Support & Team
    support: {
      src: `${premiumBase}/demo/index.jpg`,
      alt: 'Customer Support - 24/7 Assistance',
      width: 1200,
      height: 600,
    },
    teamPortrait: {
      src: `${premiumBase}/premium/index.jpg`,
      alt: 'Team Portrait - Professional Team',
      width: 1200,
      height: 600,
    },

    // Marketing Banner
    marketingBanner: {
      src: `${premiumBase}/premium/index.jpg`,
      alt: 'Marketing Banner - AI Communications',
      width: 1200,
      height: 300,
    },

    // Agents Grid
    agentsGrid: {
      src: `${premiumBase}/ai-agents/index.jpg`,
      alt: 'Agents Grid - AI Team',
      width: 1200,
      height: 600,
    },
  };
  return mapping[key];
};
