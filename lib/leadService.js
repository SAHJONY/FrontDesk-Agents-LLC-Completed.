import { supabase } from './supabaseClient.js'

export async function insertNewLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select()

  return { data, error }
}
