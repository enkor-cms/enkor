import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createClient();

  const { data: Posts, error } = await supabase.from('Posts').select('*');

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <pre>{JSON.stringify({ error }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <pre>{JSON.stringify({ Posts }, null, 2)}</pre>
    </div>
  );
}
