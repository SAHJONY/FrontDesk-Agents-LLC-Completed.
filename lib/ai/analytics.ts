// lib/ai/analytics.ts

export const calculateROI = (calls: any[], businessConfig: any) => {
  // Intentamos obtener un precio promedio basado en los servicios extraídos por el crawler
  const avgServicePrice = businessConfig.avgPrice || 100; 
  const bookings = calls.filter(c => c.wasBooked).length;
  
  return {
    totalBookings: bookings,
    totalCalls: calls.length,
    estimatedRevenue: bookings * avgServicePrice,
    hoursSaved: Math.round((calls.length * 10) / 60), // Redondeamos las horas
    conversionRate: calls.length > 0 ? ((bookings / calls.length) * 100).toFixed(1) : 0
  };
};
