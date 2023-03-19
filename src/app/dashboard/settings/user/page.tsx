import { Text } from '@/components/common';
import { Flex } from '@/components/common/layout';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  if (!session) {
    return (
      <Flex>
        <h2>Not Found</h2>
      </Flex>
    );
  }

  return (
    <Flex fullSize>
      <Text variant="caption">{session.user.user_metadata.name}</Text>
    </Flex>
  );
}
