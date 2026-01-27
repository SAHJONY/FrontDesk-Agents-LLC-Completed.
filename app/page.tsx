'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Layers, 
  Globe, 
  ArrowUpRight, 
  LayoutDashboard, 
  Users,
  X,
  Lock,
  Mail,
  Play
} from 'lucide-react';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');
  const { scrollY } = useScroll();
  
  // Parallax effect for the hero image
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <main className="min-h-screen w-full bg-[#02040a] text-white selection:bg-blue-500/50 overflow-x-hidden">
      
      {/* Cinematic Navigation */}
      <nav className="fixed top-0 z-[100] w-full px-6 py-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-2xl">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-blue-600 rotate-45 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xl font-black tracking-tighter uppercase">FrontDesk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Intelligence', 'Architecture', 'Global'].map((item) => (
              <Link key={item} href="#" className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-blue-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
          >
            Access Terminal <ArrowUpRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section: Cinematic 8K Background */}
      <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2560&auto=format&fit=crop" 
            alt="Cinematic Tech Background"
            fill
            className="object-cover scale-110 opacity-60 brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/60 to-[#02040a]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-[10px] tracking-[0.4em] font-black uppercase text-blue-500 mb-4 px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5">
              Intelligence Without Limits
            </span>
            <h1 className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8 italic">
              AI PHONE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">SYSTEM.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-12 py-5 rounded-full bg-blue-600 text-white font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-all text-lg flex items-center gap-3"
              >
                Deploy Now <Zap size={20} fill="currentColor" />
              </button>
              <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group">
                <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Play size={16} fill="currentColor" />
                </div>
                Watch Reel
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Latency", val: "<24ms" },
            { label: "Uptime", val: "99.99%" },
            { label: "Nodes", val: "Global" },
            { label: "Security", val: "AES-256" }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold font-mono tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid: Premium Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          
          <div className="md:col-span-8 rounded-[40px] bg-[#0a0c14] border border-white/5 overflow-hidden relative group">
            <Image 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Network" fill className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-[3s]" 
            />
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <h3 className="text-4xl font-bold mb-4 tracking-tighter">Global Voice Infrastructure</h3>
              <p className="text-slate-400 max-w-md">Provision enterprise-grade phone lines across 120+ countries with localized AI routing.</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-[40px] bg-gradient-to-br from-blue-600 to-blue-900 border border-white/10 p-12 flex flex-col justify-between">
            <Globe size={48} />
            <div>
              <h3 className="text-3xl font-bold mb-4 tracking-tighter">Real-time Translation</h3>
              <p className="text-blue-100/70">Break language barriers with sub-second voice synthesis in 40+ languages.</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-[40px] bg-[#0a0c14] border border-white/5 p-12 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <Shield size={48} className="text-blue-500" />
            <h3 className="text-2xl font-bold tracking-tighter">Enterprise Vault Security</h3>
          </div>

          <div className="md:col-span-8 rounded-[40px] bg-[#0a0c14] border border-white/5 p-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-xs">
               <h3 className="text-3xl font-bold mb-4 tracking-tighter">Autonomous Scheduling</h3>
               <p className="text-slate-400">Sync with Outlook, Google, and Apple Calendars instantly.</p>
            </div>
            <div className="h-full aspect-square bg-blue-500/10 rounded-3xl border border-blue-500/20 flex items-center justify-center">
              <Layers size={64} className="text-blue-500 animate-pulse" />
            </div>
          </div>

        </div>
      </section>

      {/* Premium Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl bg-[#0a0c14] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tighter mb-2">Secure Entry</h2>
                    <p className="text-slate-500 uppercase text-[10px] tracking-[0.2em] font-black">Authorized Personnel Only</p>
                  </div>
                  <button onClick={() => setShowAuthModal(false)} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl mb-8">
                  <button 
                    onClick={() => setUserRole('customer')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'customer' ? 'bg-blue-600' : 'hover:bg-white/5 text-slate-500'}`}
                  >
                    <Users size={14} /> Customer
                  </button>
                  <button 
                    onClick={() => setUserRole('owner')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'owner' ? 'bg-blue-600' : 'hover:bg-white/5 text-slate-500'}`}
                  >
                    <LayoutDashboard size={14} /> Platform Owner
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="group relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input type="email" placeholder="IDENTIFICATION (EMAIL)" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-[11px] font-bold tracking-widest outline-none focus:border-blue-500 transition-all placeholder:text-slate-700" />
                  </div>
                  <div className="group relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input type="password" placeholder="ACCESS KEY (PASSWORD)" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-[11px] font-bold tracking-widest outline-none focus:border-blue-500 transition-all placeholder:text-slate-700" />
                  </div>
                </div>

                <button className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] py-6 rounded-2xl hover:bg-blue-600 hover:text-white transition-all mt-8 active:scale-[0.98]">
                  Initialize Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
