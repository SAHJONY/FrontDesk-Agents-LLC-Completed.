'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Basic',
    tagline: 'Perfect for startups',
    price: 199,
    description: 'Essential AI agents to get started with automation',
    features: [
      '2 AI Voice Agents',
      'Smart Messaging (SMS & Chat)',
      'Email Automation',
      'Basic Analytics Dashboard',
      '10 Languages',
      '500 conversations/month',
      '99.5% Uptime SLA',
      'Email Support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    tagline: 'Most popular for small businesses',
    price: 399,
    description: 'Complete AI workforce with advanced features',
    features: [
      '5 AI Voice Agents',
      'Smart Messaging (SMS & Chat)',
      'Email Automation',
      'Advanced Analytics & Reporting',
      '50+ Languages',
      '2,500 conversations/month',
      '99.9% Uptime SLA',
      'Priority Support (24/7)',
      'Advanced AI Training',
      'Basic Integrations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Growth',
    tagline: 'For growing businesses',
    price: 799,
    description: 'Scaled AI operations with custom integrations',
    features: [
      '15 AI Voice Agents',
      'Smart Messaging (SMS & Chat)',
      'Email Automation',
      'Advanced Analytics & BI',
      '50+ Languages',
      '10,000 conversations/month',
      '99.9% Uptime SLA',
      'Priority Support (24/7)',
      'Custom AI Training',
      'Custom Integrations (Salesforce, HubSpot, etc.)',
      'API Access',
      'Dedicated Success Manager',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Elite',
    tagline: 'For enterprises',
    price: 1499,
    description: 'Unlimited AI agents with enterprise-grade infrastructure',
    features: [
      'Unlimited AI Voice Agents',
      'Smart Messaging (SMS & Chat)',
      'Email Automation',
      'Enterprise Analytics & BI Integration',
      '50+ Languages + Custom Languages',
      'Unlimited conversations',
      '99.99% Uptime SLA',
      'White-glove Support (24/7)',
      'Custom AI Training & Fine-tuning',
      'Unlimited Custom Integrations',
      'Full API Access + Webhooks',
      'Dedicated CSM Team',
      'White-label Options',
      'On-premise Deployment Available',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What is included in the free trial?',
    answer: 'All plans include a 14-day free trial with full access to all features. No credit card required. You can cancel anytime during the trial period with no charges.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any differences in your billing.',
  },
  {
    question: 'What happens if I exceed my conversation limit?',
    answer: 'We will notify you when you reach 80% of your limit. You can either upgrade to a higher tier or purchase additional conversation packs at $0.10 per conversation.',
  },
  {
    question: 'Do you offer custom pricing for high-volume users?',
    answer: 'Yes! Elite plans are fully customizable based on your needs. Contact our sales team for a personalized quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and ACH transfers for annual plans.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees. You only pay the monthly or annual subscription price. We will have you up and running within 24 hours.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-cyan-400">
            FrontDesk Agents
          </Link>
          <Link 
            href="/login"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-slate-400 mb-8">
          Choose the plan that fits your business. All plans include a 14-day free trial.
        </p>
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-slate-300">No credit card required • Cancel anytime</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-slate-900 border ${
                tier.popular ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-800'
              } rounded-lg p-6 flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{tier.tagline}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-400">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                  tier.popular
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator Teaser */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Calculate Your ROI</h2>
          <p className="text-slate-400 mb-6">
            See how much time and money you can save by automating your front office operations with AI agents.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">70%</div>
              <div className="text-sm text-slate-400">Cost Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">24/7</div>
              <div className="text-sm text-slate-400">Availability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">3x</div>
              <div className="text-sm text-slate-400">Lead Conversion</div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Average customer saves <span className="text-cyan-400 font-semibold">$15,000/month</span> in operational costs
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-slate-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-slate-400 mb-8">
          Join 1000+ businesses already using FrontDesk Agents to automate their operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Schedule Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
