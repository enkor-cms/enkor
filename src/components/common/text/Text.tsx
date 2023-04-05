import { FunctionComponent } from 'react';
import { ITextProps, textConfig } from './index';

export const Text: FunctionComponent<ITextProps> = ({
  children,
  weight,
  variant: variant,
  color,
  className,
  ...props
}: ITextProps) => {
  // this line doesn't work in the client, find something better for build the string
  const colorClass = `text-black-100 dark:text-white-100`;

  const weightClass = {
    100: 'font-thin',
    200: 'font-light',
    300: 'font-normal',
    400: 'font-medium',
    500: 'font-semibold',
    600: 'font-bold',
    700: 'font-extrabold',
  };

  const weightVariantClass = {
    title: 'font-bold',
    subtitle: 'font-bold',
    body: 'font-normal',
    caption: 'font-normal',
    overline: 'font-normal',
  };

  return (
    <div
      className={`${color ? color : colorClass}  ${textConfig[variant]} ${
        weight ? weightClass[weight] : weightVariantClass[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
