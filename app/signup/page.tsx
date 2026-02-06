'use client';

/**
 * FRONTDESK AGENTS: SIGNUP & PROVISIONING NODE
 * Handles multi-tier account initialization and Stripe Checkout orchestration.
 */

import { Suspense, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Loader2, ChevronRight } from 'lucide-react';

type PlanKey = 'starter' | 'professional' | 'growth' | 'enterprise';
type BillingCycle = 'monthly' | 'annual';

const ANNUAL_DISCOUNT = 0.2;

function normalizePlan(input: string | null): PlanKey {
  const v = (input ?? '').trim().toLowerCase();
  if (v === 'starter' || v === 'professional' || v === 'growth' || v === 'enterprise') return v;
  return 'starter';
}

function normalizeBilling(input: string | null): BillingCycle {
  const v = (input ?? '').trim().toLowerCase();
  return v === 'annual' || v === 'yearly' ? 'annual' : 'monthly';
}

function formatMoney(n: number) {
  return n.toLocaleString('en-US');
}

function computeDisplayedMonthly(monthlyPrice: number, billing: BillingCycle) {
  if (billing === 'monthly') {
    return { displayMonthly: monthlyPrice, billedText: null as string | null };
  }
  const displayMonthly = Math.round(monthlyPrice * (1 - ANNUAL_DISCOUNT));
  const annualTotal = Math.round(monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT));
  return {
    displayMonthly,
    billedText: `Billed $${formatMoney(annualTotal)}/yr (save 20%)`,
  };
}

function SignupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedTier = normalizePlan(searchParams.get('plan'));
  const billingFromUrl = normalizeBilling(searchParams.get('billing'));

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(billingFromUrl);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tierDetails: Record<PlanKey, { mins: string; priceMonthly: number; color: string }> = {
    starter: { mins: '300', priceMonthly: 199, color: 'text-zinc-400' },
    professional: { mins: '1,200', priceMonthly: 399, color: 'text-blue-400' },
    growth: { mins: '3,000', priceMonthly: 799, color: 'text-emerald-400' },
    enterprise: { mins: '7,000+', priceMonthly: 1499, color: 'text-purple-400' },
  };

  const currentTier = tierDetails[selectedTier];

  const pricing = useMemo(() => {
    return computeDisplayedMonthly(currentTier.priceMonthly, billingCycle);
  }, [currentTier.priceMonthly, billingCycle]);

  const setBillingAndSyncUrl = (nextBilling: BillingCycle) => {
    setBillingCycle(nextBilling);
    const next = new URLSearchParams(searchParams.toString());
    next.set('plan', selectedTier);
    next.set('billing', nextBilling);
    router.replace(`/signup?${next.toString()}`, { scroll: false });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          billing: billingCycle,
        }),
      });

      const signupJson = await signupRes.json().catch(() => ({}));
      if (!signupRes.ok) throw new Error(signupJson?.error || 'Account provisioning failed');

      const tenantId = signupJson?.tenantId || signupJson?.id;
      
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          plan: selectedTier,
          billing: billingCycle,
        }),
      });

      const checkoutJson = await checkoutRes.json().catch(() => ({}));
      if (!checkoutRes.ok) throw new Error(checkoutJson?.error || 'Stripe initialization failed');

      window.location.href = checkoutJson.url;
    } catch (error: any) {
      setErrors({ submit: error?.message || 'Infrastructure timeout. Please verify network status.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
             <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">FrontDesk // Control Node</h1>
          </Link>

          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Initialize Fleet</h2>

          <div className="flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] mb-8">
            <span className={`${currentTier.color} font-black`}>{selectedTier} tier</span>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-500">{currentTier.mins} mins included</span>
          </div>

          <div className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
            <button
              type="button"
              onClick={() => setBillingAndSyncUrl('monthly')}
              className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingAndSyncUrl('annual')}
              className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                billingCycle === 'annual' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Annual
              <span className="text-[8px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-black">-20%</span>
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput label="Full Name" name="fullName" placeholder="Operational Lead" onChange={handleChange} required />
            <FormInput label="Corporate Email" name="email" type="email" placeholder="name@company.com" onChange={handleChange} required />
            <FormInput label="Secure Password" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />

            {errors.submit && (
              <p className="text-[10px] text-red-500 uppercase font-black text-center bg-red-500/5 py-2 rounded-lg border border-red-500/20">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.25)] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>Deploy $${formatMoney(pricing.displayMonthly)}/mo Node <ChevronRight size={14}/></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-900 flex justify-between items-center text-[9px] font-black text-zinc-600 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>Global Edge Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-blue-500" />
              <span>SOC2 Secure</span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
          Active node in possession?{' '}
          <Link href="/login" className="text-white hover:text-blue-500 underline transition-colors underline-offset-4">
            Authorize Entry
          </Link>
        </p>
      </div>
    </div>
  );
}

function FormInput({ label, name, type = "text", placeholder, onChange, required }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block px-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-black border border-zinc-900 rounded-xl px-5 py-4 text-sm font-bold text-white placeholder-zinc-800 focus:border-blue-600 transition-all outline-none"
      />
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
