import { Metadata } from "next";
import { getBlockTitle, getPageProperty } from "notion-utils";

import { getCanonicalPageUrl } from "./mapPageUrl";
import generateNotionIconUrl from "./generateNotionIcon";

import { PageProps, JsonMetaData } from "@/types";

const getSiteMetaData = (
  pageData: PageProps,
  type?: string,
): JsonMetaData | Metadata => {
  const { pageId, recordMap, site }: PageProps = pageData;
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  const title =
    block && site ? getBlockTitle(block, recordMap) || site.name : "";

  const icon = block?.format?.page_icon?.includes(".svg")
    ? `https://www.notion.so${block?.format?.page_icon}`
    : block?.format?.page_icon?.includes(".png")
      ? generateNotionIconUrl(block.format?.page_icon, block.id)
      : `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
          block?.format?.page_icon || ""
        }</text></svg>`;

  const socialImage =
    site?.image?.toString() || block?.format?.page_cover
      ? `https://www.notion.so${block?.format?.page_cover}`
      : undefined;

  const socialDescription = block
    ? getPageProperty<string>("Description", block, recordMap) ||
      site?.description
    : "";

  const canonicalPageUrl =
    site && recordMap && pageId
      ? getCanonicalPageUrl(site, recordMap)(pageId)
      : "";

  let metadata: Metadata = {
    title: title,
    description: socialDescription,
    ...(canonicalPageUrl.length > 0
      ? {
          metadataBase: new URL(canonicalPageUrl),
        }
      : {}),
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: icon,
      shortcut: icon,
      apple: icon,
    },
    openGraph: {
      title,
      description: socialDescription,
      ...(pageData?.site
        ? {
            siteName: pageData.site.name,
          }
        : {}),
      ...(canonicalPageUrl.length > 0
        ? {
            url: canonicalPageUrl,
          }
        : {}),
      type: "website",
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    twitter: {
      title: title,
      description: socialDescription,
    },
  };

  if (type === "json") {
    const jsonMetaData: JsonMetaData = {
      title: title,
      description: socialDescription,
      image: socialImage,
      icon: icon,
    };
    return jsonMetaData;
  }

  return metadata;
};

export { getSiteMetaData };
