import SidebarLayout from "../components/SidebarLayout";

export default function DashboardPage() {
  return (
    <SidebarLayout title="Dashboard overview">
      {/* Aquí va tu contenido actual de dashboard.
          Si ahora no tienes nada, dejamos un placeholder. */}
      <div className="space-y-4 text-sm">
        <p className="text-slate-600 dark:text-slate-300">
          Aquí verás el resumen de llamadas, demos agendadas y performance de tus
          agentes ALEX / SARA.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.18em]">
              Today&apos;s calls
            </p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.18em]">
              Booked demos
            </p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.18em]">
              Missed calls
            </p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
