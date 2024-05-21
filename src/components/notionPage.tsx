"use client";

import { getBlockTitle } from "notion-utils";
import Link from "next/link";
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
import { getIconUrl } from "@/lib/siteMetaData";

import useBodyClassName from "@/hooks/useBodyClassName";

import { PageProps } from "@/types";
import { IconsFactory } from "@/lib/factories/icon";

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
      ) : config?.navigationStyle === "hidden" ? null : (
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

  const title =
    block && site ? getBlockTitle(block, recordMap) || site.name : "";

  const icon = block
    ? getIconUrl(block.id, block.format?.page_icon)
    : "/favicon.ico";

  const footer = useMemo(
    () =>
      config?.footerStyle === "shared" && isLive ? (
        <Footer />
      ) : config?.footerStyle === "none" ? null : config?.footerStyle ===
        "custom" ? (
        <footer
          className={cn(
            "notion-footer",
            "w-full max-w-[1600px] gap-4 py-20 px-8 lg:px-24 text-sm my-4",
            "flex flex-col items-start justify-center"
          )}
        >
          <nav className="flex flex-wrap items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              {!config?.footer_title && (
                <Image
                  src={icon}
                  width={24}
                  height={24}
                  alt={title}
                  className="rounded-sm"
                />
              )}
              <Link
                href="/"
                className="font-bold text-base md:text-2xl text-gray-950 dark:text-white"
              >
                {config?.footer_title || title}
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {config?.footerIcons?.map((icon, index) => {
                const Icon = IconsFactory.getIcon(icon.icon);
                return (
                  <Link key={index} href={icon.url}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </Link>
                );
              })}
            </div>
          </nav>
          {config?.footer_divider && (
            <hr className="w-full h-0.5 bg-gray-800 dark:bg-gray-300 my-4" />
          )}
          <nav className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-neutral-500 text-xs">
            <p>{config.footer_footnote}</p>
            <div className="sm:ml-auto flex gap-4 sm:gap-6"></div>
          </nav>
        </footer>
      ) : null,
    [
      config?.footerStyle,
      config?.footer_divider,
      config?.footer_footnote,
      config?.footer_title,
      config?.footerIcons,
      icon,
      isLive,
      title,
    ]
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

        ${config?.main_bg_dark && theme === "dark"
          ? `
        .notion-page-scroller {
          background: ${config.main_bg_dark}
        }
        `
          : ""}

        ${config?.navbar_bg
          ? `
        .notion-header {
          background: ${config.navbar_bg} !important;
        }
        `
          : ""}

        ${config?.navbar_bg_dark && theme === "dark"
          ? `
        .notion-header {
          background: ${config.navbar_bg_dark} !important;
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

        ${config?.main_text_color_dark && theme === "dark"
          ? `
          .notion-page {
            color: ${config.main_text_color_dark}
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

        ${config?.navbar_text_color_dark && theme === "dark"
          ? `
          .notion-header .breadcrumb {
            color: ${config.navbar_text_color_dark}
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


        ${config?.footer_bg
          ? `.notion-footer { background: ${config.footer_bg} !important; }`
          : ""}
        ${config?.footer_text_color
          ? `.notion-footer a, .notion-footer nav { color: ${config.footer_text_color} !important; }`
          : ""}

        ${config?.footer_bg_dark && theme === "dark"
          ? `.notion-footer { background: ${config.footer_bg_dark} !important; }`
          : ""}
        ${config?.footer_text_color_dark && theme === "dark"
          ? `.notion-footer a, .notion-footer nav { color: ${config.footer_text_color_dark} !important; }`
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
