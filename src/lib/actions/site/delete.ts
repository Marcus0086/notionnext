"use server";

import { revalidatePath } from "next/cache";
import { QdrantClient } from "@qdrant/js-client-rest";

import prisma from "@/lib/prisma";
import { domainSuffix } from "@/lib/config";

import { _SiteData } from "@/types";

const deleteSiteById = async (siteId: string) => {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
  });
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

    await client.delete("NotionKnowledgeBase", {
      filter: {
        must: [
          {
            key: "metadata.siteId",
            match: {
              value: siteId,
            },
          },
        ],
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
