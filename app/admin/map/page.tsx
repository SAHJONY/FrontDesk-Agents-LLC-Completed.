import { createClient } from '@/lib/supabase/server';
import MapComponent from '@/components/admin/MapComponent'; // A client component using Leaflet or Google Maps

export default async function NationwideMap() {
  const supabase = createClient();
  
  // 1. Fetch individual location data from your Sovereign Vault
  const { data: leads } = await supabase
    .from('leads')
    .select('full_name, address, metadata, vertical')
    .filter('source', 'eq', 'location-individual-targeting');

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="p-4 bg-black text-white flex justify-between">
        <h1 className="text-xl font-bold">Nationwide Individual Coverage</h1>
        <span>Total Individual Targets: {leads?.length || 0}</span>
      </header>
      
      {/* 2. Render the interactive map with lead pins */}
      <MapComponent leads={leads} />
    </div>
  );
}
