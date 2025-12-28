// lib/geo.ts
const REGION_MAP: Record<string, string> = {
  // WESTERN
  'US': 'WESTERN', 'GB': 'WESTERN', 'CA': 'WESTERN', 'AU': 'WESTERN', 'DE': 'WESTERN',
  // MEDIUM
  'BR': 'MEDIUM', 'MX': 'MEDIUM', 'TR': 'MEDIUM', 'ES': 'MEDIUM',
  // GROWTH
  'VN': 'GROWTH', 'IN': 'GROWTH', 'PH': 'GROWTH', 'ID': 'GROWTH', 'PK': 'GROWTH'
};

export const getRegionFromCountry = (countryCode: string): string => {
  return REGION_MAP[countryCode] || 'WESTERN'; // Default to Western/Permanent pricing
};
