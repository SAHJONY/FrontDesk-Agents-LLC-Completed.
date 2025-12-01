"use client";

import { useEffect, useState } from "react";

type CallStatus = "answered" | "missed" | "voicemail";

interface Metrics {
  totalCallsToday: number;
  answeredCallsToday: number;
  missedCallsToday: number;
  newLeadsToday: number;
  appointmentsToday: number;
  estimatedRevenueToday: number;
  currency: string;
}

interface RecentCall {
  id: string;
  when: string;
  from: string;
  status: CallStatus;
  summary: string | null;
}

interface ApiResponse {
  metrics: Metrics;
  recentCalls: RecentCall[];
}

export default function DashboardPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await fetch("/api/metrics", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Bad status: ${res.status}`);
        }

        const json = (await res.json()) as ApiResponse;
        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        console.error("[Dashboard] Error loading /api/metrics:", err);
        if (!cancelled) {
          setErrorMsg("No se pudieron cargar las métricas del Command Center.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = data?.metrics;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              FrontDesk Command Center
            </p>
            <h1 className="text-lg font-semibold md:text-xl">
              Dashboard de llamadas, leads y citas
            </h1>
          </div>
          <p className="text-[11px] text-slate-400">
            Datos en vivo desde Supabase
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* ESTADO */}
        {loading && (
          <p className="text-sm text-slate-300">
            Cargando métricas del Command Center…
          </p>
        )}

        {errorMsg && !loading && (
          <div className="rounded-md border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-sm text-rose-100">
            {errorMsg}
            <p className="mt-1 text-[11px] text-rose-200/80">
              Revisa los logs de Vercel y la configuración de Supabase.
            </p>
          </div>
        )}

        {/* KPIs PRINCIPALES */}
        {metrics && (
          <section className="grid gap-4 text-xs sm:grid-cols-3 lg:grid-cols-6 sm:text-sm">
            <MetricCard
              label="Llamadas hoy"
              value={metrics.totalCallsToday}
            />
            <MetricCard
              label="Contestadas"
              value={metrics.answeredCallsToday}
            />
            <MetricCard
              label="Perdidas"
              value={metrics.missedCallsToday}
              tone="danger"
            />
            <MetricCard
              label="Leads nuevos"
              value={metrics.newLeadsToday}
            />
            <MetricCard
              label="Citas hoy"
              value={metrics.appointmentsToday}
            />
            <MetricCard
              label="Ingresos estimados"
              value={metrics.estimatedRevenueToday}
              prefix={metrics.currency}
            />
          </section>
        )}

        {/* TABLA ÚLTIMAS LLAMADAS */}
        {data?.recentCalls && data.recentCalls.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Últimas llamadas
              </h2>
              <p className="text-[11px] text-slate-400">
                Las filas se generan desde la tabla <code>calls</code> en
                Supabase.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Número</th>
                    <th className="px-3 py-2">Estado</th>
                    <th className="px-3 py-2">Resumen</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentCalls.map((call) => (
                    <tr
                      key={call.id}
                      className="border-t border-slate-800/70 hover:bg-slate-900"
                    >
                      <td className="px-3 py-2 text-slate-200">{call.when}</td>
                      <td className="px-3 py-2 text-slate-200">{call.from}</td>
                      <td className="px-3 py-2">
                        <StatusPill status={call.status} />
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {call.summary || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SIN DATOS TODAVÍA */}
        {!loading && !errorMsg && metrics && data?.recentCalls.length === 0 && (
          <p className="text-xs text-slate-400">
            No hay llamadas registradas hoy todavía. En cuanto entren llamadas en
            la tabla <code>calls</code>, aparecerán aquí.
          </p>
        )}
      </div>
    </main>
  );
}

function MetricCard(props: {
  label: string;
  value: number;
  prefix?: string;
  tone?: "default" | "danger";
}) {
  const { label, value, prefix, tone = "default" } = props;
  const color =
    tone === "danger"
      ? "text-rose-300 border-rose-500/40"
      : "text-sky-300 border-sky-500/40";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className={`mt-1 text-base font-semibold ${color}`}>
        {prefix ? `${prefix} ` : ""}
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: CallStatus }) {
  const map: Record<CallStatus, { label: string; className: string }> = {
    answered: {
      label: "Contestada",
      className:
        "bg-emerald-500/10 text-emerald-300 ring-emerald-500/40"
    },
    missed: {
      label: "Perdida",
      className: "bg-rose-500/10 text-rose-300 ring-rose-500/40"
    },
    voicemail: {
      label: "Voicemail",
      className: "bg-sky-500/10 text-sky-300 ring-sky-500/40"
    }
  };

  const cfg = map[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ring-1 ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
