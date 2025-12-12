// app/admin/audit/page.tsx (LOCALIZATION UPDATE)
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    FingerPrintIcon, 
    UserIcon, 
    ClockIcon, 
    WrenchScrewdriverIcon, 
    ServerIcon, 
    CheckCircleIcon, 
    ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

// --- Simulated User Settings ---
const USER_LOCALE = 'es-MX'; 
const USER_TIMEZONE = 'America/Mexico_City'; 
// -----------------------------

// Utility function to format full date and time string
const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString + 'Z'); 
    return date.toLocaleString(USER_LOCALE, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: USER_TIMEZONE,
    });
};


// Mock Audit Log Data (Time represents UTC/Z)
const mockLogs = [
    { 
        id: 101, 
        time: '2025-12-12 15:30:15', // 9:30 AM CST (as of current date/time context)
        user: 'Owner (Alex M.)', 
        action: 'AURA™ Core API Webhook Endpoint Updated', 
        details: 'Changed from v1.2 to v1.3. Requires verification.', 
        category: 'CONFIG', 
        status: 'WARNING'
    },
    { 
        id: 100, 
        time: '2025-12-12 15:25:01', 
        user: 'System Bot', 
        action: 'Payment Gateway (Stripe) Connection Test', 
        details: 'Successful 200 response. Transaction verified.', 
        category: 'SECURITY', 
        status: 'SUCCESS'
    },
    { 
        id: 99, 
        time: '2025-12-12 15:20:45', 
        user: 'Admin (Sarah J.)', 
        action: 'New Agent Conversational Script Deployed', 
        details: 'Script ID: AURA-SCRIPT-924A-V4. Target region: US-West.', 
        category: 'SCRIPT', 
        status: 'SUCCESS'
    },
    { 
        id: 98, 
        time: '2025-12-12 14:45:00', 
        user: 'Owner (Alex M.)', 
        action: 'MFA Disabled on User ID 45', 
        details: 'Security vulnerability detected. Contact compliance.', 
        category: 'SECURITY', 
        status: 'CRITICAL'
    },
    { 
        id: 97, 
        time: '2025-12-12 13:15:30', 
        user: 'System Bot', 
        action: 'Telephony Trunk Connection Test', 
        details: 'Successful connection to SIP endpoint. Latency 42ms.', 
        category: 'SYSTEM', 
        status: 'SUCCESS'
    },
];

const categories = ['ALL', 'CONFIG', 'SECURITY', 'SCRIPT', 'SYSTEM'];

export default function AuditLogDashboard() {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = mockLogs
        .filter(log => selectedCategory === 'ALL' || log.category === selectedCategory)
        .filter(log => log.user.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase()));

    const getStatusStyle = (status) => {
        switch (status) {
            case 'SUCCESS':
                return { icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-50' };
            case 'WARNING':
                return { icon: ExclamationTriangleIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' };
            case 'CRITICAL':
                return { icon: ExclamationTriangleIcon, color: 'text-red-600', bg: 'bg-red-50' };
            default:
                return { icon: ClockIcon, color: 'text-gray-600', bg: 'bg-gray-50' };
        }
    };
    
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'CONFIG': return WrenchScrewdriverIcon;
            case 'SECURITY': return FingerPrintIcon;
            case 'SCRIPT': return UserIcon;
            case 'SYSTEM': return ServerIcon;
            default: return ClockIcon;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <FingerPrintIcon className="h-10 w-10 text-red-600 mr-3" />
                        Audit Logging Dashboard
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Traceability for all configuration and security changes (Compliance Required).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100">
                    
                    {/* Filters and Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center border-b pb-4">
                        
                        <input
                            type="text"
                            placeholder="Search user or action..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-premium w-full md:w-1/3"
                        />

                        <div className="flex flex-wrap gap-2 md:ml-auto">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                        selectedCategory === cat 
                                        ? 'bg-primary-600 text-white shadow-md' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Audit Log Table */}
                    <div className="overflow-hidden shadow-sm ring-1 ring-black/5 rounded-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Local ({USER_TIMEZONE})</th> 
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLogs.map((log) => {
                                    const statusStyle = getStatusStyle(log.status);
                                    const CategoryIcon = getCategoryIcon(log.category);
                                    return (
                                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {formatDateTime(log.time)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.user}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <CategoryIcon className="h-4 w-4 text-primary-600" />
                                                    {log.category}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-lg">
                                                <p className="font-semibold">{log.action}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{log.details}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.color}`}>
                                                    <statusStyle.icon className="h-4 w-4 mr-1" />
                                                    {log.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredLogs.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">No audit logs found for the selected criteria.</p>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/dashboard/operational-overview" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        ← Return to Operational Command Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
