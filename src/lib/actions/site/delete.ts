"use server";

import { revalidatePath } from "next/cache";
import { QdrantClient } from "@qdrant/js-client-rest";

import prisma from "@/lib/prisma";
import { domainSuffix } from "@/lib/config";

import { _SiteData } from "@/types";

const deleteEmbeddings = async (siteId: string) => {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
  });
  const notionCollection = "NotionKnowledgeBase";
  const clientCollections = await client.getCollections();
  const collections = clientCollections.collections.map(
    (collection) => collection.name
  );
  if (collections.includes(notionCollection)) {
    await client.delete(notionCollection, {
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
  }
};

const deleteSiteById = async (siteId: string) => {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
      select: {
        siteConfigId: true,
        subDomain: true,
        customDomain: true,
        id: true,
      },
    });

    const deleteSite = async (siteId: string) => {
      return await prisma.site.delete({
        where: {
          id: siteId,
        },
      });
    };

    const deleteSiteConfig = prisma.siteConfig.delete({
      where: {
        id: data?.siteConfigId || "",
      },
    });

    await Promise.allSettled([
      deleteSite(siteId),
      deleteSiteConfig,
      deleteEmbeddings(siteId),
    ]);

    const siteData = {
      customDomain: data?.customDomain || undefined,
      subDomain: data?.subDomain
        ? `${data.subDomain}.${domainSuffix}`.replace(":3000", "")
        : undefined,
    };

    revalidatePath("/home");
    return {
      data: siteData,
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
