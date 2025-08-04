import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const withUser = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const protectedPaths = [""];

    // Check if the request is to a protected path
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected) {
      const userId = request.cookies.get("user_token")?.value;
      if (!userId) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return next(request, _next);
  };
};
