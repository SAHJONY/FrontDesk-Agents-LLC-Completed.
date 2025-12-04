// app/pricing/page.tsx
"use client"; 

import PremiumImage from "../components/PremiumImage";
import { pricingCopy } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = pricingCopy[lang];

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row">
      {/* Columna izquierda: texto */}
      <section className="flex-1 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
          Pricing
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t.title}
        </h1>
        <p className="max-w-xl text-slate-300">{t.subtitle}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {t.plans.map((plan: any) => (
            <div
              key={plan.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h2>
                  {plan.badge && (
                    <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-white">{plan.price}</p>
                <p className="text-xs text-slate-400">{plan.description}</p>
              </div>

              <ul className="mt-4 space-y-1 text-sm text-slate-300">
                {plan.features?.map((feature: string) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <button className="mt-5 w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400">
                Get started with {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Columna derecha: imagen premium */}
      <section className="flex-1">
        <PremiumImage
          src="/premium/pricing-enterprise-dashboard-4k.png"
          alt="FrontDesk Agents pricing and analytics dashboard"
          className="h-full w-full rounded-3xl border border-slate-800 object-cover"
        />
      </section>
    </main>
  );
}
