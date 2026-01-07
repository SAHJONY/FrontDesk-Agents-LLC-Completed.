'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { HeroSectionEnhanced } from '@/components/landing/HeroSectionEnhanced';
import { FeaturesSection, TestimonialsSection, CTASection } from '@/components/landing';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-white">
        <HeroSectionEnhanced />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
