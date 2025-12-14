'use client';

import React from 'react';
import { ChartBarSquareIcon } from '@heroicons/react/24/outline'; // ✅ Fixed missing import
import Link from 'next/link';

// Example dashboard component
export default function DashboardPage() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <ChartBarSquareIcon className="w-7 h-7 mr-3 text-indigo-600" />
          Operational Command Center
        </h1>
        <p className="text-gray-500 mt-1">
          Real-time performance and audit log for SARA AI Agents.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Active AI Sessions
          </h2>
          <p className="text-2xl font-bold text-indigo-600">14</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Tickets Resolved</h2>
          <p className="text-2xl font-bold text-green-600">238</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Average Response Time
          </h2>
          <p className="text-2xl font-bold text-yellow-600">1.4s</p>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-700">
              <span>Agent #420 completed onboarding at 5:12 PM.</span>
              <span className="text-sm text-gray-400">5 min ago</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Customer ticket escalated to Tier 2.</span>
              <span className="text-sm text-gray-400">23 min ago</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>New AI profile deployed successfully.</span>
              <span className="text-sm text-gray-400">1 hr ago</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
        Built with ❤️ by FrontDesk Agents LLC.{' '}
        <Link
          href="https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed"
          target="_blank"
          className="text-indigo-600 hover:underline"
        >
          View on GitHub
        </Link>
      </footer>
    </main>
  );
}
