import { QdrantClient } from "@qdrant/js-client-rest";
import type { Schemas as QdrantSchemas } from "@qdrant/js-client-rest";
import { v4 as uuid } from "uuid";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { VectorStore } from "@langchain/core/vectorstores";
import { Document } from "@langchain/core/documents";
import { getEnvironmentVariable } from "@langchain/core/utils/env";
import { Callbacks } from "@langchain/core/callbacks/manager";

export interface QdrantLibArgs {
  client?: QdrantClient;
  url?: string;
  apiKey?: string;
  collectionName?: string;
  collectionConfig?: QdrantSchemas["CreateCollection"];
  customPayload?: Record<string, any>[];
  tenant?: string;
}

export type QdrantAddDocumentOptions = {
  customPayload: Record<string, any>[];
};

type QdrantSearchResponse = QdrantSchemas["ScoredPoint"] & {
  payload: {
    metadata: object;
    content: string;
  };
};

export class QdrantVectorStore extends VectorStore {
  get lc_secrets(): { [key: string]: string } {
    return {
      apiKey: "QDRANT_API_KEY",
      url: "QDRANT_URL",
    };
  }

  client: QdrantClient;

  collectionName: string;

  collectionConfig?: QdrantSchemas["CreateCollection"];

  _vectorstoreType(): string {
    return "qdrant";
  }

  constructor(embeddings: EmbeddingsInterface, args: QdrantLibArgs) {
    super(embeddings, args);

    const url = args.url ?? getEnvironmentVariable("QDRANT_URL");
    const apiKey = args.apiKey ?? getEnvironmentVariable("QDRANT_API_KEY");

    if (!args.client && !url) {
      throw new Error("Qdrant client or url address must be set.");
    }

    this.client =
      args.client ||
      new QdrantClient({
        url,
        apiKey,
      });

    this.collectionName = args.collectionName ?? "documents";

    this.collectionConfig = args.collectionConfig;
  }

  async addDocuments(
    documents: Document[],
    documentOptions?: QdrantAddDocumentOptions,
    tenant?: string,
  ): Promise<void> {
    const texts = documents.map(({ pageContent }) => pageContent);
    await this.addVectors(
      await this.embeddings.embedDocuments(texts),
      documents,
      documentOptions,
      tenant,
    );
  }

  async addVectors(
    vectors: number[][],
    documents: Document[],
    documentOptions?: QdrantAddDocumentOptions,
    tenant?: string,
  ): Promise<void> {
    if (vectors.length === 0) {
      return;
    }

    await this.ensureCollection();

    const points = vectors.map((embedding, idx) => ({
      id: uuid(),
      vector: embedding,
      payload: {
        content: documents[idx].pageContent,
        metadata: documents[idx].metadata,
        customPayload: documentOptions?.customPayload[idx],
        group_id: tenant,
      },
    }));

    try {
      await this.client.upsert(this.collectionName, {
        wait: true,
        points,
      });
    } catch (e: any) {
      const error = new Error(
        `${e?.status ?? "Undefined error code"} ${e?.message}: ${
          e?.data?.status?.error
        }`,
      );
      throw error;
    }
  }
  async similaritySearch(
    query: string,
    k?: number | undefined,
    filter?: QdrantSchemas["Filter"],
    _callbacks?: Callbacks | undefined,
    tenant?: string,
  ): Promise<Document[]> {
    const results = await this.similaritySearchWithScore(
      query,
      k,
      filter,
      _callbacks,
      tenant,
    );
    return results.map(([doc, _]) => doc);
  }

  async similaritySearchWithScore(
    query: string,
    k?: number | undefined,
    filter?: QdrantSchemas["Filter"],
    _callbacks?: Callbacks | undefined,
    tenant?: string,
  ): Promise<[Document, number][]> {
    return this.similaritySearchVectorWithScore(
      await this.embeddings.embedQuery(query),
      k,
      filter,
      tenant,
    );
  }

  async similaritySearchVectorWithScore(
    query: number[],
    k?: number,
    filter?: QdrantSchemas["Filter"],
    tenant?: string,
  ): Promise<[Document, number][]> {
    if (!query) {
      return [];
    }

    await this.ensureCollection();
    let searchFilter: QdrantSchemas["Filter"] = {
      must: [{ key: "group_id", match: { value: tenant || "shared_tenant" } }],
    };
    if (filter) {
      if (filter.must) {
        searchFilter.must = searchFilter.must?.concat(filter.must);
      } else {
        searchFilter = {
          ...searchFilter,
          ...filter,
        };
      }
    }
    const results = await this.client.search(this.collectionName, {
      vector: query,
      limit: k,
      filter: searchFilter,
    });

    const result: [Document, number][] = (
      results as QdrantSearchResponse[]
    ).map((res) => [
      new Document({
        metadata: res.payload.metadata,
        pageContent: res.payload.content,
      }),
      res.score,
    ]);

    return result;
  }

  async ensureCollection() {
    const response = await this.client.getCollections();

    const collectionNames = response.collections.map(
      (collection) => collection.name,
    );

    if (!collectionNames.includes(this.collectionName)) {
      const collectionConfig = this.collectionConfig ?? {
        vectors: {
          size: (await this.embeddings.embedQuery("test")).length,
          distance: "Cosine",
        },
      };
      await this.client.createCollection(this.collectionName, {
        ...collectionConfig,
        optimizers_config: {
          memmap_threshold: 20000,
        },
        quantization_config: {
          binary: {
            always_ram: true,
          },
        },
      });
    }
  }

  static async fromTexts(
    texts: string[],
    metadatas: object[] | object,
    embeddings: EmbeddingsInterface,
    dbConfig: QdrantLibArgs,
  ): Promise<QdrantVectorStore> {
    const docs = [];
    for (let i = 0; i < texts.length; i += 1) {
      const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
      const newDoc = new Document({
        pageContent: texts[i],
        metadata,
      });
      docs.push(newDoc);
    }
    return QdrantVectorStore.fromDocuments(docs, embeddings, dbConfig);
  }

  static async fromDocuments(
    docs: Document[],
    embeddings: EmbeddingsInterface,
    dbConfig: QdrantLibArgs,
  ): Promise<QdrantVectorStore> {
    const instance = new this(embeddings, dbConfig);
    const tenant = dbConfig.tenant || "shared_tenant";
    if (dbConfig.customPayload) {
      const documentOptions = {
        customPayload: dbConfig?.customPayload,
      };
      await instance.addDocuments(docs, documentOptions, tenant);
    } else {
      await instance.addDocuments(docs, undefined, tenant);
    }
    return instance;
  }

  static async fromExistingCollection(
    embeddings: EmbeddingsInterface,
    dbConfig: QdrantLibArgs,
  ): Promise<QdrantVectorStore> {
    const instance = new this(embeddings, dbConfig);
    await instance.ensureCollection();
    return instance;
  }
}
