'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: API Keys Management (Elite & Growth Tier)
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Updated to your project structure
import { Key, Plus, Copy, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsed: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export default function ApiKeysPage() {
  const { user } = useAuth();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) fetchApiKeys();
  }, [user]);

  async function fetchApiKeys() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/api-keys/list?tenant_id=${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setKeys(data.keys || []);
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(keyId: string) {
    if (!confirm('Permanently delete this API key? This will stop all revenue recovery routes using this key.')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/api-keys/delete?id=${keyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchApiKeys();
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  }

  function toggleReveal(keyId: string) {
    setRevealedKeys(prev => {
      const newSet = new Set(prev);
      newSet.has(keyId) ? newSet.delete(keyId) : newSet.add(keyId);
      return newSet;
    });
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">API Keys</h1>
            <p className="text-zinc-500 mt-1 uppercase text-[10px] font-mono tracking-widest text-blue-500">
              Fleet Programmatic Access
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Key</span>
          </button>
        </div>

        {/* Security Alert */}
        <div className="mb-6 p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300">
              <p className="font-bold text-white mb-1 uppercase tracking-tight">Security Protocol</p>
              <p>API keys provide full access to your Revenue Workforce. Never share keys or commit them to public repositories.</p>
            </div>
          </div>
        </div>

        {/* Keys List */}
        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-24 bg-zinc-900 rounded-xl"></div>
             <div className="h-24 bg-zinc-900 rounded-xl"></div>
          </div>
        ) : keys.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-12 text-center">
            <Key className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
            <h3 className="text-lg font-bold text-white">No Active Keys</h3>
            <p className="text-zinc-500 text-sm mb-6">Create a key to start integrating your workforce with external tools.</p>
            <button onClick={() => setShowCreateModal(true)} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
              Create First Key
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.id} className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 hover:border-zinc-700 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-3 tracking-tight uppercase">{key.name}</h3>
                    <div className="flex items-center space-x-2">
                      <code className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-blue-400">
                        {revealedKeys.has(key.id) ? `${key.keyPrefix}_SECURE_KEY_REVEALED` : `${key.keyPrefix}••••••••••••`}
                      </code>
                      <button onClick={() => toggleReveal(key.id)} className="p-1 hover:bg-zinc-800 rounded transition-colors">
                        {revealedKeys.has(key.id) ? <EyeOff className="w-4 h-4 text-zinc-500" /> : <Eye className="w-4 h-4 text-zinc-500" />}
                      </button>
                      <button onClick={() => copyToClipboard(key.keyPrefix)} className="p-1 hover:bg-zinc-800 rounded transition-colors">
                        <Copy className="w-4 h-4 text-zinc-500" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(key.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateKeyModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={() => { setShowCreateModal(false); fetchApiKeys(); }} 
        />
      )}
    </div>
  );
}

// Modal Component defined below (same logic as user provided but with Glassmorphism styles)
function CreateKeyModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [expiresIn, setExpiresIn] = useState('never');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newApiKey, setNewApiKey] = useState<string | null>(null);

  async function handleCreate() {
    if (!name) return setError('Key name required');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/api-keys/create', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expiresIn }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setNewApiKey(data.apiKey);
    } catch (err: any) { setError(err.message); } 
    finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-8 shadow-2xl">
        {!newApiKey ? (
          <>
            <h2 className="text-xl font-black mb-6">Generate Workforce Key</h2>
            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Key Label</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Production_Fleet_01" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Expiration</label>
                <select value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none">
                  <option value="never">Permanent</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-8">
              <button onClick={onClose} className="flex-1 py-2 text-zinc-400 font-bold text-sm">Cancel</button>
              <button onClick={handleCreate} disabled={loading} className="flex-1 bg-white text-black font-bold py-2 rounded-lg hover:bg-zinc-200 transition-colors">
                {loading ? 'Generating...' : 'Confirm'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-black mb-2">Key Generated</h2>
            <p className="text-red-500 text-[10px] font-bold uppercase mb-6 tracking-widest">Copy now. This key will never be shown again.</p>
            <code className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-blue-400 break-all mb-6">{newApiKey}</code>
            <button onClick={onSuccess} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
