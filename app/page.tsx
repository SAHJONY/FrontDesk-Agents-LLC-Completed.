// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "./config/branding";
import { useLanguage } from "./providers/LanguageProvider";
import { useTheme } from "./providers/ThemeProvider";

const copy = {
  en: {
    heroKicker: "AI RECEPTIONIST • 24/7",
    heroTitle: "Never miss a billable call again.",
    heroSubtitle:
      "FrontDesk Agents answers, qualifies, and routes your calls 24/7 so you stop losing money every time the phone rings.",
    ctaPrimary: "Start with a live demo",
    ctaSecondary: "Talk to our team",
    bullets: [
      "24/7 coverage with human-level voice AI",
      "No more missed calls or full voicemail boxes",
      "Smart routing, qualification, and intake for every caller",
    ],
    menu: {
      demo: "Demo",
      pricing: "Pricing",
      industries: "Industries",
      support: "Support",
      login: "Login",
      signup: "Get started",
    },
  },
  es: {
    heroKicker: "RECEPCIONISTA VIRTUAL • 24/7",
    heroTitle: "Nunca más pierdas una llamada de dinero.",
    heroSubtitle:
      "FrontDesk Agents atiende, califica y enruta tus llamadas 24/7 para que dejes de perder clientes cada vez que suena el teléfono.",
    ctaPrimary: "Comienza con una demo en vivo",
    ctaSecondary: "Habla con nuestro equipo",
    bullets: [
      "Cobertura 24/7 con voz IA a nivel humano",
      "Sin llamadas perdidas ni buzones llenos",
      "Enrutamiento, calificación e intake inteligente en cada llamada",
    ],
    menu: {
      demo: "Demo",
      pricing: "Precios",
      industries: "Industrias",
      support: "Soporte",
      login: "Acceder",
      signup: "Crear cuenta",
    },
  },
};

export default function HomePage() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = copy[lang];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="w-full border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-cyan-400/40 bg-slate-900/80">
              <Image
                src={theme === "dark" ? BRAND.logoDark : BRAND.logoLight}
                alt={BRAND.name}
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                {BRAND.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
                {BRAND.tagline}
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-200/80 md:flex">
            <Link href="/demo" className="hover:text-white">
              {t.menu.demo}
            </Link>
            <Link href="/pricing" className="hover:text-white">
              {t.menu.pricing}
            </Link>
            <Link href="/industries" className="hover:text-white">
              {t.menu.industries}
            </Link>
            <Link href="/support" className="hover:text-white">
              {t.menu.support}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-200 hover:border-cyan-400/70 hover:text-white"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-700 bg-slate-900/80 p-1.5 text-slate-200 hover:border-cyan-400/70 hover:text-white"
              aria-label="Toggle light/dark mode"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-full px-3 py-1 text-xs font-medium text-slate-200 hover:text-white"
              >
                {t.menu.login}
              </Link>
              <Link
                href="/setup"
                className="rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-400"
              >
                {t.menu.signup}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 items-center">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
          <section className="flex flex-col justify-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {t.heroKicker}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-xl text-sm text-slate-300">
              {t.heroSubtitle}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-400"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            <ul className="mt-3 space-y-1 text-xs text-slate-300">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Premium hero image */}
          <section className="relative h-72 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_0_80px_rgba(56,189,248,0.35)] md:h-96">
            <Image
              src={BRAND.heroImage}
              alt="AI receptionists routing calls"
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-xs text-slate-100 backdrop-blur">
              <p className="font-semibold">
                Live AI reception in under 24 hours.
              </p>
              <p className="text-[11px] text-slate-300">
                Plug-and-play with your existing phone numbers and CRMs.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
