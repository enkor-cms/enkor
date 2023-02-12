import { FunctionComponent } from 'react';
import { Icon } from '../icon';
import { TButtonProps, TButtonStyle } from './types';

export const Button: FunctionComponent<TButtonProps> = ({
  size = 'medium',
  isLoader = false,
  style = 'primary',
  ...props
}) => {
  const sizeDict = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const heightDict = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
  };

  return (
    <button
      className={`${getButtonClass(style)} ${
        props.disabled ? 'opacity-50' : ''
      } ${
        props.icon
          ? `flex items-center justify-between ${
              !isLoader ? 'pl-1 py-0' : 'py-0'
            }`
          : ''
      } ${heightDict[size]}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {isLoader ? (
        <div className="flex items-center animate-spin-slow">
          <Icon
            scale={size === 'small' ? 0.6 : 0.8}
            name={'spin'}
            color={'currentColor'}
            fill={props.iconFill}
          />
        </div>
      ) : (
        <>
          {props.icon && (
            <div className="flex items-center pr-1">
              <Icon
                scale={size === 'small' ? 0.6 : 0.8}
                name={props.icon}
                color={'currentColor'}
                fill={props.iconFill}
              />
            </div>
          )}
          <div className={`${sizeDict[size]}`}>{props.title}</div>
        </>
      )}
    </button>
  );
};

const getButtonClass = (style: TButtonStyle) => {
  switch (style) {
    case 'primary':
      return 'bg-white-100 dark:bg-dark-200 hover:bg-white-300 dark:hover:bg-dark-300 py-1 px-4 m-1 border border-white-300 dark:border-dark-300 disabled:cursor-not-allowed rounded shadow transition ease-in-out font-sans font-normal text-dark-100 dark:text-white-200';
    case 'secondary':
      return 'bg-dark-200 dark:bg-white-100 hover:bg-dark-300 dark:hover:bg-white-300 py-1 px-4 m-1 border border-dark-300 dark:border-white-300 disabled:cursor-not-allowed rounded shadow transition ease-in-out font-sans font-normal text-white-200 dark:text-dark-100';
    case 'alert':
      return 'bg-red-500 hover:bg-red-400 py-1 px-4 m-1 border border-red-400 rounded shadow transition ease-in-out font-sans font-normal text-white-200';
    case 'success':
      return 'bg-green-600 hover:bg-green-500 py-1 px-4 m-1 border border-green-400 rounded shadow transition ease-in-out font-sans font-normal text-white-200';
    default:
      return 'bg-brand-200 hover:bg-brand-100 py-1 px-4 m-1 border border-brand-300 rounded shadow transition ease-in-out font-sans font-normal text-white-200';
  }
};
