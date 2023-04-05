import { Flex, Text, VirtualizedTable } from '@/components/common';
import { listCreatorSpots } from '@/features/spots';
import { createClient } from '@/lib/supabase/server';
import { toast } from 'react-toastify';

export default async function Page() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { spots, error } = await listCreatorSpots({
    client: supabase,
    creatorId: session?.user.id as string,
    limit: 50,
  });

  if (error) {
    toast.error(error.message);
  }

  if (!spots) {
    return null;
  }

  return (
    <>
      <VirtualizedTable
        rows={spots}
        headers={[
          { title: 'name', width: 300 },
          { title: 'description' },
          { title: 'difficulty', width: 100 },
          { title: 'rock_type', width: 100 },
          {
            title: 'cliff_height',
            width: 150,
          },
        ]}
      />
      <Flex fullSize>
        <Text variant="body" weight={500} className="capitalize">
          Cou
        </Text>
      </Flex>
    </>
  );
}
