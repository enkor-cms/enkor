import { ISpotExtanded } from '@/features/spots';
import { Flex, Text } from '../common';
import { LazyTooltip } from './Lazy';

export type TTooltipProps = {
  spot: ISpotExtanded;
};

export const Tooltip = ({ spot }: TTooltipProps) => {
  return (
    <LazyTooltip direction="top" offset={[10, -3]}>
      <Flex>
        <Text variant="body">{spot.name}</Text>
      </Flex>
    </LazyTooltip>
  );
};
