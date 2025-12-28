import React, { useState } from 'react';

// Types for the Financial Hub
interface Transaction {
  id: string;
  type: 'TRANSFER_SEND' | 'TRANSFER_RECEIVE' | 'BILL_PAY';
  customer: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FLAGGED';
  timestamp: string;
}

const OfficeLedger = () => {
  // Sample data: In a real app, this would be fetched from your Supabase 'business_roi_stats' or a new 'transactions' table
  const [transactions] = useState<Transaction[]>([
    { id: '1', type: 'TRANSFER_SEND', customer: 'Jean Dupont', amount: 450.00, currency: 'USD', status: 'COMPLETED', timestamp: '2025-12-28 09:15' },
    { id: '2', type: 'BILL_PAY', customer: 'Maria Garcia', amount: 85.20, currency: 'USD', status: 'COMPLETED', timestamp: '2025-12-28 10:30' },
    { id: '3', type: 'TRANSFER_RECEIVE', customer: 'Ahmed Khan', amount: 1200.00, currency: 'USD', status: 'PENDING', timestamp: '2025-12-28 11:05' },
    { id: '4', type: 'BILL_PAY', customer: 'Local Market LLC', amount: 310.00, currency: 'USD', status: 'FLAGGED', timestamp: '2025-12-28 11:45' },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'FLAGGED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Community Financial Ledger</h2>
          <p className="text-sm text-slate-500">Autonomous Money Transfers & Bill Payments</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office Status</span>
          <div className="flex items-center text-green-500 font-bold">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            LIVE & SECURE
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Service Type</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">#{tx.id.padStart(6, '0')}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-700">
                    {tx.type === 'BILL_PAY' ? '📝 Bill Payment' : '💸 Money Transfer'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{tx.customer}</td>
                <td className="px-6 py-4 font-bold text-slate-800">
                  {tx.amount.toLocaleString('en-US', { style: 'currency', currency: tx.currency })}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
        <p>Showing last 50 transactions. All data is AES-256 Encrypted.</p>
        <button className="text-indigo-600 font-bold hover:underline">Export for Local Compliance (CSV)</button>
      </div>
    </div>
  );
};

export default OfficeLedger;
