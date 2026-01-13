"use client";

import React from 'react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-black overflow-hidden">
      {/* Animated Background - scaled for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge - mobile optimized */}
        <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 sm:mb-8">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-cyan-400">Start Your Free Trial Today</span>
        </div>
        
        {/* Heading - responsive text sizes */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Front Office Operations?
          </span>
        </h2>
        
        {/* Description - responsive text */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Join 1000+ businesses already using FrontDesk Agents to automate their customer interactions 
          and drive revenue growth. No credit card required.
        </p>
        
        {/* CTA Buttons - mobile-first with touch-friendly sizes */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-10 md:mb-12 px-4">
          <Link
            href="/signup"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:from-cyan-700 active:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 min-h-[48px] flex items-center justify-center text-base sm:text-lg"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-bold rounded-lg transition-all border border-white/10 min-h-[48px] flex items-center justify-center text-base sm:text-lg"
          >
            Schedule Demo
          </Link>
        </div>
        
        {/* Trust Indicators - mobile-friendly stacking */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm text-zinc-500 px-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
        
        {/* Bottom Border */}
        <div className="mt-10 sm:mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}

export default CTASection;
