import LocalePath from "@/components/UiComponents/LocalePath";
import {MainLogoIcon } from "@/assets/svgs/Icons";
import HeaderTop from "./HeaderTop";

import HeaderLinks from "../UiComponents/header/HeaderLinks";
import { getTranslations } from "next-intl/server";


import "@/styles/layout/header.scss";

interface Props {
  settings: any;
}

export async function Header({ settings }: Props) {

  return (
      <header className={`bg-white border-b border-b-greynormal w-full`}>
        <HeaderTop settings={settings} />
          <nav className="relative z-10 w-full py-4 container lg:flex hidden justify-between items-center gap-3 xl:gap-12">
            <LocalePath href="/" className="h-10 w-36 min-w-36">
              <MainLogoIcon className="size-full" />
              {/* <ImageWithFallback
                src="/logo.svg"
                alt="logo icon"
                width="180"
                height="180"
                className="size-full object-contain "
              /> */}
            </LocalePath>

          </nav>
          <div className="hidden container lg:block">
              <HeaderLinks categories={[]} />
          </div>
      </header>
  );
}



export default Header;
