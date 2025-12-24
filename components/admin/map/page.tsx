'use client';

import { useEffect, useRef } from 'react';

interface Lead {
  full_name: string;
  address: string;
  metadata?: any;
  vertical?: string;
}

interface MapComponentProps {
  leads: Lead[] | null;
}

export default function MapComponent({ leads }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !leads) return;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix for default marker icons in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Initialize map if not already created
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4); // Center of USA

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);
      }

      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add markers for each lead (you'd need to geocode addresses)
      leads.forEach((lead) => {
        // For now, random positions - you'll need actual geocoding
        const lat = 25 + Math.random() * 24; // USA latitude range
        const lng = -125 + Math.random() * 58; // USA longitude range

        L.marker([lat, lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <strong>${lead.full_name}</strong><br/>
            ${lead.address}<br/>
            <em>${lead.vertical || 'N/A'}</em>
          `);
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leads]);

  return (
    <div 
      ref={mapRef} 
      className="flex-1 w-full"
      style={{ minHeight: '500px' }}
    />
  );
}
