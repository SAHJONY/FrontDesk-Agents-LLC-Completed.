// app/owner/payments/page.tsx
import React from 'react';
import Link from 'next/link';

// Dummy Data for Financial Records
const paymentRecords = [
    { id: 'TRX-10938', date: '2025-12-01', type: 'Subscription', tenant: 'InnovateCorp Solutions', amount: 18500.00, status: 'Completed' },
    { id: 'TRX-10937', date: '2025-12-01', type: 'Usage Overage', tenant: 'GlobalReach Holdings', amount: 450.75, status: 'Completed' },
    { id: 'TRX-10936', date: '2025-11-28', type: 'Refund', tenant: 'Nexus Ventures', amount: -250.00, status: 'Reversed' },
    { id: 'TRX-10935', date: '2025-11-25', type: 'Subscription', tenant: 'Apex Dynamics Inc.', amount: 12000.00, status: 'Pending' },
];

export default function OwnerPaymentsPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto pt-10 pb-8 relative z-10">
            <nav className="text-sm font-medium text-gray-500 mb-2">
                <Link href="/owner" className="hover:text-primary-300">Command Center</Link> / 
                <span className="text-white"> Payments & Billing</span>
            </nav>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Billing & Payment History
            </h1>
            <p className="text-gray-400 mt-1">
                Total financial transactions and detailed tenant payment status.
            </p>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto pb-12 relative z-10">
            
            {/* Quick Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Total Revenue */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl border-b-4 border-green-500">
                    <h3 className="text-sm font-semibold text-gray-400">YTD REVENUE</h3>
                    <p className="text-4xl font-extrabold text-green-400 mt-1">$1.84 M</p>
                    <p className="text-green-500 text-sm mt-2">Target met</p>
                </div>
                
                {/* Pending Payments */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl border-b-4 border-yellow-500">
                    <h3 className="text-sm font-semibold text-gray-400">PENDING PAYMENTS</h3>
                    <p className="text-4xl font-extrabold text-yellow-400 mt-1">4</p>
                    <p className="text-yellow-500 text-sm mt-2">Total value: $17,450</p>
                </div>

                {/* Avg Subscription Value */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl border-b-4 border-primary-500">
                    <h3 className="text-sm font-semibold text-gray-400">AVG SUB VALUE</h3>
                    <p className="text-4xl font-extrabold text-white mt-1">$4,120</p>
                    <p className="text-primary-300 text-sm mt-2">Monthly Average</p>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tenant</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {paymentRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{record.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-300">{record.tenant}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                                        {record.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            record.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {record.status}
                                        </span>
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
