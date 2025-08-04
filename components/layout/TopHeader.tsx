import { CallIcon } from "@/assets/svgs/Icons";
import Socials from "@/components/UiComponents/Socials";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

import "@/styles/layout/header.scss";

const TopHeader = ({settings}:any) => {

  const t = useTranslations();

  return (
    <div className="top-header ">
      <div className="container flex flex-wrap items-center gap-6  xl:justify-between">
        <div className="border border-solid border-white/30 rounded-3xl text-xs md:text-base inline-flex items-center gap-1 p-2  md:p-4">
          {t("top_header.call_us")} :
          <Link className="flex items-center gap-2 ltr:flex-row-reverse" href={`tel:+${settings?.phone}`}>
            <span className="font-semibold">+{settings?.phone}</span>
            <CallIcon />
          </Link>
        </div>

        <div className="hidden xl:block">
          <Socials className="header-socials" settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
