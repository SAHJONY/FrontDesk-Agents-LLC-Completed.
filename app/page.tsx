'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  ArrowRight,
  X,
  Lock,
  Mail,
  Scale
} from 'lucide-react';

export default function GlobalEnterpriseLanding() {
  const [showAuth, setShowAuth] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');

  return (
    <main className="min-h-screen bg-white text-[#0A192F] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Institutional Header */}
      <nav className="fixed top-0 w-full z-[100] border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[#2563EB] rounded-sm transition-transform group-hover:rotate-90 duration-500" />
              <span className="text-2xl font-black tracking-tighter uppercase text-[#0A192F]">FrontDesk</span>
            </Link>
            <div className="hidden xl:flex gap-10">
              {['Infrastructure', 'Global Nodes', 'Intelligence', 'Governance'].map((item) => (
                <Link key={item} href="#" className="text-[11px] font-bold text-slate-500 hover:text-[#2563EB] transition-colors uppercase tracking-[0.2em]">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setShowAuth(true)}
              className="hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] text-[#0A192F] hover:text-[#2563EB] transition-all"
            >
              Client Access
            </button>
            <button 
              onClick={() => setShowAuth(true)}
              className="px-8 py-4 bg-[#0A192F] text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#2563EB] transition-all shadow-2xl shadow-blue-900/20"
            >
              Consult an Expert
            </button>
          </div>
        </div>
      </nav>

      {/* Hero: 8K Cinematic Architecture */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-10 grid lg:grid-cols-2 gap-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#2563EB]" />
              <span className="text-[#2563EB] font-black uppercase tracking-[0.4em] text-[10px]">
                Tier-1 Voice Infrastructure
              </span>
            </div>
            <h1 className="text-7xl xl:text-[110px] font-bold leading-[0.9] tracking-[-0.04em] text-[#0A192F] mb-10">
              Global <br />
              Intelligence <br />
              <span className="text-slate-300">Provisioning.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-light">
              Architecting autonomous front desk solutions for the world&apos;s most resilient organizations. 
              Sub-millisecond latency. Military-grade security. Infinite scale.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => setShowAuth(true)}
                className="px-12 py-6 bg-[#2563EB] text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#0A192F] transition-all group flex items-center gap-3"
              >
                Initialize Deployment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-12 py-6 border border-slate-300 text-[#0A192F] font-black text-[11px] uppercase tracking-[0.2em] hover:border-[#0A192F] transition-all">
                Download Architecture
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="relative hidden lg:block h-[700px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 8K Realistic Image Placeholder - High gloss architecture */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Corporate Architecture 8K"
                fill
                className="object-cover brightness-[0.85] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A192F]/40 to-transparent" />
              
              {/* Floating UI HUD Element */}
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Network Load</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-4 w-1 bg-[#2563EB]" />)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light text-white italic tracking-tighter">Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Status Bar */}
      <div className="bg-[#0A192F] py-10 px-10">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-between items-center gap-8 opacity-60">
          {['Standard & Poors 500 Compliant', 'ISO 27001 Certified', 'GDPR Sovereign Data', '24/7 Global NOC'].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-[#2563EB]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Credentials */}
      <section className="py-32 px-10 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-3 gap-24">
          {[
            { icon: Scale, title: 'Elastic Provisioning', desc: 'Deploy 10,000 concurrent AI agents in under 120 seconds. Built for burst-heavy enterprise traffic.' },
            { icon: Activity, title: 'Real-time Telemetry', desc: 'Monitor call sentiment, conversion rates, and latency through our proprietary Command Center.' },
            { icon: Globe, title: 'Global Backbone', desc: 'Native peering with Tier-1 carriers ensures sub-millisecond jitter across 184 global regions.' }
          ].map((item, i) => (
            <div key={i} className="group cursor-default">
              <div className="mb-10 w-16 h-16 bg-[#F8FAFC] border border-slate-200 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all duration-500">
                <item.icon size={24} className="group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Auth Terminal Overlay */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
              className="absolute inset-0 bg-[#0A192F]/95 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-sm overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="p-16">
                <div className="flex justify-between items-start mb-16">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tighter text-[#0A192F]">Node Entry</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Biometric / Key Signature Required</p>
                  </div>
                  <button onClick={() => setShowAuth(false)} className="p-2 hover:bg-slate-100 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex border-b border-slate-100 mb-12">
                  {['Customer', 'Administrator'].map((role) => (
                    <button 
                      key={role}
                      onClick={() => setUserRole(role.toLowerCase() as any)}
                      className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${userRole === role.toLowerCase() ? 'border-b-2 border-[#2563EB] text-[#2563EB]' : 'text-slate-400'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="relative border-b border-slate-200 focus-within:border-[#2563EB] transition-colors pb-2">
                    <Mail className="absolute left-0 top-1 text-slate-300" size={16} />
                    <input type="email" placeholder="IDENTIFICATION EMAIL" className="w-full pl-8 bg-transparent outline-none text-[11px] font-bold uppercase tracking-widest placeholder:text-slate-300" />
                  </div>
                  <div className="relative border-b border-slate-200 focus-within:border-[#2563EB] transition-colors pb-2">
                    <Lock className="absolute left-0 top-1 text-slate-300" size={16} />
                    <input type="password" placeholder="ACCESS KEY" className="w-full pl-8 bg-transparent outline-none text-[11px] font-bold uppercase tracking-widest placeholder:text-slate-300" />
                  </div>
                  <button className="w-full bg-[#0A192F] text-white py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#2563EB] transition-all shadow-xl shadow-blue-900/20">
                    Verify & Connect
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
