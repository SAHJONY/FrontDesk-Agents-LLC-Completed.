// lib/metrics.ts
import type { CallEventFields } from "./airtable";
import { callEventsTable } from "./airtable";

export interface DashboardMetrics {
  callsHandledToday: number;
  bookedAppointments: number;
  missedCallsRecoveredPercent: number;
}

/**
 * Devuelve la fecha de hoy en formato YYYY-MM-DD (zona UTC sencilla).
 * Si quieres usar zona local, ajusta aquí.
 */
function todayISO(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

export async function getTodayMetrics(): Promise<DashboardMetrics> {
  const date = todayISO();

  const records = await callEventsTable()
    .select({
      filterByFormula: `IS_SAME({Date}, "${date}", "day")`,
    })
    .all();

  const events = records.map((r) => r.fields as CallEventFields);

  const callsHandledToday = events.length;

  const bookedAppointments = events.filter(
    (e) => e.Status === "booked"
  ).length;

  const missed = events.filter((e) => e.Status === "missed").length;

  const recovered = events.filter(
    (e) => e.RecoveredFromMissed && e.Status === "booked"
  ).length;

  const missedCallsRecoveredPercent =
    missed > 0 ? Math.round((recovered / missed) * 100) : 0;

  return {
    callsHandledToday,
    bookedAppointments,
    missedCallsRecoveredPercent,
  };
}
