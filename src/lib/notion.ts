import { cache } from "react";
import { NotionAPI } from "notion-client";

import prisma from "./prisma";

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
        siteConfig: {
          select: {
            notionActiveUserId: true,
            notionAuthToken: true,
          },
        },
      },
    });
    if (
      data &&
      data.siteConfig &&
      data.siteConfig.notionAuthToken &&
      data.siteConfig.notionActiveUserId
    ) {
      notion = new NotionAPI({
        authToken: data.siteConfig.notionAuthToken,
        activeUser: data.siteConfig.notionActiveUserId,
      });
    }
    return notion;
  } catch (error) {
    console.log(error);
    return notion;
  }
});

export { getNotionClient };
