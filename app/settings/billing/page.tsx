// app/settings/billing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings – Billing | FrontDesk Agents",
};

export default function SettingsBillingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Billing
          </p>
          <h1 className="text-2xl font-semibold">Plan y facturación</h1>
          <p className="text-sm text-slate-400">
            Revisa tu plan actual y actualiza tu método de pago.
          </p>
        </header>

        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase">
                Plan actual
              </p>
              <p className="text-lg font-semibold">Professional – $899 / mes</p>
              <p className="text-xs text-slate-500">
                3 AI receptionists, multi-location, CRM integration.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Activo
            </span>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-300 uppercase">
              Próximo cobro
            </p>
            <p className="text-sm text-slate-200">
              15 de cada mes – cargo automático a tu tarjeta registrada.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-3">
            <p className="text-xs font-semibold text-slate-300 uppercase">
              Administrar facturación
            </p>
            <p className="text-xs text-slate-500">
              Usa el portal seguro para actualizar tarjeta, ver facturas y
              descargar recibos.
            </p>
            <Link
              href="#"
              className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              Abrir portal de facturación
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
