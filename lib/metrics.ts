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

    // Ejemplo: si en Airtable usas "Booked" o "Appointment Booked"
    if (status.includes("booked")) booked++;

    // Ejemplo: si marcas las llamadas perdidas como "Missed"
    if (status.includes("missed")) missed++;

    // Campo booleano opcional "Recovered" que marcas cuando se recupera la llamada
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
