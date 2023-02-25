import { FunctionComponent } from 'react';
import { IFlexProps } from './types';

export const Flex: FunctionComponent<IFlexProps> = ({
  children,
  className,
  direction = 'column',
  verticalAlign = 'center',
  horizontalAlign = 'center',
  ...props
}) => {
  const directionClass = {
    row: 'flex-row',
    column: 'flex-col',
  };

  const verticalAlignClass = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  };

  const horizontalAlignClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={`flex ${directionClass[direction]} ${verticalAlignClass[verticalAlign]} ${horizontalAlignClass[horizontalAlign]} gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
