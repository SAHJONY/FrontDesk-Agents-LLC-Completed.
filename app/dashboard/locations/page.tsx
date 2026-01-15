"use client";

import { useState } from "react";
import { Plus, MapPin, Phone, Building2, Trash2 } from "lucide-react";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits";

// Mock data for current locations
const initialLocations = [
  { id: "1", name: "Downtown Office", address: "123 Main St", phone: "+1 (555) 000-1234" }
];

export default function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  // 1. HARDCODED FOR NOW: This would come from your Supabase 'subscriptions' table
  const userTier = "Starter"; 
  const { isOverLimit, nextTier } = useSubscriptionLimits(userTier, locations.length);

  const handleAddLocation = () => {
    // 2. THE REVENUE GUARD: Check if they can add another location
    if (isOverLimit) {
      setShowUpgrade(true); 
      return;
    }
    
    // Logic to open a form/modal to add a new location
    alert("Opening 'Add Location' Form...");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Locations</h1>
          <p className="text-slate-400">Manage AI receptionists across your physical branches.</p>
        </div>
        
        <button 
          onClick={handleAddLocation}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Add Location
        </button>
      </div>

      {/* Location List */}
      <div className="grid gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-sky-400">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{loc.name}</h3>
                <div className="flex gap-4 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {loc.address}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {loc.phone}</span>
                </div>
              </div>
            </div>
            <button className="text-slate-600 hover:text-red-400 p-2">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State visual check */}
      {locations.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-[3rem]">
          <p className="text-slate-500">No locations added yet.</p>
        </div>
      )}

      {/* 3. THE UPSELL MODAL: Only renders when triggered */}
      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        currentTier={userTier}
        nextTier={nextTier}
      />
    </div>
  );
}
