export const MarketConfigs = {
  US: {
    currency: 'USD',
    timezone: 'America/Chicago',
    voice: 'Neural-US-English-Pro',
    label: 'North America Node'
  },
  UK: {
    currency: 'GBP',
    timezone: 'Europe/London',
    voice: 'Neural-GB-English-Elite',
    label: 'EMEA Node'
  },
  AU: {
    currency: 'AUD',
    timezone: 'Australia/Sydney',
    voice: 'Neural-AU-English-Senior',
    label: 'APAC Node'
  }
} as const;

export type MarketCode = keyof typeof MarketConfigs;

export const getMarketConfig = (locale: string) => {
  return MarketConfigs[locale as MarketCode] || MarketConfigs.US;
};
