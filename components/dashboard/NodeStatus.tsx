'use client';

// FrontDesk Agents: Global Revenue Workforce
// Dashboard: AI Node Status Component

import React, { useEffect, useState } from 'react';
import { Phone, PhoneCall, PhoneOff, Activity } from 'lucide-react';

interface NodeStatusProps {
  tenantId: string;
}

interface NodeData {
  type: 'receptionist' | 'qualification' | 'scaling' | 'priority';
  status: 'active' | 'idle' | 'offline';
  phoneNumber: string;
  currentCalls: number;
  todayCalls: number;
  qualifiedLeads: number;
}

export default function NodeStatus({ tenantId }: NodeStatusProps) {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNodeStatus();
    const interval = setInterval(fetchNodeStatus, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [tenantId]);

  async function fetchNodeStatus() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/nodes?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setNodes(data.nodes);
      }
    } catch (error) {
      console.error('Failed to fetch node status:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'receptionist': return <Phone className="w-5 h-5" />;
      case 'qualification': return <PhoneCall className="w-5 h-5" />;
      case 'scaling': return <Activity className="w-5 h-5" />;
      case 'priority': return <PhoneCall className="w-5 h-5 text-purple-600" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">AI Node Status</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">AI Node Status</h3>
      
      {nodes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <PhoneOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No active nodes</p>
          <p className="text-sm mt-1">Provision a phone number to activate your first node</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nodes.map((node, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(node.status)}`}>
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h4 className="font-medium capitalize">{node.type} Node</h4>
                    <p className="text-sm text-gray-600">{node.phoneNumber}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}
                >
                  {node.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Active Calls</p>
                  <p className="text-lg font-semibold">{node.currentCalls}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Today's Calls</p>
                  <p className="text-lg font-semibold">{node.todayCalls}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Qualified</p>
                  <p className="text-lg font-semibold text-green-600">{node.qualifiedLeads}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
                }
