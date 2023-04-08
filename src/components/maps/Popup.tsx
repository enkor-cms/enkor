import { ISpotExtanded } from '@/features/spots';
import { Flex } from '../common';
import { SpotCardSmall } from '../spot';
import { LazyPopup } from './Lazy';
import './popup.css';

export type TPopupProps = {
  spot: ISpotExtanded;
};

export const Popup = ({ spot }: TPopupProps) => {
  return (
    <LazyPopup offset={[10, -3]} className="bg-white-100 dark:bg-dark-100">
      <Flex className="w-full">
        <SpotCardSmall spot={spot} orientation="vertical" openFloatingPanel />
      </Flex>
    </LazyPopup>
  );
};
