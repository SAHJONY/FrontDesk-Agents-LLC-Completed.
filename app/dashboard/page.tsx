import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-4 sm:pt-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Command Center
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Live overview of calls, WhatsApp, SMS and email handled by your AI
            receptionists.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/setup"
            className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-sky-700"
          >
            Configure AI Agent
          </Link>
          <Link
            href="/dashboard/outbound"
            className="inline-flex items-center rounded-md border border-slate-300/80 dark:border-slate-600/80 px-3 py-1.5 text-xs sm:text-sm font-semibold hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            Outbound campaigns
          </Link>
        </div>
      </header>

      {/* KPI cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3 sm:p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Today calls
          </p>
          <p className="mt-2 text-xl font-semibold text-emerald-500">124</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Inbound + outbound
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3 sm:p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Booked appointments
          </p>
          <p className="mt-2 text-xl font-semibold text-sky-500">39</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Converted by AI Agents
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3 sm:p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Missed calls
          </p>
          <p className="mt-2 text-xl font-semibold text-rose-500">0</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            AI answered everything
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3 sm:p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Revenue impact
          </p>
          <p className="mt-2 text-xl font-semibold text-amber-500">
            +$8,430
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Estimated from recovered calls
          </p>
        </div>
      </section>

      {/* Two-column: live calls + channels */}
      <section className="grid gap-4 md:grid-cols-[1.2fr_minmax(0,1fr)]">
        {/* Live calls table (mock UI) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Live calls & recent calls</h2>
            <span className="text-[11px] text-emerald-400">AI status: ON</span>
          </div>
          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-700/40">
                  <th className="py-2">Time</th>
                  <th className="py-2">Caller</th>
                  <th className="py-2">Channel</th>
                  <th className="py-2">Agent</th>
                  <th className="py-2">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                <tr>
                  <td className="py-2">09:12</td>
                  <td>(832) •••• 1023</td>
                  <td>Phone</td>
                  <td>ALEX</td>
                  <td className="text-emerald-400">Booked consult</td>
                </tr>
                <tr>
                  <td className="py-2">09:05</td>
                  <td>+52 •••• 8874</td>
                  <td>WhatsApp</td>
                  <td>SARA</td>
                  <td className="text-emerald-400">Qualified lead</td>
                </tr>
                <tr>
                  <td className="py-2">08:54</td>
                  <td>Spam 95%</td>
                  <td>Phone</td>
                  <td>ALEX</td>
                  <td className="text-slate-400">Auto-blocked</td>
                </tr>
                <tr>
                  <td className="py-2">08:41</td>
                  <td>(713) •••• 6636</td>
                  <td>SMS</td>
                  <td>SARA</td>
                  <td className="text-sky-400">Follow-up scheduled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Channels status */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold mb-3">Channels status</h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center justify-between">
                <span>Phone</span>
                <span className="text-emerald-400 text-[11px]">
                  • Online – 24/7
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>WhatsApp Business</span>
                <span className="text-emerald-400 text-[11px]">
                  • Online – instant replies
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>SMS</span>
                <span className="text-emerald-400 text-[11px]">
                  • Online – smart automation
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Email</span>
                <span className="text-emerald-400 text-[11px]">
                  • Online – smart triage
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold mb-2">Owner daily digest</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Every morning you receive a summary with calls, booked revenue and
              risky cases escalated to your team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
