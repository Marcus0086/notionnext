import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const KnowledgeBases = dynamic(
  () => import("@/components/dashboard/knowledgeBases"),
);
import { DataTable } from "@/components/dashboard/dataTable";
import { PageLinks, columns } from "@/components/dashboard/column";

import { getSiteDocuments } from "@/lib/actions/site";
import getQueryClient from "@/context/queryClient";

import { SiteMap } from "@/types";

const SiteAIPages = async ({
  siteMap,
  siteId,
  page,
}: {
  siteMap: SiteMap;
  siteId: string;
  page: number;
}) => {
  const canonicalPageMap = Object.entries(siteMap.canonicalPageMap);
  const pageLinks = canonicalPageMap.map(
    ([key], index) =>
      ({
        path: index === 0 ? "/home" : key,
      }) as PageLinks,
  );
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
    <div className="flex flex-col items-start justify-center w-full gap-y-4">
      <h3>Pages</h3>
      <DataTable data={pageLinks} columns={columns} />
      <HydrationBoundary state={dehydratedState}>
        <Suspense>
          <KnowledgeBases siteId={siteId} page={page} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default SiteAIPages;
