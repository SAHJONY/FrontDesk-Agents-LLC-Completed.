"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: 'Starter',
    tagline: 'Perfect for small teams',
    price: { monthly: 499, annual: 4490 },
    description: 'Essential AI agents to automate your front office operations',
    features: [
      { name: '5 AI Voice Agents', included: true },
      { name: 'Smart Messaging (SMS & Chat)', included: true },
      { name: 'Email Automation', included: true },
      { name: 'Basic Analytics Dashboard', included: true },
      { name: '10 Languages', included: true },
      { name: '1,000 conversations/month', included: true },
      { name: '99.5% Uptime SLA', included: true },
      { name: 'Email Support', included: true },
      { name: 'Advanced AI Training', included: false },
      { name: 'Custom Integrations', included: false },
      { name: 'Dedicated Success Manager', included: false },
      { name: 'White-label Options', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'cyan',
  },
  {
    name: 'Professional',
    tagline: 'Most popular for growing businesses',
    price: { monthly: 1499, annual: 13490 },
    description: 'Full AI workforce with advanced features and integrations',
    features: [
      { name: '20 AI Voice Agents', included: true },
      { name: 'Smart Messaging (SMS & Chat)', included: true },
      { name: 'Email Automation', included: true },
      { name: 'Advanced Analytics & Reporting', included: true },
      { name: '50+ Languages', included: true },
      { name: '10,000 conversations/month', included: true },
      { name: '99.9% Uptime SLA', included: true },
      { name: 'Priority Support (24/7)', included: true },
      { name: 'Advanced AI Training', included: true },
      { name: 'Custom Integrations (Salesforce, HubSpot, etc.)', included: true },
      { name: 'API Access', included: true },
      { name: 'Dedicated Success Manager', included: false },
      { name: 'White-label Options', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'blue',
  },
  {
    name: 'Enterprise',
    tagline: 'For large organizations',
    price: { monthly: 'Custom', annual: 'Custom' },
    description: 'Unlimited AI agents with military-grade infrastructure',
    features: [
      { name: 'Unlimited AI Voice Agents', included: true },
      { name: 'Smart Messaging (SMS & Chat)', included: true },
      { name: 'Email Automation', included: true },
      { name: 'Enterprise Analytics & BI Integration', included: true },
      { name: '50+ Languages + Custom Languages', included: true },
      { name: 'Unlimited conversations', included: true },
      { name: '99.99% Uptime SLA', included: true },
      { name: 'White-glove Support (24/7)', included: true },
      { name: 'Custom AI Training & Fine-tuning', included: true },
      { name: 'Unlimited Custom Integrations', included: true },
      { name: 'Full API Access + Webhooks', included: true },
      { name: 'Dedicated Success Manager & CSM Team', included: true },
      { name: 'White-label Options', included: true },
      { name: 'On-premise Deployment Available', included: true },
      { name: 'Custom SLA & Compliance', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'purple',
  },
];

const faqs = [
  {
    question: 'What\'s included in the free trial?',
    answer: 'All plans include a 14-day free trial with full access to all features. No credit card required. You can cancel anytime during the trial period with no charges.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences in your billing.',
  },
  {
    question: 'What happens if I exceed my conversation limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. You can either upgrade to a higher tier or purchase additional conversation packs at $0.10 per conversation.',
  },
  {
    question: 'Do you offer custom pricing for high-volume users?',
    answer: 'Yes! Enterprise plans are fully customizable based on your needs. Contact our sales team for a personalized quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers. Annual plans can be paid via invoice.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees for any plan. Our AI agents are ready to deploy in minutes with our guided onboarding process.',
  },
  {
    question: 'What\'s your refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with FrontDesk Agents, we\'ll refund your first month\'s payment, no questions asked.',
  },
  {
    question: 'Do you offer discounts for nonprofits or educational institutions?',
    answer: 'Yes! We offer 25% discounts for qualified nonprofits and educational institutions. Contact sales@frontdeskagents.com to apply.',
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="text-sm font-medium text-cyan-400">? Transparent Pricing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Simple, Transparent
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
              No credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-cyan-500 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                  billingCycle === 'annual'
                    ? 'bg-cyan-500 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  Save 25%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-blue-500/10 to-black border-2 border-blue-500'
                    : 'bg-white/5 border border-white/10'
                } backdrop-blur-sm hover:border-${tier.color}-500/50 transition-all`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{tier.tagline}</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    {typeof tier.price[billingCycle] === 'number' ? (
                      <>
                        <span className="text-5xl font-black text-white">
                          ${tier.price[billingCycle]}
                        </span>
                        <span className="text-zinc-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </>
                    ) : (
                      <span className="text-5xl font-black text-white">
                        {tier.price[billingCycle]}
                      </span>
                    )}
                  </div>
                  
                  {billingCycle === 'annual' && typeof tier.price.annual === 'number' && typeof tier.price.monthly === 'number' && (
                    <p className="text-sm text-green-400">
                      Save ${((tier.price.monthly * 12) - tier.price.annual).toLocaleString()}/year
                    </p>
                  )}
                  
                  <p className="text-sm text-zinc-500 mt-4">{tier.description}</p>
                </div>

                <Link
                  href={tier.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`block w-full py-3 rounded-lg font-bold text-center transition-all mb-6 ${
                    tier.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {tier.cta}
                </Link>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Compare All Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-zinc-400 font-medium">Feature</th>
                  <th className="py-4 px-6 text-center text-white font-bold">Starter</th>
                  <th className="py-4 px-6 text-center text-white font-bold">Professional</th>
                  <th className="py-4 px-6 text-center text-white font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers[0].features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-4 px-6 text-zinc-300">{feature.name}</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.name} className="py-4 px-6 text-center">
                        {tier.features[idx].included ? (
                          <svg className="w-6 h-6 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-zinc-600">--</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-cyan-400 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-zinc-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Front Office?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join 1000+ businesses using FrontDesk Agents to automate their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all border border-white/10"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
