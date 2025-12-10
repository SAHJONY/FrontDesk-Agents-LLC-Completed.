// app/pricing/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getPageHero, getPremiumImage } from '@/lib/siteImages';
import React from 'react';

// --- Pricing Data (UPDATED PRICES) ---
interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
  buttonText: string;
  buttonColor: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    // UPDATED PRICE
    price: '$399',
    description: 'Essential AI automation for growing businesses with moderate call volume.',
    features: ['1 AI Agent Role', '1,000 Call Minutes/mo', 'Email & SMS Follow-up', 'Standard Script Templates', 'Basic CRM Integration'],
    isHighlighted: false,
    buttonText: 'Start Free Trial',
    buttonColor: 'bg-gray-700 hover:bg-gray-800',
  },
  {
    name: 'Professional',
    // UPDATED PRICE
    price: '$799',
    description: 'Comprehensive solution for high-volume, multi-role agent deployments.',
    features: ['3 AI Agent Roles', '5,000 Call Minutes/mo', 'Full CRM Integration', 'Custom Script Editor', 'Priority Support', 'Advanced Reporting'],
    isHighlighted: true,
    buttonText: 'Select Professional',
    buttonColor: 'bg-green-600 hover:bg-green-700',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Scalable solutions for complex operations and large contact centers.',
    features: ['Unlimited Agents', 'Dedicated High-Volume Capacity', 'SLA Guarantee', 'On-Premise Deployment Option', '24/7 Dedicated Manager', 'Custom Development'],
    isHighlighted: false,
    buttonText: 'Contact Sales',
    buttonColor: 'bg-gray-700 hover:bg-gray-800',
  },
];

// --- Component for a Single Pricing Card ---
const PricingCard: React.FC<PricingTier> = ({ name, price, description, features, isHighlighted, buttonText, buttonColor }) => (
  <div className={`flex flex-col p-8 rounded-xl shadow-2xl transition duration-500 transform hover:scale-[1.03] ${isHighlighted ? 'bg-gray-900 text-white border-2 border-green-500' : 'bg-white text-gray-900 border border-gray-200'}`}>
    <h3 className="text-3xl font-extrabold mb-2">{name}</h3>
    <p className={`text-sm mb-6 ${isHighlighted ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
    
    <div className="flex items-baseline mb-8">
      <span className={`text-5xl font-extrabold ${isHighlighted ? 'text-green-500' : 'text-gray-900'}`}>
        {price}
      </span>
      {price !== 'Custom' && (
        <span className={`ml-1 text-xl font-medium ${isHighlighted ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
      )}
    </div>
    
    <ul className="flex-grow space-y-3 mb-10">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className={`flex-shrink-0 w-6 h-6 mr-3 ${isHighlighted ? 'text-green-500' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          <span className={`${isHighlighted ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
        </li>
      ))}
    </ul>
    
    <Link href={name === 'Enterprise' ? '/contact-sales' : '/signup'} className="w-full">
      <button className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${buttonColor} text-white shadow-md`}>
        {buttonText}
      </button>
    </Link>
  </div>
);


// --- Main Page Component ---
export default function PricingPage() {
  const hero = getPageHero('pricing');
  const banner = getPremiumImage('marketingBanner'); 

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. Header with Cinematic Background */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
        </div>
        <div className="relative z-10 text-center container mx-auto px-6 max-w-4xl text-white">
            <h1 className="text-5xl font-extrabold mb-4">
                Pricing Designed for Scale and Efficiency
            </h1>
            <p className="text-xl font-light opacity-80">
                Choose the plan that fits your current needs. Upgrade instantly as your business grows.
            </p>
        </div>
      </section>

      {/* 2. Pricing Grid */}
      <section className="py-20 -mt-20 z-20 relative container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                  <PricingCard key={tier.name} {...tier} />
              ))}
          </div>
      </section>
      
      {/* 3. Contact Banner */}
      <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Need a custom solution?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                  For deployments across multiple locations or specific HIPAA/compliance needs, talk to our Enterprise team.
              </p>
              <Link href="/contact-sales">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                      Contact Sales
                  </button>
              </Link>
          </div>
      </section>
    </main>
  );
}
