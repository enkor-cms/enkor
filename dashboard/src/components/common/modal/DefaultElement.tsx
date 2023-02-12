import { Button } from '@/components/common/button';
import { FunctionComponent } from 'react';
import { TDefaultFooterProps, TDefaultHeaderProps } from './types';

export const DefaultHeader: FunctionComponent<TDefaultHeaderProps> = ({
  title,
}) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 dark:border-dark-300 p-3">
      <div className="text-xl font-normal font-sans text-dark-100 dark:text-white-100">
        {title}
      </div>
    </div>
  );
};

export const DefaultFooter: FunctionComponent<TDefaultFooterProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="flex justify-end border-t border-gray-300 dark:border-dark-300 p-3">
      {onCancel && <Button title="Cancel" onClick={onCancel} />}
      {onConfirm && (
        <Button title="Confirm" style="secondary" onClick={onConfirm} />
      )}
    </div>
  );
};
