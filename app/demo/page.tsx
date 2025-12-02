// app/demo/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import { TopNav } from "@/components/top-nav";
import Link from "next/link";

export default function DemoPage() {
  const hero = getPageHero("demo");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        <section className="mb-10 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Book a live demo of FrontDesk Agents
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              In 15–30 minutes we show you live how the AI receptionist answers calls, sends
              SMS/WhatsApp, and fills your dashboard with structured leads.
            </p>
            <p className="text-xs text-slate-400">
              Demo en inglés o español. Podemos usar ejemplos reales de tu negocio.
            </p>

            <div className="space-y-2">
              <Link
                href="https://calendly.com/frontdeskllc/30min"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
              >
                Schedule 30-minute demo on Calendly
              </Link>
              <p className="text-[11px] text-slate-500">
                You&apos;ll receive a calendar invite with Zoom/Meet link automatically.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl border border-slate-800 object-cover shadow-xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
