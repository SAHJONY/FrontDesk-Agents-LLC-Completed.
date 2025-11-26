// app/dashboard/page.tsx

import BackToHomeButton from "@/app/components/BackToHomeButton";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Command Center
      </h1>
      <p className="mt-1 text-xs text-slate-400">
        FrontDesk Agents · AI PHONE OS · System Dashboard
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">
            Today&apos;s performance
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Calls handled: 0 · Booked: 0 · Conversion: 0%
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            (Connect real metrics later from your call provider + CRM.)
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">
            Core capabilities
          </h2>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• 24/7 AI phone & messaging reception</li>
            <li>• Lead qualification & appointment booking</li>
            <li>• Omnichannel memory (calls, SMS, email)</li>
            <li>• Human-in-the-loop escalation when needed</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">Compliance</h2>
          <p className="mt-2 text-xs text-slate-300">
            All interactions must follow TCPA, GDPR, CCPA y lineamientos tipo
            SOC 2. Datos sensibles deben manejarse con cifrado, control de
            acceso y trazabilidad.
          </p>
        </div>
      </section>

      <BackToHomeButton />
    </main>
  );
}
