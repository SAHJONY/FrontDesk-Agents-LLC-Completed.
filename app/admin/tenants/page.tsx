// app/admin/tenants/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – Tenants | FrontDesk Agents",
};

export default function AdminTenantsPage() {
  // En el futuro aquí se mapearán los tenants reales desde Supabase.
  const mockTenants = [
    {
      name: "SmileCare Dental Group",
      ownerEmail: "owner@smilecare.com",
      plan: "Professional",
      status: "Activo",
    },
    {
      name: "Elite Injury Law",
      ownerEmail: "managingpartner@eliteinjury.com",
      plan: "Starter",
      status: "Trial",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Tenants (clientes)</h1>
          <p className="text-sm text-slate-400">
            Vista de alto nivel de todos los negocios activos en FrontDesk Agents.
          </p>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Negocio</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {mockTenants.map((t) => (
                <tr key={t.ownerEmail} className="border-t border-slate-800">
                  <td className="px-4 py-3 text-slate-100">{t.name}</td>
                  <td className="px-4 py-3 text-slate-300">{t.ownerEmail}</td>
                  <td className="px-4 py-3 text-slate-200">{t.plan}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500">
          * Esta es una vista de ejemplo. Luego se conectará a los datos reales
          de Supabase / Billing.
        </p>
      </section>
    </main>
  );
}
