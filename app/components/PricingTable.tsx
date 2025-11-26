import { frontdeskAgentsSystem } from "@/lib/frontdesk_agents_system";

const tiers = frontdeskAgentsSystem.pricing_model.tiers;

export default function PricingTable() {
  const tierList = [tiers.starter, tiers.pro, tiers.enterprise];

  return (
    <section className="mx-auto max-w-5xl py-12">
      <h2 className="text-center text-3xl font-semibold tracking-tight">
        Pricing that scales with conversations
      </h2>
      <p className="mt-2 text-center text-sm text-slate-400">
        {frontdeskAgentsSystem.pricing_model.base_principle}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tierList.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-cyan-400">
              {tier.target}
            </p>
            <p className="mt-4 text-2xl font-bold">{tier.monthly_price}</p>
            <p className="text-xs text-slate-400">
              Setup: {tier.setup_fee}
            </p>
            <ul className="mt-4 flex-1 space-y-1 text-sm text-slate-300">
              {tier.core_features.map((f: string) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
              Start {tier.name}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Usage overage: {frontdeskAgentsSystem.pricing_model.pricing_rules.overage_rate}.
      </p>
    </section>
  );
}
