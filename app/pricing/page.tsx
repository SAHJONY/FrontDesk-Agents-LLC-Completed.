'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircleIcon, 
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  TicketIcon
} from '@heroicons/react/24/outline';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Essential',
      tagline: 'Ideal for local clinics and small offices',
      monthlyPrice: 199,
      setupFee: 499,
      icon: SparklesIcon,
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
      features: [
        '500 Minutes Included', // Disruptive Entry
        '24/7 AI Answering',
        'Daily Intel Reports',
        'Basic Appointment Scheduling',
        'Email Support',
        'Call Recording & Transcripts'
      ]
    },
    {
      name: 'Professional',
      tagline: 'Designed for high-volume practices',
      monthlyPrice: 499,
      setupFee: 1499,
      icon: ChartBarIcon,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      popular: true,
      features: [
        '2,500 Minutes Included', // Market Disruptor
        'Advanced CRM Integration',
        'Priority Technical Support',
        'Custom Voice & Personality',
        'Sentiment Analytics Dashboard',
        'Automated No-Show Recovery',
        'SMS Continuity'
      ]
    },
    {
      name: 'Enterprise',
      tagline: 'Custom infrastructure for chains',
      monthlyPrice: 1499,
      setupFee: 'Custom',
      icon: ShieldCheckIcon,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      features: [
        '10,000+ Minutes',
        'Multi-location Management',
        'Dedicated Success Manager',
        'Custom API & Webhooks',
        'HIPAA Compliance Auditing',
        'White-label Dashboard',
        'SLA Guarantee'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold">FD</div>
            <span className="font-bold text-xl tracking-tight">FrontDesk Agents</span>
          </Link>
          <Link href="/login" className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Pricing Strategy 2025</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Enterprise Infrastructure. <br/>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Disruptive Pricing.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We offer 5x more minutes than the competition at a fraction of the cost of a human receptionist.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative rounded-3xl overflow-hidden border transition-all duration-500 ${
              plan.popular ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-2xl shadow-blue-500/20' : 'border-white/10 bg-white/5'
            }`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase">
                  Best Value
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <plan.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-tighter">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${plan.monthlyPrice}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <div className="mt-2 text-sm text-blue-400 font-medium">
                    + ${plan.setupFee} Professional Setup Fee
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-white/10 hover:bg-white/20 border border-white/10'
                }`}>
                  Deploy Infrastructure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Why 2,500 minutes?</h2>
            <p className="text-blue-100 opacity-80">The average dental office misses 35 calls a week. We ensure your infrastructure never shuts off when you need it most.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center min-w-[200px]">
            <div className="text-4xl font-bold">$36,000</div>
            <div className="text-xs uppercase tracking-widest mt-1 opacity-70">Avg. Yearly Savings</div>
          </div>
        </div>
      </section>
    </div>
  );
}
