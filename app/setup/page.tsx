// app/setup/page.tsx
'use client'; // Required for interactive setup buttons

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Phone, CreditCard, Calendar, ArrowRight } from "lucide-react";
import { getPageHero } from "@/lib/siteImages";

export default function SetupPage() {
  const hero = getPageHero("setup");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* FIXED NAVIGATION: Inline to avoid 'top-nav' build error */}
      <nav className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8">
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Setup · Onboarding · Global Hub
          </p>
          {hero && (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl text-white">
                {hero.title}
              </h1>
              <p className="text-sm text-slate-300 sm:text-base max-w-2xl">
                {hero.description}
              </p>
            </>
          )}
        </header>

        {/* HERO IMAGE CONTAINER */}
        
        {hero && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800 group">
            <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-transparent transition-colors z-10" />
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        )}

        {/* CONFIGURATION STEPS */}
        <div className="grid gap-6">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-sky-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="text-sky-400 w-5 h-5" />
              <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wider">
                Step 1 · Voice Infrastructure (Bland.ai/Twilio)
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Connect your voice trunk. Choose your country, prefix, and business hours. All calls are logged in your <strong>Owner Command Center</strong>.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-sky-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="text-sky-400 w-5 h-5" />
              <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wider">
                Step 2 · Payment Activation (15% Marketplace Logic)
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Link Stripe, PayPal, or Zelle. Collect deposits and membership fees directly via AI voice interaction.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-sky-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-sky-400 w-5 h-5" />
              <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wider">
                Step 3 · CRM & Calendar Sync
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Integrate with HubSpot or Google Sheets. Confirmed appointments are sent instantly via SMS/WhatsApp.
            </p>
          </div>
        </div>

        {/* CTA ACTION */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-sky-500/5 border border-sky-500/20">
          <button className="w-full sm:w-auto rounded-full bg-sky-500 px-8 py-4 text-sm font-bold text-slate-950 hover:bg-sky-400 transition-all flex items-center justify-center gap-2">
            Comenzar configuración guiada
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Your account will be ready for real-time revenue generation upon completion.
          </p>
        </div>
      </section>
    </main>
  );
}
