import {
  FooterMenuItems,
  FooterStyle,
  NavigationStyle,
  PageUrlOverrides,
} from "@prisma/client";

import { NavigationLink } from "./navigation";
import { FooterIcon } from "./footer";

export interface SiteConfig {
  id: string;
  rootNotionPageId: string;
  rootNotionSpaceId?: string;

  name: string;
  domain: string;
  author: string;
  description?: string;
  language?: string;

  isPreviewImageSupportEnabled?: boolean;
  isTweetEmbedSupportEnabled?: boolean;
  isDarkModeEnabled?: boolean;
  isSearchEnabled?: boolean;
  isAiSearchEnabled?: boolean;
  isTopLoadingBarEnabled?: boolean;
  isSiteMapEnabled?: boolean;
  isIndexingEnabled?: boolean;
  navbar_bg?: string;
  navbar_bg_dark?: string;
  navbar_text_color?: string;
  navbar_text_color_dark?: string;
  main_bg?: string;
  main_bg_dark?: string;
  main_text_color?: string;
  main_text_color_dark?: string;
  main_title_size?: string;
  main_text_size?: string;
  footer_bg?: string;
  footer_bg_dark?: string;
  footer_text_color?: string;
  footer_text_color_dark?: string;
  footer_footnote?: string;
  footer_title?: string;
  footer_divider?: boolean;

  includeNotionIdInUrls?: boolean;
  pageUrlOverrides?: Array<PageUrlOverrides>;

  navigationStyle?: NavigationStyle;
  footerStyle?: FooterStyle;
  navigationLinks?: Array<NavigationLink>;
  footerIcons?: Array<FooterIcon>;
  footerMenuItems?: Array<FooterMenuItems>;
}
