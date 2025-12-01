import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Command Center – FrontDesk Agents",
  description:
    "Live view of calls, agents, and revenue handled by your AI receptionists.",
};

type Stat = {
  label: string;
  value: string;
  sublabel?: string;
};

const mainStats: Stat[] = [
  { label: "Live calls", value: "12", sublabel: "3 in queue" },
  { label: "Answer rate", value: "98%", sublabel: "Last 24h" },
  { label: "Booked today", value: "48", sublabel: "Across all locations" },
  { label: "Recovered missed calls", value: "91%", sublabel: "Last 7 days" },
];

const agents = [
  { name: "ALEX – Voice", status: "Live", load: "7 calls" },
  { name: "SARA – WhatsApp", status: "Engaged", load: "18 chats" },
  { name: "OMNI – Email", status: "Idle", load: "0 tickets" },
];

const recentCalls = [
  {
    id: "FD-1842",
    source: "Google Ads",
    caller: "New lead",
    outcome: "Consult booked",
    value: "$1,250",
    time: "3 min ago",
  },
  {
    id: "FD-1839",
    source: "Website",
    caller: "Existing client",
    outcome: "Payment collected",
    value: "$327",
    time: "17 min ago",
  },
  {
    id: "FD-1822",
    source: "Missed call",
    caller: "Unknown",
    outcome: "SMS follow-up",
    value: "Pending",
    time: "42 min ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-10 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              AI Command Center
            </h1>
            <p className="text-[11px] text-slate-400">
              Unified view of your AI receptionists across calls, SMS and
              WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems online
            </span>
            <Link
              href="/setup"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:border-cyan-400 hover:text-cyan-100"
            >
              Edit routing & schedules
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {mainStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3"
            >
              <p className="text-[10px] text-slate-400">{s.label}</p>
              <p className="mt-1 text-xl font-semibold text-slate-50">
                {s.value}
              </p>
              {s.sublabel && (
                <p className="mt-1 text-[10px] text-slate-500">
                  {s.sublabel}
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <p className="font-semibold text-slate-200">Recent interactions</p>
              <span className="text-slate-500">Last 60 minutes</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-800/80">
              <table className="min-w-full border-collapse text-[11px]">
                <thead className="bg-slate-950/80 text-slate-400">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">ID</th>
                    <th className="px-3 py-2 text-left font-medium">Source</th>
                    <th className="px-3 py-2 text-left font-medium">Caller</th>
                    <th className="px-3 py-2 text-left font-medium">Outcome</th>
                    <th className="px-3 py-2 text-right font-medium">Value</th>
                    <th className="px-3 py-2 text-right font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCalls.map((c, idx) => (
                    <tr
                      key={c.id}
                      className={
                        idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"
                      }
                    >
                      <td className="px-3 py-2">{c.id}</td>
                      <td className="px-3 py-2 text-slate-300">{c.source}</td>
                      <td className="px-3 py-2 text-slate-300">{c.caller}</td>
                      <td className="px-3 py-2 text-slate-200">
                        {c.outcome}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-200">
                        {c.value}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-400">
                        {c.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-[11px] font-semibold text-slate-200">
                Agent load
              </p>
              <ul className="mt-2 space-y-2 text-[11px]">
                {agents.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-50">
                        {a.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {a.load}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {a.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-sky-900/70 p-3">
              <p className="text-[11px] font-semibold text-slate-100">
                Quiet hours & compliance
              </p>
              <p className="mt-1 text-[11px] text-slate-300">
                Calls locked to 8:00–19:30 CT, TCPA / DNC safe, recordings and
                transcripts audit-ready.
              </p>
              <Link
                href="/admin"
                className="mt-2 inline-flex text-[11px] font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Manage compliance settings →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
