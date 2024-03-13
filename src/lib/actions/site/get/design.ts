"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

import { _SiteData } from "@/types";

const getDesignSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        fontFamily: true,
      },
    });
    return data;
  } catch (error) {
    console.log("[Site] error happended in getDesignSiteCardById", error);
    return null;
  }
});

export { getDesignSiteCardById };
