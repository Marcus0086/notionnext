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
        name: true,
        siteConfig: {
          select: {
            footerIcons: {
              select: {
                icon: true,
                title: true,
                url: true,
              },
            },
            footerStyle: true,
            footer_footnote: true,
            footer_title: true,
            footer_divider: true,
            id: true,
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
