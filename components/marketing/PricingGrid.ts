'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '#',
    price: '$497',
    description: 'Perfect for single-location businesses ready to go autonomous.',
    features: [
      '1,000 interactions per month',
      'Single voice AI agent',
      '24/7 automated response',
      'Multi-channel (phone, SMS, web)',
      'Lead capture & scoring',
      'Basic analytics dashboard',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Sovereign',
    id: 'tier-sovereign',
    href: '#',
    price: '$1,497',
    description: 'Most popular. Complete autonomous workforce for growing businesses.',
    features: [
      '5,000 interactions per month',
      '3 voice AI agents',
      '24/7/365 availability',
      'Multi-channel + WhatsApp',
      'Advanced lead qualification',
      'Multilingual support (50+ languages)',
      'RTL/LTR auto-detection',
      'Real-time analytics',
      'Stripe payment integration',
      'Priority support (< 4 hour response)',
      'Weekly Sovereign Reports',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: 'Custom',
    description: 'White-label infrastructure for agencies and franchises.',
    features: [
      'Unlimited interactions',
      'Unlimited AI agents',
      'Global Neural Mesh deployment',
      'White-label capability',
      'Custom domain & branding',
      'Multi-client management',
      'Shadow Vault encryption',
      'HIPAA/GDPR compliance',
      'Dedicated account manager',
      'Custom SLA terms',
      'API access',
    ],
    featured: false,
  },
];

export default function PricingGrid() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Deploy Your Sovereign Workforce
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the autonomous infrastructure that scales with your business. No contracts. Cancel anytime.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.featured
                  ? 'ring-2 ring-cyan-600 bg-gray-900'
                  : 'ring-1 ring-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  className={`text-lg font-semibold leading-8 ${
                    tier.featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.name}
                </h3>
                {tier.featured && (
                  <p className="rounded-full bg-cyan-600 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    Most popular
                  </p>
                )}
              </div>
              <p className={`mt-4 text-sm leading-6 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && (
                  <span className={`text-sm font-semibold leading-6 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    /month
                  </span>
                )}
              </p>
              
                href={tier.href}
                aria-describedby={tier.id}
                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-cyan-600 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline-cyan-600'
                    : 'bg-gray-900 text-white shadow-sm hover:bg-gray-800 focus-visible:outline-gray-900'
                }`}
              >
                Deploy Now
              </a>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 xl:mt-10 ${
                  tier.featured ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">30-Day Money-Back Guarantee</span>
            {' '}- If you don't see ROI in the first month, we'll refund 100% of your investment.
          </p>
        </div>
      </div>
    </div>
  );
}
