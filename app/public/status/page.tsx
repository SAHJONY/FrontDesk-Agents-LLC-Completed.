// app/public/status/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    CpuChipIcon, 
    ArrowPathIcon, 
    CheckCircleIcon, 
    ExclamationTriangleIcon, 
    XCircleIcon, 
    ClockIcon, 
    GlobeAltIcon,
    ServerStackIcon,
    PhoneIcon,
    CreditCardIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

// Mock Data for System Components Status
const componentData = [
    {
        name: 'AURA™ Core API Gateway',
        icon: CpuChipIcon,
        status: 'Operational',
        description: 'Main API for conversational processing and routing.',
        lastIncident: 'None',
    },
    {
        name: 'Telephony Trunk Integration (VoIP)',
        icon: PhoneIcon,
        status: 'Operational',
        description: 'Global telephony connectivity and carrier synchronization.',
        lastIncident: 'None',
    },
    {
        name: 'Agentic Workforce Orchestration',
        icon: UserGroupIcon,
        status: 'Operational',
        description: 'Collaboration motor for Multi-RL Agents (LQA, SA, PPA, CUA).',
        lastIncident: 'Minor Degradation (Dec 10, 2025)',
    },
    {
        name: 'Payment Gateway Processing',
        icon: CreditCardIcon,
        status: 'Degraded Performance', // Simulating an issue
        description: 'Multi-gateway transaction processing and secure link generation.',
        lastIncident: 'None',
    },
    {
        name: 'Global CRM Synchronization',
        icon: GlobeAltIcon,
        status: 'Operational',
        description: 'Real-time data synchronization with client CRM platforms.',
        lastIncident: 'None',
    },
];

const getStatusStyles = (status) => {
    switch (status) {
        case 'Operational':
            return { icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-100', text: 'bg-green-500' };
        case 'Degraded Performance':
            return { icon: ExclamationTriangleIcon, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'bg-yellow-500' };
        case 'Major Outage':
            return { icon: XCircleIcon, color: 'text-red-600', bg: 'bg-red-100', text: 'bg-red-500' };
        default:
            return { icon: ClockIcon, color: 'text-gray-600', bg: 'bg-gray-100', text: 'bg-gray-500' };
    }
};

const getOverallStatus = (components) => {
    if (components.some(c => c.status === 'Major Outage')) return 'Major Outage';
    if (components.some(c => c.status === 'Degraded Performance')) return 'Degraded Performance';
    return 'Operational';
};

export default function PublicStatusPage() {
    const [components, setComponents] = useState(componentData);
    const overallStatus = getOverallStatus(components);
    const overallStyles = getStatusStyles(overallStatus);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    // Utility for status bar visualization
    const getStatusBarWidth = (name) => {
        const now = Date.now();
        // Simulate minor fluctuations throughout the day
        if (name.includes('Telephony')) return 98 + Math.random() * 2; // 98-100%
        if (name.includes('API')) return 99 + Math.random() * 1; // 99-100%
        if (name.includes('Payment') && overallStatus === 'Degraded Performance') return 85 + Math.random() * 5; // 85-90%
        return 100;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-16 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 text-white">
                        <ServerStackIcon className="h-10 w-10 text-primary-400" />
                        AURA™ Public Status Page
                    </h1>
                    <p className="mt-2 text-xl text-gray-400">
                        Real-time status of FrontDesk Agents Core Infrastructure.
                    </p>
                </header>

                {/* Overall Status Banner */}
                <div className={`p-6 rounded-2xl mb-12 shadow-2xl ${overallStyles.bg} bg-opacity-20 border border-white/10`}>
                    <div className="flex items-center justify-center gap-4">
                        <overallStyles.icon className={`h-8 w-8 ${overallStyles.color} flex-shrink-0`} />
                        <div>
                            <p className="text-2xl font-extrabold text-white">
                                Overall Status: {overallStatus}
                            </p>
                            <p className="text-sm text-gray-300">
                                {overallStatus === 'Operational' ? 'All systems are operating normally.' : 'One or more systems are experiencing performance degradation.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Individual Components Status */}
                <div className="space-y-6">
                    {components.map((component, index) => {
                        const styles = getStatusStyles(component.status);
                        const usageWidth = getStatusBarWidth(component.name);
                        
                        return (
                            <div key={index} className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <component.icon className="h-6 w-6 text-primary-400" />
                                        <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <styles.icon className={`h-5 w-5 ${styles.color}`} />
                                        <span className={`text-sm font-bold text-white px-3 py-1 rounded-full ${styles.text}`}>
                                            {component.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Bar (Visualization of current load/health) */}
                                <div className="h-2 bg-gray-700 rounded-full mb-3">
                                    <div 
                                        style={{ width: `${usageWidth}%` }} 
                                        className={`h-2 rounded-full ${styles.text} transition-all duration-500`}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-400 flex justify-between">
                                    <span>{component.description}</span>
                                    <span>Uptime: {usageWidth.toFixed(2)}%</span>
                                </div>
                                
                                <p className="text-xs text-gray-500 mt-2">
                                    Last Incident: {component.lastIncident}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Footer and Updates */}
                <footer className="mt-12 pt-6 border-t border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">
                        Data refreshed every 60 seconds. All times are reported in UTC.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Current Time (CST): {currentTime.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })}
                    </p>
                    <Link href="/dashboard/operational-overview" className="mt-4 inline-flex items-center text-primary-400 hover:text-primary-300 text-sm font-medium">
                        <ArrowPathIcon className="h-4 w-4 mr-1" />
                        View Internal Operational Dashboard
                    </Link>
                </footer>
            </div>
        </div>
    );
}
