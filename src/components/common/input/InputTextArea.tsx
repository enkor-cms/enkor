import React, { LegacyRef } from 'react';
import { Text } from '../text';
interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
}

export const InputTextArea = React.forwardRef<HTMLTextAreaElement, IProps>(
  ({ className, children, labelText, error, ...props }, ref) => {
    return (
      <div className={className + ' relative'}>
        {labelText && (
          <label className="w-full text-left" htmlFor="txt">
            <Text variant="caption" className="py-0 px-3">
              {labelText}
            </Text>
          </label>
        )}
        <div className="flex items-stretch">
          <textarea
            id="txt"
            autoComplete="off"
            className={`border border-white-300 dark:border-dark-300 w-full block outline-none mt-1 py-2 px-2 transition-all text-s lg:text-sm xl:text-base dark:bg-dark-200 bg-white-200 text-black-100 dark:text-white-100 focus:outline-none focus:ring-2 focus:ring-brand-300/20 focus:border-transparent
              ${error && 'border-red-500 border animate-shake'} ${
              children ? 'rounded-r-md' : 'rounded-md'
            }`}
            {...props}
            ref={ref as LegacyRef<HTMLTextAreaElement>}
          ></textarea>

          <div className="flex">{children}</div>
        </div>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </div>
    );
  },
);

InputTextArea.displayName = 'InputTextArea';
