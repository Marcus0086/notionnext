"use server";

import { cache } from "react";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { KnowledgeBase } from "@prisma/client";

import { PageLinks } from "@/components/dashboard/column";

import prisma from "@/lib/prisma";
import { getBlockContent } from "@/lib/blockContent";
import { sitePage } from "@/lib/actions/site";

import { _SiteData, ProviderPageProps, Document } from "@/types";

const countWords = (str: string) => {
  return str.split(" ").filter((n) => n !== "").length;
};

const getPagesSiteData = async (siteId: string) => {
  return (await sitePage(
    siteId,
    false,
    true,
    undefined,
    undefined,
    true
  )) as ProviderPageProps;
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
      [] as PageLinks[]
    );
  }
);

const getDocuments = cache(
  async (
    childLinks: PageLinks[],
    splitter: RecursiveCharacterTextSplitter,
    pagesSiteData: ProviderPageProps | undefined | null,
    siteId: string
  ) => {
    let documents: Document[] = [];
    if (childLinks.length > 0) {
      for (const page of childLinks) {
        const splittedDocuments = (await splitter.splitText(page.content)).map(
          (text) => {
            return {
              pageContent: text,
              source: page.path,
              site: pagesSiteData?.site?.name || "",
              siteId: siteId,
            };
          }
        );
        documents = documents.concat(splittedDocuments);
      }
    }
    return documents;
  }
);

const getUniqueDocuments = cache(
  (documents: Document[], knowledgeBases: KnowledgeBase[]) => {
    if (documents.length > 0) {
      return documents.reduce(
        (acc, document) => {
          const existingDocument = acc.find(
            (item) => item.doc.source === document.source
          );
          const kb = knowledgeBases.find(
            (kb) => kb.name === document.source.replace("/", "")
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
        }[]
      );
    }
    return [];
  }
);

const getSiteDocuments = async (siteId: string) => {
  const pagesSiteData = await getPagesSiteData(siteId);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 50,
    chunkSize: 1000,
  });
  const knowledgeBases = await getKnowledgeBases(siteId);
  const indexPage = pagesSiteData?.pageId || "";
  const childLinks = getChildLinks(pagesSiteData, indexPage);
  let documents = await getDocuments(
    childLinks,
    splitter,
    pagesSiteData,
    siteId
  );
  let splittedDocumentsFromBlocks = getUniqueDocuments(
    documents,
    knowledgeBases
  );

  return {
    canonicalPageMap: childLinks,
    documents: splittedDocumentsFromBlocks,
  };
};

export { getSiteDocuments };
