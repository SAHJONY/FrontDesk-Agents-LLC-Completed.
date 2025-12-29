'use client';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';

export function RevenueStats() {
  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-xl flex items-center space-x-4">
      <div className="p-3 bg-green-500/20 rounded-full">
        <TrendingUp className="text-green-400" />
      </div>
      <div>
        <p className="text-zinc-400 text-sm font-medium">Recovered Revenue (30d)</p>
        <p className="text-3xl font-bold">$42,890.00</p>
        <p className="text-xs text-green-400 mt-1">+12% from last month</p>
      </div>
      <div className="ml-auto border-l border-zinc-700 pl-4">
        <p className="text-zinc-400 text-[10px] uppercase font-bold">Elite Fee (15%)</p>
        <p className="text-lg font-bold text-blue-400">$6,433.50</p>
      </div>
    </div>
  );
}
