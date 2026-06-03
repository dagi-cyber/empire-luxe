import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co'
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

// Browser-safe client
export const supabase = createClient(supabaseUrl, supabaseAnon)

// Server-only admin client
export function createAdminClient() {
  return createClient(supabaseUrl, supabaseService, {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
  })
}