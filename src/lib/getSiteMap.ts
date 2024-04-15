import { getAllPagesInSpace, uuidToId } from "notion-utils";
import pMemoize from "p-memoize";

import { getCanonicalPageId } from "@/lib/getCanonicalPageId";
import { getNotionClient } from "@/lib/notion";

import { uuid } from "@/lib/config";

import { CanonicalPageMap, SiteConfig, SiteMap } from "@/types";

const uuid_dev = uuid;

export async function getSiteMap(
  config: SiteConfig,
  uuid?: boolean,
): Promise<SiteMap> {
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config?.rootNotionSpaceId || "",
    config.id,
    uuid,
  );

  return {
    ...partialSiteMap,
  } as SiteMap;
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId: string,
  id: string,
  uuid?: boolean,
): Promise<Partial<SiteMap>> {
  const getPage = async (pageId: string, ...args: any[]) => {
    const notion = await getNotionClient(id);
    console.log("\nnotion getPage", uuidToId(pageId));
    return notion.getPage(pageId, ...args);
  };

  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
  );

  const canonicalPageMap = Object.keys(pageMap).reduce<CanonicalPageMap>(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }

      const canonicalPageId =
        getCanonicalPageId(pageId, recordMap, {
          uuid: uuid ?? uuid_dev,
        })?.toString() || "";

      if (map[canonicalPageId]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn("error duplicate canonical page id", {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId],
        });

        return map;
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId,
        };
      }
    },
    {},
  );

  return {
    pageMap,
    canonicalPageMap,
  };
}
