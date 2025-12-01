import Link from "next/link";

const kpis = [
  { label: "Llamadas atendidas hoy", value: "128" },
  { label: "Citas agendadas", value: "46" },
  { label: "Leads calientes", value: "19" },
  { label: "Respuestas por WhatsApp", value: "73" },
];

const queues = [
  { label: "Llamadas en curso", value: "5" },
  { label: "En cola", value: "3" },
  { label: "Pérdidas recuperadas", value: "12" },
];

const channels = [
  { label: "Líneas de voz", value: "3 activas" },
  { label: "WhatsApp Business", value: "2 números" },
  { label: "SMS / Email", value: "Conectado" },
];

export default function DashboardPage() {
  return (
    <div className="bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Command Center
            </h1>
            <p className="text-sm text-slate-300">
              Vista operativa de llamadas, leads y canales AI conectados para tu
              negocio.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/outbound"
              className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-900"
            >
              Outbound Campaigns
            </Link>
            <Link
              href="/dashboard/retention"
              className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-900"
            >
              Retention & Follow-up
            </Link>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                {kpi.label}
              </div>
              <div className="mt-1 text-xl font-semibold text-slate-50">
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Queues + Channels */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-100">
                  Colas de llamadas
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">
                  Live 24/7
                </span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {queues.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-3 text-sm"
                  >
                    <div className="text-xs text-slate-400">
                      {item.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-50">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-100">
                  Últimas interacciones
                </div>
                <span className="text-[11px] text-slate-400">
                  Muestra de datos demo – conectar a Airtable/Bland.ai en prod
                </span>
              </div>
              <div className="mt-2 space-y-2 text-sm text-slate-200">
                <div className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-2">
                  <span>+1 (713) • Clínica Houston</span>
                  <span className="text-xs text-emerald-300">Cita creada</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-2">
                  <span>+1 (305) • Bufete Miami</span>
                  <span className="text-xs text-sky-300">
                    Lead legal cualificado
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-2">
                  <span>+52 • Agencia inmobiliaria CDMX</span>
                  <span className="text-xs text-amber-300">
                    Tour de propiedad agendado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-sm font-medium text-slate-100">
                Canales conectados
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                {channels.map((ch) => (
                  <div
                    key={ch.label}
                    className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-2"
                  >
                    <span>{ch.label}</span>
                    <span className="text-xs text-slate-400">{ch.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
              <div className="font-medium text-slate-100">
                Siguiente paso recomendado
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Conecta tu CRM (HubSpot, Airtable, Sheets) para enviar cada
                llamada y lead directamente a tu pipeline de ventas.
              </p>
              <Link
                href="/setup"
                className="mt-3 inline-flex items-center justify-center rounded-md bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
              >
                Abrir onboarding
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
