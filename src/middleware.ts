import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "nl-NL", "nl"];

function getLocale(request: NextRequest) {
  const defaultLocale = "en-US";
  const headers = Object.fromEntries(request.headers);

  const languages = new Negotiator({ headers }).languages();
  const locale = match(locales, languages, defaultLocale);
  return locale;
}

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
  const pathname = url.pathname;
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.includes(`/${locale}/`) ||
      pathname === `/${locale}` ||
      pathname.endsWith(`/${locale}`),
  );
  const pathNameLocale = locales.find(
    (locale) =>
      pathname.includes(`/${locale}`) ||
      pathname === `/${locale}` ||
      pathname.endsWith(`/${locale}`),
  );
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

  const locale = getLocale(req);
  if (pathnameHasLocale) {
    url.pathname = pathname.replace(`/${pathNameLocale}`, "");
    url.pathname = `${pathNameLocale}/sites/${currentHost}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (pathname.endsWith("/sitemap.xml")) {
    url.pathname = `/api/sitemap.xml`;
    return NextResponse.rewrite(url);
  }
  url.pathname = `${locale}/sites/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
};

export default middleware;
