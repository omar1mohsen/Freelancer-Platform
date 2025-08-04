import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { withUser } from "./middlewares/withUser";
// import { v4 } from 'uuid';

// base middleware logic
const baseMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const isArabicLocale = request.nextUrl.pathname.startsWith("/ar") || request.nextUrl.pathname.startsWith("/");
  const cookieStore = request.cookies;
  const guestToken = cookieStore.get("guest_token");
  const userToken = cookieStore.get("user_token");
  const localeLang =  isArabicLocale ? "ar" : "en";
  
  
  if (request.nextUrl.pathname.startsWith(`/ar`)) {
    const segments = request.nextUrl.pathname.split('/').filter(Boolean);
    const [, ...rest] = segments;
    const cleanedPath = '/' + rest.join('/');
    const url = new URL(request.nextUrl.origin + cleanedPath);
    return NextResponse.redirect(url);
  }
  
  
  response.cookies.set("NEXT_LOCALE",localeLang);

  if (!guestToken && !userToken) {
    const stringSpace ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < 64; i++) {
      randomString += stringSpace[Math.floor(Math.random() * stringSpace.length)];
    }
    response.cookies.set("guest_token", stringSpace);
  }

  // i18n middleware
  const handleI18nRouting = createMiddleware(routing);
  const i18nResponse = handleI18nRouting(request);

  i18nResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  const setCookieHeaders = i18nResponse.headers.get("set-cookie");
  if (setCookieHeaders) {
    setCookieHeaders.split(",").forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });
  }

  return response;
};

//  withUser Auth Wrapper
export const middleware = withUser(
  async (request: NextRequest, _event: any) => {
    return baseMiddleware(request);
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|logo.svg|logo.png).*)"],
};
