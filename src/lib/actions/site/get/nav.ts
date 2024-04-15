"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

const getNavSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        siteConfig: {
          select: {
            navigationLinks: true,
            navigationStyle: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log("[Site] error happended in getNavSiteCardById", error);
    return null;
  }
});

export { getNavSiteCardById };
