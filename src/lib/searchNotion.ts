"use server";

import { cache } from "react";
import { SearchParams, SearchResults } from "notion-types";
import { notionSearch } from "@/lib/getPage";

export const searchNotion = cache(
  async (params: SearchParams): Promise<SearchResults> => {
    const results = await notionSearch(params);
    return results;
  }
);
