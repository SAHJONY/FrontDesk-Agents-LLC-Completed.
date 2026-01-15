"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Star, 
  Zap, 
  ShieldCheck, 
  Globe,
  Loader2,
  CheckCircle2
} from "lucide-react";

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  install_count: number;
  is_featured: boolean;
}

export default function MarketplaceGrid() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarketplace() {
      try {
        const res = await fetch("/api/marketplace?action=all");
        const json = await res.json();
        if (json.success) setItems(json.data);
      } catch (err) {
        console.error("Failed to load agents", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMarketplace();
  }, []);

  const handleInstall = async (itemId: string) => {
    setInstalling(itemId);
    try {
      // Logic for /api/marketplace POST action=install
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      alert("Agent deployed successfully to your location!");
    } finally {
      setInstalling(null);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-sky-500" size={40} />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Workforce Hub</h2>
          <p className="text-slate-400 text-sm">Deploy specialized agents across your locations.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="Search agents..." 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/50 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400">
                <Zap size={24} fill="currentColor" />
              </div>
              {item.is_featured && (
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 h-12 overflow-hidden">
              {item.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <Globe size={14} /> Multi-lingual
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck size={14} /> SOC2 Secure
              </div>
            </div>

            <button 
              onClick={() => handleInstall(item.id)}
              disabled={!!installing}
              className="w-full bg-slate-900 group-hover:bg-sky-500 group-hover:text-slate-950 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {installing === item.id ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Plus size={18} /> Deploy to Location
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
