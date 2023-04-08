import { useDictionary } from '@/components/DictionaryProvider';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../button';
import { IconNames } from '../icon';
import { ImageCarouselController } from '../image';
import { Flex, InfoCard } from '../layout';
import { Text } from '../text';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  icon?: IconNames;
  onSelectedFilesChange: (images: File[]) => void;
}

export const InputImage = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      children,
      labelText,
      type = 'file',
      error,
      onSelectedFilesChange,
      ...props
    },
    ref,
  ) => {
    const dictionary = useDictionary();

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        setSelectedFiles(filesArray);
        onSelectedFilesChange(filesArray);
      }
    };

    const triggerFileInput = () => {
      inputRef.current?.click();
    };

    return (
      <Flex className={className + ' w-full relative'} gap={2}>
        {labelText && (
          <Flex fullSize direction="row" gap={0}>
            <label className="w-full text-left" htmlFor="imagesInput">
              <Text variant="caption" className="py-0 px-3">
                {labelText}
              </Text>
            </label>
            <Flex fullSize direction="row" horizontalAlign="right" gap={2}>
              <Button
                text={dictionary.common.delete_images}
                variant="none"
                className="text-dark-100 dark:text-white-200"
                onClick={() => {
                  setSelectedFiles([]);
                  onSelectedFilesChange([]);
                }}
              />
            </Flex>
          </Flex>
        )}
        <Button
          icon="file"
          variant="secondary"
          text={dictionary.common.select_images}
          className="w-full"
          onClick={triggerFileInput}
        />
        <input
          id="imagesInput"
          accept="image/*"
          className="hidden"
          {...props}
          ref={(el) => {
            inputRef.current = el;
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                (ref as React.MutableRefObject<HTMLInputElement>).current = el;
              }
            }
          }}
          type={type}
          onChange={handleFileChange}
          multiple
        ></input>
        {error && (
          <InfoCard
            className="w-full"
            message={error}
            color="red"
            icon="warning"
          />
        )}
        {selectedFiles && selectedFiles.length > 0 ? (
          <Flex fullSize direction="row">
            <ImageCarouselController
              images={selectedFiles.map((file) => ({
                src: URL.createObjectURL(file),
                alt: 'Selected image',
                width: 300,
              }))}
            />
          </Flex>
        ) : (
          <InfoCard
            className="w-full"
            message={dictionary.common.no_images_selected}
            color="warning"
            icon="warning"
          >
            <Text variant="caption">
              {dictionary.common.no_images_selected_message}
            </Text>
          </InfoCard>
        )}
      </Flex>
    );
  },
);

InputImage.displayName = 'ImagesInput';
