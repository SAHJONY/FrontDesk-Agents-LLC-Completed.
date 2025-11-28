// app/components/ProductScreenshots.tsx
"use client";

import { useState } from "react";
import clsx from "clsx";

type TabId = "command-center" | "ai-inbox" | "revenue";

const TABS: { id: TabId; label: string }[] = [
  { id: "command-center", label: "Command Center" },
  { id: "ai-inbox", label: "AI Inbox" },
  { id: "revenue", label: "Revenue & Analytics" },
];

export default function ProductScreenshots() {
  const [active, setActive] = useState<TabId>("command-center");

  return (
    <section className="w-full rounded-3xl bg-slate-950/90 border border-slate-800/70 shadow-[0_0_40px_rgba(15,23,42,0.9)] overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 pt-3 pb-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={clsx(
              "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              active === tab.id
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-900/70 text-slate-200 hover:bg-slate-800"
            )}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-slate-400">
          FRONTDESK AGENTS · PREVIEW
        </span>
      </div>

      {/* Fake screenshot panel */}
      <div className="px-4 pb-4 pt-3">
        <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 shadow-inner">
          {/* Header bar / status */}
          <div className="flex items-center justify-between border-b border-slate-800/70 px-4 py-2 text-xs">
            <span className="font-medium text-slate-100">
              {active === "command-center" && "Command Center"}
              {active === "ai-inbox" && "AI Inbox"}
              {active === "revenue" && "Revenue & Analytics"}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              LIVE PREVIEW
            </span>
          </div>

          {/* Body content changes per tab */}
          <div className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            {/* Left side: main info */}
            <div className="space-y-3 text-xs md:text-sm">
              {active === "command-center" && (
                <>
                  <p className="text-slate-100 font-semibold">
                    One screen to see every call, WhatsApp and email in real time.
                  </p>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• Live queue of incoming & missed calls.</li>
                    <li>• Conversation status: new, in progress, booked, no-show risk.</li>
                    <li>• One-click callbacks and follow-ups.</li>
                    <li>• AI suggestions to recover lost opportunities.</li>
                  </ul>
                  <p className="text-[11px] text-slate-400">
                    *Illustrative preview. The real dashboard adapts to each business,
                    language and workflow automatically.
                  </p>
                </>
              )}

              {active === "ai-inbox" && (
                <>
                  <p className="text-slate-100 font-semibold">
                    Every interaction summarized, tagged and ready to reply or escalate.
                  </p>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• Unified inbox for calls, WhatsApp, SMS and email.</li>
                    <li>• Smart labels: new patient, urgent case, billing, spam, etc.</li>
                    <li>• 10-second summaries for long conversations.</li>
                    <li>• Click to send follow-up, reschedule or collect payments.</li>
                  </ul>
                  <p className="text-[11px] text-slate-400">
                    *FrontDesk Agents keeps every interaction auditable for HIPAA / GDPR / CCPA
                    compliance.
                  </p>
                </>
              )}

              {active === "revenue" && (
                <>
                  <p className="text-slate-100 font-semibold">
                    See exactly how many calls became appointments and revenue.
                  </p>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• Conversion rate from calls → booked appointments.</li>
                    <li>• Missed-call recovery performance by AI receptionist.</li>
                    <li>• Revenue by source: phone, WhatsApp, campaigns.</li>
                    <li>• No-show risk score and automatic reminder workflows.</li>
                  </ul>
                  <p className="text-[11px] text-slate-400">
                    *Metrics are calculated in real time so owners know what is happening
                    every hour, not just at the end of the month.
                  </p>
                </>
              )}
            </div>

            {/* Right side: mini KPI cards (fake UI) */}
            <div className="space-y-2">
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/80 px-3 py-2.5">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Key Metric
                </p>
                <p className="mt-1 text-xl font-semibold text-cyan-400">
                  {active === "revenue" ? "+38%" : "24/7"}
                </p>
                <p className="text-[11px] text-slate-300">
                  {active === "revenue"
                    ? "Increase in confirmed visits after 60 days."
                    : "AI receptionists answering and qualifying every lead."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-2.5 py-2">
                  <p className="text-slate-400">Avg. response</p>
                  <p className="text-sm font-semibold text-slate-100">3.2s</p>
                </div>
                <div className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-2.5 py-2">
                  <p className="text-slate-400">No-show risk</p>
                  <p className="text-sm font-semibold text-amber-300">↓ 27%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
