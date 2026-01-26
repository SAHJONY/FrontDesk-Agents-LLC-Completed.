// /app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [imageError, setImageError] = useState(false);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              FD
            </div>
            <span className="text-sm font-semibold text-slate-100">FrontDesk Agents</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#features"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Hero Text */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  FrontDesk Agents
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    AI Phone OS
                  </span>
                </h1>
                <p className="text-lg text-slate-300 leading-8">
                  Transform your business with intelligent, AI-powered front desk solutions. 
                  Handle calls, messages, and appointments 24/7 with enterprise-grade reliability.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                  <span className="ml-2">→</span>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-100 hover:border-blue-400 hover:text-blue-400 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-sm text-slate-400">
                  <div className="font-semibold text-slate-200">24/7 Support</div>
                  <p>Always available</p>
                </div>
                <div className="text-sm text-slate-400">
                  <div className="font-semibold text-slate-200">Enterprise Grade</div>
                  <p>99.9% Uptime</p>
                </div>
                <div className="text-sm text-slate-400">
                  <div className="font-semibold text-slate-200">Secure</div>
                  <p>SOC 2 Compliant</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 w-full lg:h-[500px]">
              {!imageError ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <Image
                    src="/images/ai_receptionist/hero-en.jpg"
                    alt="AI Receptionist Hero"
                    fill
                    className="object-cover"
                    priority
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-2xl border border-slate-700 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📞</div>
                    <p className="text-slate-300 font-semibold">AI Phone OS</p>
                    <p className="text-slate-400 text-sm mt-2">Intelligent Call Management</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full border-t border-slate-700 px-4 py-20 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Everything you need to manage your front desk operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '📱',
                title: 'Call Management',
                description: 'Intelligent call routing and handling with AI-powered responses'
              },
              {
                icon: '💬',
                title: 'Message Screening',
                description: 'Smart message filtering and prioritization'
              },
              {
                icon: '📅',
                title: 'Appointment Booking',
                description: 'Automated scheduling and calendar integration'
              },
              {
                icon: '🤖',
                title: 'AI Agents',
                description: 'Advanced AI agents for complex interactions'
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Real-time insights and performance metrics'
              },
              {
                icon: '🔒',
                title: 'Security',
                description: 'Enterprise-grade security and compliance'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-blue-500 hover:bg-slate-800/80 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Starter',
                price: '$299',
                features: ['Up to 100 calls/month', 'Email support', 'Basic analytics']
              },
              {
                name: 'Professional',
                price: '$799',
                features: ['Up to 1000 calls/month', 'Priority support', 'Advanced analytics', 'Custom integration'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Unlimited calls', '24/7 support', 'Full customization', 'SLA guarantee']
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-8 transition-all ${
                  plan.highlighted
                    ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full rounded-lg py-2 font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-slate-600 text-slate-100 hover:border-blue-400 hover:text-blue-400'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-t border-slate-700 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join hundreds of companies trusting us with their front desk operations
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Free Trial
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-700 bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">FrontDesk Agents</h4>
              <p className="text-slate-400 text-sm">
                AI-powered front desk solutions for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#features" className="hover:text-blue-400">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-400">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-blue-400">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/privacy" className="hover:text-blue-400">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 FrontDesk Agents LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
