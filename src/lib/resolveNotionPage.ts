import { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";

import * as acl from "./acl";
import { getPage } from "./getPage";
import { getSiteMap } from "./getSiteMap";

import { PageUrlOverridesMap, Site, SiteConfig, _SiteData } from "@/types";

function cleanPageUrlMap(
  pageUrlMap: PageUrlOverridesMap,
  {
    label,
  }: {
    label: string;
  },
): PageUrlOverridesMap {
  return Object.keys(pageUrlMap).reduce((acc, uri) => {
    const pageId = pageUrlMap[uri];
    const uuid = parsePageId(pageId, { uuid: false });

    if (!uuid) {
      throw new Error(`Invalid ${label} page id "${pageId}"`);
    }

    if (!uri) {
      throw new Error(`Missing ${label} value for page "${pageId}"`);
    }

    if (!uri.startsWith("/")) {
      throw new Error(
        `Invalid ${label} value for page "${pageId}": value "${uri}" should be a relative URI that starts with "/"`,
      );
    }

    const path = uri.slice(1);

    return {
      ...acc,
      [path]: uuid,
    };
  }, {});
}

export const resolveNotionPage = async (
  domain: string,
  siteConfig: SiteConfig,
  rawPageId?: string,
  siteData?: _SiteData,
  shouldAddImage?: boolean,
) => {
  let pageId: string;
  let recordMap: ExtendedRecordMap;

  const site: Site = {
    name: siteData?.name || siteConfig.name,
    subDomain: siteData?.subDomain,
    customDomain: siteData?.customDomain,
    rootNotionPageId: parsePageId(siteConfig.rootNotionPageId, { uuid: false }),
    rootNotionSpaceId: siteConfig?.rootNotionSpaceId || "",
    ...(shouldAddImage
      ? {
          image: siteData?.image || null,
        }
      : {}),
    ...(siteData
      ? {
          css: siteData?.css || "",
          html: siteData?.html || "",
          javascript: siteData?.javascript || "",
          description: siteData?.description || "",
        }
      : {}),
    visibility: siteData?.visibility || "DRAFT",
    fontFamily: siteData?.fontFamily || "default",
  };

  if (rawPageId && rawPageId !== "index") {
    pageId = parsePageId(rawPageId);
    console.log("In rawpage Id", { pageId, rawPageId });
    if (!pageId) {
      const pageUrlOverrides = cleanPageUrlMap(
        siteConfig?.pageUrlOverrides || {},
        { label: "pageUrlOverrides" },
      );
      const pageUrlAdditions = cleanPageUrlMap(
        siteConfig?.pageUrlAdditions || {},
        { label: "pageUrlAdditions" },
      );
      // check if the site configuration provides an override or a fallback for
      // the page's URI
      const override =
        pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId];

      if (override) {
        pageId = parsePageId(override);
      }

      console.log("Page id if pageid doesnot exist", { pageId, rawPageId });
    }

    if (pageId) {
      recordMap = await getPage(pageId, siteConfig);
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap(siteConfig);
      console.log("Here!", { pageId, siteConfig });
      pageId = siteMap?.canonicalPageMap[rawPageId];

      if (pageId) {
        recordMap = await getPage(pageId, siteConfig);
      } else {
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404,
          },
        };
      }
    }
  } else {
    pageId = site.rootNotionPageId;
    recordMap = await getPage(pageId, siteConfig);
  }

  const props = { site, recordMap, pageId, config: siteConfig };
  return { ...props, ...(await acl.pageAcl(props)) };
};
