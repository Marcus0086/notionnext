import ExpiryMap from "expiry-map";
import { SearchParams, SearchResults } from "notion-types";
import pMemoize from "p-memoize";

export const apiBaseUrl = `/api`;

export const api = {
  searchNotion: `${apiBaseUrl}/search`,
  getNotionPageInfo: `${apiBaseUrl}/notion-page-info`,
  getSocialImage: `${apiBaseUrl}/social-image`,
};

const searchNotionImpl = async (
  params: SearchParams,
): Promise<SearchResults> => {
  return fetch(api.searchNotion, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      if (res.ok) {
        return res;
      }
      const error: any = new Error(res.statusText);
      error.response = res;
      return Promise.reject(error);
    })
    .then((res) => res.json());
};

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0],
  cache: new ExpiryMap(10000),
});
