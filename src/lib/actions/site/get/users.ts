"use server";

import { cache } from "react";
import { VisibilityFilter } from "@prisma/client";

import prisma from "@/lib/prisma";

import { SiteCard, _SiteData } from "@/types";

const getUserSites = cache(
  async (
    visibility: VisibilityFilter,
    userId: string,
    pageNumber: number = 1,
  ) => {
    const pageSize = 9;
    try {
      const sites: SiteCard[] = await prisma.site.findMany({
        where: {
          visibility: visibility,
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          image: true,
          logo: true,
          visibility: true,
          user: {
            select: {
              image: true,
            },
          },
          siteConfig: {
            select: {
              author: true,
              rootNotionPageId: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
        take: 9,
        skip: pageSize * (pageNumber - 1),
      });
      return sites;
    } catch (error) {
      console.log("[Site] error happended in getUserSites", error);
      return [] as SiteCard[];
    }
  },
);

export { getUserSites };
