// app/cases/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Data for the Case Studies
const caseStudies = [
  {
    id: 1,
    client: "Global Logistics Corp",
    headline: "Reduced Call Wait Times by 60%, Saving $120K Annually in Staffing Costs.",
    challenge: "High call volume spikes during peak hours led to long hold times (avg. 4 min) and excessive agent burnout, requiring massive overtime spend.",
    solution: "Deployed 50 AI agents to handle Level 1 support (tracking, address changes) 24/7, escalating only complex issues to human staff.",
    results: [
      { metric: "60%", label: "Reduction in Call Wait Time", icon: ClockIcon },
      { metric: "$120K", label: "Annualized Cost Savings", icon: ChartBarIcon },
      { metric: "92%", label: "L1 Issue Resolution by AI", icon: SparklesIcon },
    ]
  },
  {
    id: 2,
    client: "Apex Hotel Management Group",
    headline: "Improved Lead Qualification by 45%, Boosting Sales Team Efficiency.",
    challenge: "Inbound calls often reached sales staff without proper qualification, wasting valuable time on non-revenue-generating queries (e.g., general inquiries, directions).",
    solution: "Implemented AI agents trained exclusively on sales qualification scripts to verify budget, timeline, and need before routing to a human representative.",
    results: [
      { metric: "45%", label: "Increase in Qualified Leads", icon: SparklesIcon },
      { metric: "87%", label: "Accuracy in Intent Matching", icon: ChartBarIcon },
      { metric: "24/7", label: "Consistent Lead Capture", icon: ClockIcon },
    ]
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Header Banner */}
      <div className="relative mb-16 h-[300px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <Image
              // NOTE: Use a professional, success-focused image here (e.g., handshake-bg.jpg)
              src="/images/case-studies-bg.jpg" 
              alt="Successful business handshake with city background"
              layout="fill"
              objectFit="cover"
              quality={80}
              className="brightness-[0.35] contrast-[1.1]" 
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
              <p className="text-primary-300 text-lg uppercase tracking-widest mb-2">
                Proven Results
              </p>
              <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                  Measurable ROI. Unquestionable Success.
              </h1>
          </div>
      </div>

      {/* 2. Case Studies Grid */}
      <div className="max-w-7xl mx-auto space-y-20">
        
        {caseStudies.map((study) => (
          <div key={study.id} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start bg-white p-8 rounded-xl shadow-premium border border-gray-100">
            
            {/* Left Column: Metrics and Results */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Client: {study.client}</h3>
                
                <div className="space-y-4">
                  {study.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <result.icon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                        <div>
                          <p className="text-3xl font-extrabold text-gray-900">{result.metric}</p>
                          <p className="text-sm font-medium text-gray-600">{result.label}</p>
                        </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Right Column: Narrative and Solution */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{study.headline}</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-1">The Challenge</h3>
              <p className="text-gray-700 text-lg mb-6">{study.challenge}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-1">The Solution</h3>
              <p className="text-gray-700 text-lg mb-8">{study.solution}</p>
              
              <Link href="/contact-sales" className="btn-primary-premium">
                Achieve Similar Results
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* 3. Final CTA for New Cases */}
      <div className="max-w-4xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">
              Ready to Define Your Success Story?
          </h2>
          <p className="mt-3 text-xl text-gray-600 mb-6">
              Contact us today to begin your tailored deployment plan.
          </p>
          <Link href="/contact-sales" className="btn-primary-premium">
              Book a Strategic Consultation
          </Link>
      </div>
    </div>
  );
}
