// app/demo/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import Link from "next/link";
import DemoLeadForm from "./DemoLeadForm";

export const dynamic = "force-dynamic";

export default function DemoPage() {
  const hero = getPageHero("demo");

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          LIVE DEMO
        </p>

        {hero && (
          <>
            <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">{hero.description}</p>
          </>
        )}
      </section>

      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-xl border border-slate-800 object-cover"
          priority
        />
      )}

      {/* NEW: Lead capture before booking */}
      <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-50">
            Before you book (30 seconds)
          </h2>
          <p className="text-sm text-slate-300">
            This helps us tailor the demo to your trade and service area, and it
            lets us follow up if Calendly errors out.
          </p>
        </div>

        <div className="mt-5">
          <DemoLeadForm calendlyUrl="https://calendly.com/frontdeskllc/30min" />
        </div>
      </section>

      {/* Booking */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">1. Book your demo</h2>
          <p className="text-sm text-slate-300">
            Pick any available slot. We’ll connect via Zoom or Google Meet and
            walk through your call flow and revenue leaks.
          </p>

          <Link
            href="https://calendly.com/frontdeskllc/30min"
            target="_blank"
            className="inline-flex items-center rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Open Calendly in a new tab
          </Link>

          <p className="text-xs text-slate-500">
            Tip: If the embed doesn’t load, use the button above.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">2. Or book directly here</h2>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <iframe
              src="https://calendly.com/frontdeskllc/30min"
              width="100%"
              height="600"
              style={{ border: "0" }}
              loading="lazy"
              title="Calendly booking"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
