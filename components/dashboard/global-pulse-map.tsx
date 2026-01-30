"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// Map city names from your SQL script to X/Y percentages
const JURISDICTION_COORDS: Record<string, { x: string, y: string }> = {
  'New York, USA': { x: '25%', y: '35%' },
  'London, UK': { x: '48%', y: '28%' },
  'Singapore': { x: '82%', y: '65%' },
  'Tokyo, Japan': { x: '88%', y: '38%' },
  'Sydney, Australia': { x: '90%', y: '85%' },
  'Berlin, Germany': { x: '52%', y: '28%' },
  'Toronto, Canada': { x: '22%', y: '32%' },
  'Dubai, UAE': { x: '65%', y: '45%' },
  'Paris, France': { x: '49%', y: '32%' },
  'Sao Paulo, Brazil': { x: '35%', y: '75%' },
};

export function GlobalPulseMap() {
  const [pulses, setPulses] = useState<{ id: string, x: string, y: string }[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel('map-pulses')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'completed_calls' }, 
        (payload) => {
          const coords = JURISDICTION_COORDS[payload.new.jurisdiction];
          if (coords) {
            const newPulse = { id: payload.new.id, ...coords };
            setPulses(prev => [...prev, newPulse]);
            // Remove pulse after 3 seconds
            setTimeout(() => {
              setPulses(prev => prev.filter(p => p.id !== newPulse.id));
            }, 3000);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-950/50 rounded-3xl border border-emerald-500/20 overflow-hidden backdrop-blur-xl">
      <div className="absolute inset-0 opacity-20 grayscale invert">
        {/* Simple World Map Placeholder SVG or Image */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
          className="w-full h-full object-cover"
          alt="World Map"
        />
      </div>

      <AnimatePresence>
        {pulses.map((pulse) => (
          <motion.div
            key={pulse.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-4 h-4 bg-emerald-500 rounded-full blur-sm"
            style={{ left: pulse.x, top: pulse.y }}
          />
        ))}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase italic">
          Live Inbound Pulse: Active
        </span>
      </div>
    </div>
  );
}
