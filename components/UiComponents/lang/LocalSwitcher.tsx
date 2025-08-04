"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";
import { Dropdown, MenuProps } from "antd";
import flag_ar from "@/assets/flags/ar.svg";
import flag_en from "@/assets/flags/en.svg";
import ImageWithFallback from "../ImageWithFallback";

export default function LocaleSwitcher({container}:{container?:string}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const setLanguage = (nextLocale: string) => {
  Cookies.set("NEXT_LOCALE", nextLocale);
  const url = new URL(window.location.href);
  const searchParams = url.search;

  const supportedLocales = ['ar', 'en']; 
  const pathname = window.location.pathname;

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = supportedLocales.includes(segments[0]) ? segments[0] : null;

  let newPathname = '';

  if (currentLocale) {
    // Remove the current locale segment
    newPathname = '/' + segments.slice(1).join('/');
  } else {
    newPathname = pathname === '/' ? '' : pathname;
  }

  console.log("🚀 ~ setLanguage ~ ", `/${nextLocale}${newPathname}${searchParams}`)
  // Final push with new locale and search params
  router.push(`/${nextLocale}${newPathname}${searchParams}`);
};

  const items: MenuProps["items"] = [
    {
      key: "ar",
      label: (
        <div
          onClick={() => setLanguage("ar")}
          className="flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <ImageWithFallback
            src={flag_ar}
            width={24}
            height={16}
            className="w-6 h-4 object-contain"
            alt="Arabic Flag"
          />
          {t("locale.ar")}
        </div>
      ),
    },
    {
      key: "en",
      label: (
        <div
          onClick={() => setLanguage("en")}
          className="flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <ImageWithFallback
            src={flag_en}
            width={24}
            height={16}
            className="w-6 h-4 object-contain"
            alt="English Flag"
          />
          {t("locale.en")}
        </div>
      ),
    }
  ];

  return (
    <Dropdown
      menu={{ items }}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      trigger={["click"]}
      // rootClassName="min-w-[135px] w-[135px]"
      
    >
      <div className="flex gap-1 lg:gap-2 items-center cursor-pointer">
        <ImageWithFallback
          src={locale === "en" ? flag_en : flag_ar }
          width={24}
          height={16}
          className="w-6 h-4 object-contain"
          alt="Flag"
        />
        <p className="text-[10px] lg:text-sm font-normal leading-4 text-start">
          {t(`locale.${locale}`)}
        </p>
        <IoIosArrowDown className="size-4 lg:size-5" />
      </div>
    </Dropdown>
  );
}
