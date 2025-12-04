// app/pricing/page.tsx
"use client";

import { useLanguage } from "../providers/LanguageProvider";
import { pricingCopy } from "@/lib/i18n";
import PremiumImage from "../components/PremiumImage";

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = pricingCopy[lang];

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold md:text-4xl">{t.title}</h1>
          <p className="text-sm text-slate-300 md:text-base">
            {t.subtitle}
          </p>
        </div>
        <div className="flex-1">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
            <PremiumImage
              name="pricing-hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {t.plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-2 text-2xl font-bold text-sky-400">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {plan.description}
              </p>
            </div>
            <button className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
