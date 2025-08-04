
import localFont from "next/font/local";

export const URWDin = localFont({
  src: [
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-XLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Demi.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Bold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/urwdin/URWDINArabic-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-urwdin",
});


export const Cairo = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Cairo/Cairo-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Cairo/Cairo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Cairo/Cairo-SemiBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Cairo/Cairo-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cairo",
});