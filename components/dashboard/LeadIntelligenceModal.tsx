import React from 'react';
import { Brain, Target, MessageCircle, Calendar, Zap } from 'lucide-react';

export const LeadIntelligenceModal = ({ lead }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden">
      {/* Header: AI Sentiment & Intent */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black">{lead.name}</h2>
          <p className="text-slate-400 font-medium">Qualified by Autonomous Front Office</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-white/10 px-4 py-2 rounded-xl">
            <p className="text-xs uppercase font-bold text-slate-400">Intent Score</p>
            <p className="text-2xl font-black text-emerald-400">{lead.intentScore}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Left Column: AI Summary */}
        <div className="col-span-2 p-8 border-r border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Brain size={20} />
            <h4 className="font-bold uppercase tracking-tight">AI Executive Summary</h4>
          </div>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-8">
            <p className="text-slate-800 leading-relaxed font-medium">
              "{lead.aiSummary}"
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4 text-slate-900">
            <MessageCircle size={20} />
            <h4 className="font-bold uppercase tracking-tight">Hand-off Transcript</h4>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4">
            {lead.transcript.map((line, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm ${line.role === 'ai' ? 'bg-slate-100' : 'bg-white border border-slate-200'}`}>
                <span className="font-bold uppercase text-[10px] block mb-1 text-slate-400">{line.role}</span>
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Extracted Data & Action */}
        <div className="bg-slate-50 p-8 space-y-8">
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase mb-4">Extracted Data</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Budget:</span>
                <span className="font-bold text-slate-900">{lead.metadata.budget}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Timeline:</span>
                <span className="font-bold text-slate-900">{lead.metadata.timeline}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Current Tool:</span>
                <span className="font-bold text-slate-900">{lead.metadata.currentTool}</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition shadow-xl shadow-blue-500/30">
            <Zap size={18} /> Initiate Close
          </button>
        </div>
      </div>
    </div>
  );
};
