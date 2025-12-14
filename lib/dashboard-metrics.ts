// ./lib/dashboard-metrics.ts (SERVER SIDE UTIL)

import { db } from './db-simulation';

interface Metrics {
  callsProcessed: number;
  appointmentsBooked: number;
  conversionRate: number; // Appointments / Calls
  abandonmentRate: number; // Hangups / Calls
  totalDurationHours: number;
}

/**
 * Calcula las métricas clave de rendimiento (KPIs) para el Dashboard de un cliente.
 * @param clientKey La clave única del cliente (tenantId).
 * @param days El rango de días para calcular las métricas.
 */
export async function getClientMetrics(clientKey: string, days: number = 7): Promise<Metrics> {
  // Simulación: Filtrar logs de llamadas de la última semana
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - days);

  const allClientLogs = db.callLog.getRecentLogs(clientKey, 9999); // Obtener todos los logs (simulado)

  const relevantLogs = allClientLogs.filter(log => log.createdAt >= sevenDaysAgo);

  const callsProcessed = relevantLogs.length;
  const appointmentsBooked = relevantLogs.filter(log => log.outcome === 'booked').length;
  const hangups = relevantLogs.filter(log => log.outcome === 'hangup').length;
  const totalDurationSeconds = relevantLogs.reduce((sum, log) => sum + log.durationSeconds, 0);

  const conversionRate = callsProcessed > 0 ? (appointmentsBooked / callsProcessed) * 100 : 0;
  const abandonmentRate = callsProcessed > 0 ? (hangups / callsProcessed) * 100 : 0;
  
  return {
    callsProcessed,
    appointmentsBooked,
    conversionRate: parseFloat(conversionRate.toFixed(1)),
    abandonmentRate: parseFloat(abandonmentRate.toFixed(1)),
    totalDurationHours: parseFloat((totalDurationSeconds / 3600).toFixed(1)),
  };
}
