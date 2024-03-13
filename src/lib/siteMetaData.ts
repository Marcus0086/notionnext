import { Metadata } from "next";
import { getBlockTitle, getPageProperty } from "notion-utils";

import { getCanonicalPageUrl } from "./mapPageUrl";
import generateSecureNotionUrl from "./generateSecureNotionUrl";

import { PageProps, JsonMetaData } from "@/types";

const getIconUrl = (blockId: string, icon?: string) => {
  if (!icon) {
    return "/favicon.ico";
  } else {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+/gu;

    if (typeof icon === "string" && icon.match(emojiRegex)) {
      return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
        icon || ""
      }</text></svg>`;
    }

    const checkPublicIcon = icon.startsWith("/icons");
    if (checkPublicIcon) {
      return `https://www.notion.so${icon}`;
    }
    return generateSecureNotionUrl(icon, blockId);
  }
};

const getSocialImage = (image: string, blockId: string) => {
  const checkPublicUrl = image.startsWith("/images");
  if (checkPublicUrl) {
    return `https://www.notion.so${image}`;
  }
  const checkCustomUrl = /secure.notion-static.com/.test(image);
  if (checkCustomUrl) {
    return generateSecureNotionUrl(image, blockId);
  }
  return "";
};

const getSiteMetaData = (
  pageData: PageProps,
  type?: string
): JsonMetaData | Metadata => {
  const { pageId, recordMap, site }: PageProps = pageData;
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;
  const title =
    block && site ? getBlockTitle(block, recordMap) || site.name : "";

  const icon = block
    ? getIconUrl(block.id, block.format?.page_icon)
    : "/favicon.ico";

  const socialImage =
    site?.image?.toString() ||
    (block && block.format?.page_cover
      ? getSocialImage(block.format?.page_cover || "", block.id)
      : "/images/dashboard/notFound.webp");

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
