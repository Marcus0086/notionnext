"use client";

import React from "react";
import { Breadcrumbs, Search, useNotionContext } from "react-notion-x";
import { AccountType } from "@prisma/client";
import {
  CollectionViewPageBlock,
  ExtendedRecordMap,
  PageBlock,
} from "notion-types";

import ThemeButton from "../shared/themeButton";
import AiSearch from "@/components/aiSearch";

import { Site, SiteConfig } from "@/types";

const NavHeader: React.FC<{
  block: CollectionViewPageBlock | PageBlock;
  siteConfig?: SiteConfig;
  site?: Site;
  recordMap?: ExtendedRecordMap;
  accountType?: AccountType;
  isLive?: boolean;
}> = ({ block, siteConfig, recordMap, site, accountType, isLive }) => {
  const { components, mapPageUrl } = useNotionContext();
  return (
    <header className="notion-header">
      <nav className="notion-nav-header">
        <Breadcrumbs block={block} />
        <ul className="notion-nav-header-rhs breadcrumbs">
          {siteConfig?.navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) return null;
              if (link.pageId) {
                return (
                  <components.PageLink
                    key={index}
                    href={mapPageUrl(link.pageId)}
                    className="breadcrumb button"
                  >
                    {link.title}
                  </components.PageLink>
                );
              }
              return (
                <components.Link
                  key={index}
                  href={link.url}
                  className="breadcrumb button"
                >
                  {link.title}
                </components.Link>
              );
            })
            .filter(Boolean)}
          {siteConfig?.isSearchEnabled && <Search block={block} title={null} />}
          {siteConfig?.isAiSearchEnabled ? (
            (isLive && accountType !== "FREE") || !isLive ? (
              <AiSearch siteId={site?.id} tenant={site?.userId} />
            ) : null
          ) : null}
          {siteConfig?.isDarkModeEnabled ? <ThemeButton /> : null}
        </ul>
      </nav>
    </header>
  );
};

export default NavHeader;
