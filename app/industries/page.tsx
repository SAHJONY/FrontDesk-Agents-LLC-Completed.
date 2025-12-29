import React from 'react';
import { Building2, Gavel, Stethoscope, Briefcase } from 'lucide-react';
import { IndustryCard } from '../../components/IndustryCard';

export default function IndustriesPage() {
  const industries = [
    { title: 'Real Estate', icon: Building2 },
    { title: 'Legal Services', icon: Gavel },
    { title: 'Healthcare', icon: Stethoscope },
    { title: 'Financial Consulting', icon: Briefcase },
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black italic mb-4 uppercase">Market Verticals</h1>
        <p className="text-brand-slate max-w-2xl mx-auto">
          Pre-trained AI nodes specialized for your industry's specific compliance and sales logic.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {industries.map((ind) => (
          <IndustryCard key={ind.title} title={ind.title} icon={ind.icon} />
        ))}
      </div>
    </div>
  );
}
