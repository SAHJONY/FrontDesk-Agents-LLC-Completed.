'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function exportGlobalClinics() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  // Fetch clinics with their subscription tier and country
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select('name, email, country, region_tier, language, created_at');

  if (error || !clinics) return { error: "Failed to fetch data" };

  // CSV Header
  const headers = "Clinic Name,Email,Country,PPP Tier,Primary Language,Joined Date\n";
  
  // Map data to CSV rows
  const rows = clinics.map(c => 
    `"${c.name}","${c.email}","${c.country}","${c.region_tier}","${c.language}","${new Date(c.created_at).toLocaleDateString()}"`
  ).join("\n");

  const csvContent = headers + rows;
  
  // Return the content as a base64 string for the browser to download
  return { data: Buffer.from(csvContent).toString('base64') };
}
