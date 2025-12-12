// app/pricing/page.tsx - Premium Pricing Page
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
          <h1 className="text
