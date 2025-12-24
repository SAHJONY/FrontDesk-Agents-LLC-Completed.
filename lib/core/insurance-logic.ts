export const getInsuranceContext = (vertical: string) => {
  if (vertical === 'home-services') {
    return {
      claim_triggers: ['water-damage', 'roof-collapse', 'fire-restoration'],
      data_points: ['policy_provider', 'deductible_status', 'date_of_loss'],
      partner_type: 'Public Adjuster / Restoration Pro',
      revenue_multiplier: 5.5 // Estimated jump in lead value
    };
  }
  return null;
};
