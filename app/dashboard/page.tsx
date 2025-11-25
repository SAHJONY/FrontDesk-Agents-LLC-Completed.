// app/dashboard/page.tsx
import Link from "next/link";
import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-1">
              LIVE · FRONTDESK AGENTS
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Command Center
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              La plataforma está LIVE. Aquí monitoreas llamadas, leads,
              WhatsApp, SMS y correos atendidos por tus agentes de IA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-300 transition"
            >
              Configurar números &lt;Setup&gt;
            </Link>
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/50 px-3 py-1 text-[11px] font-medium text-emerald-300">
              ● LIVE – Recibiendo llamadas 24/7
            </span>
          </div>
        </header>

        {/* KPI row */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Llamadas de hoy"
            subtitle="Conectadas / atendidas"
            value={0}
            badgeText="Demo"
            badgeTone="warning"
            variant="primary"
          />

          <DashboardCard
            title="Leads nuevos"
            subtitle="Últimas 24 horas"
            value={0}
            badgeText="Sync Airtable"
            badgeTone="success"
          />

          <DashboardCard
            title="Mensajes pendientes"
            subtitle="WhatsApp, SMS, email"
            value={0}
            badgeText="Nada pendiente"
            badgeTone="success"
          />

          <DashboardCard
            title="Conversiones"
            subtitle="Citas / ventas marcadas"
            value={"0%"}
            badgeText="Aún sin datos"
            badgeTone="warning"
          />
        </section>

        {/* Bottom grid */}
        <section className="grid gap-4 lg:grid-cols-3">
          <DashboardCard
            title="Actividad reciente"
            subtitle="Timeline de llamadas y mensajes"
            badgeText="Demo"
            badgeTone="warning"
            variant="outline"
          >
            <p className="text-xs text-slate-400 mb-2">
              Aquí verás un timeline en tiempo real:
            </p>
            <ul className="text-xs space-y-1 text-slate-300">
              <li>• Llamadas entrantes y salientes.</li>
              <li>• Conversaciones de WhatsApp / SMS.</li>
              <li>• Emails respondidos por la IA.</li>
            </ul>
          </DashboardCard>

          <DashboardCard
            title="Próximos pasos"
            subtitle="Checklist rápido para ir a producción"
            badgeText="Setup"
            badgeTone="success"
            variant="default"
          >
            <ol className="list-decimal list-inside text-xs space-y-1 text-slate-300">
              <li>Conectar números telefónicos (Bland.ai / Twilio).</li>
              <li>Conectar tu CRM o Airtable para registrar leads.</li>
              <li>Configurar el flujo de bienvenida y scripts de venta.</li>
              <li>Revisar métricas diarias de llamadas y conversiones.</li>
            </ol>
          </DashboardCard>

          <DashboardCard
            title="Estado del sistema"
            subtitle="Monitoreo básico"
            badgeText="OK"
            badgeTone="success"
            variant="default"
          >
            <div className="text-xs space-y-1">
              <p>✅ API de llamadas: conectado (demo).</p>
              <p>✅ Motor de IA: activo.</p>
              <p>✅ Panel web: funcionando en Vercel.</p>
              <p className="text-slate-400 mt-1">
                Cuando conectemos datos reales, aquí verás alertas si algo se
                cae o se desconecta.
              </p>
            </div>
          </DashboardCard>
        </section>

        <footer className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>FrontDesk Agents LLC · Command Center v1.0</span>
          <span>Deploy: Vercel · Node 22 · Next.js 14</span>
        </footer>
      </div>
    </main>
  );
}
