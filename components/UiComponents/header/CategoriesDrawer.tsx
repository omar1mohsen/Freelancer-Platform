"use client"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toggleCategoriesDrawer } from '@/store/general';
import { CategoryIcon, HeaderDiscountIcon } from '@/assets/svgs/Icons';
import AppDrawer from '../drawers/AppDrawer';
import { useTranslations } from 'next-intl';
import LocalePath from '../LocalePath';
import { NavLink } from './NavbarLinks';

const CategoriesDrawer = ({categories}:{categories:any}) => {
    const t = useTranslations();
    const dispatch= useDispatch<AppDispatch>();
    const {categoriesDrawer,mainLoader} = useSelector((state:RootState)=> state.generalConfig);

  return (
    <>
       <button
            className={`text-base cursor-pointer font-medium leading-5 text-center text-primary bg-secprimary p-3 rounded-2xl flex gap-2 items-center`}
            onClick={()=>dispatch(toggleCategoriesDrawer(true))}
        >
            <CategoryIcon/>
            {t("Text.departments")}
        </button>
        <AppDrawer
            open={categoriesDrawer}
            title={<div className='flex items-center gap-2'><CategoryIcon/> {t("Text.departments")}</div>}
            placement='right'
            handleClose={()=>dispatch(toggleCategoriesDrawer(false))}
            rootClassName='categories-drawer-container'
        >
        <div className='pb-5'>
            <LocalePath
                href={`/categories/offers`}
                className={`drawer-category !text-success flex gap-2 items-center`}
            >
                <HeaderDiscountIcon/>
                <p> عروض</p>
            </LocalePath>
            {categories?.map((el: NavLink, index: number) => (
                <li className={`drawer-category`}   key={`header_link_${index}`} >
                <LocalePath className={`header-link`} href={`/categories/${el?.slug}`}>
                    {el?.title || el?.name}
                </LocalePath>
                </li>
            ))}
        </div>
        </AppDrawer>
    </>
  )
}

export default CategoriesDrawer