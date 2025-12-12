// app/page.tsx or components/HeroSection.tsx

import React from 'react';
import Image from 'next/image'; 

export default function HomePage() {
  // Define the path to your high-resolution cinematic corporate image
  const heroImageSrc = "/images/cinematic-corporate-hero.jpg"; 

  return (
    // CRITICAL FIX: Added bg-primary-900 (deep dark blue) to ensure 
    // the cinematic contrast is always present, even without the image.
    <main>
      <section className="relative h-[600px] md:h-[750px] overflow-hidden bg-primary-900">
        
        {/* 1. CINEMATIC BACKGROUND IMAGE (Must be 4K and Professional) */}
        <div className="absolute inset-0">
          <Image
            src={heroImageSrc}
            alt="Cinematic corporate setting showing data visualization and efficient operations"
            layout="fill"
            objectFit="cover"
            priority 
            className="filter brightness-[0.25] opacity-50" // Make image darker and slightly transparent for contrast
          />
        </div>

        {/* 2. OVERLAY AND TEXT CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* FIX: Changed text color to white for contrast on dark background */}
          <div className="text-white max-w-4xl pt-20 pb-16">
            
            {/* The small header text */}
            <p className="text-base font-semibold uppercase tracking-widest text-primary-300 mb-2">
              THE FUTURE OF FRONT DESK
            </p>

            {/* COMMANDING H1 TITLE */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
              Seamlessly <span className="text-primary-400">Integrate,</span> Never Miss a Lead.
            </h1>

            {/* SUB-HEADER (Body Text: Lighter gray for better visibility) */}
            <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl">
              Our advanced AI agents handle every call, inquiry, and booking with human-level intelligence, 24/7.
            </p>

            {/* 3. PREMIUM CALL-TO-ACTION BUTTONS (Buttons are fine, they use the defined utility classes) */}
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/demo" className="btn-primary-premium">
                Book a Strategic Consultation
              </a>
              
              {/* Secondary CTA: Adjusted styling for dark mode consistency */}
              <a href="/pricing" className="btn-secondary-premium bg-transparent text-white border-white hover:bg-white/10">
                View Plans and Pricing
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Rest of the application content */}
    </main>
  );
}
