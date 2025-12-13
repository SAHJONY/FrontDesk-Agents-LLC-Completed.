// app/pricing/page.tsx
"use client"; // <--- ¡AÑADIDO PARA RESOLVER ERRORES DE SERIALIZACIÓN!

import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Building2, Rocket } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '299',
      description: 'Perfect for small businesses getting started with AI',
      features: [
        '1,000 minutes/month',
        '1 AI agent',
        'Basic analytics',
        'Email support',
        'Standard voice quality',
        'CRM integrations'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      icon: Building2,
      price: '999',
      description: 'For growing companies scaling their operations',
      features: [
        '5,000 minutes/month',
        '5 AI agents',
        'Advanced analytics',
        'Priority support',
        'Premium voice quality',
        'All integrations',
        'Custom workflows',
        'A/B testing'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      description: 'For organizations requiring maximum scale',
      features: [
        'Unlimited minutes',
        'Unlimited agents',
        'White-label solution',
        'Dedicated support',
        'Ultra HD voice',
        'Custom integrations',
        'SLA guarantee',
        'Dedicated infrastructure',
        'Annual planning'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Modern office"
            fill
            className="object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-900">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Plans That Scale With Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-600">Monthly</span>
            {/* El botón de toggle requiere 'use client' */}
            <button className="relative w-14 h-8 bg-blue-600 rounded-full transition-colors">
              <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform"></span>
            </button>
            <span className="text-gray-900 font-semibold">
              Annual <span className="text-sm text-green-600">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <plan.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      {plan.price !== 'Custom' && <span className="text-2xl text-gray-600">$</span>}
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <Link
                    href={plan.price === 'Custom' ? '/contact-sales' : '/signup'}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all mb-8 ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to make the right decision
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Monthly Minutes', starter: '1,000', pro: '5,000', enterprise: 'Unlimited' },
                    { feature: 'AI Agents', starter: '1', pro: '5', enterprise: 'Unlimited' },
                    { feature: 'Analytics Dashboard', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                    { feature: 'Support Level', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
                    { feature: 'Voice Quality', starter: 'Standard', pro: 'Premium', enterprise: 'Ultra HD' },
                    { feature: 'CRM Integrations', starter: true, pro: true, enterprise: true },
                    { feature: 'Custom Workflows', starter: false, pro: true, enterprise: true },
                    { feature: 'White Label', starter: false, pro: false, enterprise: true },
                    { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : '—'
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : '—'
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : '—'
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the difference.'
              },
              {
                q: 'What happens if I exceed my minutes?',
                a: 'We\'ll notify you when you reach 80% of your limit. You can either upgrade or purchase additional minutes at $0.30/minute.'
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes! All plans come with a 14-day free trial. No credit card required to start.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers.'
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees for any plan. We believe in transparent, straightforward pricing.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
            alt="Business team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of companies using AI to transform their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
