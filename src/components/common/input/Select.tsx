import React from 'react';
import { Icon, IconNames } from '../icon';
import { Flex } from '../layout';
import { Text } from '../text';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  icon?: IconNames;
}

export const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ className, children, labelText, error, ...props }, ref) => {
    return (
      <Flex className={className + ' relative'} gap={2}>
        {labelText && (
          <label className="w-full text-left" htmlFor="select">
            <Text variant="caption" className="py-0 px-3">
              {labelText}
            </Text>
          </label>
        )}
        <div
          className={`group flex gap-2 items-stretch border border-white-300 dark:border-dark-300 w-full outline-none py-2 px-2 transition-all text-s lg:text-sm xl:text-base dark:bg-dark-200 bg-white-200 text-black-100 dark:text-white-100 group-focus:outline-none group-focus:ring-2 group-focus:ring-brand-300/10 group-focus:border-transparent
              ${error && 'border-red-500 border animate-shake'} rounded-md`}
        >
          {props.icon && <Icon name={props.icon} className="text-gray-400" />}
          <select
            id="select"
            className="w-full outline-none bg-transparent border-none text-black-100 dark:text-white-100 group-focus:outline-none group-focus:ring-2 group-focus:ring-brand-300/10 group-focus:border-transparent"
            {...props}
            ref={ref}
          >
            {children}
          </select>
        </div>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </Flex>
    );
  },
);

Select.displayName = 'Select';
