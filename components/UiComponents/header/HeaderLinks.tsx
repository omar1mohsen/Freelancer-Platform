import React from 'react';
import { NavLink } from "@/components/UiComponents/header/NavbarLinks";
import LocalePath from "@/components/UiComponents/LocalePath";
import { HeaderDiscountIcon } from '../../../assets/svgs/Icons';
import { useTranslations } from 'next-intl';

const HeaderLinks = ({categories}:{categories:any}) => {
  const t = useTranslations();

  return (
      <div className={`hidden lg:block bg-transparent `}>
        <div className="container">
          <div className={`text-dark font-semibold xl:h-fit w-full py-5`}>
              <ul className="flex gap-5 flex-wrap items-center">
                <div className="flex gap-5 flex-wrap items-center">
                    {/* <CategoriesDrawer categories={categories}/> */}
                    <LocalePath
                      href={`/categories/offers`}
                      className={`text-base cursor-pointer font-medium leading-5 border-e border-e-greynormal pe-5 text-center text-success flex gap-2 items-center`}
                    >
                      <HeaderDiscountIcon/>
                      <p> عروض</p>
                    </LocalePath>
                </div>

                {categories?.slice(0,7)?.map((el: NavLink, index: number) => (
                  <li
                    className={`cursor-pointer text-center`}
                    key={`header_link_${index}`}
                  >
                    <LocalePath className={`header-link`} href={`/categories/${el?.slug}`}>
                      {el?.title || el?.name}
                    </LocalePath>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
  );
};


// const ClientComponent = dynamic(() => Promise.resolve(HeaderLinks), {
//   ssr: false,
//   loading:()=><div className='container py-5 hidden lg:block'><AppSkeleton width='100%' height='42px' className='flex-1' /></div>  
// });

export default HeaderLinks;
