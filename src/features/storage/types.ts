import { createClient } from '@/lib/supabase/server';

export type uploadFileParams = {
  client: ReturnType<typeof createClient>;
  path: string;
  file: File;
};

export type uploadFilesParams = {
  client: ReturnType<typeof createClient>;
  path: string;
  files: File[];
};
