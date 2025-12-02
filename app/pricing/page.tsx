// app/pricing/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import { TopNav } from "@/components/top-nav";
import Link from "next/link";

export default function PricingPage() {
  const hero = getPageHero("pricing");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        <section className="mb-10 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Simple, transparent pricing
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              Plans designed for solo owners, growing teams and multi-location operations.
              Always 24/7. Always AI + human takeover ready.
            </p>
            <p className="text-xs text-slate-400">
              Precios en USD. Soporte en inglés y español. Sin contratos largos.
            </p>
          </div>

          <div className="relative">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl border border-slate-800 object-cover shadow-xl"
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">Starter</h2>
            <p className="mt-1 text-xs text-slate-400">Solo / small office</p>
            <p className="mt-4 text-2xl font-semibold text-sky-400">$399</p>
            <p className="text-[11px] text-slate-500">per month</p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li>• 1 AI receptionist (voice + SMS)</li>
              <li>• 1 inbox / phone number</li>
              <li>• 24/7 coverage</li>
              <li>• English or Spanish</li>
            </ul>
            <Link
              href="/demo"
              className="mt-4 rounded-md bg-sky-400 px-3 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-sky-300"
            >
              Start with Starter
            </Link>
          </div>

          <div className="flex flex-col rounded-xl border border-sky-500 bg-slate-900/70 p-5 shadow-lg shadow-sky-900/30">
            <h2 className="text-sm font-semibold text-slate-50">Professional</h2>
            <p className="mt-1 text-xs text-slate-400">
              Law firms, clinics, agencies, contractors
            </p>
            <p className="mt-4 text-2xl font-semibold text-sky-400">$899</p>
            <p className="text-[11px] text-slate-500">per month</p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-200">
              <li>• 3 AI agents (departments)</li>
              <li>• Multilingual (EN/ES)</li>
              <li>• CRM integration</li>
              <li>• Smart call routing</li>
            </ul>
            <Link
              href="/demo"
              className="mt-4 rounded-md bg-sky-400 px-3 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-sky-300"
            >
              Most popular · Book demo
            </Link>
          </div>

          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">Enterprise</h2>
            <p className="mt-1 text-xs text-slate-400">
              Multi-location, call centers, franchises
            </p>
            <p className="mt-4 text-2xl font-semibold text-sky-400">$1,799</p>
            <p className="text-[11px] text-slate-500">per month</p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li>• Unlimited AI agents / inboxes</li>
              <li>• SSO, SLA & custom workflows</li>
              <li>• Dedicated CSM</li>
              <li>• Priority support</li>
            </ul>
            <Link
              href="/demo"
              className="mt-4 rounded-md border border-sky-500 px-3 py-2 text-center text-xs font-semibold text-sky-400 hover:border-sky-300 hover:text-sky-300"
            >
              Talk to sales
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
