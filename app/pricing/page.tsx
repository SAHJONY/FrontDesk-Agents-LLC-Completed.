'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  Globe,
} from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 199,
    mins: 300,
    description: 'Essential autonomous intake for solo operators.',
    overage: '$0.45/min',
    featured: false,
    cta: 'Activate Node',
  },
  {
    name: 'Professional',
    price: 399,
    mins: 1200,
    description: 'Advanced fleet with priority routing and 50+ languages.',
    overage: '$0.40/min',
    featured: true,
    cta: 'Scale Fleet',
  },
  {
    name: 'Growth',
    price: 799,
    mins: 3000,
    description: 'Multi-location cluster with custom voice cloning.',
    overage: '$0.35/min',
    featured: false,
    cta: 'Establish Cluster',
  },
  {
    name: 'Enterprise',
    price: 1499,
    mins: 7000,
    description: 'Infinite scale with performance royalties (Sec. 3).',
    overage: '$0.30/min',
    featured: false,
    cta: 'Consult Sovereignty',
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const isOverLimit = searchParams.get('reason') === 'usage_limit';

  return (
    <div className="relative min-h-screen bg-brand-ink text-white py-24 px-6 selection:bg-brand-gold/30 overflow-hidden">
      {/* 8K Hero Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/8k/hero-team-8k.jpg"
          alt="FrontDesk Agents — diverse professional team in a modern office"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1920px"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/70 to-brand-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_12%,rgba(212,175,55,0.16),transparent_55%)]" />
      </div>
