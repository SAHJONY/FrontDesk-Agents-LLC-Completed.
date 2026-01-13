export const getHospitalityContext = (_type: 'HOTEL' | 'STR') => {
  return {
    priority_metrics: ['occupancy_rate', 'rev-par', 'guest-satisfaction'],
    ai_conversion_triggers: ['late-checkout-request', 'booking-inquiry', 'maintenance-issue'],
    keywords: ['check-in time', 'parking availability', 'wifi password', 'ac not working'],
    upsell_logic: {
      'late-checkout': 45.00, // Instant automated revenue
      'room-upgrade': 75.00,
      'breakfast-add-on': 25.00
    }
  };
};
