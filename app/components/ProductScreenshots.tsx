import React from "react";

export default function ProductScreenshots() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950/90 p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)] sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.28em] text-cyan-400">
            LIVE COMMAND CENTER
          </p>
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            Llamadas, citas e ingresos en tiempo real
          </h2>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
            En línea · 24/7
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Card: llamadas hoy */}
        <div className="space-y-1 rounded-2xl bg-slate-900/80 px-3 py-3">
          <p className="text-[10px] font-medium text-slate-400">Llamadas hoy</p>
          <p className="text-2xl font-semibold text-slate-50">128</p>
          <p className="text-[11px] font-medium text-emerald-400">
            +23% vs. ayer
          </p>
        </div>

        {/* Card: citas reservadas */}
        <div className="space-y-1 rounded-2xl bg-slate-900/80 px-3 py-3">
          <p className="text-[10px] font-medium text-slate-400">
            Citas reservadas
          </p>
          <p className="text-2xl font-semibold text-slate-50">47</p>
          <p className="text-[11px] font-medium text-emerald-400">
            +38% confirmadas
          </p>
        </div>

        {/* Card: ingresos proyectados */}
        <div className="space-y-1 rounded-2xl bg-slate-900/80 px-3 py-3">
          <p className="text-[10px] font-medium text-slate-400">
            Ingresos proyectados (30 días)
          </p>
          <p className="text-2xl font-semibold text-emerald-400">$18.4k</p>
          <p className="text-[11px] font-medium text-slate-400">
            Basado en citas confirmadas
          </p>
        </div>
      </div>

      {/* Lista de llamadas en tiempo real */}
      <div className="mt-4 space-y-2 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.25)]" />
            <span>Llamadas en tiempo real</span>
          </div>
          <span>En línea</span>
        </div>

        <div className="mt-1 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="text-slate-200">+1 (713) ·· 8843 · Paciente nuevo</span>
            <span className="text-emerald-400">Agendando</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="text-slate-200">+1 (305) ·· 9921 · Consulta legal</span>
            <span className="text-cyan-300">Calificando</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="text-slate-200">+1 (832) ·· 7710 · Lead inmobiliario</span>
            <span className="text-violet-300">Cerrado</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-500">
        <span>
          Datos de ejemplo generados por el sistema · No representan información real.
        </span>
        <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-400">
          FRONTDESK AGENTS · COMMAND CENTER
        </span>
      </div>
    </section>
  );
}
