// app/dashboard/retention/page.tsx
import { getPageHero } from "@/lib/siteImages";
import Image from "next/image";

export default function RetentionDashboardPage() {
  const hero = getPageHero("retention");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          RETENTION & LOYALTY
        </p>
        <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
          Keep your existing clients coming back.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Campaigns to reactivate old patients, clients or customers, and keep
          your schedule filled with high-value repeat business.
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
            Retention snapshots
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            UI ready to connect to your real churn / retention metrics.
          </p>
          <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
            <li>• Patients not seen in 6+ months</li>
            <li>• Clients with open balances</li>
            <li>• VIP lists for special campaigns</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Upcoming features
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Once live, AI agents can automatically call/text these segments and
            push booked appointments into your calendar.
          </p>
        </div>
      </section>
    </div>
  );
}
