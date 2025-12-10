// app/ai-agents/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// --- Feature Data ---
const agentFeatures = [
  {
    title: 'Natural Language Processing (NLP)',
    description: 'Our agents understand context, sentiment, and complex regional dialects, ensuring conversations feel human and accurate.',
    icon: '🗣️',
  },
  {
    title: 'Seamless CRM Integration',
    description: 'Instantly log call data, update lead status, and synchronize appointments with your existing tools (Salesforce, HubSpot, etc.).',
    icon: '🔗',
  },
  {
    title: 'Custom Script Training',
    description: 'Utilize our drag-and-drop editor to train agents on your exact pricing, processes, and FAQs in minutes.',
    icon: '✍️',
  },
  {
    title: '24/7 Global Availability',
    description: 'Ensure every call is answered immediately, regardless of time zone, public holiday, or call volume spike.',
    icon: '🌎',
  },
];

// --- Component for a Single Feature Card ---
interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-green-300/50 transition duration-300 border border-gray-100">
        <div className="text-4xl text-green-600 mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// --- Main Page Component (Correctly Exported) ---
export default function AIAgentsPage() {
  const agentImageSrc = '/premium/team/agents-grid.jpg';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section - Focused on Agent Grid Image */}
      <section className="relative pt-24 pb-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="z-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-green-400 mb-2 block">
                Meet the Team
              </span>
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Your Next Generation of Front Desk Agents
              </h1>
              <p className="text-xl font-light mb-8 opacity-90">
                Our specialized AI agents are trained across multiple domains, offering human-like responsiveness with machine efficiency.
              </p>
              <Link href="/demo">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md transform hover:scale-[1.02]">
                  See Agents in Action
                </button>
              </Link>
            </div>

            {/* Image Preview (AI Agent Grid) */}
            <div className="relative z-10 shadow-2xl rounded-xl overflow-hidden transform transition duration-500 hover:shadow-green-500/80">
              <Image
                src={agentImageSrc}
                alt="AI agents grid displaying different roles"
                width={1600}
                height={900}
                className="w-full h-auto"
                sizes="(max-width: 1200px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            Intelligent Core Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agentFeatures.map((feature) => (
              <FeatureCard 
                key={feature.title} 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
