// app/dashboard/page.tsx
import Image from "next/image";
import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-5 sm:px-8 pt-6 pb-12 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.20em] text-cyan-300/80">
              Internal Demo Version · FrontDesk Agents LLC
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
              FrontDesk Agents Command Center
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Monitor calls, WhatsApp, leads and inbox activity in real time
              with 24/7 AI agents.
            </p>
          </div>

          <span className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            ● LIVE Demo · Production-ready UI
          </span>
        </header>

        {/* Top visual */}
        <section className="premium-image-container mb-2">
          <Image
            src="/premium/dashboard-light.png"
            alt="FrontDesk Agents dashboard"
            fill
            className="premium-image"
          />
        </section>

        {/* Stats grid */}
        <section className="grid md:grid-cols-3 gap-4">
          <DashboardCard
            title="Answered Calls (24h)"
            value="128"
            trend="+34%"
            hint="AI agents handling calls in under 3 seconds."
          />
          <DashboardCard
            title="Appointments Booked"
            value="42"
            trend="+19%"
            hint="Synced with your calendar provider."
          />
          <DashboardCard
            title="Recovered Leads"
            value="27"
            trend="+55%"
            hint="Abandoned calls converted via WhatsApp follow-up."
          />
        </section>
      </div>
    </main>
  );
}
