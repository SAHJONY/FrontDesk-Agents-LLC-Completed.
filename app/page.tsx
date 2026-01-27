'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  LayoutDashboard, 
  Users,
  X,
  Lock,
  Mail,
  Loader2
} from 'lucide-react';

export default function Home() {
  const [imageError, setImageError] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');

  return (
    <main className="min-h-screen w-full bg-[#030712] text-slate-200 selection:bg-blue-500/30">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-[60] w-full border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">FrontDesk Agents</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {['Features', 'Pricing', 'Network'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="mx-auto max-w-7xl text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <Zap size={14} /> NEW: MULTI-REGION AI NODES
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              The Sovereign <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Phone OS
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Empower your business with autonomous agents that handle calls, scheduling, and customer logic with human-like precision. Built for the modern enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="group relative flex items-center justify-center gap-2 bg-blue-600 px-8 py-4 rounded-full text-white font-bold hover:bg-blue-500 transition-all"
              >
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="#features" className="flex items-center justify-center px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                View Architecture
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-3xl p-4 shadow-2xl overflow-hidden">
              <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-950">
                {!imageError ? (
                  <Image
                    src="/images/ai_receptionist/hero-en.jpg"
                    alt="Platform Preview"
                    fill
                    className="object-cover opacity-80"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                    <BarChart3 size={48} className="text-blue-500" />
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">System Operational</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-xl"><Globe size={20}/> GLOBAL</div>
          <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck size={20}/> SECURE</div>
          <div className="flex items-center gap-2 font-bold text-xl">⚡ LATENCY-OPTIMIZED</div>
        </div>
      </section>

      {/* Auth Modal - The "Premium" Component */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="p-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
                  </h2>
                  <p className="text-slate-400">Join the FrontDesk global network</p>
                </div>

                {/* Role Switcher */}
                <div className="flex p-1 bg-black/40 rounded-2xl mb-8">
                  <button 
                    onClick={() => setUserRole('customer')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${userRole === 'customer' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                  >
                    <Users size={16} /> Customer
                  </button>
                  <button 
                    onClick={() => setUserRole('owner')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${userRole === 'owner' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                  >
                    <LayoutDashboard size={16} /> Platform Owner
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
                    <input type="email" placeholder="Email Address" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all text-white" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 text-slate-500" size={20} />
                    <input type="password" placeholder="Password" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all text-white" />
                  </div>
                  <button className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all mt-4 flex items-center justify-center gap-2">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer and other sections... (Keeping standard for brevity) */}
    </main>
  );
}
