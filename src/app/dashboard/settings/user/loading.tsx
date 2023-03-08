import { Icon } from '@/components/common/icon';
import { Flex } from '@/components/common/layout';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Flex>
      <Icon name="spin" color="text-dark-300" className="animate-spin" />
    </Flex>
  );
}
