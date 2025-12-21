'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, TrendingUp, Filter } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: string;
  value: number;
  createdAt: Date;
  lastContact?: Date;
}

export default function SalesLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | Lead['status']>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch leads from API
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with demo data
      const demoLeads: Lead[] = [
        {
          id: '1',
          name: 'John Smith',
          phone: '+1234567890',
          email: 'john@example.com',
          status: 'new',
          source: 'Phone Call',
          value: 5000,
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          phone: '+1234567891',
          email: 'sarah@example.com',
          status: 'qualified',
          source: 'Website Chat',
          value: 7500,
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: '3',
          name: 'Mike Davis',
          phone: '+1234567892',
          status: 'contacted',
          source: 'Phone Call',
          value: 3000,
          createdAt: new Date(Date.now() - 172800000),
        },
      ];
      
      setLeads(demoLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.value, 0);

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'qualified':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sales Leads
          </h2>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Leads</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredLeads.length}
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pipeline Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Qualified</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {leads.filter(l => l.status === 'qualified').length}
          </p>
        </div>
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No leads found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {lead.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{lead.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Created {lead.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Value
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${lead.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {lead.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
