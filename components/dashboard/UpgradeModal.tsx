"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowUpCircle, X, Check } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: string;
  nextTier: string;
}

export default function UpgradeModal({ isOpen, onClose, currentTier, nextTier }: UpgradeModalProps) {
  const upgradePrices: Record<string, string> = {
    Professional: "$699",
    Growth: "$1,299",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 max-w-md w-full relative shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Location Limit Reached</h3>
              <p className="text-slate-400 mb-8">
                Your <span className="text-sky-400 font-bold">{currentTier}</span> plan supports 1 location. 
                Upgrade to <span className="text-white font-bold">{nextTier}</span> to add up to 5 locations.
              </p>

              <div className="w-full bg-slate-950 rounded-2xl p-6 mb-8 text-left border border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">What's in {nextTier}?</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-green-500" /> 5 Total Locations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-green-500" /> Multi-staff Scheduling
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-green-500" /> Advanced CRM Connectors
                  </li>
                </ul>
              </div>

              <button className="w-full bg-sky-500 text-slate-950 py-4 rounded-2xl font-bold text-lg hover:bg-sky-400 transition-all flex items-center justify-center gap-2">
                Upgrade for {upgradePrices[nextTier]} <ArrowUpCircle size={20} />
              </button>
              
              <button onClick={onClose} className="mt-4 text-slate-500 text-sm hover:underline">
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
