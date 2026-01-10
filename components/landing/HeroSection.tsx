"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />
      
      {/* Floating orbs - adjusted for mobile */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
        {/* Badge - mobile optimized */}
        <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 sm:mb-8">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-cyan-400">AI-Powered Revenue Workforce</span>
        </div>
        
        {/* Main heading - responsive text sizes */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-2">
          Transform Your Front Office
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            With AI Agents
          </span>
        </h1>
        
        {/* Subheading - responsive text sizes */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          24/7 autonomous infrastructure for lead qualification, customer service, 
          and revenue operations. Serving global markets locally.
        </p>
        
        {/* CTA Buttons - mobile optimized with touch-friendly sizes */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 px-4">
          <Link
            href="/signup"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-bold rounded-lg transition-all border border-white/10 text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg"
          >
            Watch Demo
          </Link>
        </div>
        
        {/* Stats - mobile optimized grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
          {[
            { value: '99.9%', label: 'Uptime' },
            { value: '50+', label: 'Languages' },
            { value: '24/7', label: 'Availability' },
            { value: '1000+', label: 'Businesses' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-400 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Hero Image - mobile optimized */}
        <div className="mt-8 sm:mt-12 md:mt-16 relative px-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="relative w-full aspect-video sm:aspect-[2/1] overflow-hidden rounded-lg sm:rounded-2xl shadow-2xl border border-white/10">
            <Image
              src="/images/premium/home-hero.jpg"
              alt="AI Call Center"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
