import { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";
import { PageUrlOverrides } from "@prisma/client";

import * as acl from "./acl";
import { getPage } from "./getPage";
import { getSiteMap } from "./getSiteMap";

import { PageUrlOverridesMap, Site, SiteConfig, _SiteData } from "@/types";

function cleanPageUrlMap(
  pageUrlOverrides: PageUrlOverrides[],
  {
    label,
  }: {
    label: string;
  },
): PageUrlOverridesMap {
  if (pageUrlOverrides.length === 0) {
    return {};
  }
  const pageUrlMap = pageUrlOverrides.reduce((acc, { pageId, pagePath }) => {
    const uuid = parsePageId(pageId, { uuid: false });

    if (!uuid) {
      throw new Error(`Invalid ${label} page id "${pageId}"`);
    }

    if (!pagePath) {
      throw new Error(`Missing ${label} value for page "${pageId}"`);
    }

    if (!pagePath.startsWith("/")) {
      throw new Error(
        `Invalid ${label} value for page "${pageId}": value "${pagePath}" should be a relative URI that starts with "/"`,
      );
    }

    const path = pagePath.slice(1);

    return {
      ...acc,
      [path]: uuid,
    };
  });
  return pageUrlMap;
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
    id: siteData?.id || domain,
    userId: siteData?.userId || "",
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
    if (!pageId) {
      const pageUrlOverrides = cleanPageUrlMap(
        siteConfig?.pageUrlOverrides || [],
        { label: "pageUrlOverrides" },
      );
      // check if the site configuration provides an override or a fallback for
      // the page's URI
      const override = pageUrlOverrides[rawPageId];

      if (override) {
        pageId = parsePageId(override);
      }
    }

    if (pageId) {
      recordMap = await getPage(pageId, siteConfig);
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap(siteConfig);
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
