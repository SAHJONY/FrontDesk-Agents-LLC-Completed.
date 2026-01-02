import React from 'react';
import { WholesaleDashboard } from '@/components/owner/WholesaleDashboard';

// Mock components to represent your existing platform features
const WorkforceManagement = ({ stats }: any) => <div className="p-4 bg-white shadow rounded">Workforce active: {stats?.count || 0}</div>;
const BillingOverview = ({ tier }: any) => <div className="p-4 bg-white shadow rounded">Current Plan: {tier}</div>;

export default function DashboardPage({ user, tenantData }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* GLOBAL HEADER */}
      <nav className="bg-white border-b p-4 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">FrontDesk Agents LLC</h1>
          <span className="text-sm text-gray-500">Local Market: {tenantData?.market || 'Global'}</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================== */}
        {/* SOVEREIGN GATE: Restricted to frontdeskllc@outlook.com      */}
        {/* ========================================================== */}
        {user?.email === 'frontdeskllc@outlook.com' && (
          <section className="mb-10">
             <WholesaleDashboard />
          </section>
        )}

        {/* ========================================================== */}
        {/* MULTI-TENANT SECTION: Visible to all paying customers      */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Team & Workforce</h2>
            <WorkforceManagement stats={tenantData?.stats} />
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Subscription & Tiers</h2>
            <BillingOverview tier={user?.tier || 'Basic'} />
            <p className="text-xs text-gray-400">
              Platform Tiers: Basic ($199) | Professional ($399) | Growth ($799) | Elite ($1,499)
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
