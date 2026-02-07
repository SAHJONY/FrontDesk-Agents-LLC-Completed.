import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — FrontDesk Agents",
  description:
    "Privacy Policy for the FrontDesk Agents platform. Effective date: January 7, 2026.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      {/* Cinematic Background Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-black to-black" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 md:py-32">
        {/* Header Section */}
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-emerald-400 uppercase border border-emerald-400/30 bg-emerald-400/10 rounded-full">
            Data Protection Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic uppercase">
            Privacy <span className="text-emerald-500">Policy</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 font-medium">
            <p>Effective date: January 7, 2026</p>
            <span className="hidden md:block text-white/20">|</span>
            <p>Secure Intelligence Operations</p>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden md:block md:col-span-3 sticky top-32 h-fit space-y-4">
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase tracking-wider text-slate-500">
              <a href="#collection" className="hover:text-emerald-400 transition-colors">01. Collection</a>
              <a href="#usage" className="hover:text-emerald-400 transition-colors">02. Usage</a>
              <a href="#sharing" className="hover:text-emerald-400 transition-colors">03. Sharing</a>
              <a href="#security" className="hover:text-emerald-400 transition-colors">04. Security</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">05. Contact</a>
            </nav>
          </aside>

          {/* Main Legal Text */}
          <div className="md:col-span-9 space-y-16 text-lg leading-relaxed text-slate-300">
            <section className="prose prose-invert max-w-none">
              <p className="text-xl text-white font-medium leading-relaxed">
                At FrontDesk Agents, we treat your data with the same precision as our AI agents. 
                This Policy outlines our rigorous standards for data collection, processing, 
                and protection across our global infrastructure.
              </p>
            </section>

            <section id="collection" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">01</span> Data Collection
              </h2>
              <p>
                We collect essential telemetry to power your Global Node, including account credentials, 
                usage metrics, and any information submitted through our autonomous integrations. 
                This includes voice interaction logs used for Reinforcement Learning (RL) optimization.
              </p>
            </section>

            <section id="usage" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">02</span> Strategic Usage
              </h2>
              <p>
                Your data is used exclusively to maintain system security, provide customer support, 
                and improve the performance of our AI workforce. We analyze interaction patterns 
                to increase conversion rates and operational efficiency for your business.
              </p>
            </section>

            <section id="sharing" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">03</span> Data Distribution
              </h2>
              <p>
                We only share data with verified infrastructure partners (e.g., Bland AI, Supabase, Stripe) 
                necessary for the operation of your Service. We never sell your data to third-party 
                marketing entities.
              </p>
            </section>

            <section id="security" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">04</span> Security Protocols
              </h2>
              <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">Encryption Standard</p>
                <p>
                  All data is encrypted at rest and in transit using industry-standard protocols. 
                  Our "Medic" agent continuously monitors for security anomalies and unauthorized 
                  access attempts.
                </p>
              </div>
            </section>

            <section id="contact" className="pt-12 border-t border-white/10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">
                Privacy Infrastructure
              </h2>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Data Protection Officer</p>
                <a href="mailto:frontdeskllc@outlook.com" className="text-xl font-medium hover:text-emerald-400 transition-colors underline underline-offset-8 decoration-white/20">
                  frontdeskllc@outlook.com
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Link */}
        <footer className="mt-32 pt-12 border-t border-white/10 text-center">
          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
            Return to Command Center
          </Link>
        </footer>
      </main>
    </div>
  );
}
