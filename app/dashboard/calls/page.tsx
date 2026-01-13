'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Clock, User, TrendingUp, Filter, Search, ArrowRight } from 'lucide-react';

export default function CallsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch calls data
    const fetchCalls = async () => {
      try {
        const response = await fetch('/api/dashboard/live');
        const result = await response.json();
        if (result.success && result.data.activeCalls) {
          setCalls(result.data.activeCalls);
        }
      } catch (error) {
        console.error('Error fetching calls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchCalls, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'missed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesFilter = filter === 'all' || call.status === filter;
    const matchesSearch = call.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          call.agent?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-white text-lg">Loading calls...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Active Calls</h1>
          <p className="text-gray-400">Monitor and manage all customer calls in real-time</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Phone className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">
                {calls.filter(c => c.status === 'active').length}
              </span>
            </div>
            <p className="text-sm text-gray-400">Active Now</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">
                {calls.filter(c => c.status === 'completed').length}
              </span>
            </div>
            <p className="text-sm text-gray-400">Completed</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <User className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">
                {calls.length}
              </span>
            </div>
            <p className="text-sm text-gray-400">Total Today</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                {calls.length > 0 ? Math.round((calls.filter(c => c.status === 'completed').length / calls.length) * 100) : 0}%
              </span>
            </div>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by phone number or agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Calls</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calls List */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {filteredCalls.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCalls.map((call, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                            <Phone className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{call.from}</div>
                            <div className="text-xs text-gray-400">{call.timestamp}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{call.agent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{call.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/calls/${call.id || index}`}
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No calls found</p>
              <p className="text-sm text-gray-500 mt-2">
                {searchQuery || filter !== 'all' 
                  ? 'Try adjusting your filters or search query'
                  : 'Calls will appear here when customers contact you'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
