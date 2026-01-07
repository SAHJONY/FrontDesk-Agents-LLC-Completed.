'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { HeroSectionEnhanced } from '@/components/landing/HeroSectionEnhanced';
import { FeaturesSection, TestimonialsSection, CTASection } from '@/components/landing';

/**
 * Landing Page Component
 * 
 * Main homepage for FrontDesk Agents platform
 * Showcases AI-powered front office automation capabilities
 */
export default function LandingPage() {
  return (
    <>
      {/* Navigation Bar */}
      <Navigation />
      
      {/* Main Content */}
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section - Above the fold content */}
        <HeroSectionEnhanced />
        
        {/* Features Section - Core platform capabilities */}
        <FeaturesSection />
        
        {/* Testimonials Section - Social proof and customer success stories */}
        <TestimonialsSection />
        
        {/* Call-to-Action Section - Conversion-focused final section */}
        <CTASection />
      </main>
      
      {/* Footer - Legal links and company information */}
      <Footer />
    </>
  );
}
