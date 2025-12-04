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
};

export default async function DashboardPage() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("demo_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const rows = (data ?? []) as DemoRequest[];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Owner Console – Demo Requests
      </h1>

      {error && (
        <p className="text-sm text-red-400">
          Error loading demo requests: {error.message}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Company</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-slate-400"
                >
                  No demo requests yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-slate-800 text-slate-200"
                >
                  <td className="px-4 py-2">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{r.name ?? "—"}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">{r.phone ?? "—"}</td>
                  <td className="px-4 py-2">{r.plan ?? "—"}</td>
                  <td className="px-4 py-2">{r.company ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
