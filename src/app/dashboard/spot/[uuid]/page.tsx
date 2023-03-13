import { SpotModal } from '@/components/spot';
import { createClient } from '@/lib/supabase/server';

export default async function Page({ params }: { params: { uuid: string } }) {
  const supabase = createClient();
  const { data: spot, error } = await supabase
    .from('spots')
    .select(
      `
        *,
        location(*)
      `
    )
    .eq('id', params.uuid)
    .single();

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-5/6">
      <SpotModal spot={spot} />
    </div>
  );
}
