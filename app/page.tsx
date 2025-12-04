"use client";

import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";

const copy = {
  en: {
    badge: "AI RECEPTIONIST • 24/7",
    heroTitle: "FrontDesk Agents answers, qualifies, and routes your calls 24/7.",
    heroSubtitle:
      "Stop losing money every time the phone rings. Our AI receptionists cover your phones day and night, qualify callers, and route them to the right place.",
    primaryCta: "Start with a live demo",
    secondaryCta: "Talk to our team",
    bullets: [
      "24/7 coverage with human-level voice AI",
      "No more missed calls or full voicemail boxes",
      "Smart routing, qualification, and intake for every caller",
    ],
    langToggle: "ES",
  },
  es: {
    badge: "RECEPCIONISTA IA • 24/7",
    heroTitle:
      "FrontDesk Agents atiende, califica y enruta tus llamadas las 24/7.",
    heroSubtitle:
      "Deja de perder dinero cada vez que suena el teléfono. Nuestros recepcionistas de IA cubren tus llamadas día y noche, califican a los clientes y los envían al lugar correcto.",
    primaryCta: "Comienza con una demo en vivo",
    secondaryCta: "Habla con nuestro equipo",
    bullets: [
      "Cobertura 24/7 con voz IA a nivel humano",
      "Nunca más llamadas perdidas ni buzones llenos",
      "Enrutamiento inteligente, calificación e intake de cada llamada",
    ],
    langToggle: "EN",
  },
};

export default function HomePage() {
  const { lang, setLang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Barra superior simple con selector de idioma */}
      <header className="w-full border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-sky-500" />
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              FrontDesk Agents
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 text-slate-700"
          >
            {t.langToggle}
          </button>
        </div>
      </header>

      {/* HERO – pegado arriba en móvil */}
      <section className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 flex flex-col gap-6">
          <p className="text-[11px] tracking-[0.25em] text-sky-500 font-semibold uppercase">
            {t.badge}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl">
            {t.heroSubtitle}
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
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              {t.secondaryCta}
            </Link>
          </div>

          <ul className="mt-1 space-y-1 text-xs sm:text-sm text-slate-600">
            {t.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Línea fina al final para dar cierre visual */}
      <div className="w-full border-t border-slate-100" />
    </main>
  );
}
