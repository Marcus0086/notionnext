import { NavigationLink, NavigationStyle } from "./navigation";
import { PageUrlOverridesMap } from "./page-url-overrides-map";

export interface SiteConfig {
  id: string;
  rootNotionPageId: string;
  rootNotionSpaceId?: string;

  name: string;
  domain: string;
  author: string;
  description?: string;
  language?: string;

  twitter?: string;
  github?: string;
  linkedin?: string;
  newsletter?: string;
  youtube?: string;

  isPreviewImageSupportEnabled?: boolean;
  isTweetEmbedSupportEnabled?: boolean;
  isDarkModeEnabled?: boolean;
  isSearchEnabled?: boolean;
  isAiSearchEnabled?: boolean;
  isTopLoadingBarEnabled?: boolean;
  isSiteMapEnabled?: boolean;

  includeNotionIdInUrls?: boolean;
  pageUrlOverrides?: PageUrlOverridesMap;
  pageUrlAdditions?: PageUrlOverridesMap;

  navigationStyle?: NavigationStyle;
  navigationLinks?: Array<NavigationLink>;
}
