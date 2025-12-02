// app/dashboard/page.tsx
import Link from "next/link";

const sidebarLinks = [
  { href: "/dashboard", label: "Resumen", description: "Visión general de tu operación" },
  { href: "/dashboard/outbound", label: "Outbound", description: "Llamadas de prospección y campañas" },
  { href: "/dashboard/retention", label: "Retention", description: "Seguimiento y reactivación de clientes" },
  { href: "/setup", label: "Onboarding", description: "Configura tu cuenta y flujos" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-6 px-4 py-8 lg:px-6">
      {/* SIDEBAR */}
      <aside className="hidden w-60 flex-shrink-0 flex-col gap-4 border-r border-slate-800 pr-4 lg:flex">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Command Center
          </p>
          <h1 className="mt-1 text-lg font-semibold text-slate-50">
            Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Vista central de tu AI Receptionist, llamadas y revenue.
          </p>
        </div>

        <nav className="mt-4 space-y-2 text-sm">
          {sidebarLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md border border-transparent px-2 py-2 hover:border-sky-500/50 hover:bg-slate-900/60"
            >
              <div className="text-xs font-semibold text-slate-100">
                {item.label}
              </div>
              <div className="text-[0.7rem] text-slate-400">
                {item.description}
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-md border border-sky-500/40 bg-sky-500/10 p-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Owner Console
          </p>
          <p className="mt-1 text-xs text-slate-100">
            Como dueño puedes ver métricas globales, tenants y facturación.
          </p>
          <Link
            href="/admin"
            className="mt-2 inline-block text-[0.7rem] font-semibold text-sky-300 underline"
          >
            Ir al Admin →
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 space-y-6">
        {/* Hero simple sin imagen por ahora (las imágenes ya las tenemos en public/ y podemos integrarlas luego) */}
        <header className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-sky-400">
            FrontDesk Agents · Command Center
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-50">
            Bienvenido al panel principal
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Aquí verás las llamadas de hoy, oportunidades abiertas, demos agendadas
            y el revenue estimado generado por tus agentes de IA.
          </p>
        </header>

        {/* Placeholder de métricas (lo importante ahora es la navegación, no el data-binding) */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Llamadas de hoy
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">—</p>
            <p className="mt-1 text-xs text-slate-400">
              Se conecta automáticamente con Bland.ai y tu webhook de call-events.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Demos agendadas
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">—</p>
            <p className="mt-1 text-xs text-slate-400">
              Lectura futura desde Calendly / CRM. UI ya lista.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Revenue estimado
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">$ —</p>
            <p className="mt-1 text-xs text-slate-400">
              Se llenará con los datos de tus planes y llamadas completadas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
