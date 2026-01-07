'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECRET_CATEGORIES } from '@/lib/services/secrets-manager';

interface Secret {
  id: string;
  key: string;
  value: string;
  category: keyof typeof SECRET_CATEGORIES;
  description?: string;
  environment: 'development' | 'staging' | 'production' | 'all';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export function SecretsManager() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState<Secret | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for adding new secret
  const [newSecret, setNewSecret] = useState({
    key: '',
    value: '',
    category: 'api_key' as keyof typeof SECRET_CATEGORIES,
    environment: 'production' as Secret['environment'],
    description: ''
  });

  useEffect(() => {
    loadSecrets();
  }, [selectedEnvironment]);

  const loadSecrets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedEnvironment !== 'all') {
        params.append('environment', selectedEnvironment);
      }
      
      const response = await fetch(`/api/secrets?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setSecrets(data.secrets);
      }
    } catch (error) {
      console.error('Failed to load secrets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSecret = async () => {
    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSecret)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowAddModal(false);
        setNewSecret({
          key: '',
          value: '',
          category: 'api_key',
          environment: 'production',
          description: ''
        });
        loadSecrets();
      } else {
        alert(data.error || 'Failed to create secret');
      }
    } catch (error) {
      console.error('Failed to add secret:', error);
      alert('Failed to add secret');
    }
  };

  const handleDeleteSecret = async (secretId: string) => {
    if (!confirm('Are you sure you want to delete this secret? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/secrets?secretId=${secretId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadSecrets();
      } else {
        alert(data.error || 'Failed to delete secret');
      }
    } catch (error) {
      console.error('Failed to delete secret:', error);
      alert('Failed to delete secret');
    }
  };

  const handleViewSecret = async (secret: Secret) => {
    if (!confirm('⚠️ WARNING: You are about to view a sensitive secret value. Make sure no one is watching your screen.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/secrets/${secret.id}?confirm=true`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedSecret(data.secret);
        setShowViewModal(true);
      } else {
        alert(data.error || 'Failed to retrieve secret');
      }
    } catch (error) {
      console.error('Failed to view secret:', error);
      alert('Failed to view secret');
    }
  };

  const filteredSecrets = secrets.filter(secret =>
    secret.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    secret.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedSecrets = filteredSecrets.reduce((acc, secret) => {
    if (!acc[secret.category]) {
      acc[secret.category] = [];
    }
    acc[secret.category].push(secret);
    return acc;
  }, {} as Record<string, Secret[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Secrets Manager</h2>
          <p className="text-gray-400 mt-1">Securely manage platform secrets and environment variables</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Secret
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Environment Filter */}
        <select
          value={selectedEnvironment}
          onChange={(e) => setSelectedEnvironment(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
        >
          <option value="all">All Environments</option>
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </select>

        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search secrets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Export Button */}
        <button
          onClick={() => window.location.href = `/api/secrets/export?environment=${selectedEnvironment}`}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Secrets List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Loading secrets...</p>
        </div>
      ) : filteredSecrets.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-gray-400 text-lg">No secrets found</p>
          <p className="text-gray-500 text-sm mt-2">Add your first secret to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSecrets).map(([category, categorySecrets]) => (
            <div key={category} className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
              {/* Category Header */}
              <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center gap-3">
                <span className="text-2xl">{SECRET_CATEGORIES[category as keyof typeof SECRET_CATEGORIES].icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {SECRET_CATEGORIES[category as keyof typeof SECRET_CATEGORIES].label}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {SECRET_CATEGORIES[category as keyof typeof SECRET_CATEGORIES].description}
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-500">{categorySecrets.length} secret(s)</span>
              </div>

              {/* Secrets Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Environment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Updated</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {categorySecrets.map((secret) => (
                      <tr key={secret.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm text-cyan-400 font-mono">{secret.key}</code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-300">{secret.description || '-'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            secret.environment === 'production' ? 'bg-red-500/20 text-red-400' :
                            secret.environment === 'staging' ? 'bg-yellow-500/20 text-yellow-400' :
                            secret.environment === 'development' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {secret.environment}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(secret.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewSecret(secret)}
                            className="text-cyan-400 hover:text-cyan-300 mr-4"
                            title="View secret value"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteSecret(secret.id)}
                            className="text-red-400 hover:text-red-300"
                            title="Delete secret"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Secret Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Add New Secret</h3>
              
              <div className="space-y-4">
                {/* Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newSecret.key}
                    onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value.toUpperCase() })}
                    placeholder="OPENAI_API_KEY"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Uppercase letters, numbers, and underscores only</p>
                </div>

                {/* Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Value <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={newSecret.value}
                    onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
                    placeholder="sk-..."
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={newSecret.category}
                    onChange={(e) => setNewSecret({ ...newSecret, category: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                  >
                    {Object.entries(SECRET_CATEGORIES).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Environment */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Environment <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={newSecret.environment}
                    onChange={(e) => setNewSecret({ ...newSecret, environment: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                    <option value="all">All Environments</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newSecret.description}
                    onChange={(e) => setNewSecret({ ...newSecret, description: e.target.value })}
                    placeholder="OpenAI API key for AI agents"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddSecret}
                  disabled={!newSecret.key || !newSecret.value}
                  className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Add Secret
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Secret Modal */}
      <AnimatePresence>
        {showViewModal && selectedSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowViewModal(false);
              setSelectedSecret(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full border border-red-500/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold text-white">Viewing Secret Value</h3>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="text-red-400 text-sm">
                  ⚠️ This secret value is sensitive. Do not share it with anyone or commit it to version control.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Key</label>
                  <code className="block px-4 py-2 bg-gray-900 text-cyan-400 rounded-lg font-mono">
                    {selectedSecret.key}
                  </code>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
                  <div className="relative">
                    <pre className="px-4 py-3 bg-gray-900 text-white rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
                      {selectedSecret.value}
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedSecret.value);
                        alert('Secret copied to clipboard');
                      }}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedSecret(null);
                }}
                className="w-full mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
