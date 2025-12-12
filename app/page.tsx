// app/page.tsx or components/HeroSection.tsx

import React from 'react';
import Image from 'next/image'; // Assuming you implement Next.js Image component for 4K optimization

export default function HomePage() {
  // Define the path to your high-resolution cinematic corporate image
  const heroImageSrc = "/images/cinematic-corporate-hero.jpg"; 

  return (
    <main>
      <section className="relative h-[600px] md:h-[750px] overflow-hidden">
        {/* 1. CINEMATIC BACKGROUND IMAGE (Must be 4K and Professional) */}
        <div className="absolute inset-0">
          <Image
            src={heroImageSrc}
            alt="Cinematic corporate setting showing data visualization and efficient operations"
            layout="fill"
            objectFit="cover"
            priority // Load first for immediate impact
            className="filter brightness-50" // Dim the image for text contrast
          />
        </div>

        {/* 2. OVERLAY AND TEXT CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-4xl pt-20 pb-16">
            
            {/* The small header text (previously "Hero cinematic") is now professional/corporate */}
            <p className="text-base font-semibold uppercase tracking-widest text-primary-300 mb-2">
              The Future of Front Desk
            </p>

            {/* COMMANDING H1 TITLE */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
              Seamlessly <span className="text-primary-400">Integrate,</span> Never Miss a Lead.
            </h1>

            {/* SUB-HEADER (Body Text: Larger, Relaxed) */}
            <p className="mt-6 text-xl text-gray-200 leading-relaxed max-w-2xl">
              Our advanced AI agents handle every call, inquiry, and booking with human-level intelligence, 24/7.
            </p>

            {/* 3. PREMIUM CALL-TO-ACTION BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* PRIMARY CTA: Using the premium primary button style */}
              <a href="/demo" className="btn-primary-premium">
                Book a Strategic Consultation
              </a>
              
              {/* SECONDARY CTA: Using the premium secondary button style (Inverted for dark background) */}
              {/* NOTE: If your secondary button is not defined to handle dark backgrounds, 
                 you might need to adjust the btn-secondary-premium definition in globals.css 
                 or use specific dark-mode classes here. */}
              <a href="/pricing" className="btn-secondary-premium bg-transparent text-white border-white hover:bg-white/10">
                View Plans and Pricing
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Placeholder for the rest of your application content (Features, Analytics, etc.) */}
    </main>
  );
}

// NOTE: This assumes you have an 'images' folder in your 'public' directory
// and have added a high-quality image named 'cinematic-corporate-hero.jpg'.
