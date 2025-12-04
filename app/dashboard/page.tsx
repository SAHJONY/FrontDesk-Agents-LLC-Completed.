// app/dashboard/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";

type DemoRequest = {
  id: number;
  created_at: string;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  plan: string | null;
  notes: string | null;
};

export default async function DashboardPage() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("demo_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const rows = (data ?? []) as DemoRequest[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-white">Owner Dashboard</h1>
      {error && (
        <p className="text-sm text-red-400">
          Error loading demo requests: {error.message}
        </p>
      )}

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Latest demo requests
        </h2>

        {rows.length === 0 ? (
          <p className="text-sm text-slate-400">
            No demo requests yet. Share your demo form to start filling this
            table.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs text-slate-200">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Email</th>
                  <th className="px-2 py-1">Phone</th>
                  <th className="px-2 py-1">Company</th>
                  <th className="px-2 py-1">Plan</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-slate-900/60 last:border-0"
                  >
                    <td className="px-2 py-1 text-slate-400">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-2 py-1">{r.name ?? "—"}</td>
                    <td className="px-2 py-1">{r.email}</td>
                    <td className="px-2 py-1">{r.phone ?? "—"}</td>
                    <td className="px-2 py-1">{r.company ?? "—"}</td>
                    <td className="px-2 py-1">
                      {r.plan ? r.plan.toUpperCase() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
