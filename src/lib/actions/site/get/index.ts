"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";
import zlib from "zlib";

import { resolveNotionPage } from "@/lib/resolveNotionPage";
import { getSiteMap } from "@/lib/getSiteMap";

import prisma from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";

import { _SiteData } from "@/types";

const getSiteById = cache(async (siteId: string) => {
  try {
    const site = (await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      include: {
        siteConfig: true,
      },
    })) as unknown as _SiteData;
    const uris = {
      css: site.css,
      javascript: site.javascript,
      html: site.html,
    };
    const files = await getFilesFromRedis(uris);
    const siteDataWithFiles = {
      ...site,
      css: files?.["css"],
      javascript: files?.["javascript"],
      html: files?.["html"],
    };
    return siteDataWithFiles;
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

const decompressData = async (data: any) => {
  try {
    const buffer = Buffer.from(data, "base64");
    const decompressed = zlib.brotliDecompressSync(buffer);
    return decompressed.toString("utf-8");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getFilesFromRedis = async (uris: Record<string, string | undefined>) => {
  const files: Record<string, string> = {};
  const redisClient = await getRedisClient();
  for (const [key, value] of Object.entries(uris)) {
    if (value) {
      const file = await redisClient.get(value);
      const decomressedFile = await decompressData(file);
      if (decomressedFile) {
        files[key] = decomressedFile;
      }
    }
  }
  return files;
};

export { getSiteById, sitePage, siteImage, getFilesFromRedis };
