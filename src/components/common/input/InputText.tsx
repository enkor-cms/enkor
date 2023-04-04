import React from 'react';
import { Icon, IconNames } from '../icon';
import { Text } from '../text';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  icon?: IconNames;
}

export const InputText = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, children, labelText, type = 'text', error, ...props }, ref) => {
    return (
      <div className={className + ' relative'}>
        {labelText && (
          <label className="w-full text-left mb-2" htmlFor="txt">
            <Text variant="caption" className="py-0 px-3">
              {labelText}
            </Text>
          </label>
        )}
        <div
          className={`group flex gap-2 items-stretch border border-white-300 dark:border-dark-300 w-full outline-none py-2 px-2 transition-all text-s lg:text-sm xl:text-base dark:bg-dark-200 bg-white-200 text-black-100 dark:text-white-100 group-focus:outline-none group-focus:ring-2 group-focus:ring-brand-300/10 group-focus:border-transparent
              ${error && 'border-red-500 border animate-shake'} ${
            children ? 'rounded-r-md' : 'rounded-md'
          }`}
        >
          {props.icon && <Icon name={props.icon} className="text-gray-400" />}
          <input
            id="txt"
            autoComplete="off"
            className="w-full outline-none bg-transparent border-none text-black-100 dark:text-white-100 group-focus:outline-none group-focus:ring-2 group-focus:ring-brand-300/10 group-focus:border-transparent"
            {...props}
            ref={ref}
            type={type}
          ></input>
          <div className="flex">{children}</div>
        </div>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </div>
    );
  },
);

InputText.displayName = 'InputText';
