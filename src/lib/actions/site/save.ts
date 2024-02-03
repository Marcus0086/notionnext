import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

import { _SiteData } from "@/types";

const saveSiteData = async (siteId: string, value: any) => {
  let site = { id: "" };
  try {
    if (!value?.hasSiteConfigData) {
      site = await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          ...value,
        },
        select: {
          id: true,
        },
      });
    } else {
      delete value?.hasSiteConfigData;
      site = await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          siteConfig: {
            update: {
              data: {
                ...value,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
    }
    revalidatePath(`/(Site)/site/[siteId]`, "layout");
    return site;
  } catch (error) {
    console.log("[Site] error happended in saveSiteData", error);
    return null;
  }
};

export { saveSiteData };
