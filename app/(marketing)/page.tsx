import React from 'react';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Componente de Funcionalidad Clave
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-[#0a1929]/70 rounded-xl border border-gray-800 shadow-2xl transition-all duration-300 hover:border-cyan-600 hover:shadow-cyan-900/50">
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      {/* Your page content here */}
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Marketing Page
        </h1>
        {/* Add your features, content, etc. */}
      </div>
    </div>
  );
}
