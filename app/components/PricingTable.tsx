// app/components/PricingTable.tsx

"use client";

type TierId = "starter" | "pro" | "enterprise";

type Tier = {
  id: TierId;
  name: string;
  target: string;
  monthly_price: string;
  setup_fee: string;
  highlight?: boolean;
  features: string[];
};

const tierList: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    target: "Small business • 1 vertical",
    monthly_price: "$249 – $349 / month",
    setup_fee: "$399 – $599 one-time",
    features: [
      "Core call answering & routing",
      "Basic appointment booking",
      "Lead capture & intake forms",
      "Single phone number",
      "Email + SMS notifications"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    target: "Growing teams • Multi-channel",
    monthly_price: "$699 – $999 / month",
    setup_fee: "$1,299 – $1,999 one-time",
    highlight: true,
    features: [
      "Everything in Starter",
      "Cross-channel contextual memory",
      "2-way CRM sync (HubSpot, etc.)",
      "Dynamic persona & tone shifting",
      "Advanced workflows & routing rules"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    target: "High volume • Complex workflows",
    monthly_price: "$1,999 – $4,999+ / month",
    setup_fee: "$3,500 – $7,500+ one-time",
    features: [
      "Everything in Pro",
      "Full Autonomous Task Execution (ATE)",
      "Human-in-the-loop (HIL) escalation",
      "Custom model tuning & SLAs",
      "Dedicated onboarding & support"
    ]
  }
];

export default function PricingTable() {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-50">
          Pricing that scales with your volume
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto">
          FrontDesk Agents is priced on value: more booked appointments,
          fewer missed calls, and a receptionist that never sleeps.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tierList.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-2xl border p-6 shadow-sm bg-slate-900/70 border-slate-800 ${
              tier.highlight
                ? "ring-2 ring-cyan-400 shadow-cyan-500/20"
                : ""
            }`}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-50">
                {tier.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-cyan-300">
                {tier.target}
              </p>
            </div>

            <div className="mb-4 space-y-1">
              <p className="text-xl font-semibold text-slate-50">
                {tier.monthly_price}
              </p>
              <p className="text-xs text-slate-400">
                Setup fee: {tier.setup_fee}
              </p>
            </div>

            <ul className="mb-6 flex-1 space-y-2 text-sm text-slate-300">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-auto w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                tier.highlight
                  ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                  : "border border-slate-600 text-slate-100 hover:bg-slate-800"
              }`}
            >
              {tier.id === "starter"
                ? "Start 14-day trial"
                : tier.id === "pro"
                ? "Talk to sales"
                : "Book enterprise demo"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Usage beyond included volume is billed per minute. Premium verticals
        (law, medical, B2B SaaS) may use a value-based multiplier.
      </p>
    </section>
  );
}
