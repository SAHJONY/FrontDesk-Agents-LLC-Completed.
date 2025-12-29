'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: Conversion Scripts Architect (Elite UI)
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Copy, Play, FileText, BrainCircuit, Target, MessageSquare } from 'lucide-react';

interface Script {
  id: string;
  name: string;
  industry: string;
  scriptType: string;
  isActive: boolean;
  conversationFlow: any;
  createdAt: string;
  usageCount?: number;
}

export default function ScriptsPage() {
  const { user } = useAuth();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  useEffect(() => {
    if (user) fetchScripts();
  }, [user]);

  async function fetchScripts() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/scripts/list?tenant_id=${user?.tenant_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setScripts(data.scripts || []);
      }
    } catch (error) {
      console.error('Failed to fetch scripts:', error);
    } finally {
      setLoading(false);
    }
  }

  const getScriptTypeStyles = (type: string) => {
    const styles: Record<string, string> = {
      receptionist: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
      qualification: 'border-green-500/20 text-green-400 bg-green-500/5',
      outbound: 'border-purple-500/20 text-purple-400 bg-purple-500/5',
      retention: 'border-yellow-500/20 text-yellow-400 bg-yellow-500/5',
    };
    return styles[type] || 'border-zinc-800 text-zinc-400 bg-zinc-900';
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Intelligence Hub</h1>
            <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mt-1">
              Active Conversation Architectures
            </p>
          </div>
          <button
            onClick={() => { setSelectedScript(null); setShowEditor(true); }}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Deploy New Script</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-800"></div>
            ))}
          </div>
        ) : scripts.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-zinc-800 p-20 text-center bg-zinc-950/50">
            <BrainCircuit className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2">No Intelligence Found</h3>
            <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">Your workforce currently lacks conversation protocols. Deploy your first script to start revenue operations.</p>
            <button onClick={() => setShowEditor(true)} className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors">
              Initialize Architect
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script) => (
              <div key={script.id} className="glass-panel group rounded-3xl border border-zinc-800 bg-zinc-950/50 hover:border-blue-500/50 transition-all p-6 relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-blue-400 transition-colors">{script.name}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{script.industry || 'Global Protocol'}</p>
                  </div>
                  {script.isActive && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-[8px] font-black text-green-500 uppercase">Live</span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getScriptTypeStyles(script.scriptType)}`}>
                    {script.scriptType}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-6">
                  <span className="flex items-center"><Target className="w-3 h-3 mr-1" /> {script.usageCount || 0} Runs</span>
                  <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> {new Date(script.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-6">
                  <button onClick={() => { setSelectedScript(script); setShowEditor(true); }} className="p-3 bg-zinc-900 rounded-xl hover:bg-blue-600 transition-colors flex justify-center"><Edit className="w-4 h-4" /></button>
                  <button className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors flex justify-center"><Copy className="w-4 h-4" /></button>
                  <button className="p-3 bg-zinc-900 rounded-xl hover:bg-green-600 transition-colors flex justify-center"><Play className="w-4 h-4 fill-current" /></button>
                  <button className="p-3 bg-zinc-900 rounded-xl hover:bg-red-600 transition-colors flex justify-center"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditor && (
        <ScriptEditorModal
          script={selectedScript}
          onClose={() => { setShowEditor(false); setSelectedScript(null); }}
          onSave={() => { setShowEditor(false); setSelectedScript(null); fetchScripts(); }}
        />
      )}
    </div>
  );
}

// Modal Component Logic (Elite Styled Editor)
function ScriptEditorModal({ script, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: script?.name || '',
    industry: script?.industry || '',
    scriptType: script?.scriptType || 'receptionist',
    introduction: script?.conversationFlow?.introduction || '',
    steps: script?.conversationFlow?.steps || [''],
    closing: script?.conversationFlow?.closing || '',
  });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/30">
          <h2 className="text-xl font-black uppercase tracking-tighter">Script Architect</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white font-bold text-xs">EXIT_ARCHITECT</button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol Name</label>
              <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="e.g. ELITE_SALES_V1" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Industry</label>
              <input value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="e.g. Real Estate" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Node Logic (Script Type)</label>
            <select value={formData.scriptType} onChange={(e) => setFormData({...formData, scriptType: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none appearance-none">
              <option value="receptionist">Inbound Receptionist</option>
              <option value="qualification">Lead Qualification</option>
              <option value="outbound">Outbound High-Yield</option>
              <option value="retention">Retention Protocol</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Initial Salutation (Voice Intro)</label>
            <textarea value={formData.introduction} onChange={(e) => setFormData({...formData, introduction: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm h-24 outline-none focus:border-blue-500" placeholder="Hello, you've reached..." />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Flow Nodes (Steps)</label>
            {formData.steps.map((step: string, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 text-blue-500">{i+1}</div>
                <input value={step} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500" placeholder="Conversation logic step..." />
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-zinc-900/30 border-t border-zinc-900 grid grid-cols-2 gap-4">
          <button onClick={onClose} className="py-4 text-xs font-black uppercase text-zinc-500 tracking-widest">Discard Changes</button>
          <button onClick={onSave} className="py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Synchronize Protocol</button>
        </div>
      </div>
    </div>
  );
            }
