import React from 'react';
// Corrected: Removed unused 'Target' to satisfy strict production build
import { Brain, MessageCircle, Calendar, Zap } from 'lucide-react';

export const LeadIntelligenceModal = ({ lead }: { lead: any }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Lead Intelligence</h2>
          </div>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
            Intent Score: {lead.intent_score || 'N/A'}/100
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Summary</h3>
              <p className="text-gray-600 text-sm mt-1">{lead.summary || 'Analyzing lead conversation...'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Transcripts Ready</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Auto-Booked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
