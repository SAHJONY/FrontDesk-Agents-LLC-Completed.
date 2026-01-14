// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getPageHero } from "@/lib/siteImages";

export default function HomePage() {
  const hero = getPageHero("home");
  
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            AI RECEPTIONIST · 24/7
          </p>
          {hero && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                {hero.title}
              </h1>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {hero.description}
              </p>
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/setup"
              className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
            >
              Start onboarding
            </Link>
            <Link
              href="/demo"
              className="rounded-md border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300"
            >
              Book a live demo
            </Link>
          </div>
          <ul className="mt-4 space-y-1 text-xs text-slate-400">
            <li>• 24/7 AI phone agent + SMS follow-up</li>
            <li>• Outbound reactivation campaigns</li>
            <li>• No missed calls, no lost leads</li>
          </ul>
        </div>
        {hero && (
          <div>
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl border border-slate-800 object-cover"
              priority
            />
          </div>
        )}
      </section>
    </div>
  );
}
