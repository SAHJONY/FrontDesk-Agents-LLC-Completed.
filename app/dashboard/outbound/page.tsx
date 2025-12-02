// app/dashboard/outbound/page.tsx
import { getPageHero } from "@/lib/siteImages";
import Image from "next/image";

export default function OutboundDashboardPage() {
  const hero = getPageHero("outbound");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          OUTBOUND ENGINE
        </p>
        <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
          Outbound campaigns & reactivation
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Configure your AI agents to reactivate old leads, missed calls and
          no-shows with structured campaigns.
        </p>
      </header>

      <Image
        src={hero.src}
        alt={hero.alt}
        width={1600}
        height={900}
        className="h-auto w-full rounded-xl border border-slate-800 object-cover"
      />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Active campaigns
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Coming soon: real data pulled from Supabase / Bland.ai events.
          </p>
          <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
            <li>• No-show reactivation</li>
            <li>• Old leads reactivation</li>
            <li>• Missed call follow-up</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Quick configuration
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            For now this section is UI-only. Real configuration can be wired to
            your existing pipelines.
          </p>
        </div>
      </section>
    </div>
  );
}
