'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle } from 'lucide-react';
import MultiLocationPricingCalculator from '@/components/MultiLocationPricingCalculator';

const pricingTiers = [
  {
    name: 'Starter',
    tagline: 'Perfect for small businesses',
    price: 299,
    billingPeriod: 'month',
    description: 'Essential AI receptionist for single location',
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
        { name: 'Call recording', included: true },
      ],
      'SMS & Messaging': [
        { name: 'Missed-call text-back', included: true },
        { name: 'Two-way SMS', included: true },
        { name: 'Appointment reminders', included: true },
        { name: 'Follow-up sequences', included: true },
      ],
      'Scheduling': [
        { name: 'Appointment booking', included: true },
        { name: 'Calendar sync', value: 'Google Calendar' },
        { name: 'Reschedule/cancel flows', included: true },
        { name: 'Multi-staff scheduling', included: true },
      ],
      'Lead Capture & CRM': [
        { name: 'Lead capture', included: true },
        { name: 'Pipeline stages', included: true },
        { name: 'Notes and tags', included: true },
        { name: 'CSV export', included: true },
      ],
      'Analytics': [
        { name: 'Call volume metrics', included: true },
        { name: 'Basic dashboards', included: true },
        { name: 'Response time tracking', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 5' },
        { name: 'Role-based access', included: true },
        { name: 'Locations', value: '1 location' },
      ],
      'Limits': [
        { name: 'Conversations/month', value: '1,000' },
        { name: 'Phone numbers', value: '1' },
        { name: 'Uptime SLA', value: '99.5%' },
      ],
      'Support': [
        { name: 'Email support', included: true },
        { name: 'Priority support', included: false },
      ],
    },
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    tagline: 'Most popular for growing teams',
    price: 699,
    billingPeriod: 'month',
    description: 'Complete AI workforce for 2-5 locations',
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
      'Scheduling': [
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
      'Analytics': [
        { name: 'Call volume metrics', included: true },
        { name: 'Advanced dashboards', included: true },
        { name: 'Response time tracking', included: true },
        { name: 'Lead conversion tracking', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 15' },
        { name: 'Role-based access', included: true },
        { name: 'Locations', value: '2-5 locations (10% discount)' },
        { name: 'Script manager', included: true },
      ],
      'Integrations': [
        { name: 'Stripe billing', included: true },
        { name: 'Webhooks/API', included: true },
        { name: 'CRM connectors', value: 'Basic' },
      ],
      'Limits': [
        { name: 'Conversations/month', value: '5,000' },
        { name: 'Phone numbers', value: '5' },
        { name: 'Uptime SLA', value: '99.9%' },
      ],
      'Support': [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
      ],
    },
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Growth',
    tagline: 'For expanding businesses',
    price: 1299,
    billingPeriod: 'month',
    description: 'Advanced AI workforce for 6-15 locations',
    features: {
      'Core AI Receptionist': [
        { name: '24/7 AI receptionist', included: true },
        { name: 'Natural-language intake', included: true },
        { name: 'Call summaries + notes', included: true },
        { name: 'Multi-language support', value: '100+ languages' },
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
      'Scheduling': [
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
      'Analytics': [
        { name: 'Call volume metrics', included: true },
        { name: 'Enterprise dashboards', included: true },
        { name: 'Response time tracking', included: true },
        { name: 'Lead conversion tracking', included: true },
        { name: 'Custom reports', included: true },
      ],
      'Team & Admin': [
        { name: 'Users', value: 'Up to 50' },
        { name: 'Role-based access', included: true },
        { name: 'Locations', value: '6-15 locations (15% discount)' },
        { name: 'Script manager', included: true },
        { name: 'Audit logs', included: true },
      ],
      'Integrations': [
        { name: 'Stripe billing', included: true },
        { name: 'Webhooks/API', included: true },
        { name: 'CRM connectors', value: 'Advanced (Salesforce, HubSpot)' },
        { name: 'Custom integrations', included: true },
      ],
      'Security & Compliance': [
        { name: 'SOC 2-aligned security', included: true },
        { name: 'TCPA/DNC enforcement', included: true },
        { name: 'Data retention policies', included: true },
      ],
      'Limits': [
        { name: 'Conversations/month', value: '15,000' },
        { name: 'Phone numbers', value: '15' },
        { name: 'Uptime SLA', value: '99.95%' },
      ],
      'Support': [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
    },
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    tagline: 'For large organizations',
    price: 2499,
    billingPeriod: 'month',
    description: 'Unlimited AI workforce for 16+ locations',
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
      'Scheduling': [
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
      'Analytics': [
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
        { name: 'Locations', value: '16+ locations (20% discount)' },
        { name: 'Script manager', included: true },
        { name: 'Audit logs', included: true },
        { name: 'Feature flags', included: true },
      ],
      'Integrations': [
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
      'Limits': [
        { name: 'Conversations/month', value: 'Unlimited' },
        { name: 'Phone numbers', value: 'Unlimited' },
        { name: 'Uptime SLA', value: '99.99%' },
      ],
      'Support': [
        { name: 'Email support', included: true },
        { name: 'Priority support (24/7)', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'Custom onboarding', included: true },
      ],
    },
    cta: 'Schedule Demo',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What is included in the free trial?',
    answer: 'All plans include a 14-day free trial with full access to all features in your selected tier. No credit card required. You can cancel anytime during the trial period with no charges.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any differences in your billing.',
  },
  {
    question: 'What counts as a conversation?',
    answer: 'A conversation is any inbound call, SMS thread, or email exchange handled by the AI. Outbound follow-ups initiated by the AI are included in your plan limits.',
  },
  {
    question: 'How does multi-location pricing work?',
    answer: 'We offer volume discounts for multiple locations: 10% off for 2-5 locations (Professional), 15% off for 6-15 locations (Growth), and 20% off for 16+ locations (Enterprise). Each location gets its own phone number and full AI workforce.',
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes! Enterprise plans are fully customizable based on your needs. Contact our sales team to discuss volume discounts, custom integrations, and dedicated infrastructure.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and ACH transfers for Enterprise plans. All payments are processed securely through Stripe.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees for Starter and Professional plans. Growth and Enterprise plans may include a one-time onboarding fee depending on customization requirements.',
  },
  {
    question: 'What happens if I exceed my conversation limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. Overages are billed at $0.50 per conversation. You can upgrade your plan at any time to increase your limits.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period, and you won\'t be charged again.',
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getPrice = (basePrice: number | string) => {
    if (typeof basePrice === 'string') return basePrice;
    return billingPeriod === 'annual' ? Math.floor(basePrice * 0.8) : basePrice;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-400 mb-8">
          Choose the plan that fits your business. All plans include a 14-day free trial with no credit card required.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors relative ${
              billingPeriod === 'annual'
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Multi-Location Pricing Calculator */}
      <div className="container mx-auto px-4 pb-16">
        <MultiLocationPricingCalculator />
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tier.tagline}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    ${typeof tier.price === 'number' ? getPrice(tier.price).toLocaleString() : tier.price}
                  </span>
                  {tier.billingPeriod && (
                    <span className="text-gray-400">/{tier.billingPeriod}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-2">{tier.description}</p>
              </div>

              <Link
                href={tier.cta === 'Contact Sales' || tier.cta === 'Schedule Demo' ? '/contact' : '/signup'}
                className={`block w-full py-3 px-6 rounded-lg font-medium text-center mb-6 transition-colors ${
                  tier.popular
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {tier.cta}
              </Link>

              <div className="space-y-6">
                {Object.entries(tier.features).map(([category, features]) => (
                  <div key={category}>
                    <h4 className="font-bold text-sm mb-3 text-cyan-400">{category}</h4>
                    <ul className="space-y-2">
                      {features.map((feature: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          {feature.included === false ? (
                            <X className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-gray-300">
                            {feature.name}
                            {feature.value && (
                              <span className="text-gray-500"> ({feature.value})</span>
                            )}
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
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <HelpCircle className="w-5 h-5 text-gray-400" />
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-800/50 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-gray-400 mb-8">
          Start your 14-day free trial today. No credit card required.
        </p>
      </div>
    </div>
  );
}
