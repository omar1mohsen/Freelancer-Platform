"use client"
import React from 'react';
import LocalePath from "@/components/UiComponents/LocalePath";
import { useTranslations } from 'next-intl';
import GeneralSlider from '../CarouselSwiper/GeneralSlider';
import AppSkeleton from '../Loader/AppSkeleton';
import dynamic from 'next/dynamic';

const HeaderLinks = () => {
  const t = useTranslations();

  const navLinks = [
  'App Development',
  'Programming & Tech',
  'UI Design',
  'Video & Animation',
  'Writing & Translation',
  'Music & Audio',
  'Digital Marketing',
  'AI Services',
  'Consulting',
  'Blog',
  'Web & Animation',
  'Automation',
  'Mechanic',
  'Photography',
];

  return (
      <div className={`relative border-y border-y-gray-200 bg-white`}>
        <GeneralSlider
          className='links-wrapper'
          slideClass='w-auto pe-5 first:ms-5'
        >
          {navLinks?.map((el: string, index: number) => (
              <LocalePath  key={`header_link_${index}`} className={`header-link`} href={`#`}>
                {el}
              </LocalePath>
          ))}
        </GeneralSlider>
      </div>
  );
};


const ClientComponent = dynamic(() => Promise.resolve(HeaderLinks), {
  ssr: false,
  loading:()=><div className='container py-5'><AppSkeleton width='100%' height='42px' className='flex-1' /></div>  
});

export default ClientComponent;
