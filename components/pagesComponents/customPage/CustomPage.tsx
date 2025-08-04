import PageIntro from '@/components/sharedComponents/PageIntro'
import ParsedDesc from '@/components/sharedComponents/product/ParsedDesc';
import React from 'react'

interface CustomPageProps{
  pageTitle:string,
  BreadCrumbList:any,
  content:string;
}
const CustomPage = ({pageTitle,BreadCrumbList,content}:CustomPageProps) => {
  return (
    <>
      <PageIntro title={pageTitle} BreadCrumbList={BreadCrumbList} />
      <section className='container main-sec'>
        {content && <ParsedDesc desc={content}/>} 
      </section> 
    </>
  )
}

export default CustomPage
