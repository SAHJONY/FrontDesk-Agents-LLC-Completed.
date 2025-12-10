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
  | 'industries';

const premiumBase = '/premium';

const pageHeroes: Record<string, HeroImage> = {
  home: {
    srcAvif: `${premiumBase}/hero-cinematic.avif`,
    srcWebp: `${premiumBase}/hero-cinematic.webp`,
    srcJpg: `${premiumBase}/hero-cinematic.jpg`,
    src: `${premiumBase}/hero-cinematic.jpg`,
    alt: 'FrontDesk Agents — Hero Cinematic - AI Communications',
    width: 1600,
    height: 900,
  },
  admin: {
    srcAvif: `${premiumBase}/command-center-dark.avif`,
    srcWebp: `${premiumBase}/command-center-dark.webp`,
    srcJpg: `${premiumBase}/command-center-dark.jpg`,
    src: `${premiumBase}/command-center-dark.jpg`,
    alt: 'Admin Command Center - AI Agents Dashboard',
    width: 1600,
    height: 900,
  },
  pricing: {
    srcAvif: `${premiumBase}/hero-cinematic.avif`,
    srcWebp: `${premiumBase}/hero-cinematic.webp`,
    srcJpg: `${premiumBase}/hero-cinematic.jpg`,
    src: `${premiumBase}/hero-cinematic.jpg`,
    alt: 'Pricing Plans - FrontDesk Agents Cinematic',
    width: 1600,
    height: 900,
  },
  demo: {
    srcAvif: `${premiumBase}/hero-cinematic.avif`,
    srcWebp: `${premiumBase}/hero-cinematic.webp`,
    srcJpg: `${premiumBase}/hero-cinematic.jpg`,
    src: `${premiumBase}/hero-cinematic.jpg`,
    alt: 'Live Demo - FrontDesk Agents',
    width: 1600,
    height: 900,
  },
  login: {
    srcAvif: `${premiumBase}/login.avif`,
    srcWebp: `${premiumBase}/login.webp`,
    srcJpg: `${premiumBase}/login.jpg`,
    src: `${premiumBase}/login.jpg`,
    alt: 'Login - Secure Access',
    width: 1600,
    height: 900,
  },
  setup: {
    srcAvif: `${premiumBase}/setup.avif`,
    srcWebp: `${premiumBase}/setup.webp`,
    srcJpg: `${premiumBase}/setup.jpg`,
    src: `${premiumBase}/setup.jpg`,
    alt: 'Setup Process - Configuration',
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
    // Dashboard & Main Pages
    dashboard: {
      src: `${premiumBase}/client-dashboard.jpg`,
      alt: 'Client Dashboard - Performance Metrics',
      width: 1200,
      height: 600,
    },
    pricing: {
      src: `${premiumBase}/hero-cinematic.jpg`,
      alt: 'Pricing Plans - Scalable Solutions',
      width: 1200,
      height: 600,
    },
    admin: {
      src: `${premiumBase}/command-center-dark.jpg`,
      alt: 'Admin Command Center',
      width: 1200,
      height: 600,
    },
    
    // Command Center Variants
    commandCenterDark: {
      src: `${premiumBase}/command-center-dark.jpg`,
      alt: 'Command Center Dark Theme - AI Dashboard',
      width: 1200,
      height: 600,
    },
    commandCenterLight: {
      src: `${premiumBase}/command-center-light.jpg`,
      alt: 'Command Center Light Theme',
      width: 1200,
      height: 600,
    },

    // Team & People
    agentsGrid: {
      src: `${premiumBase}/team/agents-grid.jpg`,
      alt: 'Team Agents - Professional Team',
      width: 1200,
      height: 600,
    },
    teamPortrait: {
      src: `${premiumBase}/team-portrait.jpg`,
      alt: 'Team Portrait - FrontDesk Agents',
      width: 1200,
      height: 600,
    },

    // Marketing & Banners
    marketingBanner: {
      src: `${premiumBase}/banners/marketing-banner.jpg`,
      alt: 'Marketing Banner - AI Communications',
      width: 1200,
      height: 300,
    },

    // Specific Features
    outboundCalls: {
      src: `${premiumBase}/outbound-calls.jpg`,
      alt: 'Outbound Calls - 981 Calls Analytics',
      width: 1200,
      height: 600,
    },
    retentionDashboard: {
      src: `${premiumBase}/retention-dashboard.jpg`,
      alt: 'Retention Dashboard - 86% Retention Rate',
      width: 1200,
      height: 600,
    },
    clientDashboard: {
      src: `${premiumBase}/client-dashboard.jpg`,
      alt: 'Client Dashboard - Revenue & Metrics',
      width: 1200,
      height: 600,
    },

    // Authentication & Setup
    login: {
      src: `${premiumBase}/login.jpg`,
      alt: 'Secure Login Interface',
      width: 1200,
      height: 600,
    },
    setup: {
      src: `${premiumBase}/setup.jpg`,
      alt: 'Setup Process - 4 Easy Steps',
      width: 1200,
      height: 600,
    },

    // Support & Information
    support: {
      src: `${premiumBase}/support.jpg`,
      alt: 'Customer Support Team - 24/7 Assistance',
      width: 1200,
      height: 600,
    },

    // Legal & Compliance
    legal: {
      src: `${premiumBase}/legal.jpg`,
      alt: 'Legal - Terms of Service & Privacy Policy',
      width: 1200,
      height: 600,
    },

    // Industries
    industries: {
      src: `${premiumBase}/industries.jpg`,
      alt: 'Industries - Healthcare, Legal, Real Estate',
      width: 1200,
      height: 600,
    },

    // Retention
    retention: {
      src: `${premiumBase}/retention.jpg`,
      alt: 'Retention Strategy - Customer Retention Focus',
      width: 1200,
      height: 600,
    },
  };
  return mapping[key];
};
