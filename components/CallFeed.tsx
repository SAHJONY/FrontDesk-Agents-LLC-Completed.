'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Phone, Clock, User, CheckCircle, XCircle } from 'lucide-react';

interface Call {
  id: string;
  caller_name?: string;
  caller_phone: string;
  status: 'answered' | 'missed' | 'voicemail';
  duration?: number;
  timestamp: string;
  notes?: string;
}

export default function CallFeed() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls();
    
    // Set up real-time subscription
    const supabase = createClient();
    const channel = supabase
      .channel('calls')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'calls' 
        }, 
        (payload) => {
          console.log('Call change received:', payload);
          fetchCalls();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCalls = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching calls:', error);
      } else {
        setCalls(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Call['status']) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'voicemail':
        return <Phone className="w-5 h-5 text-blue-500" />;
      default:
        return <Phone className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Phone className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Calls
        </h2>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {calls.length} total
        </span>
      </div>

      {calls.length === 0 ? (
        <div className="text-center py-12">
          <Phone className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No calls yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Calls will appear here when customers contact you
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <div
              key={call.id}
              className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="mt-1">
                {getStatusIcon(call.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {call.caller_name || 'Unknown Caller'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {call.caller_phone}
                </p>
                
                {call.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    "{call.notes}"
                  </p>
                )}
              </div>
              
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimestamp(call.timestamp)}</span>
                </div>
                
                {call.duration && (
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {formatDuration(call.duration)}
                  </div>
                )}
                
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === 'answered'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : call.status === 'missed'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}
                >
                  {call.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
