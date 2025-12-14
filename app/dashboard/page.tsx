'use client';

import { useState } from 'react';
import { 
  PhoneIcon, 
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/solid';

export default function PremiumDashboard() {
  const [timeframe, setTimeframe] = useState('week');

  const stats = [
    {
      name: 'Total Calls',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: PhoneIcon,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Appointments Booked',
      value: '428',
      change: '+8.3%',
      trend: 'up',
      icon: CalendarIcon,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Avg. Handle Time',
      value: '3:24',
      change: '-2.1%',
      trend: 'down',
      icon: ClockIcon,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Satisfaction Rate',
      value: '98.2%',
      change: '+1.4%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentCalls = [
    {
      id: '1',
      caller: 'John Smith',
      phone: '+1 (555) 123-4567',
      time: '2 minutes ago',
      duration: '4:32',
      status: 'completed',
      outcome: 'Appointment scheduled for Dec 18, 2:00 PM'
    },
    {
      id: '2',
      caller: 'Maria Garcia',
      phone: '+1 (555) 234-5678',
      time: '8 minutes ago',
      duration: '2:18',
      status: 'completed',
      outcome: 'General inquiry - Insurance coverage'
    },
    {
      id: '3',
      caller: 'David Chen',
      phone: '+1 (555) 345-6789',
      time: '15 minutes ago',
      duration: '3:45',
      status: 'completed',
      outcome: 'Prescription refill requested'
    },
    {
      id: '4',
      caller: 'Sarah Johnson',
      phone: '+1 (555) 456-7890',
      time: '23 minutes ago',
      duration: '5:12',
      status: 'transferred',
      outcome: 'Transferred to Dr. Williams'
    },
    {
      id: '5',
      caller: 'Michael Brown',
      phone: '+1 (555) 567-8901',
      time: '31 minutes ago',
      duration: '1:58',
      status: 'missed',
      outcome: 'No voicemail left'
    }
  ];

  const callVolumeData = [
    { time: '9 AM', calls: 12 },
    { time: '10 AM', calls: 24 },
    { time: '11 AM', calls: 18 },
    { time: '12 PM', calls: 15 },
    { time: '1 PM', calls: 22 },
    { time: '2 PM', calls: 28 },
    { time: '3 PM', calls: 32 },
    { time: '4 PM', calls: 25 },
    { time: '5 PM', calls: 19 }
  ];

  const maxCalls = Math.max(...callVolumeData.map(d => d.calls));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2332] to-[#000814] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with Sara today.</p>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
            {['Today', 'Week', 'Month'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period.toLowerCase())}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  timeframe === period.toLowerCase()
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                  stat.trend === 'up' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Call Volume Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Call Volume</h2>
            <ChartBarIcon className="w-6 h-6 text-cyan-400" />
          </div>
          
          <div className="space-y-4">
            {callVolumeData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-400 font-medium">{data.time}</div>
                <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(data.calls / maxCalls) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div className="w-12 text-right text-white font-semibold">{data.calls}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Call Completion</span>
                <span className="text-white font-semibold">94%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Transfer Rate</span>
                <span className="text-white font-semibold">12%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Voicemail</span>
                <span className="text-white font-semibold">8%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[8%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Peak Hours</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">2-3 PM</span>
                  <span className="text-cyan-400 text-sm">32 calls</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">3-4 PM</span>
                  <span className="text-cyan-400 text-sm">28 calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Calls</h2>
          <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Caller</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Phone</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Time</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Duration</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Status</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-4">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr 
                  key={call.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {call.caller.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{call.caller}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{call.phone}</td>
                  <td className="py-4 px-4 text-gray-400">{call.time}</td>
                  <td className="py-4 px-4 text-white font-medium">{call.duration}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      call.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : call.status === 'transferred'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {call.status === 'completed' && <CheckCircleIcon className="w-3 h-3" />}
                      {call.status === 'missed' && <XCircleIcon className="w-3 h-3" />}
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{call.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Note: Shimmer animation is defined in globals.css
