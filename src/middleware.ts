import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - fonts (font files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|script.js).*)",
  ],
};

const middleware = (req: NextRequest) => {
  const url = req.nextUrl;

  const hostName = req.headers.get("host") || "demo.localhost";

  const currentHost = hostName.replace(
    ".localhost:3000",
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  );

  console.log("Hostname and currentHost is:", { hostName, currentHost });

  const isAuthenicated = !!(
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token")
  );
  //rewrites for app dir
  if (currentHost === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (url.pathname === "/login" && isAuthenicated) {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    } else if (url.pathname === "/login" && !isAuthenicated) {
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }
    if (isAuthenicated && url.pathname.startsWith("/site")) {
      return NextResponse.rewrite(url);
    }
    url.pathname = `/dashboard${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (
    hostName === "localhost:3000" ||
    hostName === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/sites/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
};

export default middleware;
