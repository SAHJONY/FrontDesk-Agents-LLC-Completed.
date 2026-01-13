import { createClient } from '@supabase/supabase-js';

// This function checks if a slot is available before the AI confirms it
export async function checkAvailability(businessId: string, date: string, time: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check against existing appointments to avoid double-booking
  const { data } = await supabase
    .from('appointments')
    .select('*')
    .eq('business_id', businessId)
    .eq('appointment_date', date)
    .eq('appointment_time', time);

  return data && data.length === 0;
}

// This function records the booking once the AI closes the deal
export async function bookAppointment(details: {
  lead_id: string;
  user_id: string;
  date: string;
  time: string;
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return await supabase.from('appointments').insert([
    {
      lead_id: details.lead_id,
      user_id: details.user_id,
      appointment_date: details.date,
      appointment_time: details.time,
      status: 'confirmed'
    }
  ]);
}
