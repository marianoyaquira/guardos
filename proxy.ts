import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "pt";
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const proxyConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|images/).*)"],
};
