// app/settings/scripts/page.tsx
import React from 'react';

export default function ScriptsSettingsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        AI Agent Script Management
      </h1>
      
      <div className="bg-white p-6 rounded-xl shadow-premium border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Script: FrontDesk-V4.2 (Standard)</h2>
          <button className="btn-primary-premium px-4 py-2 text-sm">Deploy Changes</button>
        </div>

        {/* Script Editor Area - Cinematic Coding Aesthetic */}
        <div className="bg-gray-900 p-6 rounded-lg text-white font-mono shadow-inner border border-gray-800">
          
          {/* Editor Header */}
          <div className="flex justify-between items-center text-xs text-gray-500 pb-3 mb-3 border-b border-gray-700">
            <span>agent_core_logic.yaml</span>
            <span>Unsaved Changes: True</span>
          </div>

          {/* Code Content */}
          <pre className="whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto custom-scrollbar">
            <code className="text-gray-300">
{`# AI Agent Core Configuration Script
# Version: 4.2 | Last Edit: 2025-12-12

agent_name: "FrontDesk-Standard-Agent"
default_language: "en-US"
security_level: "HIGH"

routing:
  - intent: "SALES_INQUIRY"
    action: "transfer_to_human(ext: 401)"
  - intent: "SUPPORT_REQUEST"
    action: "ticket_create(priority: MEDIUM)"
  - intent: "BILLING_QUERY"
    action: "data_lookup(db: finance)"

# Fallback response for unhandled intents
fallback_strategy: "transfer_to_support_queue"`}
            </code>
          </pre>
        </div>
        {/*  */}

        {/* Settings for Script Versioning */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Script History & Versioning</h3>
          <p className="text-gray-600">Review and revert to previous deployed scripts.</p>
          <button className="btn-secondary-premium px-4 py-2 mt-4 text-sm border-gray-400 text-gray-700 hover:bg-gray-100">
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
