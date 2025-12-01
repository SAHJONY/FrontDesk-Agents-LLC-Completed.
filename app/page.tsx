// app/page.tsx

import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { getDashboardMetrics } from "../lib/metrics";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "One AI command center that turns missed calls into booked revenue across phone, SMS and WhatsApp."
};

export const revalidate = 30; // refresca métricas cada 30s

export default async function HomePage() {
  const { callsHandledToday, bookedAppointments, recoveryRate } =
    await getDashboardMetrics();

  return (
    <div className="flex flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      {/* Badge live */}
      <div className="mb-2">
        <span className="inline-flex items-center rounded-full bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-500/40">
          <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
          Live · AI receptionist command center
        </span>
      </div>

      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            Turn every missed call into{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              booked revenue
            </span>{" "}
            with 24/7 AI receptionists.
          </h1>

          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            FrontDesk Agents listens, speaks and types in real-time for your
            clinic, law firm or service business. One AI command center handles
            calls, SMS and WhatsApp while you focus on closing.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/40 bg-sky-400 hover:bg-sky-300 transition"
            >
              Launch my AI receptionist
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800/60 transition"
            >
              View Command Center demo →
            </Link>
          </div>

          {/* Stats cards conectados a Airtable */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-xl">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/40 px-4 py-3">
              <p className="text-xs font-medium text-slate-400">
                Calls handled today
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-50">
                {callsHandledToday}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/40 px-4 py-3">
              <p className="text-xs font-medium text-slate-400">
                Booked appointments
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-50">
                {bookedAppointments}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/40 px-4 py-3">
              <p className="text-xs font-medium text-slate-400">
                Missed calls recovered
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-50">
                {recoveryRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Imagen hero (cinemática) */}
        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-slate-700/70 bg-gradient-to-b from-slate-900 to-slate-950 sm:h-80 lg:h-96">
          <Image
            src="/images/command-center-hero.jpg"
            alt="FrontDesk Agents AI Command Center"
            fill
            className="object-cover opacity-80"
            sizes="(min-width: 1024px) 480px, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10" />
        </div>
      </section>
    </div>
  );
}
