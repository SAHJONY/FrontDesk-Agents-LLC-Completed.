// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getTodayMetrics } from "@/lib/metrics";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
};

export default async function HomePage() {
  const metrics = await getTodayMetrics();

  return (
    <div className="bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row md:items-center">
        {/* Hero copy */}
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live · AI receptionist command center
          </span>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Turn every missed call into{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              booked revenue
            </span>{" "}
            with 24/7 AI receptionists.
          </h1>

          <p className="max-w-xl text-sm text-slate-300">
            FrontDesk Agents listens, speaks and types in real time for your
            clinic, law firm or service business. One AI command center handles
            calls, SMS and WhatsApp while you focus on closing.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/setup"
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400"
            >
              Launch my AI receptionist
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-sky-300 underline-offset-4 hover:underline"
            >
              View Command Center demo →
            </Link>
          </div>

          {/* Metric cards */}
          <div className="mt-6 grid gap-3 text-xs text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
              <div className="text-[11px] text-slate-400">
                Calls handled today
              </div>
              <div className="mt-1 text-xl font-semibold">
                {metrics.callsHandledToday}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
              <div className="text-[11px] text-slate-400">
                Booked appointments
              </div>
              <div className="mt-1 text-xl font-semibold">
                {metrics.bookedAppointments}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
              <div className="text-[11px] text-slate-400">
                Missed calls recovered
              </div>
              <div className="mt-1 text-xl font-semibold">
                {metrics.missedCallsRecoveredPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Aquí irían tus imágenes premium / cinematicas */}
        <div className="flex-1">
          {/* Puedes reutilizar tu componente PremiumImage.tsx si quieres */}
        </div>
      </section>
    </div>
  );
}
