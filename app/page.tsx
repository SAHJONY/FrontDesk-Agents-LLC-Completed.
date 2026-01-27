'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, PhoneCall, Globe, ArrowRight, 
  LayoutDashboard, Users, X, Lock, Mail, Play, 
  Sparkles, MessageSquare, Calendar, BarChart
} from 'lucide-react';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const capabilities = [
    { title: "Voice Intelligence", desc: "Human-grade synthesis with <500ms latency.", icon: <PhoneCall className="text-blue-400" /> },
    { title: "Smart Scheduling", desc: "Native integration with all major calendars.", icon: <Calendar className="text-purple-400" /> },
    { title: "Global Reach", desc: "Provision local numbers in 140+ countries.", icon: <Globe className="text-emerald-400" /> },
    { title: "Predictive Analytics", desc: "Convert data into revenue-driving insights.", icon: <BarChart className="text-orange-400" /> }
  ];

  return (
    <main className="min-h-screen w-full bg-[#030303] text-white selection:bg-blue-500/40 selection:text-white overflow-x-hidden font-sans">
      
      {/* Dynamic Cursor Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl">
        <div className="flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center font-black">F</div>
            <span className="font-bold tracking-tighter text-lg uppercase">FrontDesk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Capabilities', 'Architecture', 'Pricing'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Launch Node
          </button>
        </div>
      </nav>

      {/* Hero Section: Cinematic Power */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2560&auto=format&fit=crop"
            alt="8K Cinematic Background"
            fill
            className="object-cover opacity-40 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block">
              <Sparkles size={12} className="inline mr-2" /> The Future of Workforce
            </span>
            <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-8 italic">
              Scale <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-gradient-x">Beyond</span> <br /> Humans.
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-light">
              Your autonomous front desk infrastructure. 24/7 AI-powered calls, scheduling, and customer relations with zero overhead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="group relative px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest overflow-hidden transition-all hover:pr-14"
              >
                Start Build
                <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all" size={20} />
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 font-black uppercase tracking-widest hover:bg-white/5 transition-all text-[12px]">
                Watch Architecture
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Capabilities Section */}
      <section id="capabilities" className="py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-8 italic">Platform <br />Capabilities.</h2>
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex gap-6 cursor-pointer hover:border-blue-500/50 transition-all"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    {cap.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl tracking-tight">{cap.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Phone Simulator Preview */}
          <div className="relative aspect-[4/5] rounded-[60px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.1)]">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <div className="relative w-full max-w-[280px] bg-black rounded-[45px] border-[8px] border-[#1a1a1a] aspect-[9/19] shadow-2xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center opacity-40">
                  <span className="text-[10px] font-bold">FRONTDESK OS</span>
                  <div className="h-1 w-12 bg-white/20 rounded-full" />
                </div>
                <div className="mt-8 text-center">
                  <div className="h-16 w-16 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse flex items-center justify-center">
                    <PhoneCall size={24} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400">Incoming Call</p>
                  <p className="text-lg font-bold mt-1 tracking-tight">+1 (888) FD-AGENT</p>
                </div>
                <div className="mt-auto space-y-2">
                  <div className="p-3 bg-white/5 rounded-xl text-[10px] font-mono text-blue-300">
                    {">"} AI: Hello! How can I help you?
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                    {">"} User: I need to book a demo.
                  </div>
                  <div className="p-3 bg-blue-600 rounded-xl text-[10px] font-mono text-white">
                    {">"} AI: Available at 2PM today. Confirm?
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Premium Bento Grid: Operational Excellence */}
      <section id="architecture" className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="md:col-span-4 lg:col-span-4 h-[400px] rounded-[40px] bg-white/[0.02] border border-white/5 p-12 flex flex-col justify-end relative overflow-hidden group">
            <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" fill alt="Secured" className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-[4s]" />
            <div className="relative z-10">
              <ShieldCheck size={48} className="text-blue-500 mb-6" />
              <h3 className="text-4xl font-black tracking-tighter uppercase italic">SOC-2 Enterprise Security</h3>
              <p className="text-slate-500 max-w-md mt-4">Military-grade encryption for every voice byte and data point processed by your agents.</p>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-2 h-[400px] rounded-[40px] bg-blue-600 p-12 flex flex-col justify-between group cursor-pointer overflow-hidden">
             <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring" }}>
               <Zap size={64} fill="white" />
             </motion.div>
             <h3 className="text-3xl font-black tracking-tighter uppercase leading-none italic">Infinite <br /> Scalability</h3>
          </div>
        </div>
      </section>

      {/* Auth Modal: Ultra-Premium Experience */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAuthModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-[50px] shadow-[0_0_100px_rgba(37,99,235,0.25)] overflow-hidden">
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">F</div>
                    <span className="font-black uppercase tracking-widest text-xs">Node Authorization</span>
                  </div>
                  <button onClick={() => setShowAuthModal(false)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex p-1 bg-white/5 rounded-2xl mb-10">
                  <button onClick={() => setUserRole('customer')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${userRole === 'customer' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Customer</button>
                  <button onClick={() => setUserRole('owner')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${userRole === 'owner' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Owner</button>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="group relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input type="email" placeholder="USER ID (EMAIL)" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 text-[11px] font-black tracking-widest outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="group relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input type="password" placeholder="ACCESS KEY (PASSWORD)" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 text-[11px] font-black tracking-widest outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <button className="w-full bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] py-6 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                    Initialize Deployment
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
