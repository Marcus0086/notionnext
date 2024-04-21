import { ExtendedRecordMap, SearchParams, SearchResults } from "notion-types";
import { mergeRecordMaps, parsePageId } from "notion-utils";
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
  config?: SiteConfig
): Promise<ExtendedRecordMap> {
  const notion = await getNotionClient(config?.id);
  let recordMap = await notion.getPage(pageId);

  if (config && config.navigationStyle !== "default") {
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

const fetchWrapper = async ({
  endpoint,
  body,
  fetchOption,
  headers: clientHeaders,
}: {
  endpoint: string;
  body: object;
  fetchOption: any;
  headers?: HeadersInit;
}) => {
  const headers: HeadersInit = {
    ...clientHeaders,
    ...fetchOption?.headers,
    "Content-Type": "application/json",
  };

  const url = `https://www.notion.so/api/v3/${endpoint}`;
  const requestInit = {
    method: "post",
    body: JSON.stringify(body),
    headers,
    ...fetchOption,
  };
  if (fetchOption?.timeout !== undefined) {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), fetchOption.timeout);
    requestInit.signal = ctrl.signal;
  }

  return fetch(url, requestInit).then((res) => res.json());
};

export const notionSearch = async (params: SearchParams, fetchOption?: any) => {
  const body = {
    type: "BlocksInAncestor",
    source: "quick_find_filters",
    ancestorId: parsePageId(params.ancestorId),
    sort: { field: "relevance" },
    limit: params.limit || 20,
    query: params.query,
    filters: {
      isDeletedOnly: false,
      navigableBlockContentOnly: false,
      excludeTemplates: true,
      requireEditPermissions: false,
      ancestors: [],
      createdBy: [],
      editedBy: [],
      lastEditedTime: {},
      createdTime: {},
      ...params.filters,
    },
  };

  return fetchWrapper({
    endpoint: "search",
    body,
    fetchOption,
  });
};
