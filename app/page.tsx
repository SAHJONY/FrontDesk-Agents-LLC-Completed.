"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";

const copy = {
  en: {
    kpi: "AI RECEPTIONIST • 24/7",
    title:
      "Never miss a profitable call again. Your AI receptionist covers the phones 24/7.",
    subtitle:
      "FrontDesk Agents answers, qualifies, and routes your calls so every ring turns into booked appointments and new revenue.",
    primaryCta: "Start with a live demo",
    secondaryCta: "Talk to our team",
    bullets: [
      "Works with your existing numbers (Twilio, Bland.ai, etc.)",
      "Human-level conversations in English & Spanish",
      "Instant intake, routing, and CRM-ready data for every caller",
    ],
  },
  es: {
    kpi: "RECEPCIONISTA IA • 24/7",
    title:
      "Nunca vuelvas a perder una llamada rentable. Tu recepcionista IA cubre el teléfono 24/7.",
    subtitle:
      "FrontDesk Agents atiende, califica y enruta tus llamadas para convertir cada timbre en citas agendadas y nuevos ingresos.",
    primaryCta: "Comienza con una demo en vivo",
    secondaryCta: "Habla con nuestro equipo",
    bullets: [
      "Funciona con tus números actuales (Twilio, Bland.ai, etc.)",
      "Conversaciones a nivel humano en inglés y español",
      "Intake, enrutamiento y datos listos para tu CRM en cada llamada",
    ],
  },
};

export default function HomePage() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 grid gap-10 md:grid-cols-2 items-center">
        {/* Columna texto */}
        <div className="space-y-5">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-sky-500 uppercase">
            {t.kpi}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 transition-colors"
            >
              {t.primaryCta}
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t.secondaryCta}
            </Link>
          </div>

          <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna imágenes premium */}
        <div className="relative">
          <div className="relative rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-xl overflow-hidden">
            <Image
              src="/images/premium/frontdesk-dashboard-main.jpg"
              alt="FrontDesk Agents AI receptionist dashboard"
              width={900}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -right-4 hidden sm:block w-40">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
              <Image
                src="/images/premium/frontdesk-multilingual-inbox.jpg"
                alt="Multilingual inbox preview"
                width={400}
                height={260}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="absolute -top-6 -left-6 hidden sm:block w-32">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
              <Image
                src="/images/premium/frontdesk-analytics-retention.jpg"
                alt="Call analytics and retention"
                width={320}
                height={220}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
