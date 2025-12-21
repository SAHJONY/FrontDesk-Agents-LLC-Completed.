'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  SparklesIcon, 
  CheckBadgeIcon, 
  ShieldCheckIcon, 
  GlobeAmericasIcon,
  CpuChipIcon,
  MicrophoneIcon,
  CurrencyDollarIcon,
  CommandLineIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30 font-sans antialiased">
      
      {/* --- ELITE NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#000814]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <SparklesIcon className="w-6 h-6 text-[#000814]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase italic leading-none">FrontDesk</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 uppercase leading-none mt-1">Agents</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="#neural" className="hover:text-white transition-colors">Neural Core</Link>
            <Link href="#services" className="hover:text-white transition-colors">15 Services</Link>
            <Link href="#monetization" className="hover:text-white transition-colors">Performance Model</Link>
          </div>

          <Link href="/dashboard">
            <button className="px-8 py-3 bg-white text-[#000814] rounded-full hover:bg-cyan-500 transition-all text-[10px] font-black uppercase tracking-widest">
              Access Portal
            </button>
          </Link>
        </div>
      </nav>

      {/* --- CINEMATIC HERO SECTION --- */}
      <header className="relative pt-32 pb-32 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/premium/hero-cinematic.jpg" 
            alt="Neural Command Center" 
            fill
            priority
            className="object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000814] via-transparent to-[#000814]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-10 uppercase tracking-[0.4em] animate-pulse">
            <CheckBadgeIcon className="w-4 h-4" /> 15 Autonomous Services Active
          </div>
          
          <h1 className="text-6xl md:text-[110px] font-black mb-10 tracking-tighter leading-[0.85] italic uppercase">
            <span className="text-white">Revenue</span><br />
            <span className="bg-gradient-to-b from-cyan-400 to-cyan-700 bg-clip-text text-transparent">Autonomy.</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            A digital workforce of 15 specialized AI agents. 
            <span className="text-white"> Zero salary. Zero downtime.</span> 
            Built to capture, qualify, and close leads on 100% performance-based commission.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard" className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-[#000814] rounded-2xl font-black transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] text-[12px] uppercase tracking-widest">
              Launch My Pilot
            </Link>
            <Link href="#services" className="px-12 py-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black transition-all text-[12px] uppercase tracking-widest">
              Explore Services
            </Link>
          </div>
        </div>
      </header>

      {/* --- THE 15 SERVICES MATRIX --- */}
      <section id="services" className="py-32 relative bg-[#000d1a]">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-4">The Workforce</h2>
            <p className="text-4xl font-black italic uppercase tracking-tighter">15 Integrated Intelligence Units</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {[
              { title: "Voice Receptionist", desc: "24/7 human-like inbound voice handling.", icon: MicrophoneIcon },
              { title: "WhatsApp Concierge", desc: "Interactive rich-media chat automation.", icon: ChatBubbleLeftRightIcon },
              { title: "AI SDR (Outbound)", desc: "Aggressive prospecting & qualification.", icon: CommandLineIcon },
              { title: "Meeting Scheduler", desc: "Instant sync with Google/Outlook calendars.", icon: CheckBadgeIcon },
              { title: "Sentiment Monitor", desc: "Real-time emotional tone tracking.", icon: SparklesIcon },
              { title: "Collections Agent", desc: "Automated Stripe debt recovery.", icon: CurrencyDollarIcon },
              { title: "Quality Analyst", desc: "100% audit of every call & chat.", icon: ShieldCheckIcon },
              { title: "Revenue Tracker", desc: "ROI attribution in real-time.", icon: ChartBarIcon },
              { title: "SMS Proactive", desc: "Nurturing & appointment reminders.", icon: ChatBubbleLeftRightIcon },
              { title: "Live Chat Widget", desc: "Zero-latency website lead capture.", icon: GlobeAmericasIcon },
              { title: "Email Assistant", desc: "Professional autonomous inbox management.", icon: SparklesIcon },
              { title: "KYC Gatekeeper", desc: "Identity & document verification.", icon: ShieldCheckIcon },
              { title: "Lead Qualifier", desc: "Budget & intent filtration logic.", icon: CpuChipIcon },
              { title: "CRM Sync", desc: "Native Airtable & Salesforce integration.", icon: GlobeAmericasIcon },
              { title: "Global Kill-Switch", desc: "Master security & pause control.", icon: ShieldCheckIcon }
            ].map((service, idx) => (
              <div key={idx} className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
                <service.icon className="w-6 h-6 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-black uppercase tracking-widest mb-2 italic">{service.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MONETIZATION MODEL --- */}
      <section id="monetization" className="py-32 bg-[#000814]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/20 rounded-[50px] p-16 text-center">
            <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-8">Performance Model</h2>
            <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-8 italic">Zero Risk. High Reward.</h3>
            <p className="text-slate-400 text-xl leading-relaxed mb-12">
              Choose between a premium fixed retainer or our <span className="text-white">Success-Based Commission Model</span>. 
              We don't get paid unless our AI agents generate revenue for you.
            </p>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span className="flex items-center gap-2"><CheckBadgeIcon className="w-4 h-4 text-cyan-500"/> $0 Setup Fees</span>
              <span className="flex items-center gap-2"><CheckBadgeIcon className="w-4 h-4 text-cyan-500"/> Pay Per Booking</span>
              <span className="flex items-center gap-2"><CheckBadgeIcon className="w-4 h-4 text-cyan-500"/> Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELITE FOOTER --- */}
      <footer className="py-32 border-t border-white/5 bg-black">
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center gap-6 mb-12 grayscale opacity-30">
             <ShieldCheckIcon className="w-6 h-6 text-cyan-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Neural Infrastructure Secured</span>
          </div>
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black leading-loose">
            © 2025 FrontDesk Agents LLC • Intelligence Architecture v4.2.0-PRO <br />
            <span className="text-slate-800 italic uppercase">Optimized for Surface Pro 11 & iPad Pro M4 Oversight</span>
          </p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-slate-800 text-[9px] font-bold uppercase tracking-widest">Master Link: Frontdeskllc@outlook.com</p>
            <p className="text-cyan-900 text-[8px] font-bold uppercase tracking-[0.4em]">Engineered by J. Gonzalez</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
