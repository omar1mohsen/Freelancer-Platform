import React from "react";
import BreadCrumb, {
  BreadCrumbItem,
} from "../UiComponents/Breadcrumbs/BreadCrumb";
// import IntroImage from "@/assets/images/page-intro.png";
import { useTranslations } from "next-intl";

interface PageIntroInterface {
  title?: string;
  BreadCrumbList: BreadCrumbItem[];
  className?:string;
  translate?:boolean;
}

const PageIntro = ({ title, BreadCrumbList,className,translate= true }: PageIntroInterface) => {
  const t = useTranslations();
  return (
    <main className="relative py-4 bg-greynormal overflow-x-auto whitespace-nowrap">
      <div className="container">
        <BreadCrumb translate={translate} BreadCrumbList={BreadCrumbList} className={className}  />
        {title && (
          <h1 className=" text-2xl font-semibold my-3 md:my-6">
            {t(title)}
          </h1>
        )}
      </div>
    </main>
  );
};

export default PageIntro;
