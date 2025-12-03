// app/dashboard/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createServerSupabase();

  const { data: leads, error } = await supabase
    .from("demo_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const totalLeads = leads?.length ?? 0;

  return (
    <main className="min-h-screen px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-50">
            FrontDesk Command Center
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Live view of demo requests captured from the website.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Demo leads
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-50">
              {totalLeads}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold text-slate-200">
            Latest demo requests
          </h2>

          {error && (
            <p className="mt-2 text-sm text-red-400">
              Error loading leads
            </p>
          )}

          {(!leads || leads.length === 0) && !error && (
            <p className="mt-2 text-sm text-slate-400">
              No demo leads yet. Send a test from the demo page.
            </p>
          )}

          {leads && leads.length > 0 && (
            <div className="mt-3 space-y-2">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-50">
                      {lead.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(lead.created_at).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {lead.email} {lead.phone ? `· ${lead.phone}` : ""}
                  </span>
                  {lead.business_type && (
                    <span className="text-xs text-sky-400">
                      {lead.business_type}
                    </span>
                  )}
                  {lead.notes && (
                    <p className="text-xs text-slate-300 truncate">
                      {lead.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
