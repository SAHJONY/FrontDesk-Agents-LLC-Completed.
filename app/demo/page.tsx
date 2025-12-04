"use client";

import { useLanguage } from "../providers/LanguageProvider";
import { demoCopy } from "@/lib/i18n";
import PremiumImage from "../components/PremiumImage";

export default function DemoPage() {
  const { lang } = useLanguage();
  const t = demoCopy[lang];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="grid gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {t.title}
          </h1>
          <p className="text-slate-300">{t.subtitle}</p>
          <ul className="space-y-1 text-sm text-slate-300">
            {t.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
        </section>
        <section>
          <PremiumImage
            name="demo-hero"
            className="h-full w-full rounded-2xl object-cover"
          />
        </section>
      </div>
    </main>
  );
}
