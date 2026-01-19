'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle } from 'lucide-react';

type FeatureItem = {
  name: string;
  included?: boolean;
  value?: string;
};

type Tier = {
  key: 'starter' | 'professional' | 'growth' | 'enterprise';
  name: string;
  tagline: string;
  price: number; // monthly USD (permanent)
  billingPeriod: 'month';
  description: string;
  features: Record<string, FeatureItem[]>;
  cta: string;
  popular: boolean;
};

const PERMANENT_PRICES = {
  starter: 299,
  professional: 699,
  growth: 1299,
  enterprise: 2499,
} as const;

function formatUsd(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}

// Annual toggle: show equivalent monthly price with 20% discount, billed annually
function annualMonthlyEquivalent(monthly: number) {
  // 20% off annual => monthly * 12 * 0.8 / 12 = monthly * 0.8
  return Math.round(monthly * 0.8);
}

const pricingTiers: Tier[] = [
  {
    key: 'starter',
    name: 'Starter',
    tagline: 'Perfect for small businesses',
    price: PERMANENT_PRICES.starter,
    billingPeriod: 'month',
    description: 'Essential AI receptionist to handle calls and messages',
    features: {
      'Core AI Receptionist': [
        { name: '24/7 AI receptionist', included: true },
        { name: 'Natural-language intake', included: true },
        { name: 'Call summaries + notes', included: true },
        { name: 'Multi-language support', value: 'English/Spanish' },
      ],
      'Inbound Calls': [
        { name: 'Instant call answering', included: true },
        { name: 'Call routing', value: 'Basic' },
        { name: 'After-hours handling', included: true },
        { name: 'Voicemail + transcription', included: true },
        { name: 'Call recording', included: false },
      ],
      'SMS & Messaging': [
        { name: 'Missed-call text-back', included: true },
        { name: 'Two-way SMS', included: true },
        { name: 'Appointment reminders', included: true },
        { name: 'Follow-up sequences', included: false },
      ],
      Scheduling: [
        { name: 'Appointment booking', included: true },
        { name: 'Calendar sync', value: 'Google Calendar' },
        { name: 'Reschedule/cancel flows', included: true },
        { name: 'Multi-staff scheduling', included: false },
      ],
      'Lead Capture & CRM': [
        { name: 'Lead capture', included: true },
        { name: 'Pipeline stages', included: true },
        { name: 'Notes and tags', included: true },
        { name: 'CSV export', included: true },
      ],
      Analytics: [
        { name: 'Call volume metrics', included: true },
        { name: 'Basic dashboards', included: true },
        { name: 'Response time tracking', included: false },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 3' },
        { name: 'Role-based access', included: true },
        { name: 'Single location', included: true },
      ],
      Limits: [
        { name: 'Conversations/month', value: '500' },
        { name: 'Phone numbers', value: '1' },
        { name: 'Uptime SLA', value: '99.5%' },
      ],
      Support: [
        { name: 'Email support', included: true },
        { name: 'Priority support', included: false },
      ],
    },
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    key: 'professional',
    name: 'Professional',
    tagline: 'Most popular for growing teams',
    price: PERMANENT_PRICES.professional,
    billingPeriod: 'month',
    description: 'Complete AI workforce with advanced automation',
    features: {
      'Core AI Receptionist': [
        { name: '24/7 AI receptionist', included: true },
        { name: 'Natural-language intake', included: true },
        { name: 'Call summaries + notes', included: true },
        { name: 'Multi-language support', value: '50+ languages' },
      ],
      'Inbound Calls': [
        { name: 'Instant call answering', included: true },
        { name: 'Call routing', value: 'Advanced (dept/location/intent)' },
        { name: 'After-hours handling', included: true },
        { name: 'Voicemail + transcription', included: true },
        { name: 'Call recording', included: true },
      ],
      'SMS & Messaging': [
        { name: 'Missed-call text-back', included: true },
        { name: 'Two-way SMS', included: true },
        { name: 'Appointment reminders', included: true },
        { name: 'Follow-up sequences', included: true },
      ],
      Scheduling: [
        { name: 'Appointment booking', included: true },
        { name: 'Calendar sync', value: 'Google + Outlook' },
        { name: 'Reschedule/cancel flows', included: true },
        { name: 'Multi-staff scheduling', included: true },
      ],
      'Lead Capture & CRM': [
        { name: 'Lead capture', included: true },
        { name: 'Pipeline stages', included: true },
        { name: 'Notes and tags', included: true },
        { name: 'CSV export + integrations', included: true },
      ],
      Analytics: [
        { name: 'Call volume metrics', included: true },
        { name: 'Advanced dashboards', included: true },
        { name: 'Response time tracking', included: true },
        { name: 'Lead conversion tracking', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 10' },
        { name: 'Role-based access', included: true },
        { name: 'Multi-location support', included: true },
        { name: 'Script manager', included: true },
      ],
      Integrations: [
        { name: 'Stripe billing', included: true },
        { name: 'Webhooks/API', included: true },
        { name: 'CRM connectors', value: 'Basic' },
      ],
      Limits: [
        { name: 'Conversations/month', value: '2,500' },
        { name: 'Phone numbers', value: '3' },
        { name: 'Uptime SLA', value: '99.9%' },
      ],
      Support: [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
      ],
    },
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    key: 'growth',
    name: 'Growth',
    tagline: 'Scale across multiple locations',
    price: PERMANENT_PRICES.growth,
    billingPeriod: 'month',
    description: 'Multi-location operations with stronger controls and analytics',
    features: {
      'Core AI Receptionist': [
        { name: '24/7 AI receptionist', included: true },
        { name: 'Natural-language intake', included: true },
        { name: 'Call summaries + notes', included: true },
        { name: 'Multi-language support', value: 'All major languages' },
      ],
      'Inbound Calls': [
        { name: 'Instant call answering', included: true },
        { name: 'Call routing', value: 'Advanced + custom rules' },
        { name: 'After-hours handling', included: true },
        { name: 'Voicemail + transcription', included: true },
        { name: 'Call recording', included: true },
      ],
      'SMS & Messaging': [
        { name: 'Missed-call text-back', included: true },
        { name: 'Two-way SMS', included: true },
        { name: 'Appointment reminders', included: true },
        { name: 'Follow-up sequences', included: true },
      ],
      Scheduling: [
        { name: 'Appointment booking', included: true },
        { name: 'Calendar sync', value: 'Google + Outlook' },
        { name: 'Reschedule/cancel flows', included: true },
        { name: 'Multi-staff scheduling', included: true },
      ],
      'Lead Capture & CRM': [
        { name: 'Lead capture', included: true },
        { name: 'Pipeline stages', included: true },
        { name: 'Notes and tags', included: true },
        { name: 'CSV export + integrations', included: true },
      ],
      Analytics: [
        { name: 'Call volume metrics', included: true },
        { name: 'Advanced dashboards', included: true },
        { name: 'Response time tracking', included: true },
        { name: 'Lead conversion tracking', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 25' },
        { name: 'Role-based access', included: true },
        { name: 'Multi-location support', included: true },
        { name: 'Script manager', included: true },
        { name: 'Audit logs', included: true },
      ],
      Integrations: [
        { name: 'Stripe billing', included: true },
        { name: 'Webhooks/API', included: true },
        { name: 'CRM connectors', value: 'Advanced' },
      ],
      Limits: [
        { name: 'Conversations/month', value: '7,500' },
        { name: 'Phone numbers', value: '10' },
        { name: 'Uptime SLA', value: '99.95%' },
      ],
      Support: [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
      ],
    },
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organizations',
    price: PERMANENT_PRICES.enterprise,
    billingPeriod: 'month',
    description: 'Unlimited AI workforce with enterprise-grade controls',
    features: {
      'Core AI Receptionist': [
        { name: '24/7 AI receptionist', included: true },
        { name: 'Natural-language intake', included: true },
        { name: 'Call summaries + notes', included: true },
        { name: 'Multi-language support', value: 'All languages + custom' },
      ],
      'Inbound Calls': [
        { name: 'Instant call answering', included: true },
        { name: 'Call routing', value: 'Enterprise (custom rules)' },
        { name: 'After-hours handling', included: true },
        { name: 'Voicemail + transcription', included: true },
        { name: 'Call recording', included: true },
      ],
      'SMS & Messaging': [
        { name: 'Missed-call text-back', included: true },
        { name: 'Two-way SMS', included: true },
        { name: 'Appointment reminders', included: true },
        { name: 'Follow-up sequences', included: true },
        { name: 'Custom templates', included: true },
      ],
      Scheduling: [
        { name: 'Appointment booking', included: true },
        { name: 'Calendar sync', value: 'All major calendars' },
        { name: 'Reschedule/cancel flows', included: true },
        { name: 'Multi-staff scheduling', included: true },
        { name: 'Advanced availability rules', included: true },
      ],
      'Lead Capture & CRM': [
        { name: 'Lead capture', included: true },
        { name: 'Pipeline stages', included: true },
        { name: 'Notes and tags', included: true },
        { name: 'Full CRM integrations', included: true },
      ],
      Analytics: [
        { name: 'Call volume metrics', included: true },
        { name: 'Enterprise dashboards', included: true },
        { name: 'Response time tracking', included: true },
        { name: 'Lead conversion tracking', included: true },
        { name: 'Custom reports', included: true },
        { name: 'BI tool integration', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Unlimited' },
        { name: 'Role-based access', included: true },
        { name: 'Multi-location support', included: true },
        { name: 'Script manager', included: true },
        { name: 'Audit logs', included: true },
        { name: 'Feature flags', included: true },
      ],
      Integrations: [
        { name: 'Stripe billing', included: true },
        { name: 'Webhooks/API', included: true },
        { name: 'CRM connectors', value: 'Full (Salesforce, HubSpot, etc.)' },
        { name: 'Custom integrations', included: true },
        { name: 'SSO (SAML)', included: true },
      ],
      'Security & Compliance': [
        { name: 'SOC 2-aligned security', included: true },
        { name: 'TCPA/DNC enforcement', included: true },
        { name: 'Data retention policies', included: true },
        { name: 'Privacy rights workflow', included: true },
        { name: 'Dedicated tenant', included: true },
      ],
      Limits: [
        { name: 'Conversations/month', value: 'Unlimited' },
        { name: 'Phone numbers', value: 'Unlimited' },
        { name: 'Uptime SLA', value: '99.99%' },
      ],
      Support: [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'Custom onboarding', included: true },
      ],
    },
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What is included in the free trial?',
    answer:
      'All plans include a 14-day free trial with access to your selected tier. No credit card required. Cancel anytime during the trial period with no charges.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Yes. You can upgrade or downgrade at any time. Changes take effect immediately and billing is prorated.',
  },
  {
    question: 'What counts as a conversation?',
    answer:
      'A conversation is any inbound call, SMS thread, or email exchange handled by the AI. Outbound follow-ups initiated by the AI are included in your plan limits.',
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer:
      'Enterprise can be tailored for compliance, integrations, and infrastructure. Contact sales to discuss volume discounts and dedicated environments.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards and ACH for Enterprise. Payments are processed securely through Stripe.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees for Starter, Professional, and Growth. Enterprise may include a one-time onboarding fee depending on customization.',
  },
  {
    question: 'What happens if I exceed my conversation limit?',
    answer:
      "We'll notify you at 80% utilization. Overages are billed at $0.50 per conversation. You can upgrade anytime.",
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes. Cancel anytime and your service continues until the end of your billing period. You won't be charged again.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const tiersWithCycle = useMemo(() => {
    return pricingTiers.map((t) => {
      if (billingCycle === 'monthly') return { ...t, displayPrice: t.price, cycleLabel: 'month' };
      const eq = annualMonthlyEquivalent(t.price);
      return { ...t, displayPrice: eq, cycleLabel: 'month (billed annually)' };
    });
  }, [billingCycle]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include a 14-day free trial with no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-800 rounded-lg p-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'annual' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {tiersWithCycle.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 rounded-2xl border-2 ${
                tier.popular ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-gray-800'
              } p-8 flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tier.tagline}</p>

                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-black">{formatUsd(tier.displayPrice)}</span>
                  <span className="text-gray-400 ml-2">/{tier.cycleLabel}</span>
                </div>

                <p className="text-gray-500 text-sm">{tier.description}</p>
              </div>

              <Link
                href={
                  tier.cta === 'Contact Sales'
                    ? `/demo?plan=${tier.key}`
                    : `/signup?plan=${tier.key}&billing=${billingCycle}`
                }
                className={`w-full py-3 rounded-lg font-bold text-center transition-all mb-6 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {tier.cta}
              </Link>

              <div className="space-y-4 flex-1">
                {Object.entries(tier.features).map(([category, features]) => (
                  <div key={category} className="border-t border-gray-800 pt-4">
                    <h4 className="font-semibold text-sm text-gray-400 mb-3">{category}</h4>
                    <ul className="space-y-2">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          {feature.included === true ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : feature.included === false ? (
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included === false ? 'text-gray-600' : 'text-gray-300'}>
                            {feature.name}
                            {feature.value && <span className="text-cyan-400 ml-1">({feature.value})</span>}
                          </span>
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

      {/* FAQ Section */}
      <div className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Start your 14-day free trial today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/signup?billing=${billingCycle}`}
              className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
                }
