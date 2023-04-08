import { Database } from '@/lib/db_types';
import { createClient } from '@/lib/supabase/server';
import { insertLocation } from './service';

export type TLocationInsert =
  Database['public']['Tables']['locations']['Insert'];

export type insertLocationParams = {
  client: ReturnType<typeof createClient>;
  location: TLocationInsert;
};

type InsertLocation = Awaited<ReturnType<typeof insertLocation>>;
export type InsertLocationResponseSuccess = InsertLocation['location'];
export type InsertLocationResponseError = InsertLocation['error'];
