import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://osejcfdlqcnfvlkzxnxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZWpjZmRscWNuZnZsa3p4bnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzEyODQsImV4cCI6MjA4MDQ0NzI4NH0.cvq7E11KQSYh22xnx_n_1zeEKAcvElXpPgMYAV1CLKc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
