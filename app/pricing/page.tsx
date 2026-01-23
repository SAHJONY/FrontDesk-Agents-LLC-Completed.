'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Zap, Shield, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 199,
    mins: 300,
    description: 'Essential autonomous intake for solo operators.',
    overage: '$0.45/min',
    featured: false,
    cta: 'Activate Node',
  },
  {
    name: 'Professional',
    price: 399,
    mins: 1200,
    description: 'Advanced fleet with priority routing and 50+ languages.',
    overage: '$0.40/min',
    featured: true,
    cta: 'Scale Fleet',
  },
  {
    name: 'Growth',
    price: 799,
    mins: 3000,
    description: 'Multi-location cluster with custom voice cloning.',
    overage: '$0.35/min',
    featured: false,
    cta: 'Establish Cluster',
  },
  {
    name: 'Enterprise',
    price: 1499,
    mins: 7000,
    description: 'Infinite scale with performance royalties (Sec. 3).',
    overage: '$0.30/min',
    featured: false,
    cta: 'Consult Sovereignty',
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const isOverLimit = searchParams.get('reason') === 'usage_limit';

  return (
    <div className="relative min-h-screen bg-brand-ink text-white py-24 px-6 selection:bg-brand-gold/30 overflow-hidden">
      {/* 8K Hero Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/8k/hero-team-8k.jpg"
          alt="FrontDesk Agents — diverse professional team in a modern office"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1920px"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/70 to-brand-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_12%,rgba(212,175,55,0.16),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <Zap className="h-4 w-4 text-brand-gold" />
            <span>FrontDesk Agents — The 24/7 Dispatcher</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Pricing engineered for authority.
          </h1>

          <p className="max-w-2xl text-white/80 text-lg">
            Autonomous intake, dispatch, and revenue intelligence. Deploy fast. Track ROI weekly. Scale without adding headcount.
          </p>

          {isOverLimit && (
            <div className="w-full max-w-2xl rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <div className="font-medium">Usage limit reached</div>
                  <div className="text-sm text-amber-100/80">
                    Upgrade to continue uninterrupted coverage and avoid missed calls.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={[
                  'rounded-3xl border p-7 backdrop-blur',
                  tier.featured
                    ? 'border-brand-gold/40 bg-brand-gold/10'
                    : 'border-white/10 bg-white/5',
                ].join(' ')}
              >
                {tier.featured && (
                  <div className="inline-flex rounded-full bg-brand-gold/20 px-3 py-1 text-xs text-brand-gold">
                    Most Popular
                  </div>
                )}

                <h3 className="mt-4 text-xl font-semibold">{tier.name}</h3>
                <p className="mt-2 text-white/70 text-sm">{tier.description}</p>

                <div className="mt-6">
                  <div className="text-4xl font-semibold">
                    ${tier.price}
                    <span className="text-lg text-white/60">/mo</span>
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Includes <span className="text-white">{tier.mins.toLocaleString()}</span> minutes
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Overage: {tier.overage}
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-brand-gold" />
                    24/7 call handling + summaries
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-brand-gold" />
                    Smart triage + tagging
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-brand-gold" />
                    Weekly impact reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-brand-gold" />
                    Capacity alerts + enforcement
                  </li>
                </ul>

                <Link
                  href="/signup"
                  className={[
                    'mt-7 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 font-medium',
                    tier.featured ? 'bg-brand-gold text-black' : 'bg-white text-black',
                  ].join(' ')}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-gold" />
                <div className="font-medium">Operational Guardrails</div>
              </div>
              <div className="mt-2 text-sm text-white/70">
                Minutes tracking, thresholds, and automated upgrade prompts.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-brand-gold" />
                <div className="font-medium">ROI Visibility</div>
              </div>
              <div className="mt-2 text-sm text-white/70">
                Weekly summaries that prove value before renewals.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-brand-gold" />
                <div className="font-medium">Global Ready</div>
              </div>
              <div className="mt-2 text-sm text-white/70">
                Multi-language support and scalable routing patterns.
              </div>
            </div>
          </div>

          <div className="mt-10 text-sm text-white/60">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-white underline underline-offset-4">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-white underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-ink text-white flex items-center justify-center">
          Loading pricing…
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
