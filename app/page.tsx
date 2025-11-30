"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "./components/LangProvider";

export default function HomePage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const t = {
    heroTitle: isEs
      ? "Convierte cada llamada, WhatsApp y email en ingresos reservados en menos de 60 segundos."
      : "Turn every call, WhatsApp and email into booked revenue in under 60 seconds.",
    heroSubtitle: isEs
      ? "FrontDesk Agents es tu recepcionista IA 24/7: atiende, califica, agenda y documenta cada contacto como si fuera tu mejor empleado… sin ausencias, sin pérdida de leads."
      : "FrontDesk Agents is your 24/7 AI receptionist: it answers, qualifies, books and documents every contact like your best employee… no missed calls, no lost leads.",
    heroPrimaryCta: isEs ? "Iniciar demo guiada" : "Start guided demo",
    heroSecondaryCta: isEs ? "Ver precios y planes" : "View pricing plans",
    trustLine: isEs
      ? "+38% más citas confirmadas en clínicas, bufetes y negocios de servicios."
      : "+38% more confirmed appointments for clinics, law firms and service businesses.",
    stripTitle: isEs
      ? "Diseñado para negocios que viven de cada llamada"
      : "Designed for businesses that live on every call",
    stripMedical: isEs ? "Clínicas Médicas & Dental" : "Medical & Dental Clinics",
    stripLaw: isEs ? "Bufetes & Firmas Legales" : "Law Firms & Legal Services",
    stripRealEstate: isEs ? "Inversionistas & Real Estate" : "Investors & Real Estate",
    stripHomeServices: isEs ? "Servicios al Hogar & Contratistas" : "Home Services & Contractors",
    sectionHowTitle: isEs
      ? "Cómo funciona el Command Center de Recepción IA"
      : "How the AI Reception Command Center works",
    sectionHowCol1Title: isEs ? "1. Atiende todo 24/7" : "1. Answers everything 24/7",
    sectionHowCol1Body: isEs
      ? "Tu número de siempre, con una recepción IA que responde en segundos, en tu idioma y con tu guion."
      : "Your existing number, with an AI receptionist that answers in seconds, in your language and with your script.",
    sectionHowCol2Title: isEs ? "2. Califica & agenda" : "2. Qualifies & books",
    sectionHowCol2Body: isEs
      ? "Clasifica urgencias, agenda citas en tu calendario, envía recordatorios y evita no-shows."
      : "Qualifies urgency, books appointments in your calendar, sends reminders and reduces no-shows.",
    sectionHowCol3Title: isEs ? "3. Registra todo" : "3. Logs everything",
    sectionHowCol3Body: isEs
      ? "Cada llamada, WhatsApp y email queda auditado con notas, etiquetas y resultados para tu equipo."
      : "Every call, WhatsApp and email is logged with notes, tags and outcomes for your team.",
    metricsTitle: isEs ? "Lo que ven nuestros clientes" : "What our customers see",
    metrics1Label: isEs ? "Más citas confirmadas" : "More confirmed appointments",
    metrics2Label: isEs ? "Reducción de llamadas perdidas" : "Drop in missed calls",
    metrics3Label: isEs ? "Ahorro frente a recepcionista humana" : "Savings vs. human receptionist",
    premiumTitle: isEs
      ? "Interfaz premium estilo Fortune 500, lista para auditores y directores."
      : "Fortune 500-grade interface, ready for executives and auditors.",
    premiumBody: isEs
      ? "Paneles claros, filtros avanzados, exportación de evidencias y control centralizado para el dueño de la operación."
      : "Clear dashboards, advanced filters, evidence export and centralized control for the owner.",
    premiumCta: isEs ? "Ver Command Center del Owner" : "View Owner Command Center",
  };

  return (
    <div className="bg-slate-950 text-slate-50">
      {/* HERO SECTION */}
      <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 lg:flex lg:items-center lg:gap-10">
          {/* Left column: text */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
              <span>AI Reception • 24/7 • Multi-language</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition"
              >
                {t.heroPrimaryCta}
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-300 hover:bg-slate-900/60 transition"
              >
                {t.heroSecondaryCta}
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-slate-400">{t.trustLine}</p>
          </div>

          {/* Right column: premium mockups */}
          <div className="mt-10 lg:mt-0 flex-1">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="relative rounded-2xl border border-slate-700/70 bg-slate-900/80 p-3 shadow-2xl shadow-slate-900/80">
                <div className="grid grid-cols-2 gap-3">
                  {/* Medical */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80">
                    <Image
                      src="/images/fd-medical-hero.jpg"
                      alt="Medical & Dental Command Center"
                      width={640}
                      height={400}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-100">
                        {t.stripMedical}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        24/7 triage, citas, recordatorios y no-shows bajo control.
                      </p>
                    </div>
                  </div>

                  {/* Legal */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80">
                    <Image
                      src="/images/fd-legal-hero.jpg"
                      alt="Law Firm Command Center"
                      width={640}
                      height={400}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-100">
                        {t.stripLaw}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Intake legal, conflictos, agenda de consultas y evidencia auditable.
                      </p>
                    </div>
                  </div>

                  {/* Real Estate */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80">
                    <Image
                      src="/images/fd-realestate-hero.jpg"
                      alt="Real Estate & Investors Command Center"
                      width={640}
                      height={400}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-100">
                        {t.stripRealEstate}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Leads calientes, seguimiento, tours agendados y cierre más rápido.
                      </p>
                    </div>
                  </div>

                  {/* Home Services */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80">
                    <Image
                      src="/images/fd-home-hero.jpg"
                      alt="Home Services Command Center"
                      width={640}
                      height={400}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-100">
                        {t.stripHomeServices}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Cuadrillas ocupadas, rutas optimizadas y menos horas muertas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating metrics card */}
              <div className="absolute -bottom-6 -left-4 hidden sm:block">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/95 px-4 py-3 shadow-lg shadow-slate-900/80">
                  <p className="text-[11px] font-semibold text-slate-200">
                    {t.metricsTitle}
                  </p>
                  <div className="mt-2 flex gap-4 text-[11px] text-slate-300">
                    <div>
                      <p className="font-semibold text-emerald-400">+38%</p>
                      <p>{t.metrics1Label}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sky-400">-72%</p>
                      <p>{t.metrics2Label}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-300">-65%</p>
                      <p>{t.metrics3Label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">
            {t.sectionHowTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                {t.sectionHowCol1Title}
              </h3>
              <p className="text-xs text-slate-300">{t.sectionHowCol1Body}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                {t.sectionHowCol2Title}
              </h3>
              <p className="text-xs text-slate-300">{t.sectionHowCol2Body}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                {t.sectionHowCol3Title}
              </h3>
              <p className="text-xs text-slate-300">{t.sectionHowCol3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM OWNER COMMAND CENTER STRIP */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
              {t.premiumTitle}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">{t.premiumBody}</p>
            <Link
              href="/owner"
              className="inline-flex items-center justify-center rounded-md border border-sky-500/60 bg-sky-500/15 px-4 py-2 text-xs sm:text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition mt-2"
            >
              {t.premiumCta}
            </Link>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-4 shadow-2xl shadow-slate-900/90">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-3">
                <span>Owner Command Center</span>
                <span>Live KPIs</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">
                    Today – Answered
                  </p>
                  <p className="mt-1 text-lg font-semibold text-emerald-400">
                    124
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">
                    Booked revenue
                  </p>
                  <p className="mt-1 text-lg font-semibold text-amber-300">
                    $18.4K
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] text-slate-400">
                    Missed calls
                  </p>
                  <p className="mt-1 text-lg font-semibold text-sky-400">
                    0
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                Datos ilustrativos. En producción se conectan a tus métricas
                reales (Twilio, WhatsApp, CRM, facturación).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
