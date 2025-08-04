import React from 'react'
import LocalePath from '../UiComponents/LocalePath'
import { useTranslations } from 'next-intl'
import { MdArrowBackIos } from 'react-icons/md';

interface SectionHeaderProps {
  title?:string;
  href?:string;
  className?:string;
}

const SectionHeader = ({href,title,className}:SectionHeaderProps) => {
  const t = useTranslations();
  return (
    <div className={`${className?className:""} flex items-center justify-between my-4 lg:my-6`} >
        {title &&<h2  className='section-title'>{title}</h2>}
        {href && (
          <LocalePath href={href || "#"} className='flex items-center text-sm md:text-xl font-bold text-primary' >
              <span>{t('Text.show_more')}</span>  
              <MdArrowBackIos  className='ltr:rotate-180'/> 
          </LocalePath>
        )}
    </div>
  )
}

export default SectionHeader
