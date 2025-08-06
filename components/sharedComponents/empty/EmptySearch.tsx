
import { getSearchParamsObject } from "@/utils/helpers";
import { SearchNormal } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

const EmptySearch = ({text}:{text?:string}) => {
  const searchParamsUrl = useSearchParams();
  let searchParams: any = getSearchParamsObject(searchParamsUrl);
    const t = useTranslations("Text");
  return (
    <section className="main-sec min-h-[300px] mb-10 flex flex-col justify-center items-center gap-6 ">
      <SearchNormal size={70} />
      <h2 className="text-2xl  font-bold">
        {t("emptySearch",{keyword:`“${text || searchParams?.keyword}“`})} 
      </h2>
    </section>
  );
};

export default EmptySearch;
