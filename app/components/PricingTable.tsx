// app/components/PricingTable.tsx
import React from "react";

const tiers = [
  {
    name: "Starter",
    monthly: "$249 – $349 /mo",
    setup: "$399 – $599 one-time",
    bullets: [
      "Core 24/7 automation and appointment booking",
      "1 AI receptionist, 1 inbox",
      "Up to ~1,000 minutes / month included",
      "Basic reporting dashboard"
    ]
  },
  {
    name: "Pro",
    monthly: "$699 – $999 /mo",
    setup: "$1,299 – $1,999 one-time",
    bullets: [
      "Cross-Channel Contextual Memory",
      "2-way CRM sync and advanced routing",
      "Multiple numbers and inboxes",
      "Priority support & onboarding"
    ]
  },
  {
    name: "Enterprise",
    monthly: "$1,999 – $4,999+ /mo",
    setup: "$3,500 – $7,500+ one-time",
    bullets: [
      "Full Autonomous Task Execution (ATE) playbooks",
      "Optional Human-in-the-Loop (HIL) coverage",
      "Custom model tuning & dedicated CSM",
      "SLA, security review and partner API access"
    ]
  }
];

export default function PricingTable() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/5"
          >
            <h3 className="text-lg font-semibold text-slate-50">
              {tier.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-cyan-400">
              {tier.monthly}
            </p>
            <p className="text-xs text-slate-400">{tier.setup}</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {tier.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
              Start with {tier.name}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Usage overages billed at $0.10 – $0.15 per minute beyond included
        allowance. Annual contracts may qualify for setup-fee waivers.
      </p>
    </div>
  );
}
