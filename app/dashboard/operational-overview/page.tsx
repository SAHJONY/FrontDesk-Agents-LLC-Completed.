'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
    ClockIcon, 
    SparklesIcon, 
    ArrowsRightLeftIcon, 
    WrenchScrewdriverIcon, 
    ArrowTrendingUpIcon, 
    ShieldCheckIcon,
    BanknotesIcon, 
    UsersIcon,
    PhoneIcon,
    ChartBarIcon,
    CpuChipIcon,
    BoltIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    SignalIcon,
    GlobeAltIcon,
    ServerIcon
} from '@heroicons/react/24/outline';

export default function OperationalOverviewPage() {
  // Real-time KPIs with trend data
  const kpis = [
    { 
      label: 'Active Calls', 
      value: '24', 
      change: '+12%', 
      trend: 'up',
      icon: PhoneIcon, 
      color: 'blue',
      subtitle: 'vs last hour',
      sparkline: [12, 15, 18, 22, 24]
    },
    { 
      label: 'AI Accuracy', 
      value: '98.5%', 
      change: '+2.3%', 
      trend: 'up',
      icon: SparklesIcon, 
      color: 'green',
      subtitle: 'last 100 calls',
      sparkline: [95, 96, 97, 98, 98.5]
    },
    { 
      label: 'Response Time', 
      value: '1.2s', 
      change: '-0.3s', 
      trend: 'down',
      icon: BoltIcon, 
      color: 'purple',
      subtitle: 'average',
      sparkline: [1.8, 1.6, 1.4, 1.3, 1.2]
    },
    { 
      label: 'Monthly Revenue', 
      value: '$45.2K', 
      change: '+18%', 
      trend: 'up',
      icon: BanknotesIcon, 
      color: 'emerald',
      subtitle: 'this month',
      sparkline: [38, 40, 42, 43, 45.2]
    },
  ];

  const managementLinks = [
    { 
      title: "AURA™ Core API", 
      subtitle: "AI Brain Configuration",
      description: "Configure conversation engine, API keys, and webhooks", 
      href: "/dashboard/owner", 
      icon: CpuChipIcon,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      status: "operational",
      stats: { uptime: "99.9%", latency: "45ms" }
    },
    { 
      title: "Voice Trunks", 
      subtitle: "Twilio & Internal Systems",
      description: "Manage call infrastructure and test connectivity", 
      href: "/settings/telephony-trunk",
      icon: PhoneIcon,
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80",
      status: "operational",
      stats: { channels: "50/100", quality: "HD" }
    },
    { 
      title: "Payment Gateway", 
      subtitle: "Stripe Integration",
      description: "Monitor payment status and execute tests", 
      href: "/settings/payments",
      icon: BanknotesIcon,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      status: "operational",
      stats: { processed: "€12.5K", success: "100%" }
    },
  ];

  const systemHealth = [
    { name: "API Server", status: "healthy", uptime: "99.9%", icon: ServerIcon },
    { name: "Database", status: "healthy", uptime: "100%", icon: ServerIcon },
    { name: "Voice Network", status: "healthy", uptime: "99.8%", icon: SignalIcon },
    { name: "Payment Gateway", status: "healthy", uptime: "100%", icon: ShieldCheckIcon },
  ];

  const recentActivity = [
    { 
      time: '2 min ago', 
      action: 'AI agent completed call with lead qualification', 
      status: 'success',
      details: 'Duration: 3m 45s • Lead Score: 85/100',
      icon: PhoneIcon
    },
    { 
      time: '5 min ago', 
      action: 'Payment processed - Professional Plan upgrade', 
      status: 'success',
      details: 'Amount: $999.00 • Customer: Acme Corp',
      icon: BanknotesIcon
    },
    { 
      time: '12 min ago', 
      action: 'Voice trunk health check completed', 
      status: 'info',
      details: 'All 50 channels operational • Latency: 45ms avg',
      icon: SignalIcon
    },
    { 
      time: '18 min ago', 
      action: 'API configuration updated', 
      status: 'warning',
      details: 'Webhook endpoint changed • Requires verification',
      icon: WrenchScrewdriverIcon
    },
    { 
      time: '25 min ago', 
      action: 'New AI model deployed to production', 
      status: 'success',
      details: 'Version 2.4.1 • Accuracy improved by 2.3%',
      icon: SparklesIcon
    },
  ];

  const performanceMetrics = [
    { label: "Total Calls Today", value: "1,247", icon: PhoneIcon },
    { label: "Average Call Duration", value: "4m 32s", icon: ClockIcon },
    { label: "Conversion Rate", value: "32.5%", icon: ArrowTrendingUpIcon },
    { label: "Customer Satisfaction", value: "4.8/5.0", icon: UsersIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Premium Header with Glassmorphism */}
      <div className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                      Operational Overview
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">Real-time system health and performance monitoring</p>
              </div>
              
              {/* Live Status Badge */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-bold text-white">All Systems Operational</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Mini Stats Bar */}
            <div className="grid grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <metric.icon className="h-8 w-8 text-blue-600 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Premium KPI Cards with Sparklines */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <kpi.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {kpi.change}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600 mb-4">{kpi.label}</div>
                <div className="text-xs text-gray-500">{kpi.subtitle}</div>

                {/* Mini Sparkline */}
                <div className="mt-4 flex items-end gap-1 h-8">
                  {kpi.sparkline.map((value, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ height: `${(value / Math.max(...kpi.sparkline)) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Management Centers - Ultra Premium Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Management Centers</h2>
            <Link href="/settings" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All Settings
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {managementLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Premium Background Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                  
                  {/* Floating Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        {link.status}
                      </span>
                    </div>
                  </div>

                  {/* Icon Badge - Bottom Left */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <link.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {Object.entries(link.stats).map(([key, value], i) => (
                      <div key={i} className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
                        <div className="text-xs text-white/80 uppercase tracking-wide">{key}</div>
                        <div className="text-sm font-bold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600">{link.subtitle}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {link.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Configure Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 transition-all pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* System Health - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
              </div>
              
              <div className="space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <system.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{system.name}</p>
                        <p className="text-sm text-gray-500">Uptime: {system.uptime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Global Network</p>
                    <p className="text-sm text-gray-600">Active across 3 regions with 99.9% uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity - Right Column (spans 2) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Activity Stream</h2>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="group relative flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all border border-gray-100 hover:border-blue-200"
                  >
                    {/* Timeline Dot */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100' :
                        activity.status === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <activity.icon className={`h-5 w-5 ${
                          activity.status === 'success' ? 'text-green-600' :
                          activity.status === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      {index < recentActivity.length - 1 && (
                        <div className="absolute left-1/2 top-12 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {activity.action}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
