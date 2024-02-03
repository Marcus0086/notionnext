import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { domainSuffix } from "@/lib/config";

import { _SiteData } from "@/types";

const deleteSiteById = async (siteId: string) => {
  try {
    const data = await prisma.site.delete({
      where: {
        id: siteId,
      },
      select: {
        siteConfigId: true,
        subDomain: true,
        customDomain: true,
      },
    });

    const siteName =
      data?.customDomain ||
      `${data?.subDomain}.${domainSuffix}`.replace(":3000", "") ||
      "";

    await prisma.siteConfig.delete({
      where: {
        id: data?.siteConfigId || "",
      },
    });
    revalidatePath("/home");
    return {
      domain: siteName,
      success: true,
    };
  } catch (error) {
    console.log("[Site] error happended in deleteSiteById", error);
    return {
      success: false,
    };
  }
};

export { deleteSiteById };
