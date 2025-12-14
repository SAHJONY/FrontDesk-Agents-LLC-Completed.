// ./app/page.tsx

import React from 'react';
import { SparklesIcon, PhoneArrowUpRightIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Use a mock image path for the cinematic visual
const CINEMATIC_VISUAL_PATH = '/sara-ai-cinematic.png'; 
// NOTE: This image file must exist in your /public directory for Vercel deployment to succeed if used with next/image. 
// For now, it is used as a standard <img> tag for styling purposes.

// --- Feature Card Component ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-6 md:p-8 flex flex-col items-start h-full">
    <div className="p-3 mb-4 rounded-full bg-[var(--color-primary)] text-[var(--color-navy-dark)] shadow-premium-md">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-300 flex-grow">{description}</p>
  </div>
);

// --- Main Page Component ---

export default function LandingPage() {
  return (
    <div className="landing-page min-h-screen">

      {/* 1. Hero Section: Cinematic & High-Impact */}
      <section className="section-premium relative pt-40 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden">
        
        {/* Particle/Abstract Background (Implemented via .section-premium::before in globals.css) */}
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          
          <h1 className="max-w-4xl mx-auto mb-6 leading-tight">
            SARA AI: Your Path to <span className="text-white bg-clip-text text-fill-transparent">Más Ingresos</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light">
            FrontDesk Agents provides Fortune 500-level AI Automation to handle every call, 
            24/7, turning missed opportunities into confirmed revenue.
          </p>
          
          <div className="flex justify-center space-x-6">
            <Link href="/signup">
              <button className="btn-premium">
                Start 7-Day Free Trial
              </button>
            </Link>
            <Link href="/login">
                <button className="bg-transparent border border-[var(--color-primary)] text-white font-semibold py-4 px-12 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-navy-dark)] transition-colors duration-300 shadow-premium-md">
                    Client Login
                </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Section: Glass Cards */}
      <section className="py-24 bg-[var(--color-navy-light)]">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-center mb-16 text-white">
            Transforming Customer Interactions
          </h2>
          <div className="premium-grid">
            <FeatureCard 
              icon={SparklesIcon}
              title="Hyper-Realistic AI Agents"
              description="Deploy SARA, an AI agent trained on billions of data points to sound indistinguishable from a human, ensuring seamless customer service and sales."
            />
            <FeatureCard 
              icon={PhoneArrowUpRightIcon}
              title="24/7 Missed Call Recovery"
              description="Never miss another lead. SARA handles every incoming call, qualify leads, and books appointments, even outside business hours."
            />
            <FeatureCard 
              icon={ChartBarIcon}
              title="Instant Revenue Tracking"
              description="See real-time data on lead conversion, appointment bookings, and estimated revenue generation directly in your command center dashboard."
            />
          </div>
        </div>
      </section>

      {/* 3. Call-to-Action / Cinematic Image */}
      <section className="py-24 bg-[var(--color-navy-dark)]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="mb-6">
                Ready to Experience the Future of Your Front Desk?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Stop paying salaries and start generating profits. SARA AI scales your operations 
                instantly without the overhead.
              </p>
              <Link href="/signup">
                <button className="btn-premium flex items-center">
                  Unlock Your Free Trial <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 cinematic-image floating">
                <img 
                    src={CINEMATIC_VISUAL_PATH} 
                    alt="Cinematic SARA AI interface" 
                    className="w-full h-auto"
                />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Placeholder (Optional) */}
      <footer className="py-8 border-t border-[var(--color-navy-light)] text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved. 
          <Link href="/legal/privacy" className="text-[var(--color-primary)] hover:underline ml-3">Privacy</Link>
          <Link href="/legal/terms" className="text-[var(--color-primary)] hover:underline ml-3">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
