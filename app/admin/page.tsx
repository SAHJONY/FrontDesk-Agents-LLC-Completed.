// app/admin/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import Link from "next/link";

export default function AdminPage() {
  const hero = getPageHero("admin");

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            OWNER CONSOLE
          </p>
          <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
            FrontDesk Agents – Owner Command Center
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            This view is for you as the application owner: global metrics,
            tenants, billing status and system health.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/dashboard"
            className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-sky-400 hover:text-sky-300"
          >
            View client dashboard
          </Link>
        </div>
      </header>

      <Image
        src={hero.src}
        alt={hero.alt}
        width={1600}
        height={900}
        className="h-auto w-full rounded-xl border border-slate-800 object-cover"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Tenants / Accounts
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Later connect this card to Supabase multi-tenant tables.
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">0</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Monthly recurring revenue
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Hook this to Stripe subscriptions in the next phase.
          </p>
          <p className="mt-2 text-2xl font-semibold text-sky-300">$0</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">System health</h2>
          <p className="mt-1 text-xs text-slate-400">
            Status of Twilio/Bland.ai, Supabase, Vercel, Webhooks.
          </p>
          <p className="mt-2 text-sm text-emerald-400">All services nominal (UI)</p>
        </div>
      </section>
    </div>
  );
}
