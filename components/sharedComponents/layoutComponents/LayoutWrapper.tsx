import { getMessages } from "next-intl/server";
import React from "react";
import { NextIntlClientProvider } from "next-intl";

import NextTopLoad from "@/components/layout/NextTopLoader";
import { ConfigProvider } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ClientStore from "@/components/layout/ClientStore";
import ClientWrapper from "@/components/sharedComponents/layoutComponents/ClientWrapper";
import QueryProvider from "@/components/layout/QueryProvider";

interface Props {
  children: React.ReactNode;
  lng: string;
}

const LayoutWrapper = async ({ children, lng }: Props) => {
  const messages = await getMessages({ locale: lng });

  const antConfig = {
    theme: {
      cssVar: true,
      hashed: false,
      token: {
        fontFamily: lng === "ar" ? "URWDin" : "HelveticaNeueCond",
        zIndexPopupBase: 2000,
      },
    },
  };
  return (
    <html lang={lng} dir={lng === "en" ? "ltr" : "rtl"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider
              direction={lng === "en" ? "ltr" : "rtl"}
              prefixCls={"ant"}
              {...antConfig}
            >
              <NextTopLoad />
              <ClientStore>
                <QueryProvider>
                    {children}
                </QueryProvider>
                <ClientWrapper />
              </ClientStore>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LayoutWrapper;
