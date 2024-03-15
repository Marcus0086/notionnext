"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { DataTable } from "@/components/dashboard/dataTable";
import { columns } from "@/components/dashboard/column";
import KnowledgeBaseCard from "@/components/knowledgeBaseCard";
import { Button } from "@/components/ui/button";

import { getSiteDocuments } from "@/lib/actions/site";
import { trainKnowledgeBases } from "@/lib/actions/ai/create";

import useToast from "@/hooks/useToast";

import { Document } from "@/types/kb";

const SiteAIPages = ({ siteId }: { siteId: string }) => {
  const [isTraining, setIsTraining] = useState(false);
  const toastOptions = useToast();
  const {
    data: infiniteSiteDocuments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["ai", siteId],
    queryFn: ({ pageParam }) => getSiteDocuments(siteId, pageParam, 4),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: Infinity,
  });

  const canonicalPageMap = useMemo(() => {
    return infiniteSiteDocuments?.pages.flatMap(
      (page) => page.canonicalPageMap
    );
  }, [infiniteSiteDocuments?.pages]);

  const documents = useMemo(() => {
    return infiniteSiteDocuments?.pages.flatMap((page) => page.documents);
  }, [infiniteSiteDocuments?.pages]);

  const handleKbTraining = async () => {
    let kbDocuments: Document[] = [];
    if (documents) {
      documents.forEach((document) => {
        kbDocuments = kbDocuments.concat(document.subDocuments);
      });
      setIsTraining(true);
      toast.info("Training KB...", toastOptions);
      const response = await trainKnowledgeBases(kbDocuments, siteId);
      if (response && response.success) {
        toast.success(response.success, toastOptions);
      } else {
        toast.error(
          "Something went wrong!" + " " + response?.error,
          toastOptions
        );
      }
      setIsTraining(false);
    }
  };

  const handleFetchNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchNextPage();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {canonicalPageMap ? (
        <DataTable data={canonicalPageMap} columns={columns} />
      ) : null}
      <div className="flex w-full flex-col items-start justify-center gap-y-3">
        <div className="flex items-center justify-between w-full">
          <h3>Knowledge Bases</h3>
          <Button
            className="rounded-3xl"
            onClick={handleKbTraining}
            variant={"destructive"}
            disabled={isTraining}
          >
            {isTraining ? "Training" : "Train KB"}
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-3 overflow-auto w-full">
          {documents?.map((document, index) => (
            <KnowledgeBaseCard key={index} document={document} />
          ))}
        </ul>
      </div>
      <Button
        className="rounded-xl mt-2 bg-green-600/60 hover:bg-green-600/80"
        onClick={handleFetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading ..."
          : hasNextPage
          ? "Show More"
          : "Nothing more to show"}
      </Button>
    </div>
  );
};

export default SiteAIPages;
