import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    subtitle: 'Solo owners & small clinics.',
    price: '$399',
    period: '/month',
    features: [
      '1 AI receptionist',
      '1 phone number + 1 inbox',
      'English or Spanish',
      'Basic call & lead analytics'
    ]
  },
  {
    name: 'Professional',
    subtitle: 'Growing teams & multi-location practices.',
    price: '$899',
    period: '/month',
    highlight: true,
    features: [
      'Up to 3 AI receptionists',
      'Multiple numbers & inboxes',
      'EN · ES · +100 idiomas y dialectos',
      'Advanced revenue & conversion analytics',
      'Priority onboarding & support'
    ]
  },
  {
    name: 'Enterprise',
    subtitle: 'Large groups, DSOs & hospital networks.',
    price: 'Let’s talk',
    period: '',
    features: [
      'Unlimited AI receptionists',
      'Custom workflows & integrations',
      'Dedicated CSM & SLAs',
      'HIPAA / GDPR / CCPA ready'
    ]
  }
];

export default function PricingTable() {
  return (
    <section className="space-y-8">
      <header className="space-y-3 text-center md:text-left">
        <p className="text-xs tracking-[0.25em] text-cyan-400">
          SIMPLE, TRANSPARENT PRICING
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
          Turn Calls into Revenue, Not Cost
        </h2>
        <p className="max-w-2xl text-sm text-slate-300">
          All plans include 24/7 AI receptionists, real-time analytics and integrations. No
          setup fee, cancel anytime.
        </p>
      </header>

      {/* Premium preview card instead of broken image */}
      <div className="rounded-3xl bg-slate-950/90 border border-slate-800/80 shadow-[0_0_60px_rgba(15,23,42,0.9)] p-4 mb-4">
        <div className="grid gap-4 md:grid-cols-[1.4fr,1fr] items-stretch">
          <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.25),_transparent_55%)] border border-slate-800/80">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/70 to-slate-900/50" />
            <div className="relative p-4 space-y-3 text-[11px] text-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Turn calls into booked appointments</span>
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-emerald-300">
                  +38% more confirmed visits
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3 space-y-1.5">
                <p className="font-medium">
                  “Hi, this is your AI receptionist with FrontDesk Agents. I can help you book
                  an appointment in less than 60 seconds.”
                </p>
                <p className="text-[10px] text-slate-400">
                  Calls, WhatsApp and email all follow your exact playbook.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Answer rate', value: '99.3%' },
                  { label: 'Booked from calls', value: '41%' },
                  { label: 'No-show reduction', value: '-27%' }
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2 flex flex-col gap-1"
                  >
                    <span className="text-[10px] text-slate-400">{m.label}</span>
                    <span className="text-xs font-semibold text-slate-100">{m.value}</span>
                    <span className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <p className="text-sm text-slate-300">
              FrontDesk Agents replaces missed calls and voicemail with AI receptionists that
              book real appointments, collect payments and qualify leads.
            </p>
            <ul className="space-y-1.5 text-[13px] text-slate-300">
              <li>• 24/7 coverage without adding headcount.</li>
              <li>• Works in EN / ES +100 idiomas y dialectos.</li>
              <li>• Plays nicely with your existing calendar, CRM and billing.</li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:bg-cyan-400 transition"
              >
                Start 14-day free trial
              </Link>
              <span className="text-[11px] text-slate-400">
                No setup fees. Cancel anytime. HIPAA / GDPR / CCPA ready.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-4 sm:p-5 flex flex-col justify-between ${
              plan.highlight
                ? 'border-cyan-500/70 bg-slate-950 shadow-[0_0_60px_rgba(34,211,238,0.5)]'
                : 'border-slate-800/80 bg-slate-950/80'
            }`}
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-50">{plan.name}</h3>
              <p className="text-sm text-slate-300">{plan.subtitle}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-semibold text-slate-50">{plan.price}</span>
                {plan.period && (
                  <span className="text-xs text-slate-400">{plan.period}</span>
                )}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <button
                className={`w-full rounded-full px-3 py-2 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                    : 'bg-slate-900 text-slate-100 hover:bg-slate-800'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Talk to sales' : 'Choose plan'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
