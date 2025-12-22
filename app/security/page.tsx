'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  KeyIcon, 
  ServerIcon, 
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#000814] text-white font-sans antialiased">
      
      {/* --- MINIMAL NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#000814]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
            <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Vision</span>
          </Link>
          <div className="flex items-center gap-3">
             <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Protocol v4.2</span>
          </div>
        </div>
      </nav>

      {/* --- HERO: CINEMATIC SECURITY ENVIRONMENT --- */}
      <header className="relative pt-48 pb-32 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/premium/command-center-dark.jpg" 
            alt="Data Fortification Center" 
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none italic uppercase">
            Fortified <br />
            <span className="text-emerald-500">Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Protecting your corporate identity with end-to-end encryption. Every neural interaction is shielded by our proprietary security matrix.
          </p>
        </div>
      </header>

      {/* --- THE THREE PILLARS OF TRUST --- */}
      <section className="py-32 container mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Encryption */}
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] hover:border-emerald-500/30 transition-all group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
              <LockClosedIcon className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black uppercase italic mb-4">Advanced Encryption</h3>
            <p className="text-slate-500 text-sm leading-relaxed uppercase font-bold tracking-tight">
              All voice data and lead packets are encrypted using AES-256 at rest and TLS 1.3 in transit. Your data remains invisible to unauthorized nodes.
            </p>
          </div>

          {/* Pillar 2: Sovereignty */}
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] hover:border-emerald-500/30 transition-all group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
              <ServerIcon className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black uppercase italic mb-4">Data Sovereignty</h3>
            <p className="text-slate-500 text-sm leading-relaxed uppercase font-bold tracking-tight">
              Hosted exclusively on American-soil Tier 4 data centers with 99.99% uptime. We ensure your neural models never leave protected infrastructure.
            </p>
          </div>

          {/* Pillar 3: Compliance */}
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] hover:border-emerald-500/30 transition-all group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheckIcon className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black uppercase italic mb-4">Global Compliance</h3>
            <p className="text-slate-500 text-sm leading-relaxed uppercase font-bold tracking-tight">
              Strict adherence to SOC2 Type II, GDPR, and HIPAA standards. We prioritize regulatory integrity so your enterprise remains protected.
            </p>
          </div>

        </div>
      </section>

      {/* --- NEURAL AUTHENTICATION SECTION --- */}
      <section className="py-32 bg-emerald-500/5 border-y border-white/5">
        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] rounded-[60px] overflow-hidden border border-white/10">
            <Image 
              src="/premium/hero-cinematic.jpg" 
              alt="Security Infrastructure" 
              fill 
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-emerald-500/30">
                <KeyIcon className="w-12 h-12 text-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">Identity Protection</h2>
            <h3 className="text-5xl font-black italic uppercase leading-tight tracking-tighter">Zero-Knowledge <br /> Neural Proofs.</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Our system utilizes zero-knowledge architecture, meaning FrontDesk Agents LLC never "sees" your raw lead data. We only process the neural logic required to execute the call.
            </p>
            <ul className="space-y-4">
              {['Biometric Portal Access', 'Immutable Audit Logs', '24/7 Threat Monitoring'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest italic">
                  <div className="h-1 w-4 bg-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- SECURITY FOOTER --- */}
      <footer className="py-20 text-center">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
          For Security Disclosure: security@frontdeskllc.com
        </p>
      </footer>
    </div>
  );
}
