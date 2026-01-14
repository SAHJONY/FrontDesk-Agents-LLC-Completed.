// app/dashboard/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import Link from "next/link";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            CLIENT DASHBOARD
          </p>
          {hero && (
            <>
              <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-300">
                {hero.description}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/dashboard/outbound"
            className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-sky-400 hover:text-sky-300"
          >
            Outbound campaigns
          </Link>
          <Link
            href="/dashboard/retention"
            className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-sky-400 hover:text-sky-300"
          >
            Retention & reactivation
          </Link>
        </div>
      </header>

      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-xl border border-slate-800 object-cover"
        />
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs text-slate-400">Answered today</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">
            {/* hook to real metrics later */}
            0
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Connected calls handled by AI or live reception.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs text-slate-400">Booked appointments</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">0</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Coming directly from AI agents into your calendar / CRM.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs text-slate-400">Estimated pipeline</p>
          <p className="mt-1 text-2xl font-semibold text-sky-300">$0</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Conservative estimate based on campaign configuration.
          </p>
        </div>
      </section>
    </div>
  );
}
