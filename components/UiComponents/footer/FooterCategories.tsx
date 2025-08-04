import React from "react";
import LocalePath from "../LocalePath";


const FooterCategories = ({categories}:{categories:any}) => {
  return (
    <div className="grid grid-cols-2 ">
      {categories.map((el: any, index: number) => (
        <li
          className="max-md:text-sm mb-3 md:mb-5 font-normal hover:text-primary transition-all  cursor-pointer"
          key={`footer_link_${el?.id}`}
        >
          <LocalePath href={`/categories/${el?.slug}`}>
            {el?.title || el?.name}
          </LocalePath>
        </li>
      ))}
    </div>
  );
};

export default FooterCategories;
