"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { useTheme } from "next-themes";
import { NotionComponents, NotionRenderer } from "react-notion-x";
import { CollectionViewPageBlock, PageBlock } from "notion-types";
import parse from "html-react-parser";
import { useServerInsertedHTML } from "next/navigation";
import { Modal } from "react-notion-x/build/third-party/modal";

import PageLink from "@/components/dashboard/pageLink";
import Tweet from "@/components/shared/tweet";
import NavHeader from "@/components/dashboard/navHeader";
import HomePageNavBar from "@/components/homePageNavBar";
import Footer from "@/components/footer";

import { Code, Collection, Equation, Pdf } from "@/lib/asyncPackageLoader";
import {
  propertyLastEditedTimeValue,
  propertyDateValue,
  propertyTextValue,
} from "@/lib/propertyValues";
import { searchNotion } from "@/lib/searchNotion";
import { cn } from "@/lib/utils";
import { mapPageUrl } from "@/lib/mapPageUrl";
import ErrorBoundary from "@/lib/errorBoundary";
import useBodyClassName from "@/hooks/useBodyClassName";

import { PageProps } from "@/types";

const NotionPage: React.FC<PageProps> = ({
  recordMap,
  config,
  error,
  pageId,
  site,
  isLive,
  accountType,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (recordMap) {
      Modal.setAppElement(".notion-viewport");
    }
  }, [recordMap]);

  const getNavHeader = useCallback(
    ({ block }: { block: CollectionViewPageBlock | PageBlock }) => {
      return config?.navigationStyle === "shared" && isLive ? (
        <HomePageNavBar block={block} siteConfig={config} />
      ) : config?.navigationStyle === "none" ? null : (
        NavHeader({
          block,
          siteConfig: config,
          site: site,
          recordMap,
          accountType,
          isLive,
        })
      );
    },
    [accountType, config, isLive, recordMap, site]
  );

  const components = useMemo<Partial<NotionComponents>>(
    () => ({
      nextImage: Image,
      PageLink,
      Code,
      Collection,
      Equation,
      Modal,
      Pdf,
      Tweet,
      propertyLastEditedTimeValue,
      propertyDateValue,
      propertyTextValue,
      Header: getNavHeader,
    }),
    [getNavHeader]
  );

  const siteMapPageUrl = useMemo(() => {
    if (site && recordMap) {
      const params: any = {};

      const searchParams = new URLSearchParams(params);
      return mapPageUrl(site, recordMap, searchParams);
    }
  }, [site, recordMap]);

  const dynamicCss = site?.css || "";
  const html = site?.html || "";
  const isServerInserted = useRef(false);
  useServerInsertedHTML(() => {
    if (html && !isServerInserted.current) {
      if (isLive) {
        isServerInserted.current = true;
        const parsedHtml = parse(html);
        return <>{parsedHtml}</>;
      }
    }
  });

  useBodyClassName(theme === "dark" ? "dark-mode" : "light-mode");

  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  const isBlogPost =
    block?.type === "page" && block?.parent_table === "collection";

  const footer = useMemo(
    () =>
      config?.footerStyle === "shared" && isLive ? (
        <Footer />
      ) : config?.footerStyle === "none" ? null : config?.footerStyle ===
        "custom" ? (
        <></>
      ) : null,
    [config?.footerStyle, isLive]
  );
  return (
    <>
      <style jsx global>{`
        ${site?.fontFamily && site?.fontFamily !== "default"
          ? `
                @import url('https://fonts.googleapis.com/css2?family=${site?.fontFamily}:wght@400;500;600;700&display=swap');
                :root {
                    --notion-font: '${site?.fontFamily}' , sans-serif !important;
                }
            `
          : ""}

        ${config?.main_bg
          ? `
        .notion-page-scroller {
          background: ${config.main_bg}
        }
        `
          : ""}

        ${config?.navbar_bg
          ? `
        .notion-header {
          background: ${config.navbar_bg}
        }
        `
          : ""}

        
        ${config?.main_text_color
          ? `
          .notion-page {
            color: ${config.main_text_color}
          }
        `
          : ""}

        ${config?.navbar_text_color
          ? `
          .notion-header .breadcrumb {
            color: ${config.navbar_text_color}
          }
        `
          : ""}

        ${config?.main_text_size
          ? `
          .notion {
            font-size: ${config.main_text_size} !important;
          }
        `
          : ""}

        ${config?.main_title_size
          ? `
          .notion-title {
            font-size: ${config.main_title_size} !important;
          }
        `
          : ""}

        ${config?.main_bg
          ? `
          .notion-search, .notion-search .searchInput {
            background: ${config.main_bg} !important;
          }
        `
          : ""}

        ${config?.main_text_color
          ? `
          .notion-search .searchInput {
            color: ${config.main_text_color} !important;
          }
        `
          : ""}

        .notion-collection-page-properties {
          display: none !important;
        }

        .notion-collection {
          overflow: auto !important;
          width: 100% !important;
        }

        .notion-table,
        .notion-board {
          width: 100% !important;
        }

        .notion-table-view,
        .notion-board-view {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .notion-table-header {
          z-index: 20 !important;
        }

        @media (min-width: 1300px) and (min-height: 300px) {
          .notion-page-content-has-aside {
            width: calc((100vw + var(--notion-max-width)) / 2.1);
          }
        }

        ${dynamicCss}
      `}</style>
      {recordMap ? (
        <NotionRenderer
          bodyClassName={cn(
            pageId === site?.rootNotionPageId ? "index-page" : ""
          )}
          showTableOfContents={isBlogPost}
          components={components}
          recordMap={recordMap}
          rootPageId={config?.rootNotionPageId}
          rootDomain={site?.customDomain || site?.subDomain || config?.domain}
          fullPage={true}
          isImageZoomable={true}
          mapPageUrl={siteMapPageUrl}
          darkMode={
            config?.isDarkModeEnabled && theme === "dark" ? true : false
          }
          searchNotion={config?.isSearchEnabled ? searchNotion : undefined}
          footer={footer}
        />
      ) : (
        <></>
      )}
      {site?.javascript ? (
        (isLive && accountType !== "FREE") || !isLive ? (
          <ErrorBoundary>
            <Script
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: site.javascript,
              }}
              id="site-javascript"
            />
          </ErrorBoundary>
        ) : null
      ) : null}
    </>
  );
};

export default NotionPage;
