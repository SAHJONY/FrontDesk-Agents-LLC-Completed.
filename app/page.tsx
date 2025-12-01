// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getHeroImages } from "@/lib/frontdeskImages";

const heroImages = getHeroImages();

export default function HomePage() {
  const mainHero = heroImages[0] ?? {
    src: "/images/office_scene_01.png",
    alt: "FrontDesk Command Center in action"
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="w-full border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
          {/* LEFT: TEXT */}
          <div className="flex-1 space-y-6">
            <p className="inline rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              FrontDesk Command Center · Revenue Mode
            </p>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Turn every phone call
              <span className="block text-sky-300">
                into measurable revenue.
              </span>
            </h1>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              FrontDesk Command Center is your 24/7 AI Receptionist + live
              dashboard for calls, leads and appointments. Stop losing money on
              missed calls and finally see, in one screen, how much is on the
              line today.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="rounded-md bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-300"
              >
                Book a 15-minute demo
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-md border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900/60"
              >
                See how it works
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              Built for clinics, law firms, agencies and service businesses that
              live on the phone.
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
              <Image
                src={mainHero.src}
                alt={mainHero.alt}
                width={1200}
                height={750}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent px-4 pb-4 pt-10 text-xs text-slate-200">
                <p className="font-semibold">
                  FrontDesk Command Center · Executive view
                </p>
                <p className="text-[11px] text-slate-300">
                  Real-time metrics for calls, leads, appointments and estimated
                  revenue. One screen to control your front desk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
          <h2 className="text-xl font-semibold text-slate-50">
            If you miss calls, you&apos;re leaving money on the table.
          </h2>
          <p className="text-sm text-slate-300">
            Every day, your front desk gets calls from patients, clients,
            referrals and new leads. When nobody answers, most of them don&apos;t
            call back. They go to someone else. With FrontDesk Command Center
            you can finally answer:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
            <li>How many calls did we get today?</li>
            <li>How many did we miss?</li>
            <li>How many became leads and appointments?</li>
            <li>How much money is at risk right now?</li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
          <h2 className="text-xl font-semibold text-slate-50">
            How FrontDesk Command Center works
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 1 · AI Receptionist 24/7
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Your number, always answered.
              </p>
              <p className="mt-1 text-slate-300">
                We connect your business number to our AI Receptionist. It
                answers calls 24/7 with your script, captures info and routes
                conversations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 2 · Live Command Center
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                See calls, leads and appointments in real time.
              </p>
              <p className="mt-1 text-slate-300">
                Every call, lead and appointment appears in your dashboard: total
                calls, answered vs missed, new leads, new appointments and
                estimated revenue.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 3 · Missed Call Rescue
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Don&apos;t let missed calls die.
              </p>
              <p className="mt-1 text-slate-300">
                When a call is missed, the system sends an automatic SMS to
                rescue the lead: reply to this message or book directly in your
                calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
          <h2 className="text-xl font-semibold text-slate-50">
            Built for high-value, phone-heavy businesses
          </h2>
          <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            <p>Medical clinics &amp; med spas</p>
            <p>Law firms &amp; immigration offices</p>
            <p>Insurance agencies &amp; financial advisors</p>
            <p>Real estate teams &amp; brokerages</p>
            <p>Home services &amp; contractors</p>
            <p>Any business where one missed call can cost hundreds or thousands of dollars</p>
          </div>
        </div>
      </section>

      {/* PRICING SNAPSHOT */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
          <h2 className="text-xl font-semibold text-slate-50">
            Serious pricing for serious businesses
          </h2>
          <p className="max-w-2xl text-sm text-slate-300">
            We don&apos;t compete with $49 chatbots. We replace missed calls and
            chaos with a real, measurable revenue system. Start with a 3-month
            pilot and scale from there.
          </p>

          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Starter
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                From $299/mo
              </p>
              <p className="mt-1 text-slate-300">
                24/7 AI Receptionist, 1 number, basic call log and email
                summaries.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 ring-1 ring-sky-500/40">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Command Center · Most popular
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                From $799/mo
              </p>
              <p className="mt-1 text-slate-300">
                Everything in Starter plus Command Center Dashboard, Missed Call
                Rescue, Appointment Engine and monthly Intelligence Summary.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                + One-time setup: $399 for configuration and onboarding.
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-flex rounded-md bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-300"
              >
                View full pricing
              </Link>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Enterprise
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                From $1,499/mo
              </p>
              <p className="mt-1 text-slate-300">
                Multi-location, advanced reporting, SLAs and dedicated support
                for high-volume operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-slate-50">
            Ready to stop losing money on missed calls?
          </h2>
          <p className="text-sm text-slate-300">
            Book a 15-minute demo. We&apos;ll show you real dashboards, real
            scripts and how FrontDesk Command Center can plug into your business
            in days, not months.
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              href="/demo"
              className="rounded-md bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-300"
            >
              Book my demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
