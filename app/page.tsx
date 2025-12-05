"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";
import { premiumBranding } from "./config/branding";

export default function LandingPage() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const copy = {
    badge: isEn ? "24/7 AI RECEPTIONIST PLATFORM" : "PLATAFORMA DE RECEPCIONISTA IA 24/7",
    title: isEn
      ? "Turn every missed call into a booked appointment."
      : "Convierte cada llamada perdida en una cita reservada.",
    subtitle: isEn
      ? "FrontDesk Agents answers, qualifies and books for your business in any language, on every channel, without you lifting a finger."
      : "FrontDesk Agents contesta, califica y agenda para tu negocio en cualquier idioma y canal, sin que tú tengas que hacer nada.",
    ctaPrimary: isEn ? "Start free demo" : "Empezar demo gratis",
    ctaSecondary: isEn ? "Talk to our team" : "Hablar con nuestro equipo",
    trust: isEn
      ? "Built for clinics, law firms, brokers and high-volume service businesses."
      : "Diseñado para clínicas, bufetes, brokers y negocios de alto volumen.",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Background premium image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={premiumBranding.hero.main}
            alt="FrontDesk Agents – AI Receptionist"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/90 to-sky-900/40" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 lg:pt-24 lg:pb-24 grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
          {/* Texto principal */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              {copy.badge}
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
              {copy.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-xl">
              {copy.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_18px_45px_rgba(56,189,248,0.45)] hover:bg-sky-400 transition"
              >
                {copy.ctaPrimary}
              </Link>
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-100 hover:border-sky-500/60 hover:bg-slate-900/80 transition"
              >
                {copy.ctaSecondary}
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-300">{copy.trust}</p>
          </div>

          {/* Side visual – premium AI receptionist shot */}
          <div className="relative">
            <div className="relative rounded-3xl border border-sky-500/25 bg-slate-950/60 backdrop-blur-xl p-3 shadow-[0_24px_90px_rgba(15,23,42,0.95)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={premiumBranding.generic.aiReceptionist}
                  alt="AI receptionist handling calls"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/45 via-transparent to-sky-500/10" />
              </div>

              {/* Mini stats overlay */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-slate-200">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-2 py-2">
                  <p className="text-[9px] text-slate-400">
                    {isEn ? "Missed calls" : "Llamadas perdidas"}
                  </p>
                  <p className="text-sm font-semibold text-emerald-400">
                    -87%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-2 py-2">
                  <p className="text-[9px] text-slate-400">
                    {isEn ? "Booked appointments" : "Citas agendadas"}
                  </p>
                  <p className="text-sm font-semibold text-sky-400">
                    +142%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-2 py-2">
                  <p className="text-[9px] text-slate-400">
                    {isEn ? "Response time" : "Tiempo de respuesta"}
                  </p>
                  <p className="text-sm font-semibold text-amber-300">
                    &lt; 1s
                  </p>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%)]" />
          </div>
        </div>
      </section>
    </main>
  );
}
