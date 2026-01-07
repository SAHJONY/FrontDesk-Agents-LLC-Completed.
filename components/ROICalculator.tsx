"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ROICalculator() {
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(40000);
  const [missedCalls, setMissedCalls] = useState(30);

  // Calculations
  const currentCost = employees * (avgSalary + avgSalary * 0.3); // Salary + 30% benefits
  const missedRevenue = missedCalls * 365 * 150; // Assuming $150 per missed opportunity
  const totalCurrentCost = currentCost + missedRevenue;

  const frontdeskCost = 17988; // $1,499/mo * 12
  const savings = totalCurrentCost - frontdeskCost;
  const roi = ((savings / frontdeskCost) * 100).toFixed(0);

  return (
    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Calculate Your Savings
      </h3>

      <div className="space-y-6 mb-8">
        {/* Number of Employees */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Front Office Employees: {employees}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Average Salary */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Average Salary: ${avgSalary.toLocaleString()}/year
          </label>
          <input
            type="range"
            min="30000"
            max="80000"
            step="5000"
            value={avgSalary}
            onChange={(e) => setAvgSalary(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Missed Calls */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Missed Calls Per Day: {missedCalls}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={missedCalls}
            onChange={(e) => setMissedCalls(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 p-6 rounded-xl bg-black/30 border border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Current Annual Cost:</span>
          <span className="text-xl font-bold text-white">
            ${totalCurrentCost.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-400">FrontDesk Agents Cost:</span>
          <span className="text-xl font-bold text-cyan-400">
            ${frontdeskCost.toLocaleString()}
          </span>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-semibold">Annual Savings:</span>
          <span className="text-3xl font-black text-green-400">
            ${savings.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-semibold">ROI:</span>
          <span className="text-3xl font-black text-green-400">
            {roi}%
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
      >
        <p className="text-sm text-green-400 text-center">
          💰 You could save <span className="font-bold">${(savings / 12).toLocaleString()}/month</span> by switching to FrontDesk Agents
        </p>
      </motion.div>
    </div>
  );
}
