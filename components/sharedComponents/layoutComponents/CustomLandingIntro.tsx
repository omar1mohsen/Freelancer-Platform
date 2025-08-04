import BreadCrumb from '@/components/UiComponents/Breadcrumbs/BreadCrumb'
import { useTranslations } from 'next-intl';
import React from 'react'
import { MaskIcon } from '@/assets/svgs/Icons';
const CustomLandingIntro = ({title}:{title:string}) => {
const  t = useTranslations();
const breadCrumb = [{ title: t(title) }];
  return (
    <main className='bg-secprimary pt-10 pb-12 lg:pb-20 relative overflow-hidden' >
        <MaskIcon className="absolute inset-0 object-cover w-full h-full z-0"/>
        <div className="container z-[1] relative">
            <BreadCrumb BreadCrumbList={breadCrumb}   /> 
            <h2 className='text-2xl mt-4 lg:text-[40px] lg:mt-16  font-bold'>{t(title)}</h2> 
        </div>
    </main>
  )
}

export default CustomLandingIntro
