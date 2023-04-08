import React from 'react';
import { Icon } from '../icon';
import { tagsConfig } from '../tags';
import { Text } from '../text';
import { Flex } from './Flex';
import { IInfoCardProps } from './types';

export const InfoCard = React.forwardRef<HTMLDivElement, IInfoCardProps>(
  ({ children, className = '', color, ...props }, ref) => {
    const textColor = {
      red: 'text-red-500',
      green: 'text-green-500',
      blue: 'text-blue-500',
      yellow: 'text-yellow-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      pink: 'text-pink-500',
      brand: 'text-brand-500',
      warning: 'text-warning-500',
    };

    return (
      <div
        className={`flex flex-row gap-2 w-full bg-opacity-10 ${tagsConfig[color].bgColor} border ${tagsConfig[color].borderColor} rounded-md px-2 py-2 m-0 w-fit ${className}`}
        ref={ref}
        {...props}
      >
        <Icon name={props.icon} color={textColor[color]} />
        <Flex
          className="p-1"
          verticalAlign="top"
          horizontalAlign="left"
          gap={1}
        >
          <Text variant="caption" color={textColor[color]} weight={400}>
            {props.message}
          </Text>
          {children}
        </Flex>
      </div>
    );
  },
);

InfoCard.displayName = 'InfoCard';
