'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircleIcon, 
  PhoneIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      tagline: 'Perfect for small businesses',
      monthlyPrice: 399,
      annualPrice: 3990,
      icon: SparklesIcon,
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
      features: [
        'Up to 500 calls per month',
        '24/7 AI receptionist',
        'Basic appointment scheduling',
        'Email & chat support',
        'Multi-language support',
        'Call recording & transcripts',
        'SMS notifications'
      ]
    },
    {
      name: 'Professional',
      tagline: 'Most popular for growing practices',
      monthlyPrice: 799,
      annualPrice: 7990,
      icon: ChartBarIcon,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      popular: true,
      features: [
        'Up to 2,000 calls per month',
        '24/7 AI receptionist',
        'Advanced scheduling',
        'Priority support',
        'Multi-language support',
        'Custom voice & personality',
        'Analytics dashboard',
        'CRM integration',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      tagline: 'For large organizations',
      monthlyPrice: 1499,
      annualPrice: 14990,
      icon: ShieldCheckIcon,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      features: [
        'Unlimited calls',
        'Multiple AI agents',
        '24/7 priority support',
        'Unlimited languages',
        'White-label solution',
        'Dedicated success manager',
        'Custom integrations',
        'Advanced compliance',
        'SLA guarantee',
        'On-premise option'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">FD</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-white">FrontDesk Agents</div>
                <div className="text-xs text-cyan-400">AI RECEPTIONIST</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors">
                Home
              </Link>
              <a
                href="tel:+12164804413"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <PhoneIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="relative pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-12">
            <div className="aspect-[21/9] bg-gradient-to-br from-slate-800 to-slate-900">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80"
                alt="Professional business team"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <span className="text-sm font-medium text-cyan-400 uppercase tracking-wide">Simple, Transparent Pricing</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Start with demos, scale<br />with automation.
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                Start with manual demos and payments (Zelle, Cash App, invoice). 
                When you're ready, we turn on full Stripe billing automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-white/10 rounded-full border border-white/20 transition-all"
            >
              <div className={`absolute top-1 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all ${
                billingCycle === 'annual' ? 'left-9' : 'left-1'
              }`} />
            </button>
            <span className={`text-lg font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                Save 17%
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? 'border-cyan-500 scale-105 shadow-2xl shadow-cyan-500/20'
                    : 'border-white/10 hover:border-cyan-500/50 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold text-white shadow-lg z-10">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Image */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-[#0a1929]/50 to-transparent" />
                  
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.tagline}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-sm text-green-400 mt-2">
                        Billed annually (${plan.annualPrice})
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact-sales"
                    className={`block w-full py-4 rounded-lg font-semibold text-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made with Manus Badge Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&q=80"
                  alt="Business professionals"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                  <div>
                    <div className="text-2xl font-bold text-white mb-2">Enterprise-Grade AI</div>
                    <div className="text-gray-300">Built for Fortune 500 reliability</div>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg border border-white/20">
                    <SparklesIcon className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium">Made with Manus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Get <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try SARA free for 30 days. No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-xl text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Start Free Trial
              </Link>
              
              <a
                href="tel:+12164804413"
                className="px-12 py-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg font-bold text-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PhoneIcon className="w-6 h-6" />
                Call Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a1929]/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">FD</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">FrontDesk Agents</div>
                <div className="text-xs text-gray-400">AI-Powered Reception</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              © 2024 FrontDesk Agents LLC. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-xs text-cyan-400 font-medium">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
