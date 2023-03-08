import type { Database } from '@/lib/db_types';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const createClient = () => createBrowserSupabaseClient<Database>();
