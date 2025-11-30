"use client";

import Link from "next/link";
import BackToHome from "../components/BackToHome";
import { useLang } from "../components/LangProvider";

export default function OwnerDashboardPage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const t = {
    title: isEs
      ? "Owner Command Center – FrontDesk Agents"
      : "Owner Command Center – FrontDesk Agents",
    subtitle: isEs
      ? "Panel central para ver el impacto real de tu recepcionista IA y controlar los ajustes clave del sistema."
      : "Central panel to see the real impact of your AI receptionist and control key system settings.",
    kpiTitle: isEs ? "Métricas en tiempo casi real" : "Near real-time metrics",
    configTitle: isEs ? "Controles del sistema" : "System controls",
    channelsTitle: isEs ? "Canales & Integraciones" : "Channels & Integrations",
  };

  return (
    <div className="bg-slate-950 text-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <BackToHome />

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            {t.subtitle}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* LEFT: KPIs */}
          <section className="fd-card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
              {t.kpiTitle}
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">
                  {isEs ? "Llamadas atendidas hoy" : "Calls handled today"}
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-400">124</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {isEs ? "Promedio de respuesta < 4s." : "Avg. answer time &lt; 4s."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">
                  {isEs ? "Citas / leads cualificados" : "Qualified appointments / leads"}
                </p>
                <p className="mt-1 text-2xl font-semibold text-amber-300">57</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {isEs ? "Integrado a tu CRM." : "Synced to your CRM."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400">
                  {isEs ? "Llamadas perdidas" : "Missed calls"}
                </p>
                <p className="mt-1 text-2xl font-semibold text-sky-400">0</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {isEs ? "Reintentos automáticos activos." : "Automatic retries active."}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-200">
                {isEs ? "Vista de auditoría y exportación" : "Audit view & export"}
              </p>
              <p className="text-xs text-slate-300">
                {isEs
                  ? "En producción, aquí ves el log completo de llamadas, WhatsApp y emails con filtros avanzados por operador, resultado, fuente y campaña. Además puedes exportar CSV/JSON auditables."
                  : "In production, this is where you see full call, WhatsApp and email logs with advanced filters by operator, outcome, source and campaign. You can also export audit-grade CSV/JSON."}
              </p>
            </div>
          </section>

          {/* RIGHT: CONFIG */}
          <section className="fd-card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
              {t.configTitle}
            </h2>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="font-semibold text-slate-100">
                  {isEs ? "Idiomas & tono del agente" : "Agent languages & tone"}
                </p>
                <p className="mt-1">
                  {isEs
                    ? "Definir idiomas principales (Inglés, Español y +100 idiomas en el back-end) y el tono por vertical (clínicas, legal, real estate, servicios)."
                    : "Define primary languages (English, Spanish and 100+ back-end languages) and tone per vertical (clinics, legal, real estate, services)."}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {isEs
                    ? "En el código actual esto es UI; la lógica real se conecta a tu orquestador de IA."
                    : "In the current code this is UI; real logic plugs into your AI orchestrator."}
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="font-semibold text-slate-100">
                  {t.channelsTitle}
                </p>
                <p className="mt-1">
                  {isEs
                    ? "Teléfono (Twilio/Bland), WhatsApp Business API, SMS, email (Outlook/Google), y CRMs como HubSpot, Salesforce o tu propio stack."
                    : "Phone (Twilio/Bland), WhatsApp Business API, SMS, email (Outlook/Google), and CRMs like HubSpot, Salesforce or your own stack."}
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="font-semibold text-slate-100">
                  {isEs ? "Planes & facturación" : "Plans & billing"}
                </p>
                <p className="mt-1">
                  {isEs
                    ? "Control central para activar/desactivar sucursales, bundles de agentes IA y límites de minutos/canales."
                    : "Central control to enable/disable locations, AI agent bundles and minutes/channel limits."}
                </p>
                <Link
                  href="/pricing"
                  className="mt-2 inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:border-slate-300 hover:bg-slate-900/60 transition"
                >
                  {isEs ? "Ver estructura de precios" : "View pricing structure"}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
