/* eslint-disable jsx-a11y/alt-text */
'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import fallbackSrc from '@/public/placeholder.svg';
interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, className,alt="default", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);

  return (
    <Image
    alt={alt}
    src={imgSrc || "StaticImport"}
    className={`${className || ''} ${isFallback ? '!object-contain' : ''}`}
    onError={() => {
      setImgSrc(fallbackSrc);
      setIsFallback(true);
    }}
    quality={75}
    loading='lazy'
    {...rest}
    />
  );
};

export default ImageWithFallback;
