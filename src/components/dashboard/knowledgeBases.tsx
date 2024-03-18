"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import KnowledgeBaseCard from "@/components/knowledgeBaseCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getSiteDocuments } from "@/lib/actions/site";
import { trainKnowledgeBases } from "@/lib/actions/ai/create";

import useToast from "@/hooks/useToast";

import { Document } from "@/types/kb";

const KnowledgeBases = ({ siteId, page }: { siteId: string; page: number }) => {
  const [isTraining, setIsTraining] = useState(false);
  const toastOptions = useToast();
  const { data } = useQuery({
    queryKey: ["ai", page, siteId],
    queryFn: () => getSiteDocuments(siteId, page, 4),
    staleTime: Infinity,
  });
  if (!data) {
    return null;
  }
  const { nextCursor, documents } = data;

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
          toastOptions,
        );
      }
      setIsTraining(false);
    }
  };

  return (
    <>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={
                page === 0 || page - 1 === 0
                  ? `/site/${siteId}/ai`
                  : `/site/${siteId}/ai?kb=${page - 1}`
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={
                nextCursor
                  ? `/site/${siteId}/ai?kb=${nextCursor}`
                  : page !== 0
                    ? `/site/${siteId}/ai?kb=${page}`
                    : `/site/${siteId}/ai`
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default KnowledgeBases;
