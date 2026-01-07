'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Voice Agents',
      description: 'Natural-sounding voice agents that handle customer calls 24/7 with human-like conversations.',
      benefits: [
        'Handle unlimited concurrent calls',
        'Support 50+ languages',
        'Natural conversation flow',
        'Sentiment analysis in real-time'
      ]
    },
    {
      icon: '📧',
      title: 'Email Automation',
      description: 'Intelligent email routing, sentiment analysis, and automated responses powered by AI.',
      benefits: [
        'Auto-classify and route emails',
        'Detect customer sentiment',
        'Generate contextual responses',
        'Priority scoring system'
      ]
    },
    {
      icon: '💼',
      title: 'Lead Qualification',
      description: 'Automatically qualify leads using BANT framework and route to appropriate sales team.',
      benefits: [
        'BANT framework scoring',
        'Automated lead routing',
        'CRM integration',
        'Real-time notifications'
      ]
    },
    {
      icon: '📊',
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics dashboard with real-time metrics and AI-powered insights.',
      benefits: [
        'Real-time call analytics',
        'Performance metrics',
        'Trend analysis',
        'Custom reports'
      ]
    },
    {
      icon: '🔗',
      title: 'Integrations',
      description: 'Seamlessly integrate with your existing tools and workflows.',
      benefits: [
        'CRM integration (Salesforce, HubSpot)',
        'Calendar sync',
        'Slack notifications',
        'Webhook support'
      ]
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'SOC 2-aligned security with encryption, audit logs, and compliance controls.',
      benefits: [
        'End-to-end encryption',
        'Audit logging',
        'TCPA compliance',
        'DNC list management'
      ]
    },
    {
      icon: '⚡',
      title: 'Self-Healing Infrastructure',
      description: 'AI-powered system that automatically detects and resolves issues.',
      benefits: [
        'Automatic incident detection',
        'Reinforcement learning',
        '99.9% uptime guarantee',
        'Zero-downtime deployments'
      ]
    },
    {
      icon: '🎯',
      title: 'Custom Workflows',
      description: 'Build custom automation workflows tailored to your business needs.',
      benefits: [
        'Visual workflow builder',
        'Conditional logic',
        'Multi-step campaigns',
        'A/B testing'
      ]
    }
  ];

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                Powerful Features for
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Modern Businesses
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Everything you need to automate your front office operations and scale your business with AI-powered agents.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all border border-white/10"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
