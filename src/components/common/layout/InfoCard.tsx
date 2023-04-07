import React from 'react';
import { Icon } from '../icon';
import { tagsConfig } from '../tags';
import { Text } from '../text';
import { Flex } from './Flex';
import { IInfoCardProps } from './types';

export const InfoCard = React.forwardRef<HTMLDivElement, IInfoCardProps>(
  ({ children, className = '', color, ...props }, ref) => {
    return (
      <div
        className={`flex flex-row gap-2 w-full bg-opacity-10 ${tagsConfig[color].bgColor} border ${tagsConfig[color].borderColor} rounded-md px-2 py-2 m-0 w-fit ${className}`}
        ref={ref}
        {...props}
      >
        <Icon name={props.icon} color="text-warning-500" />
        <Flex
          className="p-1"
          verticalAlign="top"
          horizontalAlign="left"
          gap={1}
        >
          <Text variant="caption" color="text-warning-500" weight={400}>
            {props.message}
          </Text>
          {children}
        </Flex>
      </div>
    );
  },
);

InfoCard.displayName = 'InfoCard';
