'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Cpu, 
  PhoneCall, 
  Globe, 
  ShieldCheck, 
  Activity, 
  DollarSign, 
  ArrowRight,
  Fingerprint,
  Layers,
  Bot
} from 'lucide-react';

export default function ServicesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const services = [
    {
      icon: PhoneCall,
      title: "Autonomous Voice Synthesis",
      description: "Deploy Sovereign Voice Nodes that manage all inbound/outbound human interactions with machine precision. Eliminate human latency and unlock infinite scalability.",
      features: [
        "24/7/365 Node Operation",
        "Clinical/Legal Intake Automation",
        "Outbound Yield Recovery",
        "Multi-Market Localization (50+ Languages)"
      ],
      link: `/${locale}/automations/voice-ai`
    },
    {
      icon: Globe,
      title: "Aegis Knowledge Ingestion",
      description: "Transform static data assets into dynamic, living intelligence. Our nodes perform deep-mesh scrapes and continuous learning to ensure real-time operational alignment.",
      features: [
        "Dynamic SOP Integration",
        "Real-time Asset Indexing",
        "Document Forensic Analysis",
        "Proprietary Neural Scrapers"
      ],
      link: `/${locale}/automations/knowledge-sync` // Assuming a knowledge sync page
    },
    {
      icon: DollarSign,
      title: "Capital Yield Optimization",
      description: "Shift from linear human costs to exponential AI-driven revenue recovery. Our infrastructure provides quantifiable ROI by optimizing every customer touchpoint.",
      features: [
        "Linear-to-Exponential Scaling",
        "Performance-Based Fee Model",
        "Real-time Revenue Telemetry",
        "Automated Lead Qualification"
      ],
      link: `/${locale}/automations/revenue-recovery` // Assuming a revenue recovery page
    },
    {
      icon: ShieldCheck,
      title: "Forensic Telemetry & Compliance",
      description: "Achieve total transparency and ironclad compliance. Every interaction is recorded, transcribed, and analyzed, adhering to the highest global data sovereignty standards.",
      features: [
        "Full-Stack Call Transcripts",
        "Sentiment & Intent Analysis",
        "HIPAA / SOC2 / GDPR Compliance",
        "Executive Glass Cockpit"
      ],
      link: `/${locale}/dashboard` 
    }
  ];

  return (
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] pt-32 pb-24 px-8 selection:bg-cyan-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* --- EXECUTIVE HEADER --- */}
        <div className="text-center mb-24 animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <Bot className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">Service Protocol 7 // Global Nexus</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter italic mb-6">
            Sovereign <span className="text-slate-500">Neural Infrastructure</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto border-l border-white/10 pl-8 italic">
            Transition from linear operational costs to exponential AI-driven advantage. Our autonomous agents deliver unparalleled efficiency, compliance, and capital yield.
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-[#080a0f] border border-white/10 p-10 rounded-sm shadow-xl flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100"
            >
              <div>
                <service.icon className="w-10 h-10 text-cyan-500 mb-8" />
                <h2 className="text-[14px] font-black uppercase tracking-[0.2em] text-white mb-6">
                  {service.title}
                </h2>
                <p className="text-[10px] text-slate-500 uppercase leading-relaxed tracking-widest mb-8">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-12">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <Layers className="w-3 h-3 text-cyan-600" />
                      <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href={service.link}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-[9px] tracking-[0.3em] hover:bg-cyan-500 transition-all w-full"
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="mt-28 text-center p-16 bg-gradient-to-br from-[#080a0f] to-[#020305] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-1000">
          <Fingerprint className="w-12 h-12 text-cyan-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">
            Initiate <span className="text-cyan-500">Neural Partnership</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Connect with our executive solutions team to architect your bespoke autonomous infrastructure.
          </p>
          <Link 
            href={`/${locale}/contact`} 
            className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-cyan-500 text-black font-black uppercase text-[11px] tracking-[0.4em] hover:bg-white transition-all shadow-xl"
          >
            Deploy Your Nodes <Cpu className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
      }
