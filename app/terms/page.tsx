import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — FrontDesk Agents",
  description:
    "Terms of Service for the FrontDesk Agents platform. Effective date: January 7, 2026.",
};

export default function TermsPage() {
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
            Legal Framework v2.1
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic uppercase italic">
            Terms of <span className="text-emerald-500">Service</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 font-medium">
            <p>Effective date: January 7, 2026</p>
            <span className="hidden md:block text-white/20">|</span>
            <p>FrontDesk Agents LLC Global Operations</p>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden md:block md:col-span-3 sticky top-32 h-fit space-y-4">
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase tracking-wider text-slate-500">
              <a href="#accounts" className="hover:text-emerald-400 transition-colors">01. Accounts</a>
              <a href="#payments" className="hover:text-emerald-400 transition-colors">02. Payments</a>
              <a href="#usage" className="hover:text-emerald-400 transition-colors">03. Usage</a>
              <a href="#liability" className="hover:text-emerald-400 transition-colors">04. Liability</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">05. Contact</a>
            </nav>
          </aside>

          {/* Main Legal Text */}
          <div className="md:col-span-9 space-y-16 text-lg leading-relaxed text-slate-300">
            <section className="prose prose-invert max-w-none">
              <p className="text-xl text-white font-medium leading-relaxed">
                These Terms govern your access to and use of the FrontDesk Agents platform ("Service"). 
                By activating a Global Node or accessing the dashboard, you enter into a binding 
                agreement with FrontDesk Agents LLC.
              </p>
            </section>

            <section id="accounts" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">01</span> Accounts & Access
              </h2>
              <p>
                You are responsible for maintaining the absolute confidentiality of your credentials. 
                All activities performed under your account are your sole responsibility. Unauthorized 
                access attempts to the Global Node infrastructure will result in immediate termination.
              </p>
            </section>

            <section id="payments" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">02</span> Global Node Operations
              </h2>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <p className="font-bold text-white uppercase tracking-wide text-sm">Pricing Tiers & Capacity</p>
                <p>
                  Users agree to the permanent pricing tiers of <span className="text-emerald-400 font-bold">$149, $499, $999, and $1,999</span>. 
                  System capacity is provisioned in <span className="text-white font-medium">Minutes of AI Interaction</span>. 
                  Usage exceeding the allotted monthly bucket will incur automated overage charges 
                  to ensure continued Global Node stability.
                </p>
                <p className="text-sm text-slate-500 italic">
                  *Enterprise Tier ($1,999) activations include a Performance Royalty (Success Fee) 
                  on all recovered revenue.
                </p>
              </div>
            </section>

            <section id="usage" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">03</span> Acceptable Use
              </h2>
              <p>
                You agree not to misuse the Service, including violating international laws, 
                transmitting unauthorized spam, or attempting to reverse-engineer the RL 
                (Reinforcement Learning) models powering the agents.
              </p>
            </section>

            <section id="liability" className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-emerald-500 text-sm font-mono">04</span> Limitation of Liability
              </h2>
              <p>
                The Service is provided “as is” without warranties. To the maximum extent permitted 
                by law, FrontDesk Agents LLC will not be liable for indirect, incidental, or 
                consequential damages arising from AI interaction outcomes.
              </p>
            </section>

            <section id="contact" className="pt-12 border-t border-white/10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">
                Contact Infrastructure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Email Support</p>
                  <a href="mailto:frontdeskllc@outlook.com" className="text-xl font-medium hover:text-emerald-400 transition-colors underline underline-offset-8 decoration-white/20">
                    frontdeskllc@outlook.com
                  </a>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Direct Line</p>
                  <p className="text-xl font-medium">+1 (678) 346-6284</p>
                </div>
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
