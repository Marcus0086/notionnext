"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

import { _SiteData } from "@/types";

const getOptionsSiteCardById = cache(async (siteId: string) => {
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
    select: {
      siteConfig: {
        select: {
          isAiSearchEnabled: true,
          isDarkModeEnabled: true,
          isSearchEnabled: true,
          isTweetEmbedSupportEnabled: true,
          isTopLoadingBarEnabled: true,
          includeNotionIdInUrls: true,
          isSiteMapEnabled: true,
          isPreviewImageSupportEnabled: true,
        },
      },
    },
  });
  return data;
});

export { getOptionsSiteCardById };
