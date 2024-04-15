import { getServerSideSitemap } from "next-sitemap";

import { getSiteMap } from "@/lib/getSiteMap";
import { getSiteSiteConfig } from "@/lib/siteDb";
import { httpPrefix } from "@/lib/config";

export async function GET(request: Request) {
  const hostName = request.headers.get("host") || "demo.localhost";

  const currentHost = hostName.replace(
    ".localhost:3000",
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  );

  const site = await getSiteSiteConfig({
    site: currentHost,
  });
  if (
    !site ||
    site.siteConfig?.isSiteMapEnabled === false ||
    site.user.accountType === "FREE"
  ) {
    return new Response("SiteMap not found", {
      status: 404,
    });
  }
  const siteMap = await getSiteMap(site.siteConfig);
  const canonicalPageMap = Object.keys(siteMap.canonicalPageMap);
  const pages = canonicalPageMap.map((pageId) => {
    return {
      loc: `${httpPrefix}${currentHost}/${pageId}`,
      lastmod: new Date().toISOString(),
    };
  });
  const siteMapResponse = await getServerSideSitemap(pages);
  siteMapResponse.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600",
  );
  return siteMapResponse;
}
