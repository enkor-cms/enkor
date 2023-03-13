import { Button } from '@/components/common/button';
import { FunctionComponent } from 'react';
import { Text } from '../text';
import { TDefaultFooterProps, TDefaultHeaderProps } from './types';

export const DefaultHeader: FunctionComponent<TDefaultHeaderProps> = ({
  title,
}) => {
  return (
    <div className="h-16 flex justify-between items-center border-b border-gray-300 dark:border-dark-300 p-3">
      <Text style="body">{title}</Text>
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
        <Button title="Confirm" variant="secondary" onClick={onConfirm} />
      )}
    </div>
  );
};
