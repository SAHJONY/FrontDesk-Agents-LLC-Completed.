// lib/siteImages.ts
export type PremiumImageKey =
  | 'hero-cinematic'
  | 'command-center-dark'
  | 'command-center-light'
  | 'industry-construction'
  | 'industry-healthcare'
  | 'industry-law'
  | 'industry-logistics'
  | 'industry-medical'
  | 'ai-agent-grid'
  | 'team-composite'
  | 'marketing-banner-1'
  | 'marketing-banner-2';

export type PremiumImageConfig = {
  src: string;
  alt: string;
};

const premiumImages: Record<PremiumImageKey, PremiumImageConfig> = {
  'hero-cinematic': { src: '/images/hero-cinematic.jpg', alt: 'Hero cinematic background' },
  'command-center-dark': { src: '/images/command-center-dark.jpg', alt: 'Command center dark' },
  'command-center-light': { src: '/images/command-center-light.jpg', alt: 'Command center light' },
  'industry-construction': { src: '/images/industries/construction.jpg', alt: 'Construction industry' },
  'industry-healthcare': { src: '/images/industries/healthcare.jpg', alt: 'Healthcare industry' },
  'industry-law': { src: '/images/industries/law.jpg', alt: 'Legal industry' },
  'industry-logistics': { src: '/images/industries/logistics.jpg', alt: 'Logistics industry' },
  'industry-medical': { src: '/images/industries/medical.jpg', alt: 'Medical industry' },
  'ai-agent-grid': { src: '/images/premium/ai-agent-grid.jpg', alt: 'AI agents' },
  'team-composite': { src: '/images/premium/team-composite.jpg', alt: 'Team composite' },
  'marketing-banner-1': { src: '/images/premium/banners/banner-1.jpg', alt: 'Marketing banner 1' },
  'marketing-banner-2': { src: '/images/premium/banners/banner-2.jpg', alt: 'Marketing banner 2' }
};

export function getPremiumImage(key: PremiumImageKey): PremiumImageConfig {
  return premiumImages[key];
}
