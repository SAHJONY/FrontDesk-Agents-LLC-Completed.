'use client';

import React from 'react';
import { Globe, Shield, Zap } from 'lucide-react';

interface HeroProps {
  country: string;
  city: string;
  locale: string;
}

export default function DynamicHero({ country, city, locale }: HeroProps) {
  // Logic to determine the localized "DNA" of the Hero
  const getLocalIdentity = () => {
    switch (country) {
      case 'GB':
        return {
          headline: "Britain's Sovereign",
          sub: `Securing London and the UK's elite service enterprises.`,
          node: "London-Heathrow Cluster",
          img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80" // London Skyline
        };
      case 'AE':
        return {
          headline: "The Emirates' Elite",
          sub: "Autonomous infrastructure for the modern Gulf economy.",
          node: "Dubai-Node Alpha",
          img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80" // Dubai Skyline
        };
      case 'US':
      default:
        return {
          headline: city === 'Houston' ? "Houston's Premier" : "America's Sovereign",
          sub: `Architecting autonomous defense for the ${city} business landscape.`,
          node: `${city}-Node Primary`,
          img: "/images/global-neural-mesh.png" // Our Titan Global Mesh
        };
    }
  };

  const identity = getLocalIdentity();

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* LOCALIZED BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0">
        <img 
          src={identity.img} 
          alt="Localized Node Background" 
          className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
            <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Status: {identity.node} Active
            </span>
          </div>

          <h1 className="text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            {identity.headline} <br />
            <span className="text-cyan-500 text-[11vw] lg:text-[9vw]">Neural Agent</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-[0.2em] leading-relaxed">
            {identity.sub} Deploying industrial-grade AI to secure and scale your local operations.
          </p>

          <div className="flex gap-6">
            <button className="px-12 py-6 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all">
              Initialize Local Deployment
            </button>
          </div>
        </div>
      </div>
      
      {/* LATENCY INDICATOR */}
      <div className="absolute bottom-12 right-12 text-right opacity-30">
        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Node Latency</p>
        <p className="text-xl font-mono font-bold text-cyan-500">14ms</p>
      </div>
    </section>
  );
}
