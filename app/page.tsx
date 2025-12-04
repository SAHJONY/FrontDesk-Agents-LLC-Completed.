// app/page.tsx
"use client";

import PremiumImage from "./components/PremiumImage";
import { useLanguage } from "./providers/LanguageProvider";
import { homeCopy } from "@/lib/i18n";

export default function HomePage() {
  const { lang } = useLanguage();
  const t = homeCopy[lang];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center">
      <section className="flex-1 space-y-6">
        <p className="text-xs tracking-[0.25em] text-sky-400">
          AI RECEPTIONIST • 24/7
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t.heroTitle}
        </h1>
        <p className="max-w-xl text-sm text-slate-300 md:text-base">
          {t.heroSubtitle}
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950">
            {t.ctaPrimary}
          </button>
          <button className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100">
            {t.ctaSecondary}
          </button>
        </div>

        <ul className="mt-3 space-y-1 text-sm text-slate-300">
          {t.bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      </section>

      <section className="flex-1">
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
          <PremiumImage
            name="home-hero"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
