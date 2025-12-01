// app/setup/page.tsx
"use client";

import { useState } from "react";

type TenantStatus =
  | "lead"
  | "invoice_sent"
  | "paid_onboarding"
  | "active"
  | "paused";

interface Tenant {
  id: string;
  name: string;
  contactEmail?: string;
  status: TenantStatus;
}

const MOCK_TENANTS: Tenant[] = [
  {
    id: "demo-1",
    name: "Demo Clinic Pilot",
    contactEmail: "owner@democlinic.com",
    status: "paid_onboarding"
  }
];

export default function SetupPage() {
  const [tenants] = useState<Tenant[]>(MOCK_TENANTS);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-xl font-semibold">Onboarding Center</h1>
          <p className="text-sm text-slate-300">
            Internal view for you and your team. Track demos, invoices, payments
            and activation for each client.
          </p>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-300">
          <p className="font-semibold text-slate-100">
            Pipeline (manual payments)
          </p>
          <p className="mt-1">
            Flow for each tenant: Demo → Invoice sent → Paid (Zelle/CashApp/Wire/PayPal)
            → Tenant created in Supabase → Bland number + webhook → Test calls →
            Client access email → Active.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Tenants (v1 – replace mock with real data from Supabase)
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-2">Client</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Checklist</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-slate-800/70 hover:bg-slate-900"
                  >
                    <td className="px-3 py-2 text-slate-100">{t.name}</td>
                    <td className="px-3 py-2 text-slate-200">
                      {t.contactEmail ?? "—"}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-3 py-2 text-[11px] text-slate-300">
                      {/* v1: simple text. Later: clickable checklist tied to DB */}
                      Demo ✔ · Invoice ✔ · Payment ✔ · Supabase tenant ✔ · Bland
                      configured ▢ · Test calls ▢ · Access email ▢
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-400">
            TODO (when ready): Replace mock data with real tenants from Supabase
            via an internal API route or direct Supabase client.
          </p>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: TenantStatus }) {
  const map: Record<
    TenantStatus,
    { label: string; className: string }
  > = {
    lead: {
      label: "Lead",
      className: "bg-slate-700 text-slate-100"
    },
    invoice_sent: {
      label: "Invoice sent",
      className: "bg-amber-500/20 text-amber-300"
    },
    paid_onboarding: {
      label: "Paid · Onboarding",
      className: "bg-sky-500/20 text-sky-300"
    },
    active: {
      label: "Active",
      className: "bg-emerald-500/20 text-emerald-300"
    },
    paused: {
      label: "Paused",
      className: "bg-rose-500/20 text-rose-300"
    }
  };

  const cfg = map[status];

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
