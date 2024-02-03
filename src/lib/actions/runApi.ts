import { HttpMethod } from "@/types";

const runApi = async (method: HttpMethod, config: {}, url: string) => {
  switch (method) {
    case HttpMethod.GET:
      return await fetch(url, config);
  }
};

export default runApi;
