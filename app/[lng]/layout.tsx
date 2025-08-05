import '@ant-design/v5-patch-for-react-19';

import Header from "@/components/layout/Header";
import MainFooter from "@/components/layout/MainFooter";
import type { Metadata } from "next";
import Logo from "@/assets/logo/base-fav.svg";
import LayoutWrapper from '@/components/sharedComponents/layoutComponents/LayoutWrapper';


import "antd/dist/reset.css";
import "@/app/main.scss";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Freelancer Platform",
    description: "",
    icons: {
      icon: Logo.src,
    },
    openGraph: {
      images: Logo.src,
    },
  };
}

interface RootLayoutProps {children: React.ReactNode;params: { lng: string }}
export default async function RootLayout({children,params}: RootLayoutProps) {
  const { lng } = await params;
  const settings = {};

  return (
    <LayoutWrapper lng={lng}>
      <Header settings={settings} />
        <div className="app_wrapper" id="app_wrapper">
          {children}
        </div>
      <MainFooter  />
    </LayoutWrapper>
   
  );
}
