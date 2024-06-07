"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";
import zlib from "zlib";

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
        siteConfig: {
          include: {
            footerIcons: {
              select: {
                icon: true,
                title: true,
                url: true,
              },
            },
          },
        },
      },
    })) as unknown as _SiteData;
    const uris = {
      css: site.css,
      javascript: site.javascript,
      html: site.html,
    };
    const files = await getDecompressedFiles(uris);
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
  ) => {
    const site = await getSiteById(siteId);
    if (!site) throw new Error("Site not found");

    let notionPageProps;
    if (includeSiteData) {
      notionPageProps = await resolveNotionPage(
        siteId,
        site.siteConfig,
        rawPageId,
        site,
        true,
      );
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
    };
    return siteData;
  },
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

const getDecompressedFiles = async (
  uris: Record<string, string | undefined>,
) => {
  const files: Record<string, string> = {};
  for (const [key, value] of Object.entries(uris)) {
    if (value) {
      const decomressedFile = await decompressData(value);
      if (decomressedFile) {
        files[key] = decomressedFile;
      }
    }
  }
  return files;
};

export { getSiteById, sitePage, siteImage, getDecompressedFiles };
