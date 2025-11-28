// app/page.tsx
import Link from "next/link";
import { IndustriesGrid } from "./components/IndustriesGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO PRINCIPAL */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/40">
              AI PHONE OS · FrontDesk Agents
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Convierte cada llamada, WhatsApp y email
              <span className="block text-cyan-300">
                en ingresos reservados en menos de 60 segundos.
              </span>
            </h1>
            <p className="text-sm text-slate-300 sm:text-base">
              AI receptionists y agentes de voz listos para producción que
              atienden 24/7, califican leads, agendan citas y registran cada
              interacción con calidad Fortune-500.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              >
                Iniciar demo guiada
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-slate-200 hover:text-cyan-200"
              >
                Ver precios y planes <span aria-hidden>→</span>
              </Link>
            </div>

            <dl className="grid max-w-md grid-cols-3 gap-4 text-xs text-slate-300">
              <div>
                <dt className="font-semibold text-white">24/7</dt>
                <dd className="text-slate-400">Cobertura continua</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">+38%</dt>
                <dd className="text-slate-400">Más citas confirmadas</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">GDPR / CCPA</dt>
                <dd className="text-slate-400">Listo para compliance</dd>
              </div>
            </dl>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Command Center
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Panel unificado de llamadas, mensajes y citas para todo tu
              negocio. Diseñado para equipos que viven de cada cliente que
              entra por teléfono.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li>• Enrutamiento inteligente por idioma y horario.</li>
              <li>• Grabaciones, transcripciones y notas automáticas.</li>
              <li>• Integración con tu CRM, calendarios y facturación.</li>
            </ul>
            <div className="mt-4 rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-2 text-[11px] text-cyan-100">
              “Configura una vez, y deja que el sistema atienda, califique y
              reserve como un equipo humano experto.”
            </div>
          </div>
        </div>
      </section>

      {/* GRID DE INDUSTRIAS CON IMÁGENES PREMIUM */}
      <IndustriesGrid />

      {/* SECCIÓN FINAL DE CONFIANZA */}
      <section className="border-t border-white/5 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Listo para operar como un call center de clase mundial.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Diseñado para clínicas, despachos legales, real estate,
              contractors, hoteles y más. Una sola plataforma para capturar
              cada oportunidad.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-slate-300 sm:flex-row sm:items-center">
            <div>
              <span className="block font-semibold text-white">
                HIL / Human-in-the-Loop
              </span>
              <span className="block text-slate-400">
                Escala a un humano solo cuando es crítico.
              </span>
            </div>
            <div className="hidden h-10 w-px bg-slate-700 sm:block" />
            <div>
              <span className="block font-semibold text-white">
                Trust & Compliance
              </span>
              <span className="block text-slate-400">
                Registros auditables, data-minimization y rutas seguras.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
