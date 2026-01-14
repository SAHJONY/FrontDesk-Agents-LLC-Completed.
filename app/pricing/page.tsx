// app/pricing/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import Link from "next/link";

export default function PricingPage() {
  const hero = getPageHero("pricing");

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          PRICING
        </p>
        {hero && (
          <>
            <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              {hero.description}
            </p>
          </>
        )}
      </section>

      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-xl border border-slate-800 object-cover"
        />
      )}

      <section className="grid gap-6 md:grid-cols-3">
        {/* Starter */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <h2 className="text-sm font-semibold text-slate-50">Starter</h2>
          <p className="mt-1 text-xs text-slate-400">Solo & small offices</p>
          <p className="mt-4 text-2xl font-bold text-slate-50">
            $399<span className="text-sm font-normal text-slate-400">/mo</span>
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            <li>• 1 AI Receptionist (phone + SMS)</li>
            <li>• 1 inbox / main line</li>
            <li>• 24/7 coverage</li>
            <li>• English or Spanish</li>
          </ul>
          <Link
            href="/setup"
            className="mt-6 inline-flex justify-center rounded-md bg-sky-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-300"
          >
            Start Starter onboarding
          </Link>
        </div>

        {/* Professional */}
        <div className="flex flex-col rounded-xl border border-sky-500 bg-slate-950 p-5 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
          <div className="mb-2 inline-flex items-center rounded-full bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
            Most Popular
          </div>
          <h2 className="text-sm font-semibold text-slate-50">Professional</h2>
          <p className="mt-1 text-xs text-slate-400">
            Growing clinics & law firms
          </p>
          <p className="mt-4 text-2xl font-bold text-slate-50">
            $899<span className="text-sm font-normal text-slate-400">/mo</span>
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            <li>• 3 AI agents (inbound, outbound, retention)</li>
            <li>• Multilingual (EN/ES)</li>
            <li>• CRM integration & call routing</li>
            <li>• Campaigns for reactivation & no-shows</li>
          </ul>
          <Link
            href="/setup"
            className="mt-6 inline-flex justify-center rounded-md bg-sky-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-300"
          >
            Start Professional onboarding
          </Link>
        </div>

        {/* Enterprise */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <h2 className="text-sm font-semibold text-slate-50">Enterprise</h2>
          <p className="mt-1 text-xs text-slate-400">
            Multi-location & national brands
          </p>
          <p className="mt-4 text-2xl font-bold text-slate-50">
            $1,799<span className="text-sm font-normal text-slate-400">/mo</span>
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            <li>• Unlimited agents & inboxes</li>
            <li>• SSO, SLA & dedicated CSM</li>
            <li>• Custom workflows & queues</li>
            <li>• Quarterly revenue optimization review</li>
          </ul>
          <Link
            href="/demo"
            className="mt-6 inline-flex justify-center rounded-md border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300"
          >
            Talk to sales about Enterprise
          </Link>
        </div>
      </section>
    </div>
  );
}
