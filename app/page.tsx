// app/page.tsx

import Link from "next/link";
import Image from "next/image";
import AISetupForm from "@/app/components/AISetupForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 md:flex-row md:items-center md:pt-24">
          {/* Left – Copy */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              AI PHONE OS · FRONTDESK AGENTS
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Turn every call into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              in under 60 seconds.
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
              FrontDesk Agents is the{" "}
              <span className="font-semibold text-cyan-300">AI PHONE OS</span>{" "}
              that answers, qualifies, routes and books clients for you —
              24/7, in multiple languages, with human-like voice and memory.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300 md:text-sm">
              <li>• No more missed calls or voicemails.</li>
              <li>• Instant booking into your calendar and CRM.</li>
              <li>• Voice-first intelligence with low-latency, human-like turn-taking.</li>
              <li>• Unified customer profile across phone, SMS, WhatsApp, and email.</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="btn-primary">
                Start Free Trial
              </a>
              <a href="/enterprise" className="btn-secondary">
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Built for medical, legal, real estate, and high-velocity B2B teams.
            </p>
          </div>

          {/* Right – Hero Image */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-cyan-500/10 blur-3xl" />
              <Image
                src="/premium/hero-office.jpg"
                alt="FrontDesk Agents – AI PHONE OS for global businesses"
                width={900}
                height={700}
                className="h-auto w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 object-cover shadow-2xl shadow-cyan-500/20"
                priority
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-slate-950/80 px-4 py-3 text-xs text-slate-200 backdrop-blur">
                <p className="font-semibold text-cyan-300">
                  Live AI receptionist
                </p>
                <p>Answers, qualifies and books while your team focuses on work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICALS / INDUSTRIES */}
      <section className="border-b border-slate-800 bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              high-value industries
            </span>
          </h2>
          <p className="mt-3 text-center text-sm text-slate-400">
            One AI PHONE OS, customized for medical, legal, real estate and
            global service businesses.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Medical */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <Image
                src="/premium/medical-team.jpg"
                alt="Medical team using AI PHONE OS"
                width={600}
                height={400}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  Medical & Dental
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Never miss a patient call again. AI handles triage, insurance
                  questions, and appointment booking — with HIPAA-aligned flows.
                </p>
              </div>
            </div>

            {/* Legal */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <Image
                src="/premium/law-firm.jpg"
                alt="Law firm leveraging AI PHONE OS"
                width={600}
                height={400}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  Law Firms
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Intake every lead, qualify in real-time, and route to the
                  right attorney or closer. No more “sorry, we missed your call.”
                </p>
              </div>
            </div>

            {/* Real Estate */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <Image
                src="/premium/real-estate.jpg"
                alt="Real estate agents supported by AI PHONE OS"
                width={600}
                height={400}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  Real Estate & Investors
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  From motivated sellers to high-intent buyers, the AI answers
                  24/7, qualifies, and books showings on your calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED FEATURES – AI PHONE OS */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Not just a receptionist.{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                  A full AI PHONE OS.
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                We go far beyond scripted bots. AI PHONE OS listens, thinks and
                acts like a trained team member — with speed, memory and global
                reach.
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                <li>
                  • <span className="font-semibold">Low-Latency, Human-Like Turn-Taking</span>{" "}
                  (≈50–120ms) for natural conversations.
                </li>
                <li>
                  • <span className="font-semibold">Unified Customer Profile</span> across
                  calls, SMS, WhatsApp and email.
                </li>
                <li>
                  • <span className="font-semibold">Autonomous Task Engine</span> to book,
                  route, follow-up and trigger workflows.
                </li>
                <li>
                  • <span className="font-semibold">Multi-Language Neural Voice</span>{" "}
                  handling 32+ languages and dialects.
                </li>
                <li>
                  • <span className="font-semibold">Context-Aware Handoff</span> to your
                  human team when needed — with full call summary.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-xs text-slate-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                LIVE SYSTEM SNAPSHOT
              </p>
              <div className="mt-3 space-y-2">
                <p>• Contact rate: 94%</p>
                <p>• Avg. response time: 0.8s</p>
                <p>• Booked appointments today: 27</p>
                <p>• Languages detected: EN, ES, PT</p>
                <p>• Human handoffs: 3 (complex cases)</p>
              </div>
              <p className="mt-4 text-[11px] text-slate-500">
                Metrics for illustration. In production, this panel connects
                directly to your live usage data and CRM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Trust, Security & Compliance by Design
            </h2>
            <p className="mt-3 text-sm text-slate-300 md:text-base">
              AI PHONE OS is built on an enterprise-grade architecture designed
              to support regulated industries and global operations.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  SOC 2 Type II Architecture
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Audit-grade logging, role-based access, and encrypted data —
                  built to align with SOC 2 best practices.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  GDPR & CCPA Ready
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Consent-first design, data minimization, and opt-out controls
                  for your EU and California customers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="text-sm font-semibold text-cyan-300">
                  HIPAA-Aligned for Medical
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Strict confidentiality flows, access control, and secure data
                  paths for medical and dental use cases.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-500">
              Compliance note: Always validate final legal/compliance
              requirements with your counsel for your jurisdiction.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Trusted by teams who can’t afford to miss a call
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm italic text-slate-200">
                “AI PHONE OS replaced our entire front desk. We increased booked
                appointments by 290% in 60 days.”
              </p>
              <p className="mt-3 text-xs font-semibold text-cyan-300">
                Medical Practice · Houston, TX
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm italic text-slate-200">
                “Every intake call is answered, qualified and summarized before
                it even reaches an attorney.”
              </p>
              <p className="mt-3 text-xs font-semibold text-cyan-300">
                Law Firm · Miami, FL
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm italic text-slate-200">
                “We no longer lose deals to voicemail. The system books
                showings and follow-ups automatically.”
              </p>
              <p className="mt-3 text-xs font-semibold text-cyan-300">
                Real Estate Brokerage · Dallas, TX
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Plans that scale with your communication volume
          </h2>
          <p className="mt-3 text-center text-sm text-slate-400">
            Value-based pricing with setup fees that cover your custom AI
            configuration and integrations.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold text-cyan-300">Starter</h3>
              <p className="mt-1 text-xs text-slate-400">
                Small business · single location
              </p>
              <p className="mt-4 text-2xl font-bold">$249–$349</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: <span className="font-semibold">$399–$599</span>
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Core call answering & routing</li>
                <li>• Appointment booking</li>
                <li>• Basic lead capture and notifications</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-cyan-500/60 bg-slate-900/80 p-6 shadow-lg shadow-cyan-500/20">
              <p className="inline rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Most popular
              </p>
              <h3 className="mt-3 text-sm font-semibold text-cyan-300">Pro</h3>
              <p className="mt-1 text-xs text-slate-400">
                Growing teams · multi-channel
              </p>
              <p className="mt-4 text-2xl font-bold">$699–$999</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: <span className="font-semibold">$1,299–$1,999</span>
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Cross-channel contextual memory</li>
                <li>• Two-way CRM sync (HubSpot, etc.)</li>
                <li>• Dynamic persona & tone shifting</li>
                <li>• Advanced automation workflows</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400">
                Ideal for medical, legal, real estate and B2B SaaS teams with
                steady inbound volume.
              </p>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-semibold text-cyan-300">Enterprise</h3>
              <p className="mt-1 text-xs text-slate-400">
                High volume · complex workflows
              </p>
              <p className="mt-4 text-2xl font-bold">$1,999–$4,999+</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: <span className="font-semibold">$3,500–$7,500+</span>
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Autonomous Task Execution (ATE)</li>
                <li>• Human-in-the-loop managed service</li>
                <li>• Custom model tuning and workflows</li>
                <li>• Priority support and SLAs</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400">
                Vertical multipliers for e-commerce, legal/medical, and B2B SaaS
                can apply based on ROI.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-500">
            Overage minutes: typically $0.10–$0.15 per minute, depending on
            volume and vertical.
          </p>
        </div>
      </section>

      {/* SETUP / AI BLUEPRINT FORM USING AISetupForm */}
      <section
        id="setup"
        className="border-b border-slate-800 bg-slate-950/95"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              Design your AI PHONE OS in minutes
            </h2>
            <p className="mt-3 text-center text-sm text-slate-300">
              Tell us about your business and we’ll generate a custom AI
              receptionist blueprint for your calls, scripts and workflows.
            </p>

            <div className="mt-10 max-w-3xl mx-auto">
              {/* Aquí usamos el componente interno con el prop requerido */}
              <AISetupForm lang="en" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} FrontDesk Agents · AI PHONE OS.</p>
          <div className="flex gap-4">
            <Link href="#pricing" className="hover:text-cyan-300">
              Pricing
            </Link>
            <Link href="#setup" className="hover:text-cyan-300">
              Get AI Blueprint
            </Link>
            <a
              href="mailto:sales@frontdeskagents.com"
              className="hover:text-cyan-300"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
