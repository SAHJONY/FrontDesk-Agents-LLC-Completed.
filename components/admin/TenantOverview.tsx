'use client';

import { useState } from 'react';
// IMPORT FROM THE NEW SERVER ACTIONS FILE
import { impersonateTenant } from '@/lib/admin-server-actions';
import { 
  MagnifyingGlassIcon, 
  CurrencyDollarIcon, 
  CpuChipIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

export default function TenantOverview({ initialData }: { initialData: any }) {
  const [search, setSearch] = useState('');
  const { tenants, stats } = initialData;

  const filteredTenants = tenants.filter((t: any) => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* --- STATS RIBBON --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Platform MRR" 
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.totalMrr)} 
          icon={<CurrencyDollarIcon className="h-6 w-6 text-green-600"/>} 
          color="bg-green-50" 
        />
        <StatCard title="Total AI Agents" value={stats.totalAgents} icon={<CpuChipIcon className="h-6 w-6 text-blue-600"/>} color="bg-blue-50" />
        <StatCard title="Active Tenants" value={tenants.length} icon={<UsersIcon className="h-6 w-6 text-purple-600"/>} color="bg-purple-50" />
      </div>

      {/* --- SEARCH --- */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tenants..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* --- TENANT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant: any) => (
          <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{tenant.name}</h3>
                <span className="px-2 py-1 bg-gray-100 text-xs font-semibold rounded text-gray-600">
                  ID: {tenant.id.slice(0, 8)}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Owner ID: {tenant.owner_id}</p>
                <p>Created: {new Date(tenant.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            
            <button 
              onClick={() => impersonateTenant(tenant.owner_id)} 
              className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Enter Dashboard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className={`${color} p-6 rounded-2xl border border-gray-100 flex items-center gap-4`}>
      <div className="bg-white p-3 rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
