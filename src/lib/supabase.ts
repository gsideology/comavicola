import { createClient } from '@supabase/supabase-js';

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const supabaseUrl = getEnvVar('REACT_APP_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('REACT_APP_SUPABASE_ANON_KEY');

console.log('Initializing Supabase client with URL:', supabaseUrl);

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error('Invalid Supabase URL format');
}

// Create the client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey
    }
  }
}); 