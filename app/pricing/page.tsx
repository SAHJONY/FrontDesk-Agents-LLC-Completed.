// app/pricing/page.tsx
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center space-y-3">
          <h1 className="text-3xl font-semibold">Pricing</h1>
          <p className="text-sm text-slate-300">
            Start with a 3-month pilot. No long-term contracts. Real results or
            we don&apos;t continue.
          </p>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          {/* Starter */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Starter
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">
              $299<span className="text-sm text-slate-300">/mo</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">
              For small offices that need a 24/7 AI Receptionist.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• 1 AI Receptionist number</li>
              <li>• 24/7 call handling</li>
              <li>• Basic call log</li>
              <li>• Email summaries</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/demo"
                className="inline-flex rounded-md border border-slate-600 px-4 py-2 text-xs font-semibold hover:bg-slate-900"
              >
                Book demo (Starter)
              </Link>
            </div>
          </div>

          {/* Command Center */}
          <div className="flex flex-col rounded-xl border border-sky-500/60 bg-slate-900/80 p-5 ring-1 ring-sky-500/50">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Command Center · Most popular
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">
              $799<span className="text-sm text-slate-300">/mo</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              + One-time setup: $399 (configuration + onboarding)
            </p>
            <p className="mt-3 text-sm text-slate-300">
              For serious businesses that want visibility and revenue control.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Everything in Starter</li>
              <li>• Command Center Dashboard (calls, leads, appointments)</li>
              <li>• Missed Call Rescue (automatic SMS)</li>
              <li>• Appointment Engine (from call to calendar)</li>
              <li>• Monthly Intelligence Summary</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/demo"
                className="inline-flex rounded-md bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-300"
              >
                Apply for 3-month pilot
              </Link>
            </div>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Enterprise
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">
              From $1,499<span className="text-sm text-slate-300">/mo</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">
              For multi-location or high-volume operations.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Everything in Command Center</li>
              <li>• Multi-location support</li>
              <li>• Custom reports and KPIs</li>
              <li>• Dedicated account manager</li>
              <li>• SLAs and integration support</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/demo"
                className="inline-flex rounded-md border border-slate-600 px-4 py-2 text-xs font-semibold hover:bg-slate-900"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-12 text-xs text-slate-400">
          <p>
            We currently activate pilots with invoice + manual payment (
            <span className="font-semibold text-slate-200">
              Zelle, CashApp, wire transfer or PayPal
            </span>
            ). Online card payments (Stripe, Square, PayPal) will be enabled
            after the pilot phase.
          </p>
        </div>
      </section>
    </main>
  );
}
