import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Can be imported from a shared config

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any))
    locale = routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
