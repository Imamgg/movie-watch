import { createClient } from "@supabase/supabase-js";

// Uses process.env or falls back to placeholders so the app doesn't crash before being configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
