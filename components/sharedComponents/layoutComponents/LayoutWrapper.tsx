import React from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NextTopLoad from "@/components/layout/NextTopLoader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

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
                {children}
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LayoutWrapper;
