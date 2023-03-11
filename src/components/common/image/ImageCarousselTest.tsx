import React, { useState } from 'react';
import { Icon } from '../icon';

interface ImageSliderProps {
  images: string[];
  imageWidth: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, imageWidth }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const handleScroll = (direction: 'left' | 'right') => {
    const step = 100;
    const container = document.getElementById('image-slider-container');
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
    const scrollPosition = container.scrollLeft;

    if (direction === 'left') {
      const newPosition = Math.max(0, scrollPosition - step);
      setScrollPosition(newPosition);
      container.scrollTo({
        top: 0,
        left: newPosition,
        behavior: 'smooth',
      });
      setIsRightArrowVisible(scrollWidth > containerWidth + step);
      setIsLeftArrowVisible(newPosition > 0);
    } else {
      const newPosition = Math.min(
        scrollWidth - containerWidth,
        scrollPosition + step
      );
      setScrollPosition(newPosition);
      container.scrollTo({
        top: 0,
        left: newPosition,
        behavior: 'smooth',
      });
      setIsLeftArrowVisible(newPosition > 0);
      setIsRightArrowVisible(scrollWidth > containerWidth + step);
    }
  };

  return (
    <div className="relative">
      {isLeftArrowVisible && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Icon name="chevron-left" className="text-gray-600" />
        </button>
      )}
      {isRightArrowVisible && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Icon name="chevron-right" className="text-gray-600" />
        </button>
      )}
      <div
        id="image-slider-container"
        className="flex overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="flex-none h-64 w-64 md:w-72 md:h-72 lg:w-96 lg:h-96 p-4 scroll-snap-align-start"
          >
            <img
              src={imageUrl}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
