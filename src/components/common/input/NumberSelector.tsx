import React, { useEffect, useState } from 'react';
import { Flex } from '../layout';

interface NumberSelectorProps {
  maxNumber: number;
  value: number;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  maxNumber,
  value,
  setValue,
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(value);

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
  };

  useEffect(() => {
    if (selectedNumber !== null) {
      setValue(selectedNumber);
    }
  }, [selectedNumber]);

  return (
    <Flex direction="row" className="w-full">
      {Array.from({ length: maxNumber + 1 }, (_, i) => i).map((number) => (
        <button
          key={number}
          className={`${
            selectedNumber === number
              ? 'bg-dark-400 text-white-100 dark:bg-white-100 dark:text-dark-400'
              : 'bg-gray-200 text-gray-700 dark:bg-dark-400 dark:text-white-100'
          } py-2 px-4 rounded transition-all duration-400 ease-in-out hover:bg-dark-400 hover:text-white-100 dark:hover:bg-white-100 dark:hover:text-dark-400`}
          onClick={() => handleNumberClick(number)}
        >
          {number}
        </button>
      ))}
    </Flex>
  );
};

export default NumberSelector;
