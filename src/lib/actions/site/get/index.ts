import { revalidatePath } from "next/cache";
import { cache } from "react";

import { resolveNotionPage } from "@/lib/resolveNotionPage";
import { getSiteMap } from "@/lib/getSiteMap";

import prisma from "@/lib/prisma";

import { _SiteData } from "@/types";

const getSiteById = cache(async (siteId: string) => {
  try {
    const site = (await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      include: {
        user: true,
        siteConfig: true,
      },
    })) as unknown as _SiteData;
    return site;
  } catch (error) {
    console.log("[Site] error happended in getSiteById", error);
    return null;
  }
});

const sitePage = cache(
  async (
    siteId: string,
    includeSiteMap?: boolean,
    includeSiteData = true,
    uuid?: boolean,
    rawPageId?: string,
    includeAllPagesRecordMap?: boolean
  ) => {
    const site = await getSiteById(siteId);
    if (!site) throw new Error("Site not found");
    const notionPageProps = await resolveNotionPage(
      siteId,
      site.siteConfig,
      rawPageId,
      site,
      true
    );
    let allPageProps = {};
    if (includeAllPagesRecordMap) {
      const siteMap = await getSiteMap(site.siteConfig, uuid);
      for (const [key, value] of Object.entries(siteMap.canonicalPageMap)) {
        const pageProps = await resolveNotionPage(
          siteId,
          site.siteConfig,
          value,
          site
        );
        allPageProps = {
          ...allPageProps,
          [key]: pageProps,
        };
      }
    }
    const siteData = {
      ...(includeSiteData
        ? {
            ...notionPageProps,
            config: site.siteConfig,
          }
        : {}),
      ...(includeSiteMap
        ? {
            siteMap: await getSiteMap(site.siteConfig, uuid),
          }
        : {}),
      ...(includeAllPagesRecordMap
        ? {
            allPageProps: allPageProps,
          }
        : {}),
    };
    return siteData;
  }
);

const siteImage = async (siteId: string, image: string) => {
  try {
    const site = await prisma.site.update({
      where: {
        id: siteId,
      },
      data: {
        image: image,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/home");
    return site;
  } catch (error) {
    console.log("Error in sietImage", error);
    return null;
  }
};

export { getSiteById, sitePage, siteImage };
export * from "./design";
export * from "./general";
export * from "./options";
export * from "./users";
export * from "./ai";
