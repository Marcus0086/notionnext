import { PageError, SiteConfig } from "@/types";
import { ExtendedRecordMap } from "notion-types";

export interface SettingsPage {
  config?: SiteConfig;
  site?: {
    name: string;
    domain: string;
    rootNotionPageId: string;
    rootNotionSpaceId: string;
  };
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
  notFound: boolean;
  redirect?: string;
}
