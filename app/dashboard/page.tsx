// app/dashboard/page.tsx
import SiteHeader from "../components/SiteHeader";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Command Center
            </h1>
            <p className="text-xs text-slate-400">
              Live overview of calls, campaigns and retention for your AI
              Receptionist.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300">
              Status: Online 24/7
            </span>
            <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-medium text-cyan-300">
              Agent: ALEX
            </span>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-[11px] font-semibold text-slate-400">
              Calls answered (24h)
            </div>
            <div className="mt-1 text-2xl font-semibold text-emerald-300">
              128
            </div>
            <p className="mt-1 text-[11px] text-emerald-400">
              +32% vs. last 7 days
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-[11px] font-semibold text-slate-400">
              New leads captured
            </div>
            <div className="mt-1 text-2xl font-semibold text-cyan-300">
              47
            </div>
            <p className="mt-1 text-[11px] text-cyan-400">
              71% with phone & email
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-[11px] font-semibold text-slate-400">
              Booked appointments
            </div>
            <div className="mt-1 text-2xl font-semibold text-sky-300">
              29
            </div>
            <p className="mt-1 text-[11px] text-sky-400">
              Auto-scheduled by AI
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-[11px] font-semibold text-slate-400">
              Est. pipeline (next 30d)
            </div>
            <div className="mt-1 text-2xl font-semibold text-amber-300">
              $84,500
            </div>
            <p className="mt-1 text-[11px] text-amber-400">
              Based on current conversion
            </p>
          </div>
        </div>

        {/* 3-column layout */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Live calls feed */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 lg:col-span-2">
            <div className="flex items-center justify-between text-xs">
              <h2 className="font-semibold text-slate-100">Live calls</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                3 active • 12 in last hour
              </span>
            </div>
            <div className="divide-y divide-slate-800 text-xs">
              {[
                {
                  id: "CALL-9821",
                  name: "Maria Rodriguez",
                  source: "Google Ads",
                  status: "Completed • Qualified",
                  sentiment: "Positive",
                  duration: "06:24",
                },
                {
                  id: "CALL-9819",
                  name: "Dr. Smith Clinic",
                  source: "Existing patient",
                  status: "Completed • Booked",
                  sentiment: "Very positive",
                  duration: "04:58",
                },
                {
                  id: "CALL-9815",
                  name: "John Carter",
                  source: "Website",
                  status: "Missed • Callback queued",
                  sentiment: "Neutral",
                  duration: "00:42",
                },
              ].map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between gap-3 py-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                        {call.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-100">
                        {call.name}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-400">
                      {call.source} • {call.status}
                    </div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="font-mono text-slate-200">
                      {call.duration}
                    </div>
                    <div className="text-emerald-300">{call.sentiment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: outbound + retention */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold text-slate-100">
                  Outbound campaigns
                </h2>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                  /dashboard/outbound
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>• Reactivation – 126 contacts – 31% contacted</li>
                <li>• No-shows – 42 contacts – 19% rebooked</li>
                <li>• Google leads – 63 contacts – 11% booked</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold text-slate-100">
                  Retention panel
                </h2>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  /dashboard/retention
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>• Renewals due (30d): 18</li>
                <li>• VIP clients to touch this week: 9</li>
                <li>• High-risk churn flagged by AI: 6</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
