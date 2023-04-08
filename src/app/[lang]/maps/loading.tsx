import { Flex, Icon } from '@/components/common';

export default function Loading() {
  return (
    <Flex fullSize>
      <Icon name="spin" className="animate-spin" />
    </Flex>
  );
}
