"use client";

import React from 'react';
import { HeroSectionEnhanced } from '@/components/landing/HeroSectionEnhanced';
import { FeaturesSection, TestimonialsSection, CTASection } from '@/components/landing';

export default function LandingPage() {
  return (
    <main className="bg-black text-white">
      <HeroSectionEnhanced />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
// Force rebuild Wed Jan  7 00:14:39 EST 2026
