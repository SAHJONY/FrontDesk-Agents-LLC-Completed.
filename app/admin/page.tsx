import type { Metadata } from "next";
import BackToHomeButton from "../components/BackToHomeButton";

export const metadata: Metadata = {
  title: "FrontDesk Agents – Owner Command Center",
  description:
    "Admin dashboard to control AI receptionists, billing, plans and global configuration."
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackToHomeButton />

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Owner Command Center
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Controla todos tus agentes, cuentas, planes y facturación desde un solo
            panel centralizado.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-1">
              Tenants activos
            </h2>
            <p className="text-3xl font-semibold">–</p>
            <p className="text-xs text-slate-400 mt-1">
              Cantidad de cuentas / empresas usando FrontDesk Agents.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-1">
              Ingresos MRR estimados
            </h2>
            <p className="text-3xl font-semibold">$ – – –</p>
            <p className="text-xs text-slate-400 mt-1">
              MRR combinado de todos los planes activos (Starter, Pro, Enterprise).
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-1">
              Uso de llamadas (24h)
            </h2>
            <p className="text-3xl font-semibold">–</p>
            <p className="text-xs text-slate-400 mt-1">
              Llamadas atendidas por todos los agentes en las últimas 24 horas.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-2">
            Próximos módulos
          </h2>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• Gestión de tenants y dominios personalizados.</li>
            <li>• Control de límites de uso por plan y por cliente.</li>
            <li>• Visión global de ingresos, retención y churn.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
