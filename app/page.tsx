'use client';

import Image from "next/image";
import Link from "next/link";
import { getPageHero } from "@/lib/siteImages";
import { Globe, Shield, Zap } from 'lucide-react'; // Essential for Global/Local branding

export default function HomePage() {
  const hero = getPageHero("home");
  
  return (
    <div className="space-y-10 min-h-screen bg-slate-950">
      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center py-12 px-6 lg:px-12">
        <div className="space-y-5">
          {/* Global Branding Element */}
          <div className="flex items-center gap-3">
             <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
               AI RECEPTIONIST · 24/7
             </p>
             <span className="h-[1px] w-12 bg-sky-400/30"></span>
             <span className="text-[10px] text-sky-400/60 font-bold uppercase tracking-widest">LATAM · EMEA · APAC</span>
          </div>

          {hero && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-6xl leading-tight">
                {hero.title}
              </h1>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base max-w-xl">
                {hero.description}
              </p>
            </>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/setup"
              className="rounded-full bg-sky-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-sky-300 transition-all hover:scale-105 shadow-lg shadow-sky-400/20"
            >
              Start Onboarding
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-slate-600 px-8 py-3 text-sm font-bold text-slate-100 hover:border-sky-400 hover:text-sky-300 transition-all"
            >
              Book Live Demo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
             <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Enterprise Secure</span>
             </div>
             <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Multi-Market Ready</span>
             </div>
             <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>15% Marketplace Fee</span>
             </div>
          </div>
        </div>

        {hero && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="relative h-auto w-full rounded-xl border border-slate-800 object-cover shadow-2xl"
              priority
            />
          </div>
        )}
      </section>
    </div>
  );
}
