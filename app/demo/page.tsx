// app/demo/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import Link from "next/link";

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
            <p className="max-w-2xl text-sm text-slate-300">
              {hero.description}
            </p>
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
        />
      )}

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">
            1. Book your demo
          </h2>
          <p className="text-sm text-slate-300">
            Pick any available slot that works for you. We’ll connect via Zoom
            or Google Meet and walk through your current call flow and revenue
            leaks.
          </p>
          <Link
            href="https://calendly.com/frontdeskllc/30min"
            target="_blank"
            className="inline-flex items-center rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Open Calendly in a new tab
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">
            2. Or book directly here
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <iframe
              src="https://calendly.com/frontdeskllc/30min"
              width="100%"
              height="600"
              style={{ border: "0" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
