"use client";

import React from 'react';
import { HeroSection, FeaturesSection, TestimonialsSection, CTASection } from '@/components/landing';

export default function LandingPage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
