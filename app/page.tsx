// app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";
import { useTheme } from "./providers/ThemeProvider";
import { BRAND } from "./config/branding";

export default function HomePage() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const isEn = lang === "en";

  const t = {
    badge: isEn ? "AI RECEPTIONIST • 24/7" : "RECEPCIONISTA IA • 24/7",
    title: isEn
      ? "Never miss a call again."
      : "Nunca vuelvas a perder una llamada.",
    subtitle: isEn
      ? "FrontDesk Agents answers, qualifies, and routes your calls 24/7 so you stop losing money every time the phone rings."
      : "FrontDesk Agents responde, califica y enruta tus llamadas 24/7 para que dejes de perder dinero cada vez que suena el teléfono.",
    primaryCta: isEn ? "Start with a live demo" : "Comienza con una demo en vivo",
    secondaryCta: isEn ? "Talk to our team" : "Habla con nuestro equipo",
    bullet1: isEn
      ? "24/7 coverage with human-level voice AI"
      : "Cobertura 24/7 con voz IA a nivel humano",
    bullet2: isEn
      ? "No more missed calls or full voicemail boxes"
      : "Sin llamadas perdidas ni buzones llenos",
    bullet3: isEn
      ? "Smart routing, qualification and intake for every caller"
      : "Enrutamiento, calificación y registro inteligente de cada llamada",
    menuDashboard: isEn ? "Dashboard" : "Panel",
    menuPricing: isEn ? "Pricing" : "Precios",
    menuSupport: isEn ? "Support" : "Soporte",
    menuLogin: isEn ? "Log in" : "Iniciar sesión",
    toggleTheme: isEn ? "Theme" : "Tema",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl border border-cyan-400/50 bg-slate-900/80 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
            <div>
              <p className="text-sm font-semibold tracking-tight">
                {BRAND.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/90">
                {BRAND.tagline}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden gap-6 text-xs font-medium text-slate-200/80 sm:flex">
            <Link href="/dashboard" className="hover:text-cyan-300">
              {t.menuDashboard}
            </Link>
            <Link href="/pricing" className="hover:text-cyan-300">
              {t.menuPricing}
            </Link>
            <Link href="/support" className="hover:text-cyan-300">
              {t.menuSupport}
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language */}
            <button
              type="button"
              onClick={() => setLang(isEn ? "es" : "en")}
              className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-cyan-400/60"
            >
              {isEn ? "EN · ES" : "ES · EN"}
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-cyan-400/40 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-cyan-200 hover:border-cyan-300"
            >
              {t.toggleTheme}
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="hidden rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-900 shadow-sm hover:bg-slate-100 sm:inline-block"
            >
              {t.menuLogin}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:py-20">
        {/* Text */}
        <section className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {t.badge}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {t.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {t.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="flex-1 rounded-full bg-cyan-500 px-5 py-3 text-center text-xs font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:bg-cyan-400"
            >
              {t.primaryCta}
            </Link>
            <Link
              href="/support"
              className="flex-1 rounded-full border border-slate-500/60 bg-slate-900/60 px-5 py-3 text-center text-xs font-semibold text-slate-100 hover:border-cyan-400/60"
            >
              {t.secondaryCta}
            </Link>
          </div>

          {/* Bullets */}
          <ul className="mt-6 space-y-2 text-xs text-slate-300">
            <li>• {t.bullet1}</li>
            <li>• {t.bullet2}</li>
            <li>• {t.bullet3}</li>
          </ul>
        </section>

        {/* Premium image / dashboard preview */}
        <section className="w-full md:w-1/2">
          <div className="relative rounded-3xl border border-cyan-400/30 bg-slate-900/80 p-4 shadow-[0_0_60px_rgba(34,211,238,0.45)]">
            <div className="mb-3 flex items-center justify-between text-[11px] text-slate-300">
              <span>{isEn ? "Live call intelligence" : "Inteligencia en vivo"}</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                24/7 • ACTIVE
              </span>
            </div>
            <div className="h-52 rounded-2xl bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('/images/premium/dashboard_main_4k.jpg')",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
