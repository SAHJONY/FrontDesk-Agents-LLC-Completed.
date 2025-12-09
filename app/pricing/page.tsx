// app/pricing/page.tsx
"use client"; 

import PremiumImage from "@/components/PremiumImage"; // NEW: Import PremiumImage component
import { pricingCopy } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = pricingCopy[lang];

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-16 md:flex-row">
      {/* Columna izquierda: texto y planes */}
      <section className="flex-1 space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Pricing
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {t.title}
        </h1>
        <p className="max-w-xl text-lg text-slate-300">{t.subtitle}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {t.plans.map((plan: any) => (
            <div
              key={plan.id}
              // Premium Card Styling
              className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl hover:border-sky-500 transition duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-bold text-white">
                    {plan.name}
                  </h2>
                  {plan.badge && (
                    <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 border border-sky-500/30">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-extrabold text-white">{plan.price}</p>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                {plan.features?.map((feature: string) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                // Premium Button Styling
                className="mt-8 w-full rounded-xl bg-sky-500 px-4 py-3 text-base font-bold text-slate-950 shadow-sky-500/50 shadow-lg hover:bg-sky-400 transition transform hover:scale-[1.01]"
              >
                Get started with {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Columna derecha: imagen premium */}
      <section className="flex-1 relative h-[400px] md:h-auto md:min-h-[600px]">
        <PremiumImage
          imageKey="pricing-hero"
          className="h-full w-full rounded-3xl border border-slate-800 shadow-2xl shadow-sky-900/50"
        />
      </section>
    </main>
  );
}
