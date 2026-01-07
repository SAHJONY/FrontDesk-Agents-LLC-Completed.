"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const divisions = [
  {
    name: 'Email Operations',
    icon: '📧',
    description: 'Autonomous email management with 95%+ routing accuracy and 70%+ resolution rate',
    features: ['Intelligent Routing', 'Auto-Response Generation', 'Sentiment Analysis', 'Priority Scoring'],
    color: 'cyan',
    metrics: { accuracy: '95%', resolution: '70%', response: '<5min' }
  },
  {
    name: 'Customer Acquisition',
    icon: '🎯',
    description: 'AI-powered lead generation and conversion with 50%+ increase in qualified leads',
    features: ['Lead Generation', 'Qualification', 'Personalized Outreach', 'Conversion Optimization'],
    color: 'blue',
    metrics: { leads: '+50%', conversion: '+30%', revenue: '$500K/mo' }
  },
  {
    name: 'Customer Success',
    icon: '🤝',
    description: 'Proactive retention and expansion with <5% monthly churn rate',
    features: ['Onboarding Automation', 'Health Monitoring', 'Churn Prevention', 'Expansion Revenue'],
    color: 'green',
    metrics: { churn: '<5%', expansion: '+30%', satisfaction: '4.8/5' }
  },
  {
    name: 'Technical Operations',
    icon: '⚙️',
    description: '24/7 monitoring and self-healing with 99.9%+ uptime guarantee',
    features: ['Performance Monitoring', 'Auto-Scaling', 'Security Scanning', 'Incident Response'],
    color: 'purple',
    metrics: { uptime: '99.9%', response: '<100ms', incidents: 'Auto-resolved' }
  },
  {
    name: 'Financial Operations',
    icon: '💰',
    description: 'Automated billing and revenue optimization with intelligent collections',
    features: ['Auto-Billing', 'Smart Collections', 'Revenue Forecasting', 'Payment Processing'],
    color: 'yellow',
    metrics: { automation: '100%', collections: '+40%', accuracy: '99.9%' }
  },
  {
    name: 'Intelligence & Analytics',
    icon: '📊',
    description: 'Predictive analytics and market intelligence for data-driven decisions',
    features: ['Predictive Analytics', 'Market Intelligence', 'Competitive Analysis', 'Custom Reports'],
    color: 'pink',
    metrics: { accuracy: '92%', insights: 'Real-time', predictions: '85%' }
  },
  {
    name: 'Human Resources',
    icon: '👥',
    description: 'Autonomous recruiting and team optimization with AI-powered matching',
    features: ['Recruiting Automation', 'Candidate Screening', 'Onboarding', 'Performance Tracking'],
    color: 'orange',
    metrics: { efficiency: '+60%', quality: '+45%', time: '-70%' }
  },
  {
    name: 'Legal & Compliance',
    icon: '⚖️',
    description: 'Automated compliance monitoring and contract management',
    features: ['Contract Analysis', 'Compliance Monitoring', 'Risk Assessment', 'Document Automation'],
    color: 'red',
    metrics: { compliance: '100%', risk: '-80%', speed: '+90%' }
  },
];

const coreFeatures = [
  {
    title: 'Reinforcement Learning',
    description: 'Your AI gets smarter every single day through continuous learning from every interaction.',
    icon: '🧠',
    benefit: 'Static AI vs. Evolving Intelligence'
  },
  {
    title: 'Cross-Channel Memory',
    description: 'Unified memory across voice, SMS, email, and WhatsApp. Customers never repeat themselves.',
    icon: '🔗',
    benefit: 'Siloed Channels vs. Unified Experience'
  },
  {
    title: 'Autonomous Execution',
    description: 'AI completes multi-step workflows from lead qualification to revenue operations automatically.',
    icon: '⚡',
    benefit: 'Reactive Bots vs. Proactive Agents'
  },
  {
    title: 'Military-Grade Architecture',
    description: '8-division AI workforce coordinated by Supreme AI Commander for enterprise reliability.',
    icon: '🎖️',
    benefit: 'Single-Purpose Bots vs. Complete Workforce'
  },
];

export function FeaturesSectionEnhanced() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="text-sm font-medium text-cyan-400">🎖️ Military-Grade AI Workforce</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            8 Autonomous Divisions
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Working 24/7 for You
            </span>
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Not just AI agents — a complete autonomous workforce with specialized divisions
            for every business function, coordinated by our Supreme AI Commander.
          </p>
        </motion.div>

        {/* Core Differentiators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{feature.description}</p>
              <div className="text-xs text-cyan-400 font-medium">
                {feature.benefit}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((division, index) => (
            <motion.div
              key={division.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-${division.color}-500/50 transition-all group"
            >
              <div className="text-5xl mb-4">{division.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{division.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{division.description}</p>
              
              <div className="space-y-2 mb-4">
                {division.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                {Object.entries(division.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-zinc-500 capitalize">{key}:</span>
                    <span className="text-cyan-400 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Explore All Features
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
