'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Plus, Settings, Trash2, PhoneCall, PhoneIncoming, PhoneOutgoing, Link2 } from 'lucide-react';

interface PhoneNumber {
  id: string;
  number: string;
  areaCode: string;
  countryCode: string;
  status: 'active' | 'inactive';
  linkedAgent?: string;
  callsReceived: number;
  callsMade: number;
  purchasedDate: string;
}

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([
    {
      id: '1',
      number: '+1 (555) 123-4567',
      areaCode: '555',
      countryCode: 'US',
      status: 'active',
      linkedAgent: 'Maria Rodriguez',
      callsReceived: 247,
      callsMade: 89,
      purchasedDate: '2024-01-15'
    }
  ]);

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [newNumber, setNewNumber] = useState({
    areaCode: '',
    countryCode: 'US'
  });

  const handlePurchaseNumber = async () => {
    setPurchasing(true);
    try {
      // Call API to purchase number via Bland AI
      const response = await fetch('/api/bland/purchase-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNumber)
      });

      if (response.ok) {
        const data = await response.json();
        const purchasedNumber: PhoneNumber = {
          id: Date.now().toString(),
          number: data.phone_number,
          areaCode: newNumber.areaCode,
          countryCode: newNumber.countryCode,
          status: 'active',
          callsReceived: 0,
          callsMade: 0,
          purchasedDate: new Date().toISOString().split('T')[0]
        };
        
        setNumbers([...numbers, purchasedNumber]);
        setShowPurchaseModal(false);
        setNewNumber({ areaCode: '', countryCode: 'US' });
      }
    } catch (error) {
      console.error('Failed to purchase number:', error);
      alert('Failed to purchase number. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleDeleteNumber = async (id: string) => {
    if (confirm('Are you sure you want to release this phone number?')) {
      setNumbers(numbers.filter(n => n.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Phone Numbers</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your phone numbers and call routing</p>
          </div>
        </div>
        <button
          onClick={() => setShowPurchaseModal(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Purchase Number
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Numbers</span>
            <Phone className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">{numbers.length}</div>
          <div className="text-xs text-slate-500 mt-1">{numbers.filter(n => n.status === 'active').length} active</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Calls Received</span>
            <PhoneIncoming className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {numbers.reduce((sum, n) => sum + n.callsReceived, 0)}
          </div>
          <div className="text-xs text-green-500 mt-1">+12% this week</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Calls Made</span>
            <PhoneOutgoing className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {numbers.reduce((sum, n) => sum + n.callsMade, 0)}
          </div>
          <div className="text-xs text-green-500 mt-1">+8% this week</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Linked Agents</span>
            <Link2 className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {numbers.filter(n => n.linkedAgent).length}
          </div>
          <div className="text-xs text-slate-500 mt-1">of {numbers.length} total</div>
        </div>
      </div>

      {/* Numbers List */}
      <div className="grid gap-4">
        {numbers.map(number => (
          <div key={number.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{number.number}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      number.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {number.status.charAt(0).toUpperCase() + number.status.slice(1)}
                    </span>
                    {number.linkedAgent && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 flex items-center gap-1">
                        <Link2 className="w-3 h-3" />
                        {number.linkedAgent}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>Area Code: {number.areaCode}</span>
                    <span>•</span>
                    <span>Country: {number.countryCode}</span>
                    <span>•</span>
                    <span>Purchased: {new Date(number.purchasedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-slate-400" />
                </button>
                <button 
                  onClick={() => handleDeleteNumber(number.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>

            {/* Number Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PhoneIncoming className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">Calls Received</span>
                </div>
                <div className="text-2xl font-bold text-white">{number.callsReceived}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PhoneOutgoing className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Calls Made</span>
                </div>
                <div className="text-2xl font-bold text-white">{number.callsMade}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Number Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Purchase Phone Number</h2>
              <p className="text-slate-400 text-sm mt-1">Get a new number powered by Bland.AI</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Country
                </label>
                <select
                  value={newNumber.countryCode}
                  onChange={(e) => setNewNumber({ ...newNumber, countryCode: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Area Code (Optional)
                </label>
                <input
                  type="text"
                  value={newNumber.areaCode}
                  onChange={(e) => setNewNumber({ ...newNumber, areaCode: e.target.value })}
                  placeholder="e.g., 555"
                  maxLength={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">Leave blank for random assignment</p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-sm text-cyan-300">
                  <strong>Cost:</strong> $1.50/month + usage fees
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  You'll be charged monthly for this number. Cancel anytime.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setShowPurchaseModal(false)}
                disabled={purchasing}
                className="px-6 py-3 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchaseNumber}
                disabled={purchasing}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-lg transition-colors"
              >
                {purchasing ? 'Purchasing...' : 'Purchase Number'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
