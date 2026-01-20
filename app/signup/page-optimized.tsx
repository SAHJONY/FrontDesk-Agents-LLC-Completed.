"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

function SignupContent() {
  const searchParams = useSearchParams();
  const selectedTier = searchParams.get('plan') || 'starter';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profit-Aligned Tier Data
  const tierDetails: Record<string, { mins: string; price: string; color: string }> = {
    starter: { mins: '300', price: '$149', color: 'text-zinc-400' },
    professional: { mins: '1,200', price: '$499', color: 'text-cyan-400' },
    growth: { mins: '3,000', price: '$999', color: 'text-emerald-400' },
    enterprise: { mins: '7,000', price: '$1,999', color: 'text-purple-400' },
  };

  const currentTier = tierDetails[selectedTier] || tierDetails.starter;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Logic: Connect to /api/auth/signup then redirect to Stripe
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Tier Indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 font-mono text-[10px] uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Provisioning: <span className={currentTier.color}>{selectedTier} Node</span>
          </div>

          <h1 className="text-4xl font-black text-white mb-3 italic tracking-tighter uppercase">
            Deploy Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Workforce
            </span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-tighter">
            {currentTier.mins} High-Concurrency Minutes Included
          </p>
        </div>

        {/* Form Container */}
        <div className="p-1 bg-gradient-to-b from-white/10 to-transparent rounded-3xl">
          <div className="p-8 rounded-[calc(1.5rem-1px)] bg-zinc-950/90 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-cyan-500 outline-none transition-all text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Work Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-cyan-500 outline-none transition-all text-sm"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-cyan-500 outline-none transition-all text-sm"
                  placeholder="Acme Inc"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-cyan-500 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Initialize Node <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-[10px] text-center text-zinc-600 uppercase tracking-widest leading-relaxed">
              By initializing, you agree to the{' '}
              <Link href="/legal/terms" className="text-white hover:underline">Terms of Sovereignty</Link>
            </p>
          </div>
        </div>

        {/* ROI / Included Features Card */}
        
        <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Trial Provisions:</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              'Instant Voice Node Activation',
              `${currentTier.mins} Fleet Minutes Included`,
              'Global Script Sovereignty',
              'Section 3 Success Fee Protection',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-xs text-zinc-300 font-medium italic">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-black shadow-xl" />
              ))}
            </div>
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">
              127 Nodes Activated this week
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
          Already have access?{' '}
          <Link href="/login" className="text-white hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <SignupContent />
    </Suspense>
  );
}
