import React from 'react';
import { Text } from '../text';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
}

export const InputText = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, children, labelText, type = 'text', error, ...props }, ref) => {
    return (
      <div className={className + ' relative'}>
        {labelText && (
          <label className="" htmlFor="txt">
            <Text style="caption" className="py-2 px-1">
              {labelText}
            </Text>
          </label>
        )}
        <div className="flex items-stretch">
          <input
            id="txt"
            autoComplete="off"
            className={`border border-white-300 dark:border-dark-300 w-full block outline-none py-2 px-2 transition-all text-s lg:text-sm xl:text-base dark:bg-dark-200 bg-white-200 text-black-100 dark:text-white-100
              ${error && 'border-red-500 border animate-shake'} ${
              children ? 'rounded-r-md' : 'rounded-md'
            }`}
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
  }
);

InputText.displayName = 'InputText';
