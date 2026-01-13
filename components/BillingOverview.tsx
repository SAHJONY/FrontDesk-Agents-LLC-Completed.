import React from 'react';

const TIERS = [
  { name: 'Basic', price: '$199', features: 'Standard Workforce' },
  { name: 'Professional', price: '$399', features: 'Advanced Analytics' },
  { name: 'Growth', price: '$799', features: 'Multi-Market Support' },
  { name: 'Elite', price: '$1,499', features: 'Full Agentic Access' }
];

export const BillingOverview = ({ currentTier }: { currentTier: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-4">Your Subscription</h3>
      
      {/* Current Active Plan */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-600 font-semibold uppercase">Active Plan</p>
        <p className="text-2xl font-bold">{currentTier}</p>
        <p className="text-gray-600">
          {TIERS.find(t => t.name === currentTier)?.price || '$0'} / month
        </p>
      </div>

      {/* Permanent Tier Reference */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Platform Tiers</h4>
        <div className="grid grid-cols-2 gap-2">
          {TIERS.map((tier) => (
            <div key={tier.name} className="p-2 border rounded text-center">
              <p className="text-xs font-bold">{tier.name}</p>
              <p className="text-sm text-gray-700">{tier.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
