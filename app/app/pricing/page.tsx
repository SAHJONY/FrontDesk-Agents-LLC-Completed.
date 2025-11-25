// app/pricing/page.tsx
import Image from "next/image";
import Link from "next/link";

type PlanProps = {
  name: string;
  price: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
};

function PlanCard({
  name,
  price,
  description,
  bullets,
  highlight,
}: PlanProps) {
  return (
    <article
      className={`fd-card p-6 sm:p-7 flex flex-col gap-4 ${
        highlight ? "ring-2 ring-cyan-400/60" : ""
      }`}
    >
      <h3 className="text-lg font-semibold text-slate-50">{name}</h3>
      <p className="text-sm text-slate-300">{description}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-50">{price}</span>
        <span className="text-xs text-slate-400">/month</span>
      </div>
      <ul className="space-y-2 text-sm text-slate-200">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="pt-3">
        <Link href="/setup">
          <button className="fd-btn-primary w-full justify-center">
            Start 14-Day Free Trial
          </button>
        </Link>
      </div>
    </article>
  );
}

export default function PricingPage() {
  const plans: PlanProps[] = [
    {
      name: "Starter",
      price: "$399",
      description: "Solo owners & small clinics.",
      bullets: [
        "1 AI receptionist",
        "1 phone number + 1 inbox",
        "English or Spanish",
        "Basic call & lead analytics",
      ],
    },
    {
      name: "Professional",
      price: "$899",
      description: "SMBs, law firms & multi-location practices.",
      bullets: [
        "Up to 3 AI agents",
        "Multilingual support",
        "WhatsApp + SMS follow-ups",
        "CRM / Airtable integration",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$1,799",
      description: "High-volume operations & nationwide brands.",
      bullets: [
        "Unlimited agents & numbers",
        "Custom workflows & SLAs",
        "Dedicated success manager",
        "Compliance & audit logging",
      ],
    },
  ];

  return (
    <main className="min-h-screen px-5 sm:px-8 pt-6 pb-12 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
              Simple, Transparent Pricing
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
              Turn Calls into Revenue, Not Cost
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              All plans include 24/7 AI receptionists, real-time analytics and
              integrations. No setup fee, cancel anytime.
            </p>
          </div>

          <div className="premium-image-container">
            <Image
              src="/premium/banners/convert-60s-en.png"
              alt="Turn calls into booked appointments"
              fill
              className="premium-image"
            />
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </section>
      </div>
    </main>
  );
}
