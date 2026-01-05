// app/pricing/page.tsx
import { formatUSD, PLANS, REGION_MULTIPLIERS, safePriceUSD, type PlanKey } from "@/lib/pricing";

const DEFAULT_REGION: keyof typeof REGION_MULTIPLIERS = "western";

export default function PricingPage() {
  const region = DEFAULT_REGION; // TODO: wire to your UI dropdown/state
  const multiplier = REGION_MULTIPLIERS[region];

  const order: PlanKey[] = ["basic", "professional", "growth", "elite"];

  return (
    <main style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>SOVEREIGN PRICING</h1>
      <p style={{ opacity: 0.8, marginBottom: 18 }}>
        Western Markets Multiplier: 1.0x &nbsp; Emerging Markets Multiplier: 0.65x &nbsp; Growth Markets Multiplier: 0.35x
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {order.map((key) => {
          const plan = PLANS[key];
          const computed = safePriceUSD(plan.baseMonthlyUSD, multiplier);

          return (
            <section key={key} style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{plan.name}</h3>

              <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 10 }}>
                {computed ? `${formatUSD(computed)}/mo` : "Contact us"}
              </div>

              <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
                <li>{plan.minutes}</li>
                <li>{plan.agents}</li>
                {plan.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <button style={{ marginTop: 14, width: "100%", padding: "12px 14px", borderRadius: 12, fontWeight: 700 }}>
                Activate Workforce
              </button>
            </section>
          );
        })}
      </div>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        *Pricing is permanent across all platforms. Regional multipliers applied at checkout.
      </p>
    </main>
  );
}
