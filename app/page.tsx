"use client";

import { useState } from "react";
import AISetupForm from "@/app/components/AISetupForm";
import PricingTable from "@/app/components/PricingTable";
import SystemStatusBar from "@/app/components/SystemStatusBar";
import ThemeToggle from "@/app/components/ThemeToggle";

type Lang = "en" | "es";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");

  const t = {
    en: {
      heroTitle: "Turn Calls, WhatsApp & Email into Revenue in 60 Seconds",
      heroSubtitle:
        "FrontDesk Agents is the AI PHONE OS that answers, qualifies, and books clients for you — across calls, WhatsApp, SMS, and email — in any language, 24/7.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "Request Enterprise Demo",
      statsLine: "+40% more booked leads · 24/7 · 100+ languages",
      setupTitle: "Set Up Your AI Receptionist",
      setupSubtitle:
        "Configure an AI-powered receptionist for your business in a few simple steps.",
      pricingTitle: "Plans that Scale with Your Growth",
      pricingSubtitle:
        "Start in minutes. Upgrade only when your call volume and revenue demand it.",
    },
    es: {
      heroTitle: "Convierte Llamadas y Mensajes en Ingresos en 60 Segundos",
      heroSubtitle:
        "FrontDesk Agents es el AI PHONE OS que atiende, califica y agenda clientes por ti — en llamadas, WhatsApp, SMS y correo — en cualquier idioma, 24/7.",
      ctaPrimary: "Empezar Prueba Gratis",
      ctaSecondary: "Solicitar Demo Enterprise",
      statsLine: "+40% más citas agendadas · 24/7 · 100+ idiomas",
      setupTitle: "Configura Tu Recepcionista de IA",
      setupSubtitle:
        "Configura una recepcionista impulsada por IA para tu negocio en línea en pocos pasos.",
      pricingTitle: "Planes que Crecen con tu Negocio",
      pricingSubtitle:
        "Activa tu recepcionista en minutos. Escala solo cuando tu volumen de llamadas lo necesite.",
    },
  }[lang];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top bar: logo, language toggle, theme toggle */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/90 text-sm font-bold text-slate-950">
              FD
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                FrontDesk Agents
              </p>
              <p className="text-[11px] text-slate-400 leading-none mt-1">
                Global AI Phone OS · 24/7 · Multilingual
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <nav className="hidden gap-4 text-slate-300 md:flex">
              <a href="#how-it-works" className="hover:text-cyan-300">
                How it Works
              </a>
              <a href="#industries" className="hover:text-cyan-300">
                Industries
              </a>
              <a href="#pricing" className="hover:text-cyan-300">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-slate-900/70 px-2 py-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={
                    "px-2 py-0.5 rounded-full " +
                    (lang === "en"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300")
                  }
                >
                  EN
                </button>
                <span className="text-slate-500">|</span>
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={
                    "px-2 py-0.5 rounded-full " +
                    (lang === "es"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300")
                  }
                >
                  ES
                </button>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative border-b border-slate-800 bg-slate-950"
        style={{
          backgroundImage: "url(/hero-office.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:py-16">
          <div className="w-full md:w-1/2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
              GLOBAL AI PHONE OS · 24/7 · MULTILINGUAL
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {t.heroTitle}
            </h1>

            <p className="mt-4 text-sm text-slate-200 md:text-base">
              {t.heroSubtitle}
            </p>

            <p className="mt-3 text-xs text-slate-400">{t.statsLine}</p>

            {/* Dual CTA block */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#pricing"
                className="btn-primary rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
              >
                {t.ctaPrimary}
              </a>
              <a
                href="/enterprise"
                className="btn-secondary rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-50/90 hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                {t.ctaSecondary}
              </a>
            </div>

            <div className="mt-4 max-w-md text-[11px] text-slate-400">
              <p>
                No engineers required. Keep your current phone numbers. Voice
                tuned for natural, human-like timing.
              </p>
            </div>
          </div>

          <div className="w-full space-y-4 md:w-1/2">
            <SystemStatusBar />
            <div
              id="how-it-works"
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40"
            >
              <h2 className="text-sm font-semibold">
                {t.setupTitle}
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                {t.setupSubtitle}
              </p>
              <div className="mt-3">
                <AISetupForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP (simple) */}
      <section
        id="industries"
        className="border-b border-slate-800 bg-slate-950/95"
      >
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            BUILT FOR HIGH-VALUE, HIGH-INTENT INDUSTRIES
          </p>
          <div className="mt-3 grid gap-3 text-xs text-slate-200 md:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-[11px] font-semibold text-cyan-300">
                Medical & Dental
              </p>
              <p className="mt-1 text-[11px]">
                Fill the calendar, pre-qualify patients, and cut no-shows with
                proactive reminders.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-[11px] font-semibold text-cyan-300">
                Law Firms
              </p>
              <p className="mt-1 text-[11px]">
                Capture every inbound lead, route by practice area, and book
                consults automatically.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-[11px] font-semibold text-cyan-300">
                Real Estate & Home Services
              </p>
              <p className="mt-1 text-[11px]">
                Qualify buyers & sellers, confirm showings, and dispatch service
                calls 24/7.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-[11px] font-semibold text-cyan-300">
                SaaS & Enterprise
              </p>
              <p className="mt-1 text-[11px]">
                Multi-region, multi-language AI reception with enterprise-grade
                compliance and APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-b border-slate-800 bg-slate-950/95"
      >
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-xl font-semibold tracking-tight">
            {t.pricingTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            {t.pricingSubtitle}
          </p>

          <div className="mt-6">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-6 text-[11px] text-slate-500 border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/legal/privacy" className="hover:text-cyan-300">
              Privacy
            </a>
            <a href="/legal/terms" className="hover:text-cyan-300">
              Terms
            </a>
            <span className="text-slate-600">
              www.frontdeskagents.com · Global AI Phone OS
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
