import { NextRequest } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import { RunnableSequence } from "@langchain/core/runnables";

import { QdrantVectorStore } from "@/lib/qdrantVectorStore";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const basePrompt = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
  ----------------
  CONTEXT: {context}
  ----------------
  CHAT HISTORY: {chatHistory}
  ----------------
  QUESTION: {question}
  ----------------
  Helpful Answer:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const siteId = body.siteId;
    const tenant = body.tenant;

    if (!siteId || !tenant) {
      return new Response(
        JSON.stringify({ error: "siteId and tenant are required" }),
        { status: 400 }
      );
    }
    const embeddings = new OpenAIEmbeddings();
    const qdrant = await QdrantVectorStore.fromExistingCollection(embeddings, {
      tenant: tenant,
      collectionName: "NotionKnowledgeBase",
    });

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const documents = await qdrant.similaritySearch(
      currentMessageContent,
      5,
      {
        must: [
          {
            key: "metadata.siteId",
            match: {
              value: siteId,
            },
          },
        ],
      },
      undefined,
      tenant
    );
    const llm = new ChatOpenAI({
      streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4-turbo-preview",
      maxTokens: 300,
    });
    const prompt = PromptTemplate.fromTemplate(basePrompt);

    const chain = RunnableSequence.from([
      {
        question: (input: { question: string; chatHistory?: string }) =>
          input.question,
        chatHistory: (input: { question: string; chatHistory?: string }) =>
          input.chatHistory ?? "",
        context: async (input: { question: string; chatHistory?: string }) => {
          const relevantDocs = documents;
          const serialized = formatDocumentsAsString(relevantDocs);
          return serialized;
        },
      },
      prompt,
      llm,
      new BytesOutputParser(),
    ]);

    const stream = await chain.stream({
      question: currentMessageContent,
      chatHistory: formattedPreviousMessages.join("\n"),
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
