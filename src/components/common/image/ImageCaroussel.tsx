import React from 'react';
import CustomImage from './CustomImage';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      {images.map((image, index) => (
        <CustomImage
          key={index}
          src={image}
          alt={`Image ${index}`}
          loader={true}
          height={200}
          fullWidth={true}
          fit="cover"
          rounded="md"
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
