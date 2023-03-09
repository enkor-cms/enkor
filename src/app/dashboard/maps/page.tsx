import { Card, Flex } from '@/components/common';
import { Text } from '@/components/common/text';

export default async function Page() {
  return (
    <Card className="m-2">
      <Flex>
        <Text style="body">Maps</Text>
      </Flex>
    </Card>
  );
}
