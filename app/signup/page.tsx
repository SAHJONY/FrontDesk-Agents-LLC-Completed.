'use client';

import { Suspense, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Loader2 } from 'lucide-react';

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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tierDetails: Record<PlanKey, { mins: string; priceMonthly: number; color: string }> = {
    starter: { mins: '300', priceMonthly: 199, color: 'text-zinc-400' },
    professional: { mins: '1,200', priceMonthly: 399, color: 'text-cyan-400' },
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
    router.replace(`/signup?${next.toString()}`);
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
      // 1) Create account / tenant (your backend should return tenantId)
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // keep backward compatibility: send tier + plan + billing
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          plan: selectedTier,
          billing: billingCycle,
        }),
      });

      const signupJson = await signupRes.json().catch(() => ({}));
      if (!signupRes.ok) {
        throw new Error(signupJson?.error || 'Provisioning failed');
      }

      // Back-compat: if signup endpoint already returns a Stripe URL, just go there.
      if (typeof signupJson?.url === 'string' && signupJson.url.startsWith('http')) {
        window.location.href = signupJson.url;
        return;
      }

      const tenantId =
        signupJson?.tenantId ??
        signupJson?.tenant_id ??
        signupJson?.customerId ??
        signupJson?.customer_id;

      if (!tenantId || typeof tenantId !== 'string') {
        throw new Error('Signup succeeded but tenantId was not returned.');
      }

      // 2) Create Stripe checkout session
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          plan: selectedTier,
          billing: billingCycle,
          idempotencyKey: `signup:${tenantId}:${selectedTier}:${billingCycle}`,
        }),
      });

      const checkoutJson = await checkoutRes.json().catch(() => ({}));
      if (!checkoutRes.ok) {
        throw new Error(checkoutJson?.error || 'Checkout failed');
      }

      if (!checkoutJson?.url || typeof checkoutJson.url !== 'string') {
        throw new Error('Checkout created but no redirect URL was returned.');
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutJson.url;
    } catch (error: any) {
      setErrors({ submit: error?.message || 'Infrastructure timeout. Please try again.' });
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
          <Link
            href="/login"
            className="block w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
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

          <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">
            <span className={currentTier.color}>{selectedTier} tier</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">{currentTier.mins} mins included</span>
          </div>

          {/* Billing toggle (keeps URL in sync) */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full p-1.5">
            <button
              type="button"
              onClick={() => setBillingAndSyncUrl('monthly')}
              className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingAndSyncUrl('annual')}
              className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                billingCycle === 'annual' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Annual
              <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">Save 20%</span>
            </button>
          </div>

          {billingCycle === 'annual' && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-emerald-300 font-black">
              {pricing.billedText}
            </p>
          )}
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">
                Full Name
              </label>
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
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">
                Work Email
              </label>
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
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 px-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:border-zinc-500 transition-all outline-none"
              />
            </div>

            {errors.submit && (
              <p className="text-[10px] text-red-500 uppercase font-black text-center">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 transition-all flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                `Deploy $${formatMoney(pricing.displayMonthly)}/mo Node`
              )}
            </button>

            {billingCycle === 'annual' && (
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">
                {pricing.billedText}
              </p>
            )}
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
          Already have node access?{' '}
          <Link href="/login" className="text-white hover:text-cyan-500 underline transition-colors">
            Sign In
          </Link>
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
