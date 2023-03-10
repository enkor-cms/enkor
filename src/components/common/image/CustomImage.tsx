import Image from 'next/image';
import React from 'react';
import './custom-image.css';

type ImageProps = {
  src: string;
  alt: string;
  loader?: boolean;
  fullWidth?: boolean;
  width: number;
  height: number;
  fit: 'cover' | 'contain';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
};

type ICustomImageProps = ImageProps & React.ImgHTMLAttributes<HTMLImageElement>;

export default function CustomImage({
  src,
  alt,
  loader = true,
  fullWidth = false,
  width,
  height,
  placeholder,
  ...props
}: ICustomImageProps) {
  const roundedClass: Record<string, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`relative`}
      style={{
        height: `${height}px`,
        width: fullWidth ? '100%' : `${width}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        placeholder={loader ? 'blur' : 'empty'}
        blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`}
        style={{ objectFit: props.fit || 'cover' }}
        className={`w-full h-full top-0 left-0 object-cover ${
          roundedClass[props.rounded || '']
        } `}
        {...props}
      />
    </div>
  );
}
