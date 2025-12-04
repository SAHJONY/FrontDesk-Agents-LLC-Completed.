"use client";

import { useEffect, useState } from "react";
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

type Theme = "light" | "dark";

export default function HomePage() {
  const { lang, setLang } = useLanguage();
  const t = copy[lang];

  const [theme, setTheme] = useState<Theme>("light");

  // Inicializa tema desde localStorage o preferencia del sistema
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme =
      stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Aplica cambios cuando el usuario cambia el tema
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors">
      {/* Top bar with brand, language + theme toggles */}
      <header className="w-full border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-sky-500" />
            <span className="text-sm font-semibold tracking-tight">
              FrontDesk Agents
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 shadow-sm"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 bg-white dark:bg-slate-900"
            >
              {t.langToggle}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 flex flex-col gap-6">
          <p className="text-[11px] tracking-[0.25em] text-sky-500 font-semibold uppercase">
            {t.badge}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
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
              className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t.secondaryCta}
            </Link>
          </div>

          <ul className="mt-1 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="w-full border-t border-slate-100 dark:border-slate-800" />
    </main>
  );
}
