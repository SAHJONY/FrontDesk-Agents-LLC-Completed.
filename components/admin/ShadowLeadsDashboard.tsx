import React from 'react';
import { languages } from '@/config/languages';

interface ShadowLead {
  client_id: string;
  business_name: string;
  industry: string;
  preferred_language: string;
  is_demo_mode: boolean;
  status: 'pending_outreach' | 'contacted' | 'converted';
}

export default function ShadowLeadsDashboard({ leads }: { leads: ShadowLead[] }) {
  return (
    <div className="overflow-x-auto p-6 bg-white rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 font-semibold text-gray-600">Business</th>
            <th className="pb-4 font-semibold text-gray-600">Industry</th>
            <th className="pb-4 font-semibold text-gray-600">Language</th>
            <th className="pb-4 font-semibold text-gray-600">Autonomy Status</th>
            <th className="pb-4 font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.client_id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 font-medium">{lead.business_name}</td>
              <td className="py-4 text-gray-500">{lead.industry}</td>
              <td className="py-4">
                {languages.find(l => l.code === lead.preferred_language)?.flag} {lead.preferred_language.toUpperCase()}
              </td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lead.is_demo_mode ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {lead.is_demo_mode ? 'Demo Pre-Configured' : 'Live Production'}
                </span>
              </td>
              <td className="py-4">
                <button className="text-blue-600 hover:underline font-medium">
                  Copy Demo Link
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
