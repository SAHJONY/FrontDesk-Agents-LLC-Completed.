// app/settings/numbers/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Números y routing | FrontDesk Agents",
};

export default function SettingsNumbersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Settings
          </p>
          <h1 className="text-2xl font-semibold">Números y routing</h1>
          <p className="text-sm text-slate-400">
            Conecta tu número principal y define cómo se enrutan las llamadas.
          </p>
        </header>

        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Número principal conectado
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="+1 (216) 480-4413"
            />
            <p className="text-xs text-slate-500">
              Este es el número que tus clientes verán cuando Alex llame o conteste.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Forwarding interno (opcional)
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="Número del doctor / owner para casos urgentes"
            />
          </div>

          <button className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300">
            Guardar configuración
          </button>
        </div>
      </section>
    </main>
  );
}
