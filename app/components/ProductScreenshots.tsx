'use client';

import { useState } from 'react';

type TabId = 'dashboard' | 'inbox' | 'revenue';

const TABS: { id: TabId; label: string; badge: string; description: string }[] = [
  {
    id: 'dashboard',
    label: 'Command Center',
    badge: '+38% más visitas confirmadas',
    description:
      'Vista general en tiempo real de llamadas, WhatsApps y email. Todo en una sola pantalla.'
  },
  {
    id: 'inbox',
    label: 'AI Inbox',
    badge: 'Clasifica y resume 24/7',
    description:
      'Cada interacción clasificada, resumida y lista para responder o escalar.'
  },
  {
    id: 'revenue',
    label: 'Revenue & Analytics',
    badge: 'Convierte llamadas en ingresos',
    description:
      'Métricas de ingresos, respuesta y conversión. Ve exactamente qué canal genera dinero.'
  }
];

export default function ProductScreenshots() {
  const [active, setActive] = useState<TabId>('dashboard');

  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section className="w-full bg-slate-950/90 rounded-3xl border border-slate-800/80 shadow-[0_0_60px_rgba(15,23,42,0.9)] overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 pt-3 pb-2 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition
              ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.7)]'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid gap-4 p-4 md:grid-cols-[2fr,1.3fr] items-stretch">
        {/* Fake app preview */}
        <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),_transparent_55%)] border border-slate-800/80">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/60 to-slate-900/40" />

          <div className="relative h-full flex flex-col gap-3 p-4">
            {/* Header row inside preview */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span className="text-xs font-medium text-emerald-300/90">
                  Live · FrontDesk Agents
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                  EN · ES · +100
                </span>
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                  24/7
                </span>
              </div>
            </div>

            {/* Main "screen" varies by tab */}
            {active === 'dashboard' && (
              <div className="grid h-full gap-3 md:grid-cols-[1.5fr,1fr]">
                {/* Left side: calls timeline */}
                <div className="flex flex-col gap-2 rounded-xl bg-slate-900/80 p-3 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-100">
                      Today&apos;s calls
                    </span>
                    <span className="text-[10px] text-slate-400">09:10 · CT</span>
                  </div>

                  {['New patient', 'Existing patient', 'WhatsApp lead', 'Missed call'].map(
                    (label, idx) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-lg bg-slate-950/60 px-2 py-1.5"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-50">{label}</span>
                          <span className="text-[10px] text-slate-400">
                            Auto-calificado por el AI
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold ${
                            idx === 0
                              ? 'text-emerald-400'
                              : idx === 3
                              ? 'text-amber-300'
                              : 'text-cyan-300'
                          }`}
                        >
                          {idx === 0
                            ? 'Booked'
                            : idx === 3
                            ? 'Callback'
                            : 'Needs follow-up'}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Right side: KPIs */}
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-100">
                        Conversion last 30 days
                      </span>
                      <span className="text-[10px] text-emerald-400">+38%</span>
                    </div>
                    <div className="h-16 rounded-lg bg-gradient-to-tr from-cyan-500/30 via-sky-500/10 to-transparent" />
                  </div>
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-100">
                        No-show reduction
                      </span>
                      <span className="text-[10px] text-cyan-300">-27%</span>
                    </div>
                    <div className="h-10 rounded-lg bg-gradient-to-tr from-emerald-500/25 via-slate-900 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {active === 'inbox' && (
              <div className="grid h-full gap-3 md:grid-cols-[1.3fr,1fr]">
                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80 flex flex-col gap-2">
                  {['WhatsApp', 'Missed call', 'Email', 'SMS'].map((channel, idx) => (
                    <div
                      key={channel}
                      className="flex items-center justify-between rounded-lg bg-slate-950/60 px-2 py-1.5"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-100">
                          {channel} • New lead {idx + 1}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Resumen listo en tu inbox
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-300">AI summary</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-100">Smart labels</span>
                  {['New patient', 'Urgent', 'Follow-up', 'Billing'].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center justify-between rounded-full bg-slate-950/70 px-3 py-1 text-[11px] text-slate-200"
                    >
                      {label}
                      <span className="ml-2 h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {active === 'revenue' && (
              <div className="grid h-full gap-3 md:grid-cols-[1.4fr,1fr]">
                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-100">
                      Revenue by channel
                    </span>
                    <span className="text-[10px] text-slate-400">Last 30 days</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {[
                      { label: 'Phone', value: '$38.2k' },
                      { label: 'WhatsApp', value: '$21.9k' },
                      { label: 'Email', value: '$9.7k' }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-slate-950/60 p-2 flex flex-col gap-1"
                      >
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-slate-100 font-semibold">{item.value}</span>
                        <span className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800/80 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-100">
                    Key metrics
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Answer rate</span>
                      <span className="text-emerald-400 font-semibold">99.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Booked from calls</span>
                      <span className="text-cyan-300 font-semibold">41%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Avg. response time</span>
                      <span className="text-slate-100 font-semibold">2.3s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Caption */}
            <p className="mt-1 text-[10px] text-slate-400">
              * Vista ilustrativa. La aplicación real se adapta a tu idioma, marca y flujos
              de negocio.
            </p>
          </div>
        </div>

        {/* Text panel */}
        <aside className="flex flex-col gap-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 p-4">
          <span className="inline-flex w-fit items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-300">
            {activeTab.badge}
          </span>
          <h3 className="text-lg font-semibold text-slate-50">{activeTab.label}</h3>
          <p className="text-sm text-slate-300">{activeTab.description}</p>
          <ul className="mt-1 space-y-1.5 text-[13px] text-slate-300">
            <li>• Multilingual by default (EN, ES +100 idiomas y dialectos).</li>
            <li>• Integrado con tu calendario, CRM y flujo de negocio existente.</li>
            <li>• Diseñado para clínicas, despachos legales, real estate y home services.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
