'use client';

import React from 'react';

export const WorldMap = () => {
  // Simulación de coordenadas de nodos activos (Lat/Long aproximados para SVG)
  const activeNodes = [
    { id: 1, x: '25%', y: '35%', label: 'Portland (HQ)' },
    { id: 2, x: '48%', y: '45%', label: 'Madrid Node' },
    { id: 3, x: '75%', y: '65%', label: 'Singapore Node' },
    { id: 4, x: '30%', y: '70%', label: 'Sao Paulo Node' },
    { id: 5, x: '55%', y: '30%', label: 'London Node' },
  ];

  return (
    <div className="relative w-full h-[400px] bg-slate-950/50 rounded-xl overflow-hidden border border-white/5">
      {/* SVG de Mapa Mundi Minimalista */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full opacity-20 filter grayscale brightness-150"
        fill="currentColor"
      >
        <path d="M150,150 L180,150 L200,180 L180,220 L140,200 Z M450,100 L500,80 L550,120 L530,180 L470,160 Z M700,300 L750,280 L800,320 L780,380 L720,360 Z" />
        {/* Aquí puedes insertar un path SVG completo de un mapa real */}
        <text x="400" y="250" fontSize="10" fill="white" opacity="0.5">GLOBAL INFRASTRUCTURE ACTIVE</text>
      </svg>

      {/* Nodos de Activación Dinámicos */}
      {activeNodes.map((node) => (
        <div
          key={node.id}
          className="absolute group"
          style={{ left: node.x, top: node.y }}
        >
          {/* Efecto de Ping (Onda) */}
          <span className="absolute -left-2 -top-2 h-5 w-5 animate-ping rounded-full bg-brand-cyan opacity-75"></span>
          {/* Punto Sólido */}
          <span className="relative block h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_#22d3ee]"></span>
          
          {/* Tooltip al pasar el mouse */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-white/20 px-2 py-1 rounded text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {node.label} • ACTIVE
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="flex gap-1">
          <span className="h-1 w-1 bg-brand-cyan rounded-full animate-pulse"></span>
          <span className="h-1 w-1 bg-brand-cyan rounded-full animate-pulse delay-75"></span>
          <span className="h-1 w-1 bg-brand-cyan rounded-full animate-pulse delay-150"></span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
          Live Sovereign Feeds
        </span>
      </div>
    </div>
  );
};
