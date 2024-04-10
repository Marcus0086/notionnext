"use server";

import { cache } from "react";

import prisma from "@/lib/prisma";

const getDomainsSiteCardById = cache(async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        name: true,
        customDomain: true,
      },
    });
    const domainsData = {
      name: data?.name || undefined,
      customDomain: data?.customDomain || undefined,
    };
    return domainsData;
  } catch (error) {
    console.log("[Site] error happended in getDomainsSiteCardById", error);
    return null;
  }
});

export { getDomainsSiteCardById };
