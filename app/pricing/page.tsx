'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircleIcon, 
  XMarkIcon,
  SparklesIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';

export default function PremiumPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      tagline: 'Perfect for small practices',
      monthlyPrice: 299,
      annualPrice: 2990,
      savings: 598,
      icon: SparklesIcon,
      color: 'from-blue-500 to-cyan-500',
      features: {
        included: [
          'Up to 500 calls per month',
          '24/7 AI receptionist',
          'Basic appointment scheduling',
          'Email & chat support',
          'Multi-language support (3 languages)',
          'Call recording & transcripts',
          'Basic analytics dashboard',
          'SMS notifications'
        ],
        excluded: [
          'Custom voice & personality',
          'CRM integrations',
          'Advanced analytics',
          'Priority support',
          'White-label option',
          'Custom workflows'
        ]
      },
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      tagline: 'Most popular for growing practices',
      monthlyPrice: 599,
      annualPrice: 5990,
      savings: 1198,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-cyan-500 to-teal-500',
      features: {
        included: [
          'Up to 2,000 calls per month',
          '24/7 AI receptionist',
          'Advanced appointment scheduling',
          'Priority email & phone support',
          'Multi-language support (10+ languages)',
          'Call recording & transcripts',
          'Advanced analytics & reporting',
          'SMS & email notifications',
          'Custom voice & personality',
          'CRM integrations (Salesforce, HubSpot)',
          'Custom call workflows',
          'API access',
          'Voicemail transcription',
          'After-hours routing'
        ],
        excluded: [
          'Unlimited calls',
          'White-label option',
          'Dedicated account manager',
          'Custom SLA',
          'On-premise deployment'
        ]
      },
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      tagline: 'For large healthcare organizations',
      monthlyPrice: 1499,
      annualPrice: 14990,
      savings: 3498,
      icon: ShieldCheckIcon,
      color: 'from-teal-500 to-emerald-500',
      features: {
        included: [
          'Unlimited calls',
          'Multiple AI agents',
          '24/7 priority support',
          'Unlimited languages',
          'All Professional features',
          'White-label solution',
          'Dedicated success manager',
          'Custom integrations',
          'Advanced compliance (HIPAA, SOC 2)',
          'Custom SLA guarantee',
          'On-premise deployment option',
          'Advanced security features',
          'Custom reporting & analytics',
          'Training & onboarding',
          'Quarterly business reviews'
        ],
        excluded: []
      },
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const comparisonFeatures = [
    {
      category: 'Core Features',
      items: [
        { name: '24/7 AI Receptionist', starter: true, pro: true, enterprise: true },
        { name: 'Call Recording', starter: true, pro: true, enterprise: true },
        { name: 'Monthly Calls', starter: '500', pro: '2,000', enterprise: 'Unlimited' },
        { name: 'Multi-language Support', starter: '3', pro: '10+', enterprise: 'Unlimited' },
        { name: 'Custom Voice & Personality', starter: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Integrations',
      items: [
        { name: 'CRM Integration', starter: false, pro: true, enterprise: true },
        { name: 'Calendar Sync', starter: true, pro: true, enterprise: true },
        { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
        { name: 'API Access', starter: false, pro: true, enterprise: true },
        { name: 'Webhook Support', starter: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Analytics & Reporting',
      items: [
        { name: 'Basic Analytics', starter: true, pro: true, enterprise: true },
        { name: 'Advanced Reporting', starter: false, pro: true, enterprise: true },
        { name: 'Custom Dashboards', starter: false, pro: false, enterprise: true },
        { name: 'Export Reports', starter: false, pro: true, enterprise: true },
        { name: 'Real-time Metrics', starter: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Support & Services',
      items: [
        { name: 'Email Support', starter: true, pro: true, enterprise: true },
        { name: 'Priority Support', starter: false, pro: true, enterprise: true },
        { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
        { name: 'Custom Onboarding', starter: false, pro: false, enterprise: true },
        { name: 'SLA Guarantee', starter: false, pro: false, enterprise: true }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How does the 30-day free trial work?',
      answer: 'Start using Sara immediately with full access to all features in your chosen plan. No credit card required. Cancel anytime during the trial period with no charges.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle.'
    },
    {
      question: 'What happens if I exceed my call limit?',
      answer: 'You\'ll receive a notification when you reach 80% of your limit. You can upgrade your plan or purchase additional call credits at $0.50 per call.'
    },
    {
      question: 'Is my data secure and HIPAA compliant?',
      answer: 'Absolutely. All plans include enterprise-grade security with encryption at rest and in transit. Professional and Enterprise plans include full HIPAA compliance and BAA agreements.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period.'
    },
    {
      question: 'Do you offer custom enterprise pricing?',
      answer: 'Yes! For organizations needing more than 2,000 calls per month or custom features, contact our sales team for a tailored solution.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2332] to-[#000814]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
              <CurrencyDollarIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-white">Transparent Pricing</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Perfect Plan</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Start with a 30-day free trial. No credit card required. Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
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
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'annual' ? 'text-white' : 'text-gray-500'}`}>
                Annual
              </span>
              {billingCycle === 'annual' && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                  Save up to 20%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white/5 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${
                  plan.popular
                    ? 'border-cyan-500 scale-105 shadow-2xl shadow-cyan-500/20 bg-white/10'
                    : 'border-white/10 hover:border-cyan-500/50 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold text-white shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.tagline}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      {plan.name !== 'Enterprise' ? (
                        <>
                          <span className="text-5xl font-bold text-white">
                            ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                          </span>
                          <span className="text-gray-400">/month</span>
                        </>
                      ) : (
                        <span className="text-5xl font-bold text-white">Custom</span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.name !== 'Enterprise' && (
                      <div className="text-sm text-green-400 mt-2">
                        Save ${plan.savings} per year
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.included.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact-sales' : '/signup'}
                  className={`block w-full py-4 rounded-full font-semibold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">All Features</span>
            </h2>
            <p className="text-xl text-gray-400">See what's included in each plan</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            {comparisonFeatures.map((category, catIdx) => (
              <div key={catIdx}>
                <div className="px-8 py-4 bg-white/5 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="grid grid-cols-4 gap-4 px-8 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="col-span-1 text-gray-300 font-medium">{item.name}</div>
                    <div className="text-center">
                      {typeof item.starter === 'boolean' ? (
                        item.starter ? (
                          <CheckCircleIcon className="w-6 h-6 text-cyan-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-6 h-6 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-white font-medium">{item.starter}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof item.pro === 'boolean' ? (
                        item.pro ? (
                          <CheckCircleIcon className="w-6 h-6 text-cyan-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-6 h-6 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-white font-medium">{item.pro}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof item.enterprise === 'boolean' ? (
                        item.enterprise ? (
                          <CheckCircleIcon className="w-6 h-6 text-cyan-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-6 h-6 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-white font-medium">{item.enterprise}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to know</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Get <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try Sara free for 30 days. No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-xl text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Start Free Trial
              </Link>
              
              <a
                href="tel:+12164804413"
                className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PhoneIcon className="w-6 h-6" />
                Call Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
