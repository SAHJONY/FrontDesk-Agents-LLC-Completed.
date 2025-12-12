// app/owner/onboarding/page.tsx
import React from 'react';
import Link from 'next/link';

// Dummy Data for Tenants in Onboarding
const onboardingTenants = [
    { id: 45, company: 'Starlight Retail Group', status: 'Awaiting Script Approval', phase: 'P3', tier: 'Enterprise' },
    { id: 46, company: 'Horizon Logistics Corp', status: 'Data Migration Failed', phase: 'P2', tier: 'Standard' },
    { id: 47, company: 'Apex Consulting GmbH', status: 'Completed Setup', phase: 'P4', tier: 'Premium' },
    { id: 48, company: 'Metro-East Healthcare', status: 'Payment Pending', phase: 'P1', tier: 'Enterprise' },
];

export default function OwnerOnboardingPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto pt-10 pb-8 relative z-10">
            <nav className="text-sm font-medium text-gray-500 mb-2">
                <Link href="/owner" className="hover:text-primary-300">Command Center</Link> / 
                <span className="text-white"> Onboarding Management</span>
            </nav>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Client Onboarding Pipeline
            </h1>
            <p className="text-gray-400 mt-1">
                Review and manually override the status of new tenant deployments.
            </p>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto pb-12 relative z-10">

            {/* Global Control Panel */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 flex justify-between items-center border border-yellow-500/50">
                <h3 className="text-xl font-bold text-white">Global Onboarding Overrides</h3>
                <button className="btn-secondary-premium px-4 py-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                    Force Sync All Deployments
                </button>
            </div>
            
            {/* Tenants in Pipeline Table */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Tenants in Pipeline</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tenant ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phase</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {onboardingTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{tenant.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-300">{tenant.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            tenant.status.includes('Approved') || tenant.status.includes('Completed') ? 'bg-green-100 text-green-800' :
                                            tenant.status.includes('Failed') ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tenant.phase}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tenant.tier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {tenant.status === 'Completed Setup' ? (
                                            <span className="text-green-500">Deployed</span>
                                        ) : (
                                            <button className="text-sm font-medium text-red-500 hover:text-red-300 transition" onClick={() => console.log(`Override for ${tenant.company}`)}>
                                                Force Complete →
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}
