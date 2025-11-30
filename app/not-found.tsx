import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-50">
      <p className="text-[11px] font-semibold tracking-[0.3em] text-cyan-400">
        FRONTDESK AGENTS · COMMAND CENTER
      </p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">404</h1>
      <p className="mt-2 text-base sm:text-lg">
        Esta página no existe o ya fue movida.
      </p>
      <p className="mt-1 max-w-md text-sm text-slate-400">
        Usa el menú superior o vuelve al inicio para seguir configurando tu
        recepcionista AI y el Command Center.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
        >
          Volver al inicio
        </Link>
        <Link
          href="/ai-agents"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900"
        >
          Ver AI Agents
        </Link>
      </div>
    </main>
  );
}
