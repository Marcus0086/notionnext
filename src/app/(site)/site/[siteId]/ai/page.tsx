import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import SiteAIPages from "@/components/dashboard/siteAIPages";

import getQueryClient from "@/context/queryClient";
import { getSiteDocuments } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const AIChatSettings = async ({ params: { siteId } }: SitePageParams) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["ai", siteId],
      queryFn: ({ pageParam }) => getSiteDocuments(siteId, pageParam, 4),
      initialPageParam: 0,
      getNextPageParam: (lastPage: { nextCursor: any }) => lastPage.nextCursor,
      staleTime: Infinity,
    });
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <SiteAIPages siteId={siteId} />
    </HydrationBoundary>
  );
};

export default AIChatSettings;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
