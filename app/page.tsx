'use client';

import React, { useState } from 'react';
import { Phone, Globe, Calendar, MessageSquare, TrendingUp, Zap, Shield, Users, BarChart3, Bot, Clock, CheckCircle2, Building2, Award, Lock, Workflow, Database, Cpu, Network } from 'lucide-react';
import Link from 'next/link';

const TIERS = {
  STARTER: { 
    name: 'Starter', 
    price: 199, 
    locations: '1 location', 
    desc: 'Essential AI receptionist for single location businesses',
    features: [
      '300 conversations/month',
      'English & Spanish support',
      'Google Calendar integration',
      'Basic CRM sync',
      'Email & SMS notifications',
      'Standard support (24hr response)'
    ],
    highlight: false
  },
  PROFESSIONAL: { 
    name: 'Professional', 
    price: 399, 
    locations: '2-5 locations', 
    desc: 'Complete AI workforce for growing multi-location operations',
    features: [
      '1,200 conversations/month',
      '50+ languages supported',
      'Stripe billing integration',
      'Salesforce & HubSpot CRM',
      'Outbound campaigns (84% conversion)',
      'Priority support (4hr response)',
      'Custom call routing & IVR',
      'Real-time analytics dashboard'
    ],
    highlight: true
  },
  GROWTH: { 
    name: 'Growth', 
    price: 799, 
    locations: '6-15 locations', 
    desc: 'Advanced AI workforce for established enterprise operations',
    features: [
      '3,000 conversations/month',
      '100+ languages supported',
      'Full enterprise CRM integration',
      'AI-powered lead scoring & routing',
      'Automated follow-up workflows',
      'Dedicated account manager',
      'Custom API integrations',
      'Advanced predictive analytics'
    ],
    highlight: false
  },
  ENTERPRISE: { 
    name: 'Enterprise', 
    price: 1499, 
    locations: '16+ locations', 
    desc: 'Unlimited AI workforce for global Fortune 500 organizations',
    features: [
      '7,000 conversations/month',
      'All 100+ languages supported',
      'White-label deployment options',
      'Custom AI model training',
      'Dedicated cloud infrastructure',
      '24/7 premium support (SLA)',
      'Executive onboarding & training',
      'Full API access & webhooks'
    ],
    highlight: false
  },
};

const ENTERPRISE_FEATURES = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Enterprise-Grade Security',
    desc: 'SOC 2-Aligned, HIPAA ready, AES-256-GCM encryption, row-level security, and comprehensive audit logging'
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: '8-Division AI Workforce',
    desc: 'Email operations, customer acquisition, technical ops, financial ops, analytics, HR, legal, and customer success'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Self-Healing Infrastructure',
    desc: 'Autonomous incident detection and resolution with reinforcement learning that continuously improves'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Scale',
    desc: 'Support 100+ languages, multi-region deployment, localized compliance (GDPR, CCPA, TCPA)'
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: 'Supreme AI Commander',
    desc: 'Central orchestration layer managing all 8 divisions with mission-based execution and real-time optimization'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Predictive Analytics Engine',
    desc: 'AI-powered insights, trend detection, anomaly alerts, and actionable recommendations for executive decision-making'
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: 'Seamless Integration',
    desc: 'Native connectors for Salesforce, HubSpot, Microsoft Dynamics, Bland.AI, OpenAI, Stripe, and custom APIs'
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Autonomous Operations',
    desc: '24/7 unattended operations with automated lead qualification, outbound campaigns, and revenue optimization'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Compliance Ready',
    desc: 'Built-in DNC list checking, quiet hours enforcement, opt-in verification, and automated compliance logging'
  }
];

const TRUSTED_BY = [
  'Fortune 500 Financial Services',
  'Global Healthcare Networks',
  'Multi-National Retail Chains',
  'Enterprise Technology Leaders'
];

export default function EnterpriseLandingPage() {
  const [locations, setLocations] = useState(50);
  const [isAnnual, setIsAnnual] = useState(true);

  const calculatePrice = () => {
    let base = 199;
    let discount = 0;
    if (locations >= 16) { base = 1499; discount = 0.20; }
    else if (locations >= 6) { base = 799; discount = 0.15; }
    else if (locations >= 2) { base = 399; discount = 0.10; }
    
    const monthly = base * locations * (1 - discount);
    return isAnnual ? monthly * 0.8 : monthly;
  };

  const getTierForLocations = () => {
    if (locations >= 16) return TIERS.ENTERPRISE;
    if (locations >= 6) return TIERS.GROWTH;
    if (locations >= 2) return TIERS.PROFESSIONAL;
    return TIERS.STARTER;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-semibold">
        Trusted by Fortune 500 companies • 8-Division autonomous AI workforce platform
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 px-8 mb-20 shadow-2xl border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.1),transparent_50%)]" />
          
          <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-bold">Enterprise AI Revenue Workforce Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Transform Revenue Operations
              </span>
              <br />
              <span className="text-blue-400">at Enterprise Scale</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Deploy 8-division AI workforce with autonomous receptionist, outbound campaigns achieving 84% conversion, and self-healing infrastructure. Trusted by Fortune 500 companies for mission-critical revenue operations.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5 mb-12">
              <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-900/50 hover:shadow-blue-900/70 hover:scale-105 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Request Enterprise Demo
              </Link>
              <Link href="/demo" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg transition-all border border-white/20 hover:border-white/40">
                View Case Studies
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 border-t border-slate-800 pt-8 mt-8">
              {TRUSTED_BY.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE FEATURES */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-white">
              Built for Enterprise Requirements
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Security, scalability, and autonomous operations designed for the world's most demanding organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ENTERPRISE_FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-900/20 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-2xl mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ENTERPRISE CALCULATOR */}
        <section className="mb-20">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-black mb-6 text-white">
              Enterprise Pricing Calculator
            </h2>
            <p className="text-xl text-slate-400">
              Flexible pricing that scales with your organization. Volume discounts up to 20%.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-2xl text-white mb-2">Calculate Your Investment</h3>
                <p className="text-slate-400">Customize pricing for your organization's needs</p>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className={`text-sm ${!isAnnual ? 'font-bold text-blue-400' : 'text-slate-500'}`}>Monthly</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`w-16 h-8 rounded-full relative transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isAnnual ? 'left-9' : 'left-1'}`} />
                </button>
                <span className={`text-sm ${isAnnual ? 'font-bold text-blue-400' : 'text-slate-500'}`}>
                  Annual <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">-20%</span>
                </span>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between mb-6">
                <div>
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Number of Locations
                  </label>
                  <p className="text-sm text-slate-500 mt-1">{getTierForLocations().locations} • {getTierForLocations().name} Tier</p>
                </div>
                <div className="text-right">
                  <span className="text-6xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{locations}</span>
                  <p className="text-sm text-slate-500 mt-1">locations</p>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="500" 
                value={locations} 
                onChange={(e) => setLocations(parseInt(e.target.value))}
                className="w-full h-4 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${(locations/500)*100}%, rgb(51 65 85) ${(locations/500)*100}%, rgb(51 65 85) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-3">
                <span>1</span>
                <span>100</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-slate-700">
              <div className="text-center md:text-left">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                  Selected Plan
                </p>
                <p className="text-3xl font-black text-white">{getTierForLocations().name}</p>
                <p className="text-sm text-blue-400 mt-1">Enterprise-grade features</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                  {isAnnual ? 'Annual' : 'Monthly'} Investment
                </p>
                <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  ${Math.round(calculatePrice()).toLocaleString()}
                  <span className="text-lg text-slate-400 font-normal">/mo</span>
                </p>
                {isAnnual && <p className="text-sm text-green-400 mt-2">Saving ${Math.round(calculatePrice() * 0.25 * 12).toLocaleString()}/year</p>}
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
                  Cost Per Location
                </p>
                <p className="text-3xl font-bold text-white">
                  ${Math.round(calculatePrice() / locations).toLocaleString()}
                  <span className="text-sm text-slate-400 font-normal">/mo</span>
                </p>
                <p className="text-sm text-slate-400 mt-2">All features included</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-2xl p-6 text-center">
              <p className="text-blue-300 font-semibold mb-3 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Enterprise customers save an average of $2.4M annually in operational costs
              </p>
              <Link href="/demo" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all">
                Schedule Enterprise Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-4">Choose Your Enterprise Plan</h2>
            <p className="text-xl text-slate-400">Flexible plans designed for organizations of all sizes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(TIERS).map(([key, tier]) => (
              <div 
                key={key} 
                className={`p-8 rounded-3xl border flex flex-col transition-all hover:scale-105 ${
                  tier.highlight 
                    ? 'border-blue-500 shadow-2xl ring-4 ring-blue-600/30 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900' 
                    : 'border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 hover:border-blue-600'
                }`}
              >
                {tier.highlight && (
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest self-start shadow-lg">
                    Most Popular
                  </span>
                )}
                <h4 className="text-3xl font-black mt-4 text-white">{tier.name}</h4>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-2">
                  {tier.locations}
                </p>
                <p className="text-sm text-slate-400 my-4 min-h-[3rem]">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">${tier.price}</span>
                  <span className="text-sm text-slate-500 ml-1">/mo per location</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/signup"
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg text-center ${
                    tier.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/50' 
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  Contact Sales
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ENTERPRISE CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-3xl p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10">
            <Building2 className="w-20 h-20 mx-auto mb-8 opacity-90" />
            <h2 className="text-5xl font-black mb-6">Ready for Enterprise Transformation?</h2>
            <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join Fortune 500 companies using our 8-division AI workforce to deliver exceptional experiences at global scale
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/signup" className="bg-white text-blue-600 px-12 py-6 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105">
                Schedule Enterprise Demo →
              </Link>
              <Link href="/demo" className="bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white/20 transition-all border-2 border-white/30">
                Download Case Studies
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>SOC 2-Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>HIPAA Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>99.99% Uptime SLA</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
