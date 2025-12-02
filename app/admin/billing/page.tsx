// app/admin/billing/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – Billing Overview | FrontDesk Agents",
};

export default function AdminBillingPage() {
  // Datos mock para mostrar estructura
  const mrr = 899 + 399 + 1799;
  const clients = 3;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Billing overview</h1>
          <p className="text-sm text-slate-400">
            Resumen rápido de ingresos recurrentes y clientes activos.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              MRR estimado
            </p>
            <p className="mt-2 text-2xl font-semibold">${mrr}/mes</p>
            <p className="mt-1 text-xs text-slate-500">
              Suma de todos los planes activos (mock).
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Clientes activos
            </p>
            <p className="mt-2 text-2xl font-semibold">{clients}</p>
            <p className="mt-1 text-xs text-slate-500">
              Tenants con plan vigente.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Churn (mock)
            </p>
            <p className="mt-2 text-2xl font-semibold">0%</p>
            <p className="mt-1 text-xs text-slate-500">
              Para demos y presentaciones.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Más adelante aquí podemos conectar Stripe / Paddle / Airtable para
          ver pagos reales, facturas y renovaciones.
        </p>
      </section>
    </main>
  );
}
