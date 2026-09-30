import { createClient } from '@supabase/supabase-js';

// Safe fallback credentials so the project works immediately on Vercel/Netlify preview deployments
const DEFAULT_SUPABASE_URL = 'https://ncugpptsnprphnutnqov.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdWdwcHRzbnBycGhudXRucW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzE2ODksImV4cCI6MjA5MTUwNzY4OX0.mWr7qkUbv4gfQOVt0MTibVJZRMFs1h6_6LNkqWnQgmg';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
