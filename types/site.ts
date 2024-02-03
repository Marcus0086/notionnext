import { ExtendedRecordMap } from "notion-types";
import { ParsedUrlQuery } from "querystring";

import type { VisibilityFilter } from "@prisma/client";
import { SiteConfig } from "./site-config";
import { SiteMap } from "./site-map";

export interface Site {
  name: string;
  subDomain?: string;
  customDomain?: string;
  rootNotionPageId: string;
  rootNotionSpaceId: string;

  html?: string;
  css?: string;
  javascript?: string;
  fontFamily?: string;
  previewImages?: boolean;

  description?: string;
  image?: string | null;
  visibility?: VisibilityFilter;
}

export interface SiteSettings {
  site?: Site;
  config?: SiteConfig;
  recordMap?: ExtendedRecordMap;
  siteMap?: SiteMap;
  miscelanous?: Record<string, string | boolean>;
}

export interface _SiteData extends Site {
  siteConfig: SiteConfig;
}

export interface Sitebody {
  name: string;
  userId: string;
  rootNotionPageId: string;
  userName: string;
}

export interface SiteCard {
  id: string;
  name: string;
  image: string | null;
  logo: string | null;
  user: {
    image: string | null;
  } | null;
  siteConfig: {
    author?: string;
    rootNotionPageId: string;
  } | null;
  visibility: VisibilityFilter;
}

export interface SiteViewFilterData {
  [x: string]: SiteCard[];
}

export interface SiteGloalFlag {
  [x: string]: boolean;
}

interface SitePage extends ParsedUrlQuery {
  siteId: string;
}
export interface SitePageParams {
  params: SitePage;
}

export type JsonMetaData = {
  title: string;
  description?: string;
  icon: string;
  image?: string;
};
