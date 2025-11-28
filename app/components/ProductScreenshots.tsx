// app/components/ProductScreenshots.tsx
"use client";

import { useState } from "react";

type TabId = "dashboard" | "inbox" | "calls";

const TABS: { id: TabId; label: string; badge: string }[] = [
  {
    id: "dashboard",
    label: "Command Center",
    badge: "Métricas en tiempo real",
  },
  {
    id: "inbox",
    label: "Inbox unificado",
    badge: "Llamadas · WhatsApp · Email",
  },
  {
    id: "calls",
    label: "AI Phone Flows",
    badge: "Guiones y ramas de decisión",
  },
];

export default function ProductScreenshots() {
  const [active, setActive] = useState<TabId>("dashboard");

  return (
    <div className="w-full bg-slate-950/90">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 pt-3 pb-2">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`relative rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-100 border border-cyan-400/70"
                  : "bg-slate-900/60 text-slate-300 border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Badge descriptivo */}
      <div className="px-4 pt-2 pb-3 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-cyan-400/60 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-100">
          {TABS.find((t) => t.id === active)?.badge}
        </span>
        <span className="text-slate-400">
          Vista previa del panel real (sin datos sensibles).
        </span>
      </div>

      {/* “Screenshot” sintético – solo CSS, sin imágenes */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl shadow-cyan-500/15 p-4">
          {/* Encabezado tipo ventana */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <p className="text-[11px] text-slate-400">
              FrontDesk Agents · {active === "dashboard"
                ? "Overview"
                : active === "inbox"
                ? "Unified Inbox"
                : "Call Flow Builder"}
            </p>
          </div>

          {active === "dashboard" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400 mb-1.5">
                  Llamadas atendidas 24/7
                </p>
                <p className="text-xl font-semibold text-slate-50">1,284</p>
                <p className="text-[11px] text-emerald-300 mt-1">
                  +32% vs. último mes
                </p>
                <div className="mt-3 h-10 rounded-lg bg-gradient-to-r from-cyan-500/30 via-emerald-400/20 to-sky-500/10" />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    Citas confirmadas
                  </p>
                  <p className="text-xl font-semibold text-slate-50">+38%</p>
                  <p className="text-[11px] text-slate-400">
                    promedio en pilotos de 90 días
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-2 w-16 rounded-full bg-emerald-400/70" />
                  <div className="h-2 w-10 rounded-full bg-cyan-400/60" />
                  <div className="h-2 w-6 rounded-full bg-slate-700" />
                </div>
              </div>

              <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-[11px] text-slate-400 mb-2">
                  Distribución de canales (voz · WhatsApp · email)
                </p>
                <div className="h-20 rounded-lg bg-[radial-gradient(circle_at_top,_#22d3ee_0,_#020617_55%)]" />
              </div>
            </div>
          )}

          {active === "inbox" && (
            <div className="space-y-2">
              {["Llamada entrante", "WhatsApp", "Email"].map((tipo, idx) => (
                <div
                  key={tipo}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-[11px] text-cyan-200 font-semibold">
                      {idx === 0 ? "VB" : idx === 1 ? "WA" : "EM"}
                    </div>
                    <div>
                      <p className="text-[12px] text-slate-100">
                        {tipo} · Nuevo lead
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Sara (AI) ya calificó el caso y programó seguimiento.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] rounded-full border border-emerald-500/50 px-2 py-0.5 text-emerald-300">
                    Listo para cerrar
                  </span>
                </div>
              ))}
            </div>
          )}

          {active === "calls" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-300 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Flujo de llamada para clínica dental premium</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100 mb-1">
                    1. Greeting
                  </p>
                  <p className="text-[11px] text-slate-400">
                    “Gracias por llamar a Downtown Dental Clinic…”
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100 mb-1">
                    2. Calificación
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Motivo · Seguro · Urgencia · Nuevo vs. paciente existente.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100 mb-1">
                    3. Booking
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Agenda en tiempo real y
