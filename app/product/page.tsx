// app/product/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    BoltIcon, 
    CpuChipIcon, 
    GlobeAltIcon, 
    RocketLaunchIcon, 
    // FIX APPLIED HERE: Added missing CheckCircleIcon
    CheckCircleIcon 
} from '@heroicons/react/24/outline';

// Data for the Core Technology Pillars
const technologyPillars = [
// ... (rest of technologyPillars data remains the same) ...
];

export default function ProductPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Header Banner */}
// ... (header section remains the same) ...

      {/* 2. Core Technology Pillars */}
// ... (pillars section remains the same) ...

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
                          {/* CheckCircleIcon is now imported */}
                          <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>Dynamic Scripting based on CRM data lookup.</span>
                      </li>
                      <li className="flex items-start">
                          {/* CheckCircleIcon is now imported */}
                          <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>Advanced objection handling and negotiation.</span>
                      </li>
                      <li className="flex items-start">
                          {/* CheckCircleIcon is now imported */}
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
// ... (CTA section remains the same) ...
    </div>
  );
}
