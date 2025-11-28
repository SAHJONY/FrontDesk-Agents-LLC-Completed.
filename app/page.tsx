// app/page.tsx
import Link from "next/link";

import IndustriesGrid from "./components/IndustriesGrid";
import PricingTable from "./components/PricingTable";
import ProductScreenshots from "./components/ProductScreenshots";
import SystemStatusBar from "./components/SystemStatusBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Barra de estado arriba (uptime, llamadas, etc.) */}
      <SystemStatusBar />

      {/* HERO PRINCIPAL */}
      <section className="px-4 py-16 sm:py-20 lg:py-24 max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-4">
              FRONTDESK AGENTS · AI PHONE OS
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50 mb-4">
              Convierte cada llamada, WhatsApp y email en{" "}
              <span className="text-cyan-300">ingresos reservados</span> en
              menos de 60 segundos.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-3">
              Un OS de telefonía con agentes de voz, flujos y bandejas de
              entrada listos para industrias de alto valor.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mb-6">
              Por defecto trabaja en <span className="font-semibold">
                English + Español
              </span>{" "}
              y puede auto-configurarse en{" "}
              <span className="font-semibold">100+ idiomas y dialectos</span>{" "}
              para que cada cliente escuche a su recepcionista en su propio
              idioma.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
              >
                Iniciar demo guiada
              </Link>
              <Link
                href="/app/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                Ver precios y planes
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">
                Multilingual by default
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-600 px-3 py-1 text-[11px] text-slate-300">
                EN · ES · +100 idiomas & dialectos
              </span>
            </div>

            <p className="text-xs text-slate-400">
              24/7 · Grabado, auditable y compatible con{" "}
              <span className="text-slate-100">HIPAA / GDPR / CCPA</span>.
            </p>
          </div>

          {/* Previews del producto */}
          <div className="relative">
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-2xl shadow-cyan-500/15 overflow-hidden">
              <ProductScreenshots />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -left-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-3 text-xs text-cyan-100 backdrop-blur">
              <p className="font-semibold">+38% más citas confirmadas</p>
              <p className="text-[11px] text-cyan-100/80">
                Promedio en clientes piloto en 90 días.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CINTA DE CUMPLIMIENTO */}
      <section className="border-y border-slate-800 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
            GDPR / CCPA–Ready
          </span>
          <span>Grabación completa de llamadas y WhatsApp.</span>
          <span className="hidden sm:inline">Logs auditables 24/7.</span>
          <span className="hidden lg:inline">
            Human-in-the-loop opcional para casos críticos.
          </span>
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section
        id="industries"
        className="max-w-6xl mx-auto px-4 py-14 sm:py-16 lg:py-20"
      >
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              Built for your industry
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              From first ring to booked revenue, con playbooks listos para
              ejecutar.
            </p>
          </div>
          <Link
            href="/industries"
            className="hidden sm:inline-flex text-xs font-medium text-cyan-300 hover:text-cyan-100"
          >
            Ver todos los sectores →
          </Link>
        </div>

        <IndustriesGrid />
      </section>

      {/* PRECIOS */}
      <section
        id="pricing"
        className="border-t border-slate-800 bg-slate-950/80"
      >
        <div className="max-w-6xl mx-auto px-4 py-14 sm:py-16 lg:py-20">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                Pricing para cerrar más deals, no solo contestar llamadas
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Planes mensuales simples, sin contratos largos. Escala por
                ubicación, inbox o volumen de llamadas.
              </p>
            </div>
            <Link
              href="/app/pricing"
              className="hidden sm:inline-flex text-xs font-medium text-cyan-300 hover:text-cyan-100"
            >
              Comparar planes →
            </Link>
          </div>

          <PricingTable />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-14 lg:py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-400 mb-3">
            LISTO PARA EL PILOTO
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-3">
            Lanza tu AI Receptionist en menos de{" "}
            <span className="text-cyan-300">7 días hábiles</span>.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-6">
            Configuramos flujos, scripts y bandejas de entrada contigo.
            Grabación, compliance y reportes incluidos desde el día uno – en el
            idioma de cada cliente.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
            >
              Agendar implementación
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-200 transition"
            >
              Hablar con un especialista
            </Link>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Sin contrato anual · Cancelas cuando quieras · Soporte humano
            incluido.
          </p>
        </div>
      </section>
    </main>
  );
}
