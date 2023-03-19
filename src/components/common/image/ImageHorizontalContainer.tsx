import { CustomImage, Flex, Text } from '@/components/common';

export type ImageHorizontalContainerProps = {
  images: {
    src: string;
    alt: string;
  }[];
};

export function ImageHorizontalContainer({
  images,
}: ImageHorizontalContainerProps) {
  return (
    <Flex direction="row" gap={1} className="opacity-90">
      {images.slice(0, 5).map((image, index) => (
        <CustomImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={25}
          height={25}
          rounded="full"
          styleVariant={{
            marginLeft: index !== 0 ? `-${index * 10}px` : '0px',
            zIndex: images.length - index,
            objectFit: 'cover',
          }}
          className="border border-white-300 dark:border-dark-300"
        />
      ))}
      {images.length > 5 && (
        <div
          styleVariant={{
            marginLeft: `-35px`,
            zIndex: 6,
          }}
        >
          <Text variant="overline">+{images.length - 5}</Text>
        </div>
      )}
    </Flex>
  );
}
