import { cache } from "react";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { PageLinks } from "@/components/dashboard/column";

import { getBlockContent } from "@/lib/blockContent";
import { sitePage } from ".";

import { _SiteData, ProviderPageProps, Document } from "@/types";

const getSiteDocuments = cache(async (siteId: string) => {
  const pagesSiteData: ProviderPageProps | undefined | null = await sitePage(
    siteId,
    false,
    true,
    undefined,
    undefined,
    true
  );

  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 50,
    chunkSize: 1000,
    separators: ["."],
  });

  const indexPage = pagesSiteData?.pageId || "";
  const childLinks = Object.entries(pagesSiteData?.allPageProps || {}).reduce(
    (acc, [key, pageProps]) => {
      let path = key;
      const blockContent = getBlockContent(pageProps?.recordMap);
      if (key.includes(indexPage)) {
        path = "/home";
      }
      acc.push({
        path: path,
        content: blockContent.text,
      });
      return acc;
    },
    [] as PageLinks[]
  );
  let documents: Document[] = [];
  let splittedDocumentsFromBlocks: {
    doc: Document;
    subDocuments: Document[];
  }[] = [];
  if (childLinks.length > 0) {
    for (const page of childLinks) {
      const splittedDocuments = (await splitter.splitText(page.content)).map(
        (text) => {
          return {
            pageContent: text,
            source: page.path,
            site: pagesSiteData?.site?.name || "",
          };
        }
      );
      documents = documents.concat(splittedDocuments);
      if (documents.length > 0) {
        const uniqueDocuments = documents.reduce(
          (acc, document) => {
            const existingDocument = acc.find(
              (item) => item.doc.source === document.source
            );
            if (existingDocument) {
              existingDocument.subDocuments.push(document);
            } else {
              acc.push({
                doc: document,
                subDocuments: [document],
              });
            }
            return acc;
          },
          [] as {
            doc: Document;
            subDocuments: Document[];
          }[]
        );
        splittedDocumentsFromBlocks = uniqueDocuments;
      }
    }
  }
  return {
    canonicalPageMap: childLinks,
    documents: splittedDocumentsFromBlocks,
  };
});

export { getSiteDocuments };
