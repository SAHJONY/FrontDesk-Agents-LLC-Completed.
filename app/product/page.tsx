// app/product/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BoltIcon, CpuChipIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// Data for the Core Technology Pillars
const technologyPillars = [
  { 
    title: "Ultra HD Voice Synthesis", 
    description: "Proprietary voice models eliminate robotic sound, ensuring human-level quality and natural conversational flow for superior customer experience.", 
    icon: GlobeAltIcon,
    bg: "bg-red-500/10 text-red-600"
  },
  { 
    title: "Real-Time Adaptability", 
    description: "Our agents process intent and sentiment in under 50ms, adapting the script and tone instantly to mimic best-in-class human performance.", 
    icon: BoltIcon,
    bg: "bg-blue-500/10 text-blue-600"
  },
  { 
    title: "Enterprise CRM Interfacing", 
    description: "Dedicated, secure APIs ensure bi-directional data flow with all major CRM and booking systems, logging interactions instantly and accurately.", 
    icon: CpuChipIcon,
    bg: "bg-green-500/10 text-green-600"
  },
  { 
    title: "Scalable Deployment Matrix", 
    description: "Instantly adjust agent capacity from 10 to 10,000 active lines without infrastructure delays or service degradation.", 
    icon: RocketLaunchIcon,
    bg: "bg-yellow-500/10 text-yellow-600"
  },
];

export default function ProductPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Header Banner */}
      <div className="relative mb-16 h-[300px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <Image
              // NOTE: Use a complex, data-centric image to convey advanced technology
              src="/images/tech-features-bg.jpg" 
              alt="Holographic data visualization showing AI network"
              layout="fill"
              objectFit="cover"
              quality={80}
              className="brightness-[0.35] contrast-[1.1]" 
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
              <p className="text-primary-300 text-lg uppercase tracking-widest mb-2">
                The Technology Advantage
              </p>
              <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                  Intelligent Agents. Unrivaled Performance.
              </h1>
          </div>
      </div>

      {/* 2. Core Technology Pillars */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
                Pillars of Enterprise AI
            </h2>
            <p className="mt-3 text-xl text-gray-600">
                Four core innovations that set our AI agents apart from legacy solutions.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologyPillars.map((pillar) => (
                <div key={pillar.title} className="card-premium bg-white p-6 h-full">
                    <div className={`w-12 h-12 rounded-lg ${pillar.bg} flex items-center justify-center mb-4`}>
                        <pillar.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                    <p className="text-gray-600">{pillar.description}</p>
                </div>
            ))}
        </div>
      </div>

      {/* 3. Deep Dive Feature Section (How It Works) */}
      <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Image/Diagram Placeholder */}
              <div className="h-96 relative bg-gray-100 rounded-xl shadow-inner overflow-hidden">
                  <Image
                    src="/images/workflow-diagram.png"
                    alt="Custom Workflow Diagram"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-lg font-semibold">
                      [Diagram Placeholder: Custom Workflow Logic]
                  </div>
              </div>

              {/* Text Content */}
              <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                      Custom Workflows: Intelligence That Learns Your Business
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                      Unlike static chatbots, our agents are trained on your actual documentation, pricing sheets, and historical call patterns. This enables them to manage complex, multi-step inquiries—from booking and payment processing to detailed technical support—all autonomously.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                          <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>Dynamic Scripting based on CRM data lookup.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>Advanced objection handling and negotiation.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>Secure data transfer and compliance logging.</span>
                      </li>
                  </ul>
                  <Link href="/demo" className="mt-8 inline-block btn-primary-premium">
                      See The Intelligence Live
                  </Link>
              </div>
          </div>
      </div>
      
      {/* 4. Final CTA Section */}
      <div className="max-w-7xl mx-auto text-center bg-primary-700 p-12 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">
              Ready to See Unrivaled Performance?
          </h2>
          <p className="mt-3 text-xl text-primary-200">
              Schedule a strategic consultation to discover the ROI of true enterprise AI.
          </p>
          <Link href="/contact-sales" className="mt-6 inline-block btn-secondary-premium border-white text-white hover:bg-white/10">
              Connect With An Expert
          </Link>
      </div>
    </div>
  );
}
