'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhoneIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export default function PremiumHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0097a7]">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <SparklesIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-white">AI-Powered Reception</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Front Desk
              </span>
              <br />
              <span className="text-white">With AI Agents</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Meet Sara - Your 24/7 AI receptionist that handles calls, schedules appointments, 
              and delivers exceptional customer service with human-like conversation.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {['24/7 Availability', 'Multi-language', 'HIPAA Compliant', 'No Setup Fee'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  Call Sara Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <a 
                href="tel:+12164804413" 
                className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 text-center"
              >
                +1 (216) 480-4413
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-sm text-gray-400">Calls Handled</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl rounded-full transform scale-110" />
              
              {/* Main Hero Image Container */}
              <div className="relative group">
                {/* Glass Card Container */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Image */}
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/hero-receptionist.jpg"
                      alt="Professional AI Receptionist Sara"
                      fill
                      className="object-cover"
                      priority
                      onError={(e) => {
                        // Fallback gradient if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.style.background = 
                          'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)';
                      }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Call Indicator */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-md rounded-full shadow-lg animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      <span className="text-sm font-medium text-white">Live Now</span>
                    </div>

                    {/* Bottom Info Card */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <SparklesIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Sara - AI Agent</div>
                          <div className="text-sm text-gray-300">Ready to assist</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-4 top-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -left-4 bottom-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
