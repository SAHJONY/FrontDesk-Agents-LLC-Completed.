// app/admin/page.tsx
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
            OWNER ADMIN DASHBOARD
          </p>
          <h1 className="text-xl font-semibold text-slate-50">
            Control Center del dueño · Configuración global
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Desde aquí controlas industrias activas, canales, precios,
            límites de llamadas y equipos. Listo para conectar con tu backend.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-slate-600/70 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-200"
        >
          ← Back to Home
        </Link>
      </div>

      {/* KPI CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-[11px] text-slate-400">Llamadas hoy</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">382</p>
          <p className="mt-1 text-[11px] text-emerald-400">
            +18% vs. promedio 7 días
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-[11px] text-slate-400">Show-up rate citas</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">92%</p>
          <p className="mt-1 text-[11px] text-cyan-300">
            Objetivo mínimo: 85%
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-[11px] text-slate-400">Revenue atribuido al AI</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">
            $128,400
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Últimos 30 días</p>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-[11px] text-slate-400">Industrias activas</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">4</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Médica, Legal, Real Estate, Servicios
          </p>
        </div>
      </div>

      {/* CONFIG BLOCKS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-xs font-semibold text-slate-200">
            Configuración de Canales
          </p>
          <p className="text-[11px] text-slate-400">
            Activa o desactiva canales globalmente. Aquí luego conectamos tu
            backend (Twilio, WhatsApp, email, etc.).
          </p>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li>✅ Teléfono · Números DID activos</li>
            <li>✅ WhatsApp Business · Integrado</li>
            <li>✅ Email · Inbound/Outbound</li>
            <li>⏳ SMS · En preparación</li>
          </ul>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <p className="text-xs font-semibold text-slate-200">
            Planes & Pricing (solo Owner)
          </p>
          <p className="text-[11px] text-slate-400">
            Control interno de planes para clientes: Starter, Professional,
            Enterprise. Aquí luego conectamos Stripe/HubSpot.
          </p>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li>Starter · $399/mo · 1 AI receptionist</li>
            <li>Professional · $899/mo · 3 agentes + multilenguaje</li>
            <li>Enterprise · $1,799/mo · ilimitado + SLA</li>
          </ul>
        </div>
      </div>

      <p className="mt-5 text-[11px] text-slate-500">
        Próximo paso técnico: conectar estos bloques con tus APIs reales (calls,
        billing, CRM) y proteger la ruta <code>/admin</code> con auth.
      </p>
    </div>
  );
}
