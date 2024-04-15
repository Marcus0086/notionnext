"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

const getFooterSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        siteConfig: {
          select: {
            footerIcons: true,
            footerStyle: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log("[Site] error happended in getFooterSiteCardById", error);
    return null;
  }
});

export { getFooterSiteCardById };
