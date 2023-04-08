import { useDictionary } from '@/components/DictionaryProvider';
import { Button } from '@/components/common/button';
import { FunctionComponent } from 'react';
import { Text } from '../text';
import { TDefaultFooterProps, TDefaultHeaderProps } from './types';

export const DefaultHeader: FunctionComponent<TDefaultHeaderProps> = ({
  title,
}) => {
  return (
    <div className="h-16 flex justify-between items-center border-b border-gray-300 dark:border-dark-300 p-3">
      <Text variant="body">{title}</Text>
    </div>
  );
};

export const DefaultFooter: FunctionComponent<TDefaultFooterProps> = ({
  onCancel,
  onConfirm,
}) => {
  const dictionary = useDictionary();

  return (
    <div className="flex justify-end border-t border-gray-300 dark:border-dark-300 p-3">
      {onCancel && (
        <Button
          variant="primary"
          text={dictionary.common.cancel}
          onClick={onCancel}
        />
      )}
      {onConfirm && (
        <Button
          text={dictionary.common.confirm}
          variant="secondary"
          onClick={onConfirm}
        />
      )}
    </div>
  );
};
