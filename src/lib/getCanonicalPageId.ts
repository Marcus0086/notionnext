import { ExtendedRecordMap } from "notion-types";
import {
  getCanonicalPageId as getCanonicalPageIdImpl,
  parsePageId,
} from "notion-utils";

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {},
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false });
  if (!cleanPageId) {
    return null;
  }

  const canonicalPageId = getCanonicalPageIdImpl(pageId, recordMap, { uuid });
  return canonicalPageId;
}
