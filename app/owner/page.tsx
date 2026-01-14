// app/owner/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function OwnerDashboardPage() {
  const hero = getPageHero("owner");
  return (
    <main className="min-h-screen px-4 py-10 lg:px-8 bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.35em] text-sky-400 uppercase">
            OWNER CONTROL CENTER
          </p>
          {hero && (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {hero.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                {hero.description}
              </p>
            </>
          )}
        </header>

        {hero && (
          <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Pagos */}
          <Link
            href="/owner/payments"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-sky-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-sky-400 mb-1">
              COBROS & SUSCRIPCIONES
            </p>
            <h2 className="text-lg font-semibold mb-2">
              Payments Dashboard
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Administra Stripe, Square, PayPal, Cash App, Zelle y
              transferencias bancarias en un solo lugar.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-sky-300">
              Abrir panel de pagos →
            </span>
          </Link>

          {/* Onboarding */}
          <Link
            href="/owner/onboarding"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-emerald-400 mb-1">
              CLIENT ONBOARDING
            </p>
            <h2 className="text-lg font-semibold mb-2">
              Onboarding Checklist
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Checklist paso a paso para activar un nuevo negocio en menos
              de 24 horas.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-emerald-300">
              Ver checklist →
            </span>
          </Link>

          {/* Demo & Ventas */}
          <Link
            href="/demo"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-violet-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-violet-400 mb-1">
              SALES PIPELINE
            </p>
            <h2 className="text-lg font-semibold mb-2">
              Demo & Calendly
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Revisa y prueba el flujo de agendamiento de demos en vivo con
              tus prospectos.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-violet-300">
              Ir a la página de demo →
            </span>
          </Link>

          {/* Dashboard cliente */}
          <Link
            href="/dashboard"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-amber-400 mb-1">
              CLIENT VIEW
            </p>
            <h2 className="text-lg font-semibold mb-2">
              Client Dashboard
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Mira cómo se ve el panel para un cliente activo: llamadas,
              retención y performance.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-amber-300">
              Ver dashboard →
            </span>
          </Link>

          {/* Admin general */}
          <Link
            href="/admin"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-fuchsia-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-fuchsia-400 mb-1">
              SYSTEM CONTROL
            </p>
            <h2 className="text-lg font-semibold mb-2">
              Admin & Settings
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Acceso a configuraciones avanzadas, logs, webhooks y ajustes
              internos del sistema.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-fuchsia-300">
              Ir a Admin →
            </span>
          </Link>

          {/* AI Agents */}
          <Link
            href="/ai-agents"
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-400 hover:bg-slate-900 transition-colors"
          >
            <p className="text-xs font-semibold text-cyan-400 mb-1">
              VOICE & AI
            </p>
            <h2 className="text-lg font-semibold mb-2">
              AI Agents Overview
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Ver el catálogo de agentes (Alex, Sara, etc.) y su rol en la
              operación.
            </p>
            <span className="text-xs text-slate-400 group-hover:text-cyan-300">
              Ver AI Agents →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
