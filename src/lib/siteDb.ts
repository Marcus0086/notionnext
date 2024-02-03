"use server";

import { revalidateTag } from "next/cache";
import { cache } from "react";

import prisma from "./prisma";

import { PageProps, RootParams, _SiteData } from "@/types";
import { resolveNotionPage } from "./resolveNotionPage";

const getSiteSiteConfig = async ({ site }: RootParams) => {
  const subDomain = site.endsWith(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? site.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : undefined;

  try {
    const data = (await prisma.site.findUnique({
      where: subDomain
        ? {
            subDomain: subDomain,
          }
        : {
            customDomain: site,
          },
      include: {
        siteConfig: true,
      },
    })) as unknown as _SiteData;
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in [getSiteSiteConfig]", { error });
    return null;
  }
};

const getAuthDomains = () => {
  return ["raghavnotion.com", "newtest.com", "greedy", "blacknotion.com"];
  // try {
  //     const [subDomains, customDomains] = await Promise.all([
  //         prisma.site.findMany({
  //             select: {
  //                 subDomain: true
  //             }
  //         }),
  //         prisma.site.findMany({
  //             where: {
  //                 NOT: {
  //                     customDomain: null
  //                 },
  //             },
  //             select: {
  //                 customDomain: true
  //             }
  //         })
  //     ]);

  //     const allDomains = [...subDomains.map(({ subDomain }) => subDomain),
  //     ...customDomains.map(({ customDomain }) => customDomain)].filter((path) => path) as string[];

  //     return allDomains;
  // } catch (error) {
  //     console.error("Error in [getAuthDomains]", { error })
  //     return [""]
  // }
};

const revalidateSite = async (site?: string) => {
  const siteUrl = site?.replace(":3000", "");
  await revalidateTag(siteUrl || "");
};

const getFetchUrl = (site: string[]) => {
  const [siteId, pageId] = site;
  const siteUrl = new URL("/api/site", `http://localhost:3000`);
  siteUrl.searchParams.append("site", siteId);
  if (pageId) siteUrl.searchParams.append("pageId", pageId);
  return siteUrl;
};

const fetcher = cache(async (type: string, site: string[]) => {
  switch (type) {
    case "site":
      try {
        const [siteId, pageId] = site;
        const siteUrl = getFetchUrl(site);
        const res = await fetch(siteUrl, {
          next: {
            tags: [siteId],
          },
        });
        if (res.status !== 200) return undefined;
        const data: _SiteData = await res.json();
        const notionPageProps = await resolveNotionPage(
          siteId,
          data.siteConfig,
          pageId,
          data,
        );

        const pageProps: PageProps = {
          ...notionPageProps,
          config: data.siteConfig,
        };
        return pageProps;
      } catch (error) {
        console.error("Error in site [fetcher]", { error });
        return undefined;
      }
      break;
    default:
      break;
  }
});

export {
  getAuthDomains,
  getSiteSiteConfig,
  revalidateSite,
  getFetchUrl,
  fetcher,
};
