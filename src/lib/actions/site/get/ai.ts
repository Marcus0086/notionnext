"use server";

import { cache } from "react";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { KnowledgeBase } from "@prisma/client";

import { PageLinks } from "@/components/dashboard/column";

import prisma from "@/lib/prisma";
import { getBlockContent } from "@/lib/blockContent";
import { sitePage } from "@/lib/actions/site";

import { _SiteData, ProviderPageProps, Document, PageProps } from "@/types";
import { resolveNotionPage } from "@/lib/resolveNotionPage";

const countWords = (str: string) => {
  return str.split(" ").filter((n) => n !== "").length;
};

const getRootPageSiteData = async (siteId: string) => {
  return (await sitePage(siteId, true, true)) as PageProps;
};

const getKnowledgeBases = cache(async (siteId: string) => {
  return await prisma.knowledgeBase.findMany({
    where: {
      siteId: siteId,
    },
  });
});

const getChildLinks = cache(
  (pagesSiteData: ProviderPageProps | undefined | null, indexPage: string) => {
    return Object.entries(pagesSiteData?.allPageProps || {}).reduce(
      (acc, [key, pageProps]) => {
        let path = key;
        const blockContent = getBlockContent(pageProps?.recordMap);
        if (key.includes(indexPage)) {
          path = "/home";
        }
        acc.push({
          path: path,
          content: blockContent.text,
          words: countWords(blockContent.text),
        });
        return acc;
      },
      [] as PageLinks[],
    );
  },
);

const getDocuments = cache(
  async (
    childLinks: PageLinks[],
    splitter: RecursiveCharacterTextSplitter,
    pagesSiteData: ProviderPageProps | undefined | null,
    siteId: string,
  ) => {
    let documents: Document[] = [];
    if (childLinks.length > 0) {
      for (const page of childLinks) {
        const splittedDocuments = (
          await splitter.splitText(page?.content || "")
        ).map((text) => {
          return {
            pageContent: text,
            source: page.path,
            site: pagesSiteData?.site?.name || "",
            siteId: siteId,
          };
        });
        documents = documents.concat(splittedDocuments);
      }
    }
    return documents;
  },
);

const getUniqueDocuments = cache(
  (documents: Document[], knowledgeBases: KnowledgeBase[]) => {
    if (documents.length > 0) {
      return documents.reduce(
        (acc, document) => {
          const existingDocument = acc.find(
            (item) => item.doc.source === document.source,
          );
          const kb = knowledgeBases.find(
            (kb) => kb.name === document.source.replace("/", ""),
          );
          if (existingDocument) {
            existingDocument.subDocuments.push(document);
          } else {
            acc.push({
              doc: document,
              subDocuments: [document],
              kb: kb,
            });
          }
          return acc;
        },
        [] as {
          doc: Document;
          subDocuments: Document[];
          kb?: KnowledgeBase;
        }[],
      );
    }
    return [];
  },
);

const getPageSlice = (
  pageMap: [string, string][],
  pageNumber: number,
  pageSize: number,
) => {
  const startIndex = pageNumber * pageSize;
  const endIndex = startIndex + pageSize;
  const pageSlice = pageMap.slice(startIndex, endIndex);
  return pageSlice;
};

const getSiteDocuments = async (
  siteId: string,
  pageNumber: number = 0,
  pageSize: number = 1,
) => {
  const rootPageDataSiteMap: ProviderPageProps =
    await getRootPageSiteData(siteId);
  const allPagesSiteData = rootPageDataSiteMap;
  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 50,
    chunkSize: 1000,
  });
  const knowledgeBases = await getKnowledgeBases(siteId);
  const indexPage = rootPageDataSiteMap?.pageId || "";
  const canonicalPageMap = Object.entries(
    rootPageDataSiteMap?.siteMap?.canonicalPageMap || {},
  );
  const pageSlice = getPageSlice(canonicalPageMap, pageNumber, pageSize);
  if (rootPageDataSiteMap?.config) {
    for (const [key, value] of pageSlice) {
      const pageProps = await resolveNotionPage(
        siteId,
        rootPageDataSiteMap.config,
        value,
      );
      allPagesSiteData.allPageProps = {
        ...rootPageDataSiteMap.allPageProps,
        [key]: pageProps,
      };
    }
  }
  const childLinks = getChildLinks(allPagesSiteData, indexPage);
  let documents = await getDocuments(
    childLinks,
    splitter,
    allPagesSiteData,
    siteId,
  );
  let splittedDocumentsFromBlocks = getUniqueDocuments(
    documents,
    knowledgeBases,
  );

  const nextCursor =
    (pageNumber + 1) * pageSize < canonicalPageMap.length
      ? pageNumber + 1
      : null;

  return {
    canonicalPageMap: childLinks,
    documents: splittedDocumentsFromBlocks,
    nextCursor,
  };
};

export { getSiteDocuments };
