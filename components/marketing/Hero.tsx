'use client';

import { motion } from 'framer-motion';

export default function NeuralHero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <div className="inline-block px-4 py-1.5 mb-8 border border-cyan-500/30 bg-cyan-500/10 rounded-full">
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] italic">
            Neural Infrastructure 1.0 // Now Live
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.9] mb-8">
          REPLACE HUMAN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            LATENCY.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-lg font-medium leading-relaxed mb-12">
          Deploy a sovereign swarm of 10 proprietary Neural Nodes. From SMS Concierge to AI SDRs, 
          FrontDesk Agents LLC eliminates the gap between lead generation and revenue.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-cyan-500 transition-all italic">
            Initialize Uplink
          </button>
          <button className="px-12 py-5 bg-white/5 text-white border border-white/10 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all italic">
            Watch Technical Demo
          </button>
        </div>
      </motion.div>

      {/* Floating System Status (Bottom) */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex items-center gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-widest">
          <div className="h-1 w-12 bg-cyan-500/50" />
          Nodes Active: 1,402 // Latency: 0.4ms
        </div>
      </div>
    </section>
  );
}
