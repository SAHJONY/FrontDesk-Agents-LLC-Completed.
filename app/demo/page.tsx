// app/demo/page.tsx

import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Demo en vivo · FrontDesk Command Center
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Agenda una demo en vivo de FrontDesk Agents
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            En la demo te mostramos el Command Center, cómo rescatamos llamadas
            perdidas con AI, cómo se agendan citas automáticamente y cómo
            conectar tu proveedor de llamadas actual.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-50">
            Reserva tu horario
          </h2>
          <p className="text-sm text-slate-300">
            Usa el botón de abajo para abrir nuestro calendario y elegir el
            horario que mejor te funcione. La demo dura entre 15 y 20 minutos.
          </p>

          <Link
            href="https://calendly.com/frontdesk-agents/demo-15"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-300"
          >
            Agenda una demo en vivo
          </Link>

          <p className="text-xs text-slate-400">
            Si el calendario no se abre, envíanos un mensaje de texto o WhatsApp
            y te agendamos manualmente.
          </p>
        </div>
      </section>
    </main>
  );
}
