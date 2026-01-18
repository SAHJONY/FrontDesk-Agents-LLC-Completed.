import React from 'react';
import { BuildingOfficeIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface Tenant {
  id: string;
  name: string;
  plan: string;
  mrr: number;
  agentCount: number;
}

const TenantOverview = ({ tenants }: { tenants: Tenant[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <div key={tenant.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{tenant.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{tenant.plan} Plan</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <UsersIcon className="h-4 w-4 mr-1" />
                {tenant.agentCount} Agents
              </div>
              <div className="flex items-center font-medium text-green-600">
                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                ${tenant.mrr}/mo
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantOverview;
