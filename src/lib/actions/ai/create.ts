"use server";

import { revalidatePath } from "next/cache";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document as LangchainDocument } from "langchain/document";

import { QdrantVectorStore } from "@/lib/qdrantVectorStore";
import getSessionUser from "@/lib/getSessionUser";
import prisma from "@/lib/prisma";

import { Document } from "@/types/kb";

const getLangchainDocs = (docs: Document[]) => {
  const langchainDocs = docs.map((doc) => {
    return new LangchainDocument({
      pageContent: doc.pageContent,
      metadata: {
        source: doc.source,
        site: doc.site,
        siteId: doc.siteId,
      },
    });
  });
  return langchainDocs;
};

const trainKnowledgeBases = async (
  knowledgeBases: Document[],
  siteId: string
) => {
  const langchainDocs = getLangchainDocs(knowledgeBases);
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new Error("User not found");
    }
    const kbsTrainedStatus = await prisma.knowledgeBase.findMany({
      where: {
        siteId: siteId,
      },
      select: {
        name: true,
        isTrained: true,
      },
    });
    const trainedKbsMap = new Map(
      kbsTrainedStatus.map((kb) => [kb.name, kb.isTrained])
    );
    const untrainedLangchainDocs = langchainDocs.filter(
      (doc) =>
        !trainedKbsMap.get(doc.metadata.source.replace("/", "")) ||
        !trainedKbsMap.has(doc.metadata.source.replace("/", ""))
    );
    if (untrainedLangchainDocs.length === 0 && kbsTrainedStatus.length > 0) {
      return {
        success: "All knowledge bases are already trained.",
      };
    }
    const embeddings = new OpenAIEmbeddings();
    await QdrantVectorStore.fromDocuments(untrainedLangchainDocs, embeddings, {
      url: process.env.QDRANT_URL,
      collectionName: "NotionKnowledgeBase",
      tenant: user?.id,
    });
    const userKnowledgeBases = untrainedLangchainDocs.map((kb) => {
      return {
        siteId: siteId,
        name: kb.metadata.source.replace("/", ""),
        trainedAt: new Date(),
        isTrained: true,
      };
    });
    await prisma.knowledgeBase.createMany({
      data: userKnowledgeBases,
      skipDuplicates: true,
    });
    revalidatePath(`/site/${siteId}/ai`);
    return {
      success: "Knowledge base trained successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Error training knowledge base",
    };
  }
};

export { trainKnowledgeBases };
