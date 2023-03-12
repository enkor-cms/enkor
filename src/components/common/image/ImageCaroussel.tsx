import React, { useRef } from 'react';
import { Button } from '../button';
import CustomImage from './CustomImage';

interface ImageCarouselControllerProps {
  images: {
    src: string;
    alt: string;
    width?: number;
  }[];
}

const ImageCarouselController: React.FC<ImageCarouselControllerProps> = ({
  images,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  React.useEffect(() => {
    if (carouselRef.current) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollWidth > clientWidth + scrollLeft);
      };
      carouselRef.current.addEventListener('scroll', handleScroll);
      return () => {
        carouselRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -500,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    console.log(carouselRef.current);
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="relative flex justify-between overflow-x-hidden w-full">
        <div
          className="flex w-full gap-3 overflow-x-hidden rounded-md [&>div]:flex-shrink-0"
          style={{ scrollSnapType: 'x mandatory' }}
          ref={carouselRef}
        >
          {images.map((image, index) => (
            <CustomImage
              key={index}
              src={image.src}
              alt={image.alt}
              loader={true}
              height={300}
              width={image.width || 400}
              fit="cover"
              rounded="md"
            />
          ))}
        </div>
        <Button
          variant="primary"
          icon="chevron-left"
          iconOnly
          title="Previous"
          onClick={handlePrev}
          style={{
            opacity: showLeftArrow ? 1 : 0,
          }}
          className="absolute rounded-full left-0 top-1/2 transform -translate-y-1/2 transition-opacity duration-300"
        />
        <Button
          variant="primary"
          icon="chevron-right"
          iconOnly
          title="Previous"
          onClick={handleNext}
          style={{
            opacity: showRightArrow ? 1 : 0,
          }}
          className="absolute rounded-full right-0 top-1/2 transform -translate-y-1/2 transition-opacity duration-300"
        />
      </div>
    </>
  );
};

export default ImageCarouselController;