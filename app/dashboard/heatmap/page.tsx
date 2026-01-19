'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Globe, Filter, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// We dynamic import the map to prevent SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });

export default function CustomerHeatmap() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMapData() {
      // API would convert phone area codes to Lat/Long
      const res = await fetch('/api/analytics/map');
      const data = await res.json();
      setLocations(data.points);
      setLoading(false);
    }
    fetchMapData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-500 mb-2">
              <Globe size={14} className="animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Geospatial Intelligence</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter">CUSTOMER HEATMAP</h1>
          </div>
          
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-slate-900 border border-white/5 rounded-lg text-xs font-bold flex items-center gap-2">
              <MapPin size={14} className="text-cyan-500" />
              {locations.length} Active Nodes
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3 h-[600px] rounded-2xl overflow-hidden border border-white/10 relative">
            <MapContainer 
              center={[37.0902, -95.7129]} // Center of USA
              zoom={4} 
              style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              {locations.map((loc, i) => (
                <CircleMarker
                  key={i}
                  center={[loc.lat, loc.lng]}
                  radius={loc.intensity * 5}
                  pathOptions={{
                    fillColor: '#06b6d4',
                    color: '#06b6d4',
                    weight: 1,
                    fillOpacity: 0.3
                  }}
                />
              ))}
            </MapContainer>
            
            {/* Map Overlay HUD */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 text-center">Density Legend</p>
               <div className="h-2 w-32 bg-gradient-to-r from-cyan-900 via-cyan-500 to-white rounded-full" />
               <div className="flex justify-between text-[8px] text-zinc-600 mt-1 font-bold">
                 <span>LOW</span>
                 <span>CRITICAL</span>
               </div>
            </div>
          </div>

          {/* Sidebar: Top Regions */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Navigation size={16} className="text-cyan-500" /> Top Regions
              </h3>
              <div className="space-y-4">
                {[
                  { city: 'Houston, TX', calls: 142, trend: '+12%' },
                  { city: 'Los Angeles, CA', calls: 98, trend: '+8%' },
                  { city: 'Miami, FL', calls: 76, trend: '-2%' },
                  { city: 'Chicago, IL', calls: 45, trend: '+15%' }
                ].map((region, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
                    <div>
                      <p className="text-xs font-bold text-white">{region.city}</p>
                      <p className="text-[10px] text-zinc-500">{region.calls} total calls</p>
                    </div>
                    <span className="text-[10px] font-mono text-green-500">{region.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
               <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Filter size={12} /> Optimization Tip
               </p>
               <p className="text-xs text-zinc-400 italic leading-relaxed">
                 "34% of your high-intent leads are originating from the Houston area. Increasing local ad spend by 10% in this zone is recommended."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
