// app/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline'; // Assuming you have Heroicons installed

// Data for new sections
const features = [
  { title: "24/7 Availability", description: "Never miss a lead with round-the-clock, global coverage.", icon: CheckCircleIcon },
  { title: "Custom Workflows", description: "AI agents tailored to your exact scripting and processes.", icon: CheckCircleIcon },
  { title: "CRM Integration", description: "Seamlessly sync data with your existing systems for accurate logging.", icon: CheckCircleIcon },
];

const steps = [
  { num: 1, title: "Integrate", description: "Connect your existing phone lines or CRM APIs in minutes." },
  { num: 2, title: "Train", description: "Fine-tune AI scripts using your best historical call data." },
  { num: 3, title: "Scale", description: "Deploy instantly and scale agent capacity to meet demand." },
];

export default function HomePage() {
  return (
    <div className="relative pt-16">
      
      {/* --- 1. Cinematic Hero Section (Retained) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-primary-900 overflow-hidden">
        <Image
          // NOTE: Use your dramatic, data-focused Hero image here
          src="/images/hero-bg-cinematic.jpg" 
          alt="Business Professionals with AI Data Display"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority 
          className="brightness-[0.3] contrast-[1.1]" 
        />
        
        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center max-w-4xl p-6">
          <h1 className="text-6xl font-extrabold text-white tracking-tight sm:text-7xl lg:text-8xl">
            Seamlessly Integrate, <span className="text-primary-300">Never Miss a Lead.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            The next generation of enterprise front desk solutions—advanced AI agents handling calls, inquiries, and bookings 24/7.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/demo" className="btn-primary-premium text-lg px-8 py-3">
              Book a Strategic Consultation
            </Link>
            <Link href="/pricing" className="btn-secondary-premium text-lg px-8 py-3">
              View Plans and Pricing
            </Link>
          </div>
        </div>
      </div>
      
      {/* --- 2. Social Proof & Trust Section (NEW) --- */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </h2>
          <div className="flex justify-center items-center space-x-12 opacity-70">
            {/* Placeholder for Client Logos */}
            <span className="text-2xl font-light text-gray-400">GLOBAL CORP</span>
            <span className="text-2xl font-light text-gray-400">APEX SOLUTIONS</span>
            <span className="text-2xl font-light text-gray-400">ZENITH HOLDINGS</span>
          </div>
        </div>
      </div>
      
      {/* --- 3. Key Features Overview (NEW) --- */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              The Power of the Platform
            </h2>
            <p className="mt-3 text-xl text-gray-600">
              Technology built for scale, performance, and revenue growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card-premium bg-white p-6 text-center">
                <feature.icon className="mx-auto h-10 w-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <Link href="/product" className="mt-4 inline-block text-primary-600 hover:text-primary-800 text-sm font-medium">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 4. How It Works - 3 Step Process (NEW) --- */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Simple 3-Step Deployment
            </h2>
            <p className="mt-3 text-xl text-gray-600">
              From integration to full deployment in less than 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.num} className="text-center p-6 border-t-4 border-primary-600/50 pt-6">
                <div className="w-12 h-12 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* --- 5. Testimonial (NEW) --- */}
      <div className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl italic font-medium text-gray-300">
            &ldquo;Since deploying FrontDesk Agents, our lead qualification rate increased by 45%, allowing our human sales team to focus only on high-value interactions. It's a game-changer.&rdquo;
          </blockquote>
          <p className="mt-4 text-lg font-semibold text-primary-300">— Sarah K., VP of Operations, Zenith Holdings</p>
        </div>
      </div>
      
    </div>
  );
}
