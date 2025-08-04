import { NoFav } from '@/assets/svgs/Icons';
import LocalePath from '@/components/UiComponents/LocalePath';
import { useTranslations } from 'next-intl'
import React from 'react'
interface props{
   title: string;
   icon?: React.ReactNode;
   className?: string;
   desc?: string;
   btnText?: string;
   href?: string;
}

const EmptyContent = ({title,desc,className,icon,btnText,href}:props) => {
    const t = useTranslations();
  return (
        <section className={`main-sec min-h-[300px] mb-10 flex flex-col justify-center items-center gap-6 ${className ? className:''}`}>
          {icon?icon:<NoFav />}
          <h2 className="text-2xl  font-bold">
            {t(title)} 
          </h2>
          {desc && <p className="text-lg text-center text-gray-700 font-medium max-w-2xl"dangerouslySetInnerHTML={{__html:t(desc)}} />}
          {btnText && href && (
            <LocalePath href={href} className={`app-btn !rounded-xl text-center `}>
              {t(btnText)}
            </LocalePath>
          )}
        </section>
  )
}

export default EmptyContent
