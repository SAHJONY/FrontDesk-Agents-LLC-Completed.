import React from 'react';

/**
 * Enterprise Hero Component
 * Optimized for high-conversion revenue operations targeting 16+ location partners.
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Cinematic Background Layering */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-corporate.jpg')] bg-cover bg-center grayscale" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-obsidian/80 to-obsidian" 
        aria-hidden="true"
      />

      <div className="relative z-20 text-center max-w-5xl px-6">
        {/* Value Proposition Heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
          Transform Revenue Operations <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">
            at Enterprise Scale
          </span>
        </h1>

        {/* Strategic Infrastructure Description */}
        <p className="text-xl text-silver-frost mb-12 max-w-2xl mx-auto leading-relaxed">
          Deploy an 8-division AI workforce featuring autonomous receptionists, 
          outbound campaign management, and self-healing infrastructure.
        </p>

        {/* Primary Call-to-Action Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button 
            className="px-10 py-4 bg-cyber-cyan text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Access the enterprise portal"
          >
            Access Portal
          </button>
          
          <button 
            className="px-10 py-4 border border-white/20 text-white font-bold rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300"
            aria-label="Schedule a demonstration"
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
