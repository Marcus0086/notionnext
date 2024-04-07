"use server";

import { revalidateTag } from "next/cache";
import { cache } from "react";

import prisma from "./prisma";
import { resolveNotionPage } from "./resolveNotionPage";
import { getFilesFromRedis } from "@/lib/actions/site";

import { PageProps, RootParams, _SiteData } from "@/types";

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
        user: {
          select: {
            accountType: true,
          },
        },
      },
    })) as unknown as _SiteData;
    if (!data) {
      return null;
    }
    const uris = {
      css: data.css,
      javascript: data.javascript,
      html: data.html,
    };
    const files = await getFilesFromRedis(uris);
    const siteDataWithFiles = {
      ...data,
      css: files?.["css"],
      javascript: files?.["javascript"],
      html: files?.["html"],
    };
    return siteDataWithFiles;
  } catch (error) {
    console.error("Error in [getSiteSiteConfig]", { error });
    return null;
  }
};

const getAuthDomains = async () => {
  try {
    const customDomains = await prisma.site.findMany({
      where: {
        NOT: {
          customDomain: null,
        },
      },
      select: {
        customDomain: true,
      },
    });

    const allDomains = [
      ...customDomains.map(({ customDomain }) => customDomain),
    ].filter((path) => path) as string[];

    return allDomains;
  } catch (error) {
    console.error("Error in [getAuthDomains]", { error });
    return [""];
  }
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
        const data = await res.json();
        const notionPageProps = await resolveNotionPage(
          siteId,
          data.siteConfig,
          pageId,
          data,
        );

        const pageProps: PageProps = {
          ...notionPageProps,
          config: data.siteConfig,
          accountType: data.user.accountType || undefined,
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

export { getAuthDomains, getSiteSiteConfig, revalidateSite, fetcher };
