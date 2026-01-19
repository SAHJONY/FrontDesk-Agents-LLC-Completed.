'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Clock, User, TrendingUp, Filter, Search, ArrowRight, Star, MessageSquare, Play, FileText } from 'lucide-react';

export default function CallsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCalls = async () => {
    try {
      // Points to our new aggregated call log API
      const response = await fetch('/api/calls');
      const result = await response.json();
      if (result.success) {
        setCalls(result.calls || []);
      }
    } catch (error) {
      console.error('Error fetching calls:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
    const interval = setInterval(fetchCalls, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredCalls = calls.filter(call => {
    const isLead = call.summary?.toLowerCase().includes('book') || call.summary?.toLowerCase().includes('appoint');
    const matchesFilter = filter === 'all' || 
                         (filter === 'leads' && isLead) || 
                         call.status === filter;
    
    const matchesSearch = call.customer_number?.includes(searchQuery) ||
                          call.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-white text-lg font-medium">Loading Intelligence Logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Call Intelligence</h1>
            <p className="text-gray-400">Review AI-summarized conversations and captured leads.</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
             <span className="text-green-400 text-sm font-bold flex items-center gap-2">
               <Star size={14} fill="currentColor" /> {calls.filter(c => c.summary?.toLowerCase().includes('book')).length} Leads Captured
             </span>
          </div>
        </div>

        {/* Intelligence Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Phone className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">{calls.length}</span>
            </div>
            <p className="text-sm text-gray-400">Total Encounters</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">
                {calls.filter(c => c.summary?.toLowerCase().includes('book')).length}
              </span>
            </div>
            <p className="text-sm text-gray-400">Leads Identified</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">
                {Math.round(calls.reduce((acc, c) => acc + (c.duration || 0), 0) / 60)}m
              </span>
            </div>
            <p className="text-sm text-gray-400">Total AI Airtime</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">
                {calls.length > 0 ? Math.round((calls.filter(c => c.status === 'completed').length / calls.length) * 100) : 0}%
              </span>
            </div>
            <p className="text-sm text-gray-400">Resolution Rate</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search transcripts or numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Conversations</option>
                <option value="leads">Leads Only</option>
                <option value="completed">Completed</option>
                <option value="active">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calls List */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
          {filteredCalls.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">AI Summary</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCalls.map((call, index) => {
                    const isLead = call.summary?.toLowerCase().includes('book') || call.summary?.toLowerCase().includes('appoint');
                    
                    return (
                      <tr key={call.id || index} className="hover:bg-gray-700/30 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${isLead ? 'bg-yellow-500/20' : 'bg-gray-700'}`}>
                              <Phone className={`w-5 h-5 ${isLead ? 'text-yellow-400' : 'text-gray-400'}`} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{call.customer_number}</div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                {new Date(call.created_at).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3 max-w-md">
                            <MessageSquare size={14} className="text-cyan-500 mt-1 shrink-0" />
                            <p className="text-sm text-gray-300 italic line-clamp-2 group-hover:line-clamp-none transition-all">
                              {call.summary || "Agent is processing the call context..."}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex w-fit px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusColor(call.status)} uppercase`}>
                              {call.status}
                            </span>
                            {isLead && (
                              <span className="flex items-center gap-1 text-[10px] font-black text-yellow-500 uppercase">
                                <Star size={10} fill="currentColor" /> Potential Lead
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard/calls/${call.id}`}
                              className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-cyan-400 border border-gray-700 transition-all"
                            >
                              <FileText size={18} />
                            </Link>
                            {call.recording_url && (
                              <a 
                                href={call.recording_url} 
                                target="_blank"
                                className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-500/20 transition-all"
                              >
                                <Play size={18} fill="currentColor" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/50">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <Phone className="w-10 h-10 text-gray-700" />
              </div>
              <p className="text-gray-400 text-lg font-medium">No Intelligence Gathered</p>
              <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
                Calls will be automatically summarized here after your AI agents complete a conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
