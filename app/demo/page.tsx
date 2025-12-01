// app/demo/page.tsx
import Link from "next/link";

const CALENDLY_URL =
  "https://calendly.com/frontdesk-agents/demo-15"; // TODO: replace with your real booking link

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
          <h1 className="text-3xl font-semibold">
            FrontDesk Command Center · 15-minute demo
          </h1>
          <p className="text-sm text-slate-300">
            In this call we&apos;ll show you how 24/7 AI Receptionist + Command
            Center Dashboard can stop missed-call money leaks in your business.
          </p>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-8 space-y-6 text-sm text-slate-200">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-slate-50">
              What you&apos;ll see in 15 minutes
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>How our 24/7 AI Receptionist answers and logs your calls.</li>
              <li>
                The Command Center dashboard with calls, leads and appointments
                in real time.
              </li>
              <li>
                How Missed Call Rescue recovers money from missed calls through
                automatic SMS.
              </li>
              <li>
                Pricing and how the 3-month pilot works ({`$799/mo + $399`} setup,
                paid via invoice).
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-slate-50">
              How payment works
            </h2>
            <p className="text-slate-300">
              If it&apos;s a good fit, we&apos;ll send you a simple invoice. You
              can pay using{" "}
              <span className="font-semibold">
                Zelle, CashApp, wire transfer or PayPal
              </span>
              . Once we receive payment, we activate your Command Center within
              24 hours.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm font-semibold text-slate-50">
              Step 1: Choose a time for your demo
            </p>
            <p className="text-xs text-slate-300">
              Please make sure you&apos;ll be near a computer so we can show you
              the live dashboard and flows.
            </p>

            <div className="mt-2">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300"
              >
                Open demo calendar
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">
              If you prefer, you can also contact us directly at{" "}
              <span className="font-semibold text-slate-200">
                info@frontdeskagents.com
              </span>{" "}
              or by phone/text at{" "}
              <span className="font-semibold text-slate-200">
                (216) 452-6636
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
