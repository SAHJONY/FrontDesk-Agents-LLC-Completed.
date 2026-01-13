import { createClient } from '@supabase/supabase-js'

// Use environment variables for security!
const supabaseUrl = process.env.SUPABASE_URL! 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
