'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Loader2 } from 'lucide-react';

function SignupContent() {
  const searchParams = useSearchParams();
  const selectedTier = searchParams.get('plan') || 'starter';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tierDetails: Record<string, { mins: string; price: string; color: string }> = {
    starter: { mins: '300', price: '$149', color: 'text-zinc-400' },
    professional: { mins: '1,200', price: '$499', color: 'text-cyan-400' },
    growth: { mins: '3,000', price: '$999', color: 'text-emerald-400' },
    enterprise: { mins: '7,000+', price: '$1,999', color: 'text-purple-400' },
  };

  const currentTier = tierDetails[selectedTier] || tierDetails.starter;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Logic for backend signup and Stripe redirect would go here
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tier: selectedTier }),
      });

      if (!response.ok) throw new Error('Provisioning failed');
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Infrastructure timeout. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-10">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black text-white italic uppercase mb-4">Node Initialized</h1>
          <p className="text-zinc-500 mb-8 font-mono text-sm uppercase">Verify your email to deploy your AI fleet.</p>
          <Link href="/login" className="block w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
            Enter Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">FrontDesk // Sovereign</h1>
          </Link>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Initialize Node</h2>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className={currentTier.color}>{selectedTier} tier</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">{currentTier.mins} mins included</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:border-zinc-500 transition-all outline-none"
                placeholder="Commander Name"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">Work Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:border-zinc-500 transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:border-zinc-500 transition-all outline-none"
              />
            </div>

            {errors.submit && <p className="text-[10px] text-red-500 uppercase font-black text-center">{errors.submit}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 transition-all flex items-center justify-center"
            >
              {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : `Deploy ${currentTier.price}/mo Node`}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 flex justify-between items-center text-[9px] font-black text-zinc-600 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>Global Provisioning</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-cyan-500" />
              <span>Instant Activation</span>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          Already have node access? <Link href="/login" className="text-white hover:text-cyan-500 underline transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <SignupContent />
    </Suspense>
  );
}
