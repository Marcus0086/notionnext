import { ExtendedRecordMap, SearchParams, SearchResults } from "notion-types";
import { mergeRecordMaps } from "notion-utils";
import pMap from "p-map";
import pMemoize from "p-memoize";
import { SiteConfig } from "../../types";
import { getNotionClient } from "./notion";

const getNavigationLinkPages = pMemoize(
  async (config: SiteConfig): Promise<ExtendedRecordMap[]> => {
    const notion = await getNotionClient(config.id);
    const navigationLinkPageIds = (config.navigationLinks || [])
      .map((link) => link.pageId)
      .filter(Boolean);

    if (config.navigationStyle !== "default" && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId?.toString() || "", {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false,
          }),
        {
          concurrency: 4,
        }
      );
    }

    return [];
  }
);

export async function getPage(
  pageId: string,
  config: SiteConfig
): Promise<ExtendedRecordMap> {
  const notion = await getNotionClient(config.id);
  let recordMap = await notion.getPage(pageId);

  if (config.navigationStyle !== "default") {
    // ensure that any pages linked to in the custom navigation header have
    // their block info fully resolved in the page record map so we know
    // the page title, slug, etc.
    const navigationLinkRecordMaps = await getNavigationLinkPages(config);

    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      );
    }
  }

  return recordMap;
}

export async function search(params: SearchParams): Promise<SearchResults> {
  const notion = await getNotionClient();
  return notion.search(params);
}
