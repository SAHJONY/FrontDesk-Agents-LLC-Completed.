// app/settings/profile/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Perfil del negocio | FrontDesk Agents",
};

export default function SettingsProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Settings
          </p>
          <h1 className="text-2xl font-semibold">Perfil del negocio</h1>
          <p className="text-sm text-slate-400">
            Define cómo se presenta tu negocio cuando Alex responde llamadas.
          </p>
        </header>

        <form className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Nombre del negocio
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
                placeholder="FrontDesk Dental Care"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Email principal
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
                placeholder="office@clinic.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                País / Región
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
                placeholder="United States"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Zona horaria
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
                placeholder="America/Chicago"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Dirección (opcional)
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="123 Main St, Suite 400"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </main>
  );
}
