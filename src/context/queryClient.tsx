import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(async () => new QueryClient());
export default getQueryClient;
