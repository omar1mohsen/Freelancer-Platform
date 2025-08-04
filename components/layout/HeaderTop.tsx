

import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import LocalePath from "../UiComponents/LocalePath";
import LocalSwitcher from "../UiComponents/lang/LocalSwitcher";


const HeaderTop  =({settings}:{settings:any})=> {
  const t = useTranslations("NAV");

  return (
    <div className="bg-greynormal">
      <div className=" w-full lg:h-12 h-fit lg:py-8 py-4 container hidden lg:flex justify-between items-center">
        <div className="flex lg:justify-normal justify-between gap-3">
          {settings?.whatsapp && (
          <LocalePath href={`tel:${settings?.whatsapp}`} className="flex gap-2 items-center">
            <IoCallOutline size={20} />
            <p className="text-sm font-normal leading-4 text-start text-secondrytext">
              +{settings?.whatsapp}
            </p>
          </LocalePath>
          )}
          {settings?.email && (
            <LocalePath href={`mailto:${settings?.email}`} className="flex gap-2 items-center">
              <IoMailOutline size={20} />
              <p className="text-sm font-normal leading-4 text-start text-secondrytext">
                {settings?.email}
              </p>
            </LocalePath>
          )}
        </div>

        <div className="lg:flex hidden gap-3 flex-wrap mt-3 lg:mt-0 items-center">
          <LocalSwitcher />

          <div className="text-secondrytext">|</div>
          <LocalePath
            className="font-normal text-secondrytext text-sm text-start leading-8"
            href="/return-policy"
          >
            {t("return-policy")}
          </LocalePath>
          <div className="text-secondrytext">|</div>

          <LocalePath
            className="font-normal text-secondrytext text-sm text-start leading-8"
            href="/faqs"
          >
            {t("faqs")}
          </LocalePath>
          <div className="text-secondrytext">|</div>
          <LocalePath
            className="font-normal text-secondrytext text-sm text-start leading-8"
            href="/technical-support"
          >
            {t("technical-support")}
          </LocalePath>
        </div>
      </div>
    </div>
  );
}


export default HeaderTop;
