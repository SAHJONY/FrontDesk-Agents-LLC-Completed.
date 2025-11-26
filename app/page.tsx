import { frontdeskAgentsSystem } from "@/lib/frontdesk_agents_system";
import PricingTable from "@/app/components/PricingTable";

export default function HomePage() {
  const { identity } = frontdeskAgentsSystem;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10">
      <section className="mt-8 grid gap-8 md:grid-cols-[3fr,2fr]">
        <div>
          <p className="text-xs font-semibold uppercase text-cyan-400">
            {identity.core_tagline}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {identity.name}: The AI Phone OS for customer conversations.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            {identity.description}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-slate-300">
            <li>• Turn missed calls into booked appointments automatically.</li>
            <li>• Sync every interaction into your CRM in real time.</li>
            <li>• Support English and Spanish out of the box.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/signup"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Start 14-day trial
            </a>
            <a
              href="tel:+1YOURDEMONUMBER"
              className="text-sm text-cyan-300 underline-offset-4 hover:underline"
            >
              Call the live demo line →
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-cyan-300">
            System Overview
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Architecture:
          </p>
          <ul className="mt-1 space-y-1 text-xs">
            <li>• Marketing site: {frontdeskAgentsSystem.architecture.marketing_site}</li>
            <li>• Command center: {frontdeskAgentsSystem.architecture.internal_app}</li>
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            Strategic goal:
          </p>
          <p className="text-xs">
            {frontdeskAgentsSystem.strategic_goal}
          </p>
        </div>
      </section>

      <PricingTable />
    </main>
  );
}
