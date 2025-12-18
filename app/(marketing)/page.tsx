"use client"; // ✅ Add this at the very top

import React from 'react';
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';

// Force dynamic rendering to bypass the Next.js Invariant bug
export const dynamic = 'force-dynamic'; 

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-[#0a1929]/70 rounded-xl border border-gray-800 shadow-2xl transition-all duration-300 hover:border-cyan-600 hover:shadow-cyan-900/50">
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] selection:bg-cyan-500/30">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white mb-6">
            FrontDesk Agents LLC
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            The next generation of AI-powered front desk operations. 
            Reliable, efficient, and always online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={RocketLaunchIcon}
            title="Fast Deployment"
            description="Launch your AI agents in minutes, not days."
          />
          <FeatureCard 
            icon={CpuChipIcon}
            title="Neural Processing"
            description="Powered by SARA and ALEX for natural conversations."
          />
          <FeatureCard 
            icon={ShieldCheckIcon}
            title="Enterprise Security"
            description="Bank-grade encryption for all your business data."
          />
          <FeatureCard 
            icon={ChatBubbleLeftRightIcon}
            title="Omnichannel"
            description="Interact with clients via voice, SMS, and web."
          />
        </div>
      </div>
    </div>
  );
}
