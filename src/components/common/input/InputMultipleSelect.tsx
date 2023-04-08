import React, { useState } from 'react';
import { Button } from '../button';
import { IconNames } from '../icon';
import { Flex } from '../layout';
import { Text } from '../text';

interface IProps<T> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  icon?: IconNames;
  options: T[];
  onChange: (selectedOptions: T[]) => void;
}

export const InputMultipleSelect = <T extends string>({
  labelText,
  error,
  children,
  options,
  onChange,
}: IProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      const newSelectedOptions = selectedOptions.filter(
        (item) => item !== option,
      );
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    } else {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    }
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
    onChange(options);
  };

  const handleUnselectAll = () => {
    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <Flex className="relative w-full" gap={2} direction="column">
      {labelText && (
        <Flex
          className="w-full"
          direction="row"
          gap={2}
          horizontalAlign="center"
          verticalAlign="stretch"
        >
          <label className="h-full w-full text-left">
            <Text variant="caption" className="py-0 px-3">
              {labelText}
            </Text>
          </label>
          <Flex
            className="w-full"
            direction="row"
            gap={2}
            horizontalAlign="right"
            verticalAlign="center"
          >
            <Button
              text="Select All"
              variant="none"
              type="button"
              onClick={handleSelectAll}
            />
            <Button
              text="Unselect All"
              variant="none"
              type="button"
              onClick={handleUnselectAll}
            />
          </Flex>
        </Flex>
      )}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {options.map((option, index) => (
          <Button
            key={index}
            type="button"
            onClick={() => handleOptionClick(option)}
            variant={selectedOptions.includes(option) ? 'default' : 'primary'}
            icon={selectedOptions.includes(option) ? 'check' : 'plus'}
            text={option}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-600 text-right animate-shake">{error}</p>
      )}
    </Flex>
  );
};

InputMultipleSelect.displayName = 'InputMultipleSelect';
