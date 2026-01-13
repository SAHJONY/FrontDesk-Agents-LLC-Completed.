"use client";

import React from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: PhoneIcon,
    title: 'AI Voice Agents',
    description: 'Natural-sounding AI agents that handle calls 24/7 with human-like conversations.',
    color: 'cyan',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Smart Messaging',
    description: 'Automated SMS and chat responses that qualify leads and book appointments.',
    color: 'blue',
  },
  {
    icon: ChartBarIcon,
    title: 'Real-time Analytics',
    description: 'Comprehensive dashboards with live metrics and performance insights.',
    color: 'purple',
  },
  {
    icon: GlobeAltIcon,
    title: 'Multi-Language',
    description: 'Support for 50+ languages with automatic translation and localization.',
    color: 'green',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'SOC 2-aligned security practices with encryption in transit and at rest, plus role-based access control.',
    color: 'red',
  },
  {
    icon: BoltIcon,
    title: 'Lightning Fast',
    description: 'Sub-second response times with 99.9% uptime guarantee.',
    color: 'yellow',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Revenue Operations',
    description: 'Automated billing, invoicing, and payment processing with Stripe integration.',
    color: 'emerald',
  },
  {
    icon: ClockIcon,
    title: '24/7 Availability',
    description: 'Never miss a lead with round-the-clock autonomous operations.',
    color: 'orange',
  },
];

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-500 to-cyan-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  red: 'from-red-500 to-red-600',
  yellow: 'from-yellow-500 to-yellow-600',
  emerald: 'from-emerald-500 to-emerald-600',
  orange: 'from-orange-500 to-orange-600',
};

export function FeaturesSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - mobile optimized */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 px-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {' '}Scale Your Business
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
            Powerful features designed to automate your front office and drive revenue growth.
          </p>
        </div>
        
        {/* Features Grid - mobile-first responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:scale-105 active:scale-100"
              >
                {/* Icon - touch-friendly size */}
                <div className={`inline-flex p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${colorMap[feature.color]} mb-3 sm:mb-4`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                
                {/* Content - responsive text */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA - mobile optimized */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center px-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-medium rounded-lg transition-all border border-white/10 min-h-[48px] text-sm sm:text-base"
          >
            View All Features
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
