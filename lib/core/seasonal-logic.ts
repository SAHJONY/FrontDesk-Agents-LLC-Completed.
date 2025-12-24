/**
 * MASTER 2026 EXPANSION ENGINE
 * Decouples logic from simple seasons to a strategic Cluster-based roadmap.
 */
export const getSeasonalContext = () => {
  const month = new Date().getMonth(); // 0-11

  const expansionMatrix: Record<number, any> = {
    0: { // January
      season: 'WINTER',
      cluster: 'MIDWEST_HUB',
      priority_industries: ['hvac', 'plumbing', 'auto-repair'],
      tone_trigger: 'CRISIS_FREEZE',
      keywords: ['burst pipes', 'furnace failure', 'no heat', 'battery death'],
      focus: 'Deep Freeze Response'
    },
    1: { // February
      season: 'WINTER_END',
      cluster: 'NATIONWIDE',
      priority_industries: ['accounting', 'legal', 'tax-prep'],
      tone_trigger: 'DEADLINE_URGENCY',
      keywords: ['tax deadline', 'corporate filing', 'audit protection', 'bookkeeping'],
      focus: 'Tax Season Blitz'
    },
    2: { // March
      season: 'SPRING',
      cluster: 'FL_CORRIDOR',
      priority_industries: ['roofing', 'solar', 'landscaping'],
      tone_trigger: 'STORM_READY',
      keywords: ['storm damage', 'roof leak', 'hurricane prep', 'debris removal'],
      focus: 'Spring Storm Triage'
    },
    3: { // April
      season: 'SPRING',
      cluster: 'NE_MEGALOPOLIS',
      priority_industries: ['legal', 'medical', 'real-estate'],
      tone_trigger: 'RENEWAL_URGENCY',
      keywords: ['personal injury', 'spring allergies', 'home listing', 'closing'],
      focus: 'Tri-State Growth'
    },
    4: { // May
      season: 'PRE_SUMMER',
      cluster: 'CALI_COAST',
      priority_industries: ['pool-service', 'hvac', 'landscaping'],
      tone_trigger: 'SUMMER_PREP',
      keywords: ['ac tune-up', 'pool opening', 'drought landscaping', 'ventilation'],
      focus: 'West Coast Launch'
    },
    5: { // June
      season: 'SUMMER',
      cluster: 'MIDWEST_HUB',
      priority_industries: ['auto-repair', 'hvac', 'pest-control'],
      tone_trigger: 'HEAT_PROTECTION',
      keywords: ['overheating', 'ac outage', 'mosquito control', 'travel prep'],
      focus: 'Summer Road-Trip Maintenance'
    },
    6: { // July
      season: 'SUMMER_PEAK',
      cluster: 'TEXAS_TRIANGLE',
      priority_industries: ['hvac', 'urgent-care', 'plumbing'],
      tone_trigger: 'CRITICAL_HEAT',
      keywords: ['ac failure', 'heat stroke', 'water pressure', 'emergency cooling'],
      focus: 'Texas Heatwave Defense'
    },
    // ... logic continues to adapt for Aug-Dec based on the $1.5M roadmap
  };

  // Fallback to current logic for the remaining months
  const currentPlan = expansionMatrix[month];
  
  if (currentPlan) return currentPlan;

  // DEFAULT FALL/WINTER WRAP-UP (Aug-Dec)
  return {
    season: month >= 7 && month <= 9 ? 'FALL' : 'WINTER',
    cluster: 'NATIONWIDE',
    priority_industries: ['hvac', 'pest-control', 'estate-planning'],
    tone_trigger: 'PREPARATION',
    keywords: ['heating tune-up', 'rodent proofing', 'year-end legal', 'holiday prep']
  };
};
