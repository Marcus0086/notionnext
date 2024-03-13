"use server";

import { OpenAIEmbeddings } from "@langchain/openai";

import { QdrantVectorStore } from "@/lib/qdrantVectorStore";

const getDocumentsFromSimilaritySearch = async (
  query: string,
  collectionName: string,
  tenant: string
) => {
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      collectionName: "NotionKnowledgeBase",
      tenant: tenant,
    }
  );
};
