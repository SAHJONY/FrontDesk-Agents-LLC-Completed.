'use client';

import React, { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { Check, Shield, TrendingUp, Loader2 } from 'lucide-react';

const ANNUAL_DISCOUNT = 0.2;
type BillingCycle = 'monthly' | 'annual';

const pricingTiers = [
  {
    name: 'Starter',
    tagline: 'Ideal for small business operations',
    price: 199,
    description: 'Automated receptionist service with dedicated account access.',
    features: {
      'Core Infrastructure': [
        { name: '300 Included Minutes', included: true },
        { name: 'Global Service Activation', included: true },
        { name: 'Overage Protection', value: '$0.45/min' },
      ],
      'Operational Tools': [
        { name: '24/7 Intake Management', included: true },
        { name: 'Professional Scripting', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: '1' },
        { name: 'Uptime SLA', value: '99.5%' },
      ],
    },
    cta: 'Select Starter Plan',
    popular: false,
    accent: 'blue'
  },
  {
    name: 'Professional',
    tagline: 'Scalable solutions for growing teams',
    price: 399,
    description: 'High-capacity virtual workforce with priority call routing.',
    features: {
      'Core Infrastructure': [
        { name: '1,200 Included Minutes', included: true },
        { name: 'Priority Service Status', included: true },
        { name: 'Volume Discounts', value: '$0.40/min' },
      ],
      'Operational Tools': [
        { name: 'Advanced API Integration', included: true },
        { name: 'Multilingual Support (50+)', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: 'Up to 5' },
        { name: 'Uptime SLA', value: '99.9%' },
      ],
    },
    cta: 'Select Professional Plan',
    popular: true,
    accent: 'blue'
  },
  {
    name: 'Enterprise',
    tagline: 'Comprehensive corporate solutions',
    price: 1499,
    description: 'Unlimited scalability with performance-based engagement models.',
    features: {
      'Core Infrastructure': [
        { name: '7,000 Included Minutes', included: true },
        { name: 'Dedicated Server Instance', included: true },
        { name: 'Enterprise Overage Rates', value: '$0.30/min' },
      ],
      'Compliance & Security': [
        { name: 'Regulatory Compliance Suite', included: true },
        { name: 'Dedicated Account Manager', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: 'Unlimited' },
        { name: 'Uptime SLA', value: '99.99%' },
      ],
    },
    cta: 'Contact Sales',
    popular: false,
    accent: 'blue'
  },
];

function PricingContent() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <div className="relative py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">
            Enterprise Solutions & Pricing
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Transparent pricing models designed to scale with your business requirements.
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-200 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
                billingCycle === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
                billingCycle === 'annual' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`flex flex-col p-8 rounded-xl border ${tier.popular ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'}`}>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{tier.tagline}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-slate-500 text-sm ml-1">/per month</span>
              </div>
              <Link href="/signup" className={`w-full py-3 rounded-lg font-bold text-center mb-8 ${tier.popular ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                {tier.cta}
              </Link>
              <div className="space-y-6">
                {Object.entries(tier.features).map(([cat, feats]) => (
                  <div key={cat}>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{cat}</p>
                    <ul className="space-y-3">
                      {feats.map((f: any) => (
                        <li key={f.name} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                          <span className="text-slate-700">{f.name} {f.value && <span className="font-bold">({f.value})</span>}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Enterprise Pricing...</div>}>
      <PricingContent />
    </Suspense>
  );
}
