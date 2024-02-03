import { PageMap } from "notion-types";
import { CanonicalPageMap } from "./canonical-page-map";

export interface SiteMap {
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}
