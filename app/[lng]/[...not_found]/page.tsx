import React from "react";
import { useTranslations } from "next-intl";

import { Typography } from "antd";
import LocalePath from "@/components/UiComponents/LocalePath";
import { FlagIcon } from "lucide-react";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="container grid items-center">
      <div className="min-h-[60vh] mx-auto grid place-items-center text-center px-8">
        <div>
          <FlagIcon className="w-20 h-20 mx-auto" />
          <h5 className="mt-10 text-2xl !leading-snug md:text-4xl" >
            {t("notFound.title")}
          </h5>
          <p className="mt-4 mb-8 text-base md:text-base font-semibold text-text-gray mx-auto md:max-w-sm">
            {t("notFound.description")}
          </p>
          <LocalePath href="/" className="app-btn btn-primary">
            {t("notFound.backHome")}
          </LocalePath>
        </div>
      </div>
    </div>
  );
}
