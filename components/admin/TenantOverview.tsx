'use client';
import { impersonateTenant } from '@/lib/admin-actions';
import { BuildingOfficeIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function TenantOverview({ tenants }: { tenants: any[] }) {
  const handleImpersonate = async (ownerId: string) => {
    try {
      const loginUrl = await impersonateTenant(ownerId);
      window.location.href = loginUrl; // Redirect to the tenant's view
    } catch (error) {
      alert("Failed to generate access link.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tenants.map((tenant) => (
        <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xs font-bold uppercase px-2 py-1 bg-green-100 text-green-700 rounded">
              {tenant.plan}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">{tenant.name}</h3>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly Revenue:</span>
              <span className="font-medium">${tenant.mrr}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Agents:</span>
              <span className="font-medium">{tenant.agentCount}</span>
            </div>
          </div>

          <button
            onClick={() => handleImpersonate(tenant.owner_id)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Login as Tenant
          </button>
        </div>
      ))}
    </div>
  );
}
