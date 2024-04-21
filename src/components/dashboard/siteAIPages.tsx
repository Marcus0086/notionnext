import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const KnowledgeBases = dynamic(
  () => import("@/components/dashboard/knowledgeBases")
);
import LoadingCard from "@/components/dashboard/loadingCard";

import getQueryClient from "@/context/queryClient";

import { getSiteDocuments } from "@/lib/actions/site";

const SiteAIPages = async ({
  siteId,
  page,
}: {
  siteId: string;
  page: number;
}) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["ai", page, siteId],
      queryFn: () => getSiteDocuments(siteId, page, 4),
      staleTime: Infinity,
    });
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingCard />}>
        <KnowledgeBases siteId={siteId} page={page} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default SiteAIPages;
