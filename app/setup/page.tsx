// app/setup/page.tsx
import type { Metadata } from "next";
import AISetupForm, {
  type SupportedLang,
} from "../components/AISetupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FrontDesk Agents – Initial AI Setup",
  description:
    "Configure your FrontDesk AI receptionist in less than 60 seconds. Multilingual, 24/7, Fortune-500 grade call handling.",
};

// Tipamos los searchParams que Next.js pasa a los page components
interface SetupPageProps {
  searchParams?: {
    lang?: string;
  };
}

export default function SetupPage({ searchParams }: SetupPageProps) {
  // Idioma por defecto si no viene nada en la URL: "es"
  const rawLang = searchParams?.lang;
  const lang: SupportedLang = rawLang === "en" ? "en" : "es";

  const isEs = lang === "es";

  const t = {
    eyebrow: isEs ? "Activación inicial" : "Initial activation",
    title: isEs
      ? "Pon a trabajar a tu recepcionista IA hoy mismo"
      : "Put your AI receptionist to work today",
    subtitle: isEs
      ? "Completa estos datos básicos y el sistema configurará tu agente para atender llamadas, WhatsApp y correos de tu negocio como un equipo de recepción premium."
      : "Fill in these basic details and the system will configure your AI agent to handle your calls, WhatsApp, and emails like a premium reception team.",
    backHome: isEs ? "Volver al inicio" : "Back to home",
    visualTitle: isEs
      ? "Vista previa del Command Center"
      : "Command Center preview",
    visualSubtitle: isEs
      ? "Monitorea en tiempo real llamadas, agendas, ingresos y rendimiento de cada agente virtual."
      : "Monitor in real time calls, bookings, revenue and performance of every virtual agent.",
    languageLabel: isEs ? "Idioma del sitio" : "Site language",
    langEs: "Español",
    langEn: "English",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Capa de fondo premium */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.25),_transparent_60%)] opacity-80" />

      {/* Contenido */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header superior con back + selector de idioma */}
        <header className="flex items-center justify-between px-4 py-4 sm:px-8 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 hover:text-white"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-[10px]">
                ⟵
              </span>
              <span>{t.backHome}</span>
            </Link>
          </div>

          {/* Selector de idioma simple (link-based) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-400">{t.languageLabel}:</span>
            <div className="inline-flex rounded-full bg-slate-900/60 p-1 border border-slate-700/70">
              <Link
                href="/setup?lang=es"
                className={`px-3 py-1 rounded-full ${
                  lang === "es"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {t.langEs}
              </Link>
              <Link
                href="/setup?lang=en"
                className={`px-3 py-1 rounded-full ${
                  lang === "en"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {t.langEn}
              </Link>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
            {/* Lado izquierdo: formulario */}
            <section className="fd-card bg-slate-950/80 border border-slate-800/80 shadow-2xl shadow-sky-900/40">
              <div className="mb-4 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                  {t.eyebrow}
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                  {t.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-300">
                  {t.subtitle}
                </p>
              </div>

              {/* Formulario de setup IA */}
              <AISetupForm lang={lang} />
            </section>

            {/* Lado derecho: visual premium */}
            <aside className="space-y-4">
              <div className="fd-card bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-sky-500/40 shadow-[0_0_60px_rgba(56,189,248,0.45)]">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
                  {t.visualTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-4">
                  {t.visualSubtitle}
                </p>

                {/* Fake dashboard visual */}
                <div className="space-y-3 rounded-xl bg-slate-950/70 p-3 sm:p-4 border border-slate-800/80">
                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 text-[10px] sm:text-xs">
                    <div className="rounded-lg bg-slate-900/80 px-2 py-2 border border-sky-500/40">
                      <p className="text-slate-400">
                        {isEs ? "Llamadas hoy" : "Calls today"}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-sky-400">
                        128
                      </p>
                      <p className="text-[10px] text-emerald-400">
                        +23% {isEs ? "vs. ayer" : "vs. yesterday"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-900/80 px-2 py-2 border border-violet-500/40">
                      <p className="text-slate-400">
                        {isEs ? "Citas reservadas" : "Booked appointments"}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-violet-400">
                        47
                      </p>
                      <p className="text-[10px] text-emerald-400">
                        +38% {isEs ? "confirmadas" : "confirmed"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-900/80 px-2 py-2 border border-emerald-500/40">
                      <p className="text-slate-400">
                        {isEs ? "Ingresos proyectados" : "Projected revenue"}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-emerald-400">
                        $18.4k
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {isEs ? "Próx. 30 días" : "Next 30 days"}
                      </p>
                    </div>
                  </div>

                  {/* Call list mock */}
                  <div className="mt-3 rounded-lg bg-slate-900/80 border border-slate-800/80 p-2 sm:p-3">
                    <div className="flex items-center justify-between mb-2 text-[11px] sm:text-xs text-slate-400">
                      <span>
                        {isEs ? "Llamadas en tiempo real" : "Live calls"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        {isEs ? "En línea" : "Online"}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-[10px] sm:text-xs">
                      <div className="flex items-center justify-between rounded-md bg-slate-950/80 px-2 py-1.5">
                        <span className="text-slate-200">
                          +1 (713) ·· 8843 ·{" "}
                          {isEs ? "Paciente nuevo" : "New patient"}
                        </span>
                        <span className="text-sky-400">
                          {isEs ? "Agendando" : "Booking"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-md bg-slate-950/80 px-2 py-1.5">
                        <span className="text-slate-200">
                          +1 (305) ·· 9921 ·{" "}
                          {isEs ? "Consulta legal" : "Legal consult"}
                        </span>
                        <span className="text-violet-400">
                          {isEs ? "Calificando" : "Qualifying"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-md bg-slate-950/80 px-2 py-1.5">
                        <span className="text-slate-200">
                          +1 (832) ·· 7710 ·{" "}
                          {isEs ? "Lead inmobiliario" : "Real estate lead"}
                        </span>
                        <span className="text-emerald-400">
                          {isEs ? "Cerrado" : "Closed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nota de seguridad / compliance breve */}
              <p className="text-[10px] sm:text-xs text-slate-400">
                {isEs
                  ? "Todos los datos se procesan con cifrado extremo a extremo y cumplimiento HIPAA/GDPR cuando aplica."
                  : "All data is processed with end-to-end encryption and HIPAA/GDPR compliance where applicable."}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
