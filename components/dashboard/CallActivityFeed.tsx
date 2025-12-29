'use client';

// FrontDesk Agents: Global Revenue Workforce
// Dashboard: Call Activity Feed Component

import React, { useEffect, useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, CheckCircle, XCircle, Clock } from 'lucide-react';

interface CallActivityProps {
  tenantId: string;
}

interface CallActivity {
  id: string;
  direction: 'inbound' | 'outbound';
  from: string;
  to: string;
  status: string;
  duration: number | null;
  qualified: boolean;
  timestamp: string;
  nodeType: string;
}

export default function CallActivityFeed({ tenantId }: CallActivityProps) {
  const [activities, setActivities] = useState<CallActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCallActivity();
    const interval = setInterval(fetchCallActivity, 15000); // Update every 15s
    return () => clearInterval(interval);
  }, [tenantId]);

  async function fetchCallActivity() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/calls?tenant_id=${tenantId}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data.calls);
      }
    } catch (error) {
      console.error('Failed to fetch call activity:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusIcon = (status: string, qualified: boolean) => {
    if (qualified) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-gray-400" />;
    if (status === 'failed' || status === 'no-answer') return <XCircle className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Call Activity</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Call Activity</h3>
      
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No recent calls</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {activity.direction === 'inbound' ? (
                    <PhoneIncoming className="w-4 h-4 text-blue-600" />
                  ) : (
                    <PhoneOutgoing className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.direction === 'inbound' ? activity.from : activity.to}
                    </p>
                    {getStatusIcon(activity.status, activity.qualified)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {activity.nodeType} • {formatDuration(activity.duration)}
                  </p>
                </div>
              </div>

              <div className="text-right ml-4">
                <p className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</p>
                {activity.qualified && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    Qualified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
