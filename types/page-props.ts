import { ExtendedRecordMap } from "notion-types";
import { AccountType } from "@prisma/client";

import { PageError } from "./page-error";
import { Site } from "./site";
import { SiteConfig } from "./site-config";
import { ParsedUrlQuery } from "querystring";
import { SiteMap } from "./site-map";

export interface PageProps {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
  config?: SiteConfig;
  isLive?: boolean;
  accountType?: AccountType;
}

export interface ProviderPageProps extends PageProps {
  siteMap?: SiteMap;
  allPageProps?: Record<string, PageProps>;
}

export interface RootParams extends ParsedUrlQuery {
  site: string;
}
export interface PageParams extends RootParams {
  pageId: string;
}
