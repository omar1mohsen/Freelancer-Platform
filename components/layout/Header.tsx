import HeaderLinks from "../UiComponents/header/HeaderLinks";
import { Home,Notification,ShoppingCart,Sms } from "iconsax-reactjs";
import ImageWithFallback from "../UiComponents/ImageWithFallback";
import LocalSwitcher from "../UiComponents/lang/LocalSwitcher";


import "@/styles/layout/header.scss";
import SearchComponent from "../sharedComponents/search/SearchComponent";

interface Props {
  settings: any;
}

export async function Header({ settings }: Props) {

  return (
      <header className={`bg-gray-50 pb-5`}>
        <div className="flex items-center justify-between container py-5 max-lg:flex-wrap gap-4">
          <div className="flex items-center justify-start gap-2 text-text font-bold 2xl:min-w-72">
            <span className="flex-content-center text-white p-1.5 rounded-lg bg-primary">
              <Home size={18}/>
            </span>
            Logo
          </div>
          <SearchComponent />
          <div className="flex items-center gap-1.5 ">
            <LocalSwitcher />
            <Sms className="text-xl cursor-pointer" />
            <Notification className="text-xl cursor-pointer" />
            <ShoppingCart className="text-xl cursor-pointer" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=500&fit=crop&crop=faces"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-solid border-primary/20"
              width={32}
              height={32}
            />
          </div>
          
        </div>
        <HeaderLinks  />
      </header>
  );
}



export default Header;
