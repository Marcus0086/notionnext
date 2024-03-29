"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";
import { getFilesFromRedis } from "@/lib/actions/site";

import { _SiteData } from "@/types";

const getDesignSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        fontFamily: true,
        css: true,
      },
    });
    const uris = {
      css: data?.css || undefined,
    };
    const files = await getFilesFromRedis(uris);
    const designDataWithFiles = {
      ...data,
      css: files?.["css"],
    };
    return designDataWithFiles;
  } catch (error) {
    console.log("[Site] error happended in getDesignSiteCardById", error);
    return null;
  }
});

export { getDesignSiteCardById };
