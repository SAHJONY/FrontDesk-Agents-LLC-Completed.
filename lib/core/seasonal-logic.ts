export const getSeasonalContext = () => {
  const month = new Date().getMonth(); // 0-11
  const day = new Date().getDate();

  // SEASONAL OVERRIDE ENGINE
  if (month === 11 || month <= 1) return {
    season: 'WINTER',
    priority_industries: ['hvac', 'plumbing', 'auto-repair'],
    tone_trigger: 'CRISIS_FREEZE',
    keywords: ['burst pipes', 'no heat', 'frozen lines', 'battery failure']
  };

  if (month >= 2 && month <= 4) return {
    season: 'SPRING',
    priority_industries: ['roofing', 'landscaping', 'accounting', 'legal'],
    tone_trigger: 'RENEWAL_URGENCY',
    keywords: ['storm damage', 'tax deadline', 'spring cleanup', 'roof leak']
  };

  if (month >= 5 && month <= 7) return {
    season: 'SUMMER',
    priority_industries: ['hvac', 'pool-service', 'urgent-care'],
    tone_trigger: 'HEAT_PROTECTION',
    keywords: ['ac outage', 'dehydration', 'pool green', 'ventilation']
  };

  return {
    season: 'FALL',
    priority_industries: ['hvac', 'pest-control', 'estate-planning'],
    tone_trigger: 'PREPARATION',
    keywords: ['heating tune-up', 'rodent proofing', 'year-end legal']
  };
};
