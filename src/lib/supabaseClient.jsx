// src/lib/supabaseClient.jsx
import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url === 'URL' || url.trim() === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const hasValidUrl = isValidUrl(rawUrl);
const hasValidKey = !!rawKey && rawKey !== 'KEY' && rawKey.trim() !== '';
export const isSupabaseConfigured = hasValidUrl && hasValidKey;

const supabaseUrl = hasValidUrl ? rawUrl : 'https://placeholder-project.supabase.co';
const supabaseKey = hasValidKey ? rawKey : 'placeholder-anon-key';

if (!hasValidUrl || !hasValidKey) {
  console.warn(
    '⚠️ [Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing or set to placeholder values in .env.\n' +
    'Please set valid Supabase credentials in your .env file to enable authentication and database features.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase URL configured:', hasValidUrl);
console.log('Supabase Anon Key configured:', hasValidKey);
