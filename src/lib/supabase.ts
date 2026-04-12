import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Contact form will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.');
}

// Only initialize if we have a URL, otherwise export a dummy or handle lazily
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;
