import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-4 pb-16 pt-10 space-y-8">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-400">
          Live demo
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          See FrontDesk Agents working with your own calls.
        </h1>
        <p className="text-base text-slate-300">
          Book a 30-minute session to hear the AI receptionist handle real call
          scenarios for your business. We&apos;ll walk through scripts,
          languages, and integrations.
        </p>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
          <p className="text-sm text-slate-200">
            Use this space to embed your Calendly, HubSpot, or custom booking
            widget. For now it&apos;s a safe demo placeholder.
          </p>
          <Link
            href="https://calendly.com"
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
          >
            Book a demo slot
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          Prefer to talk to a human first? Call sales at{" "}
          <a href="tel:+12164804413" className="text-sky-400">
            +1 (216) 480-4413
          </a>
          .
        </p>
      </div>
    </main>
  );
}
