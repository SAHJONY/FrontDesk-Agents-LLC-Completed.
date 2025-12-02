// app/demo/page.tsx
"use client";

import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            FrontDesk Agents · Demo en vivo
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Agenda una demo del Command Center
          </h1>
          <p className="text-sm text-slate-300 sm:text-base">
            En la demo verás cómo el Command Center muestra llamadas, leads y
            citas en tiempo real, y cómo usamos AI para rescatar llamadas
            perdidas y llenar tu agenda.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <p className="text-sm text-slate-200">
            Haz clic en el botón para abrir mi Calendly y escoger el horario
            que mejor te funcione.
          </p>

          <Link
            href="https://calendly.com/frontdesk-agents/demo-15"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-300"
          >
            Agenda una demo en vivo
          </Link>

          <p className="text-xs text-slate-400">
            Después de agendar, recibirás correo de confirmación automático con
            el enlace de la videollamada y recordatorios antes de la cita.
          </p>
        </div>

        <section className="space-y-2 text-xs text-slate-400">
          <p className="font-semibold text-slate-200">
            ¿Qué veremos en la demo?
          </p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Panel de llamadas de hoy (contestadas, perdidas, voicemail).</li>
            <li>Cómo se crean leads y citas desde las llamadas.</li>
            <li>Cómo puedes empezar cobrando con Zelle / CashApp / wire.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}
