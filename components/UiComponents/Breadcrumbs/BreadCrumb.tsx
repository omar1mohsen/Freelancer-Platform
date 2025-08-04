import { useTranslations } from "next-intl";
import LocalePath from "../LocalePath";
import { MdArrowBackIos } from "react-icons/md";

export interface BreadCrumbItem {
  link?: string;
  title: string;
}
interface BreadCrumbInterface {
  BreadCrumbList: BreadCrumbItem[];
  className?:string;
  translate?:boolean;
}

function BreadCrumb({ BreadCrumbList ,className,translate =true}: BreadCrumbInterface) {

  const t = useTranslations();

  return (
    <div className={`${className? className:""}`}>
      <div className="breadcrumb-wrapper flex items-center gap-1 text-sm font-bold text-secondrytext">
          <LocalePath href="/" >
            {t("NAV.home")}
          </LocalePath>
        <ol className="flex items-center gap-2">
          {BreadCrumbList &&
            BreadCrumbList?.map((item: BreadCrumbItem, index: any) => (
              <li className="flex items-center gap-2" key={`bread_item_${index}`}>
                  <span><MdArrowBackIos className="ltr:rotate-180"/></span>
                {item?.link ? (
                  <LocalePath href={item.link} className=" active-link cursor-pointer">{translate ? t(item?.title) : item.title}</LocalePath>
                ) : (
                  <span className=" active-link">{translate ? t(item?.title) : item?.title}</span>
                )}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default BreadCrumb;
