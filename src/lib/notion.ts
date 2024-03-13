import { cache } from "react";
import { NotionAPI } from "notion-client";

import prisma from "@/lib/prisma";

const getNotionClient = cache(async (siteConfigId?: string) => {
  let notion: NotionAPI = new NotionAPI();
  if (!siteConfigId) {
    return notion;
  }
  try {
    const data = await prisma.site.findUnique({
      where: {
        siteConfigId: siteConfigId,
      },
      select: {
        notionAuthToken: true,
        notionUserId: true,
      },
    });
    if (data && data.notionAuthToken && data.notionUserId) {
      notion = new NotionAPI({
        authToken: data.notionAuthToken,
        activeUser: data.notionUserId,
      });
    }
    return notion;
  } catch (error) {
    console.log(error);
    return notion;
  }
});

export { getNotionClient };
