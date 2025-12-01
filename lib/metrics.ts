// lib/metrics.ts

import { getTodayStats } from "./airtable";

export interface DashboardMetrics {
  callsHandledToday: number;
  bookedAppointments: number;
  recoveryRate: number; // porcentaje 0–100
}

/**
 * Lee Airtable ("Call Events") y genera las métricas del dashboard.
 * Ajusta aquí las reglas según los nombres de tus campos/estados reales.
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const records = await getTodayStats();

  if (!records || records.length === 0) {
    return {
      callsHandledToday: 0,
      bookedAppointments: 0,
      recoveryRate: 0
    };
  }

  const total = records.length;
  let booked = 0;
  let missed = 0;
  let recovered = 0;

  for (const rec of records) {
    const statusRaw = (rec.get("Status") as string | undefined) ?? "";
    const status = statusRaw.toLowerCase();

    // Ajusta estos includes a los valores reales que guardas en Airtable
    if (status.includes("booked")) booked++;
    if (status.includes("missed")) missed++;

    const recoveredFlag = (rec.get("Recovered") as boolean | undefined) ?? false;
    if (recoveredFlag) recovered++;
  }

  const recoveryRate =
    missed > 0 ? Math.round((recovered / missed) * 100) : 0;

  return {
    callsHandledToday: total,
    bookedAppointments: booked,
    recoveryRate
  };
}

/**
 * Alias usado por el endpoint /api/metrics.
 * Mantiene compatibilidad con el código existente.
 */
export async function getTodayMetrics(): Promise<DashboardMetrics> {
  return getDashboardMetrics();
}
