import { ExtendedRecordMap } from "notion-types";
import { parsePageId, uuidToId } from "notion-utils";
import { Site } from "@/types";
import { getCanonicalPageId } from "./getCanonicalPageId";
import { uuid, domainSuffix, httpPrefix } from "src/lib/config";
// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)

export const mapPageUrl =
  (site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = "") => {
    const pageUuid = parsePageId(pageId, { uuid: true });

    if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return createUrl("/", searchParams);
    } else {
      return createUrl(
        `/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`,
        searchParams,
      );
    }
  };

export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = "") => {
    const pageUuid = parsePageId(pageId, { uuid: true });
    const uuidPageUid = uuidToId(pageId);
    if (uuidPageUid === uuidToId(site.rootNotionPageId)) {
      return site?.customDomain
        ? `${httpPrefix}${site.customDomain}`
        : `${httpPrefix}${site.subDomain}.${domainSuffix}`;
    } else {
      return site?.customDomain
        ? `${httpPrefix}${site.customDomain}`
        : `${httpPrefix}${site.subDomain}.${domainSuffix}/${getCanonicalPageId(
            pageUuid,
            recordMap,
            { uuid },
          )}`;
    }
  };

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join("?");
}
