"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

import { _SiteData } from "@/types";

const getGeneralSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        name: true,
        visibility: true,
        siteConfig: {
          select: {
            rootNotionPageId: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log("[Site] error happended in getGeneralSiteCardById", error);
    return null;
  }
});

export { getGeneralSiteCardById };
