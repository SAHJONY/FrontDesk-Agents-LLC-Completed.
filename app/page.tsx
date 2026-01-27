'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Globe, 
  Shield, 
  Cpu, 
  BarChart, 
  Command,
  ArrowRight,
  X,
  Lock,
  Mail
} from 'lucide-react';

export default function FortuneLanding() {
  const [showAuth, setShowAuth] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Global Executive Header */}
      <nav className="fixed top-0 w-full z-[100] border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-700" />
              <span className="text-xl font-bold tracking-tight uppercase">FrontDesk</span>
            </Link>
            <div className="hidden lg:flex gap-8">
              {['Solutions', 'Infrastructure', 'Intelligence', 'Company'].map((item) => (
                <Link key={item} href="#" className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors uppercase tracking-widest">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowAuth(true)}
              className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-blue-700 hover:border-blue-700 transition-all"
            >
              Client Login
            </button>
            <button 
              onClick={() => setShowAuth(true)}
              className="px-6 py-3 bg-blue-700 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero: The Authority Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-700 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
              Enterprise Voice Infrastructure
            </span>
            <h1 className="text-6xl lg:text-[84px] font-medium leading-[0.95] tracking-tight text-slate-900 mb-8">
              Autonomous Front Desk <br />
              <span className="text-slate-400">At Global Scale.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mb-12 leading-relaxed font-light">
              Transform your business operations with institutional-grade AI agents. 
              We provide the intelligence layer for the world&apos;s most demanding enterprises.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAuth(true)}
                className="px-10 py-5 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                Deploy Infrastructure
              </button>
              <button className="px-10 py-5 border border-slate-200 text-slate-900 font-bold text-sm uppercase tracking-widest hover:border-slate-900 transition-all flex items-center gap-2">
                Whitepaper <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Cinematic Data Visualization */}
          <motion.div 
            className="lg:col-span-5 relative h-[500px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Architecture"
                fill
                className="object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 border-2 border-blue-700 flex items-center justify-center">
                    <Command className="text-blue-700" size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Status</p>
                    <p className="text-sm font-bold text-green-600">ACTIVE // GLOBAL</p>
                  </div>
                </div>
                <div>
                  <div className="h-px w-full bg-slate-200 mb-6" />
                  <p className="text-4xl font-light text-slate-800 tracking-tighter">99.999% <span className="text-sm font-bold block uppercase tracking-widest text-slate-400 mt-2">Uptime Reliability</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Fortune 500 Trusted', value: '42%' },
            { label: 'Calls Managed Yearly', value: '2.4B' },
            { label: 'Global Data Centers', value: '184' },
            { label: 'Security Compliance', value: 'Tier 4' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Capabilities */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mb-24">
            <h2 className="text-4xl font-medium tracking-tight mb-6">Built for high-stakes environments.</h2>
            <div className="w-20 h-2 bg-blue-700 mb-8" />
            <p className="text-lg text-slate-500 font-light">Our platform is engineered for consistency, security, and the ability to scale across complex organizational structures without friction.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Shield, title: 'Institutional Security', desc: 'SOC 2 Type II, GDPR, and HIPAA compliant infrastructure. Your data is encrypted at rest and in transit.' },
              { icon: Globe, title: 'Global Provisioning', desc: 'Instant local presence in 140+ countries. Seamless localized AI voice synthesis for a global client base.' },
              { icon: BarChart, title: 'Predictive Intelligence', desc: 'Real-time call sentiment analysis and predictive outcome modeling to optimize every client interaction.' }
            ].map((cap, i) => (
              <div key={i} className="group">
                <div className="mb-8 p-4 bg-slate-50 w-fit group-hover:bg-blue-700 group-hover:text-white transition-all">
                  <cap.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{cap.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: Institutional Look */}
      <footer className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-blue-600" />
              <span className="text-xl font-bold tracking-tight uppercase">FrontDesk</span>
            </div>
            <p className="text-slate-400 max-w-sm font-light">Empowering the next generation of global businesses with autonomous communication infrastructure.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-blue-500">Infrastructure</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>API Documentation</li>
              <li>Network Status</li>
              <li>Global Nodes</li>
              <li>Security Vault</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-blue-500">Corporate</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>Investor Relations</li>
              <li>Sustainability</li>
              <li>Privacy Governance</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Executive Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-12 shadow-2xl rounded-sm"
            >
              <button onClick={() => setShowAuth(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Internal Access</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Client Portal & Management</p>
              </div>

              {/* Role Switch */}
              <div className="flex border-b border-slate-100 mb-8">
                <button 
                  onClick={() => setUserRole('customer')}
                  className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${userRole === 'customer' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-slate-400'}`}
                >
                  Client
                </button>
                <button 
                  onClick={() => setUserRole('owner')}
                  className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${userRole === 'owner' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-slate-400'}`}
                >
                  Administrator
                </button>
              </div>

              <div className="space-y-6">
                <div className="relative border-b border-slate-200 focus-within:border-blue-700 transition-colors">
                  <Mail className="absolute left-0 top-3 text-slate-400" size={16} />
                  <input type="email" placeholder="CORPORATE EMAIL" className="w-full py-3 pl-8 bg-transparent outline-none text-xs font-bold uppercase tracking-widest" />
                </div>
                <div className="relative border-b border-slate-200 focus-within:border-blue-700 transition-colors">
                  <Lock className="absolute left-0 top-3 text-slate-400" size={16} />
                  <input type="password" placeholder="ACCESS KEY" className="w-full py-3 pl-8 bg-transparent outline-none text-xs font-bold uppercase tracking-widest" />
                </div>
                <button className="w-full bg-slate-900 text-white py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10">
                  Authenticate <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
