import { createClient } from '@supabase/supabase-js';

// Note: To use the Supabase JS client in React Native, we need the REST URL and Anon Key.
// The provided .env only contains the direct postgres DATABASE_URL.
// Please add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your .env
// when you are ready to connect the client directly.

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://sgjovrsntkqyxbcqakxa.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnam92cnNudGtxeXhiY3Fha3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODgwNzgsImV4cCI6MjA5MDM2NDA3OH0.1biAAdAVdjrdSTBDWelQESZzUN4euoWPqU4AjWuZQkk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
