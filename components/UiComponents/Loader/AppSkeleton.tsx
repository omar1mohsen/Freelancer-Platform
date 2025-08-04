import React from 'react';
import './SkeletonLoader.scss';
import { cn } from '@/utils/helpers';
interface Props { 
    width?: string;
    height?:string;
    className?:string;
}

const AppSkeleton = ({ width, height,className }:Props) => {
  return (
    <div
      className={cn("skeleton-loader",className)}
      style={{
        width: width || '100%',
        height: height || '100px',
      }}
    />
  );
};

export default AppSkeleton;
