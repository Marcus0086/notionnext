"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { useTheme } from "next-themes";
import { NotionComponents, NotionRenderer } from "react-notion-x";
import { CollectionViewPageBlock, PageBlock } from "notion-types";
import parse from "html-react-parser";
import { useServerInsertedHTML } from "next/navigation";

import PageLink from "@/components/dashboard/pageLink";
import Tweet from "@/components/shared/tweet";
import NavHeader from "@/components/dashboard/navHeader";

import {
  Code,
  Collection,
  Equation,
  Modal,
  Pdf,
} from "@/lib/asyncPackageLoader";
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
      Header: ({ block }: { block: CollectionViewPageBlock | PageBlock }) =>
        NavHeader({
          block,
          siteConfig: config,
          site: site,
          recordMap,
          accountType,
          isLive,
        }),
    }),
    [accountType, config, isLive, recordMap, site],
  );

  const siteMapPageUrl = useMemo(() => {
    if (site && recordMap) {
      const params: any = {};

      const searchParams = new URLSearchParams(params);
      return mapPageUrl(site, recordMap, searchParams);
    }
  }, [site, recordMap]);

  // console.log('Notionpage data:', {
  //     siteMapPageUrl: siteMapPageUrl?.(config?.rootNotionPageId || "")
  // })

  // const [newRecordMap, setNewRecordMap] = useState<ExtendedRecordMap | undefined>(undefined)

  // useEffect(() => {
  //     const getNewRecordMap = async () => {
  //         if (recordMap) {
  //             try {
  //                 const parsedRecordMap = recordMap;
  //                 const collectionKeys = Object.keys(parsedRecordMap.collection)

  //                 const blockKeys = Object.keys(parsedRecordMap.block).reverse()

  //                 const collectionQueryKeys = Object.keys(parsedRecordMap.collection_query[collectionKeys[0]])

  //                 const firstBlock = parsedRecordMap.block[blockKeys[0]].value;

  //                 const stringifiedRecordMap = JSON.stringify(recordMap)
  //                 console.log('Stringified recordMap:', stringifiedRecordMap)
  //                 const data = await getData()

  //                 webTemplateEngine(stringifiedRecordMap, data).then((result) => {
  //                     // for (let i in result) {
  //                     //     const block = result[i];

  //                     //     // delete parsedRecordMap.block[blockKeys[0]]

  //                     //     parsedRecordMap.block[block.id] = {
  //                     //         role: "reader",
  //                     //         value: block
  //                     //     }

  //                     //     parsedRecordMap
  //                     //         .collection_query[collectionKeys[0]][collectionQueryKeys[0]]
  //                     //         .collection_group_results?.blockIds.push(block.id)
  //                     // }
  //                 })
  //                 setNewRecordMap(parsedRecordMap)
  //             } catch (error) {
  //                 console.error('Error in recordMap:', error)
  //                 setNewRecordMap(recordMap)
  //             }
  //         }
  //     }
  //     getNewRecordMap()
  // }, [recordMap])

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
            pageId === site?.rootNotionPageId ? "index-page" : "",
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
          searchNotion={(params) => searchNotion(params)}
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
